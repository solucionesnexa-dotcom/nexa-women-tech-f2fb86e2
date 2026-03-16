import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-api-key",
};

// Supported events for webhooks
const EVENTS = [
  "user.created", "user.updated",
  "post.created", "post.deleted",
  "resource.created", "resource.deleted",
  "cohort.created", "cohort.deleted", "cohort.member_added",
  "payment.created",
] as const;

// Permission scopes
const PERMISSIONS = [
  "users:read", "users:write",
  "posts:read", "posts:write",
  "resources:read", "resources:write",
  "cohorts:read", "cohorts:write",
  "payments:read",
  "webhooks:read", "webhooks:write",
] as const;

function getServiceClient() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
}

async function hashKey(key: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(key);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function validateApiKey(req: Request): Promise<{ permissions: string[] } | null> {
  const apiKey = req.headers.get("x-api-key");
  if (!apiKey) return null;

  const keyHash = await hashKey(apiKey);
  const supabase = getServiceClient();

  const { data, error } = await supabase.rpc("validate_api_key", { p_key_hash: keyHash });
  if (error || !data || data.length === 0) return null;

  // Update last_used_at
  await supabase
    .from("api_keys")
    .update({ last_used_at: new Date().toISOString() })
    .eq("id", data[0].api_key_id);

  return { permissions: data[0].permissions };
}

function hasPermission(permissions: string[], required: string): boolean {
  return permissions.includes(required) || permissions.includes("*");
}

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function errorResponse(message: string, status = 400) {
  return jsonResponse({ error: message }, status);
}

// Dispatch webhooks for an event
async function dispatchWebhooks(event: string, payload: unknown) {
  const supabase = getServiceClient();
  const { data: hooks } = await supabase
    .from("webhooks")
    .select("*")
    .eq("is_active", true)
    .contains("events", [event]);

  if (!hooks || hooks.length === 0) return;

  for (const hook of hooks) {
    const body = JSON.stringify({ event, data: payload, timestamp: new Date().toISOString() });
    
    // Create HMAC signature if secret exists
    let signature = "";
    if (hook.secret) {
      const encoder = new TextEncoder();
      const key = await crypto.subtle.importKey(
        "raw", encoder.encode(hook.secret),
        { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
      );
      const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
      signature = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, "0")).join("");
    }

    try {
      const res = await fetch(hook.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(signature ? { "X-Webhook-Signature": signature } : {}),
        },
        body,
      });

      await supabase.from("webhook_logs").insert({
        webhook_id: hook.id,
        event,
        payload: payload as Record<string, unknown>,
        status_code: res.status,
        response_body: (await res.text()).slice(0, 1000),
      });

      await supabase
        .from("webhooks")
        .update({ last_triggered_at: new Date().toISOString(), failure_count: res.ok ? 0 : hook.failure_count + 1 })
        .eq("id", hook.id);
    } catch (err) {
      await supabase.from("webhook_logs").insert({
        webhook_id: hook.id,
        event,
        payload: payload as Record<string, unknown>,
        status_code: 0,
        response_body: String(err),
      });
      await supabase
        .from("webhooks")
        .update({ failure_count: hook.failure_count + 1 })
        .eq("id", hook.id);
    }
  }
}

// Route handler
async function handleRequest(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Validate API key
  const auth = await validateApiKey(req);
  if (!auth) {
    return errorResponse("Invalid or missing API key", 401);
  }

  const url = new URL(req.url);
  const pathParts = url.pathname.split("/").filter(Boolean);
  // Path: /platform-api/{resource}/{id?}/{action?}
  const resource = pathParts[1] || "";
  const resourceId = pathParts[2] || "";
  const action = pathParts[3] || "";
  const method = req.method;
  const supabase = getServiceClient();

  try {
    // ===== USERS =====
    if (resource === "users") {
      if (method === "GET" && !resourceId) {
        if (!hasPermission(auth.permissions, "users:read")) return errorResponse("Forbidden", 403);
        const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
        if (error) return errorResponse(error.message, 500);
        return jsonResponse({ data });
      }
      if (method === "GET" && resourceId) {
        if (!hasPermission(auth.permissions, "users:read")) return errorResponse("Forbidden", 403);
        const { data, error } = await supabase.from("profiles").select("*").eq("user_id", resourceId).single();
        if (error) return errorResponse("User not found", 404);
        // Also get roles
        const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", resourceId);
        return jsonResponse({ data: { ...data, roles: roles?.map(r => r.role) || [] } });
      }
      if (method === "PATCH" && resourceId) {
        if (!hasPermission(auth.permissions, "users:write")) return errorResponse("Forbidden", 403);
        const body = await req.json();
        const { full_name, bio, avatar_url, is_founder } = body;
        const updates: Record<string, unknown> = {};
        if (full_name !== undefined) updates.full_name = full_name;
        if (bio !== undefined) updates.bio = bio;
        if (avatar_url !== undefined) updates.avatar_url = avatar_url;
        if (is_founder !== undefined) updates.is_founder = is_founder;
        const { data, error } = await supabase.from("profiles").update(updates).eq("user_id", resourceId).select().single();
        if (error) return errorResponse(error.message, 500);
        await dispatchWebhooks("user.updated", data);
        return jsonResponse({ data });
      }
    }

    // ===== POSTS =====
    if (resource === "posts") {
      if (method === "GET" && !resourceId) {
        if (!hasPermission(auth.permissions, "posts:read")) return errorResponse("Forbidden", 403);
        const limit = parseInt(url.searchParams.get("limit") || "50");
        const offset = parseInt(url.searchParams.get("offset") || "0");
        const pillar = url.searchParams.get("pillar");
        let query = supabase.from("community_posts").select("*", { count: "exact" }).order("created_at", { ascending: false }).range(offset, offset + limit - 1);
        if (pillar) query = query.eq("pillar", pillar);
        const { data, error, count } = await query;
        if (error) return errorResponse(error.message, 500);
        return jsonResponse({ data, total: count });
      }
      if (method === "GET" && resourceId) {
        if (!hasPermission(auth.permissions, "posts:read")) return errorResponse("Forbidden", 403);
        const { data, error } = await supabase.from("community_posts").select("*").eq("id", resourceId).single();
        if (error) return errorResponse("Post not found", 404);
        return jsonResponse({ data });
      }
      if (method === "POST" && !resourceId) {
        if (!hasPermission(auth.permissions, "posts:write")) return errorResponse("Forbidden", 403);
        const body = await req.json();
        const { data, error } = await supabase.from("community_posts").insert(body).select().single();
        if (error) return errorResponse(error.message, 500);
        await dispatchWebhooks("post.created", data);
        return jsonResponse({ data }, 201);
      }
      if (method === "DELETE" && resourceId) {
        if (!hasPermission(auth.permissions, "posts:write")) return errorResponse("Forbidden", 403);
        const { error } = await supabase.from("community_posts").delete().eq("id", resourceId);
        if (error) return errorResponse(error.message, 500);
        await dispatchWebhooks("post.deleted", { id: resourceId });
        return jsonResponse({ success: true });
      }
    }

    // ===== RESOURCES =====
    if (resource === "resources") {
      if (method === "GET" && !resourceId) {
        if (!hasPermission(auth.permissions, "resources:read")) return errorResponse("Forbidden", 403);
        const section = url.searchParams.get("section");
        let query = supabase.from("resources").select("*").order("created_at", { ascending: false });
        if (section) query = query.eq("section", section);
        const { data, error } = await query;
        if (error) return errorResponse(error.message, 500);
        return jsonResponse({ data });
      }
      if (method === "POST" && !resourceId) {
        if (!hasPermission(auth.permissions, "resources:write")) return errorResponse("Forbidden", 403);
        const body = await req.json();
        const { data, error } = await supabase.from("resources").insert(body).select().single();
        if (error) return errorResponse(error.message, 500);
        await dispatchWebhooks("resource.created", data);
        return jsonResponse({ data }, 201);
      }
      if (method === "DELETE" && resourceId) {
        if (!hasPermission(auth.permissions, "resources:write")) return errorResponse("Forbidden", 403);
        const { error } = await supabase.from("resources").delete().eq("id", resourceId);
        if (error) return errorResponse(error.message, 500);
        await dispatchWebhooks("resource.deleted", { id: resourceId });
        return jsonResponse({ success: true });
      }
    }

    // ===== COHORTS =====
    if (resource === "cohorts") {
      if (method === "GET" && !resourceId) {
        if (!hasPermission(auth.permissions, "cohorts:read")) return errorResponse("Forbidden", 403);
        const { data, error } = await supabase.from("cohorts").select("*").order("created_at", { ascending: false });
        if (error) return errorResponse(error.message, 500);
        return jsonResponse({ data });
      }
      if (method === "POST" && !resourceId) {
        if (!hasPermission(auth.permissions, "cohorts:write")) return errorResponse("Forbidden", 403);
        const body = await req.json();
        const { data, error } = await supabase.from("cohorts").insert(body).select().single();
        if (error) return errorResponse(error.message, 500);
        await dispatchWebhooks("cohort.created", data);
        return jsonResponse({ data }, 201);
      }
      if (method === "DELETE" && resourceId) {
        if (!hasPermission(auth.permissions, "cohorts:write")) return errorResponse("Forbidden", 403);
        const { error } = await supabase.from("cohorts").delete().eq("id", resourceId);
        if (error) return errorResponse(error.message, 500);
        await dispatchWebhooks("cohort.deleted", { id: resourceId });
        return jsonResponse({ success: true });
      }
      // Add member to cohort
      if (method === "POST" && resourceId && action === "members") {
        if (!hasPermission(auth.permissions, "cohorts:write")) return errorResponse("Forbidden", 403);
        const body = await req.json();
        const { data, error } = await supabase.from("cohort_members").insert({ cohort_id: resourceId, user_id: body.user_id }).select().single();
        if (error) return errorResponse(error.message, 500);
        await dispatchWebhooks("cohort.member_added", data);
        return jsonResponse({ data }, 201);
      }
      // List cohort members
      if (method === "GET" && resourceId && action === "members") {
        if (!hasPermission(auth.permissions, "cohorts:read")) return errorResponse("Forbidden", 403);
        const { data, error } = await supabase.from("cohort_members").select("*, profiles(full_name, avatar_url)").eq("cohort_id", resourceId);
        if (error) return errorResponse(error.message, 500);
        return jsonResponse({ data });
      }
    }

    // ===== PAYMENTS =====
    if (resource === "payments") {
      if (method === "GET") {
        if (!hasPermission(auth.permissions, "payments:read")) return errorResponse("Forbidden", 403);
        const userId = url.searchParams.get("user_id");
        let query = supabase.from("payments").select("*").order("created_at", { ascending: false });
        if (userId) query = query.eq("user_id", userId);
        const { data, error } = await query;
        if (error) return errorResponse(error.message, 500);
        return jsonResponse({ data });
      }
    }

    // ===== WEBHOOKS MANAGEMENT =====
    if (resource === "webhooks") {
      if (method === "GET" && !resourceId) {
        if (!hasPermission(auth.permissions, "webhooks:read")) return errorResponse("Forbidden", 403);
        const { data, error } = await supabase.from("webhooks").select("*").order("created_at", { ascending: false });
        if (error) return errorResponse(error.message, 500);
        return jsonResponse({ data });
      }
      if (method === "POST" && !resourceId) {
        if (!hasPermission(auth.permissions, "webhooks:write")) return errorResponse("Forbidden", 403);
        const body = await req.json();
        const { data, error } = await supabase.from("webhooks").insert(body).select().single();
        if (error) return errorResponse(error.message, 500);
        return jsonResponse({ data }, 201);
      }
      if (method === "DELETE" && resourceId) {
        if (!hasPermission(auth.permissions, "webhooks:write")) return errorResponse("Forbidden", 403);
        const { error } = await supabase.from("webhooks").delete().eq("id", resourceId);
        if (error) return errorResponse(error.message, 500);
        return jsonResponse({ success: true });
      }
      // Webhook logs
      if (method === "GET" && resourceId && action === "logs") {
        if (!hasPermission(auth.permissions, "webhooks:read")) return errorResponse("Forbidden", 403);
        const { data, error } = await supabase.from("webhook_logs").select("*").eq("webhook_id", resourceId).order("created_at", { ascending: false }).limit(50);
        if (error) return errorResponse(error.message, 500);
        return jsonResponse({ data });
      }
    }

    // ===== META =====
    if (resource === "meta") {
      return jsonResponse({
        version: "1.0.0",
        endpoints: ["users", "posts", "resources", "cohorts", "payments", "webhooks"],
        events: EVENTS,
        permissions: PERMISSIONS,
      });
    }

    return errorResponse("Not found", 404);
  } catch (err) {
    console.error("API Error:", err);
    return errorResponse("Internal server error", 500);
  }
}

serve(handleRequest);
