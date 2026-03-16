import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Key, Webhook, Trash2, Copy, Plus, Eye, EyeOff, RefreshCw } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const ALL_PERMISSIONS = [
  "users:read", "users:write",
  "posts:read", "posts:write",
  "resources:read", "resources:write",
  "cohorts:read", "cohorts:write",
  "payments:read",
  "webhooks:read", "webhooks:write",
];

const ALL_EVENTS = [
  "user.created", "user.updated",
  "post.created", "post.deleted",
  "resource.created", "resource.deleted",
  "cohort.created", "cohort.deleted", "cohort.member_added",
  "payment.created",
];

interface ApiKey {
  id: string;
  name: string;
  key_prefix: string;
  permissions: string[];
  is_active: boolean;
  created_at: string;
  last_used_at: string | null;
}

interface WebhookEntry {
  id: string;
  name: string;
  url: string;
  events: string[];
  is_active: boolean;
  created_at: string;
  last_triggered_at: string | null;
  failure_count: number;
}

async function hashKey(key: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(key);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function generateApiKey(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key = "nxa_";
  for (let i = 0; i < 40; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}

const AdminAPI = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [webhooks, setWebhooks] = useState<WebhookEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // New API key form
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyPerms, setNewKeyPerms] = useState<string[]>([]);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);

  // New webhook form
  const [newWebhookName, setNewWebhookName] = useState("");
  const [newWebhookUrl, setNewWebhookUrl] = useState("");
  const [newWebhookSecret, setNewWebhookSecret] = useState("");
  const [newWebhookEvents, setNewWebhookEvents] = useState<string[]>([]);

  const [showNewKey, setShowNewKey] = useState(false);
  const [showNewWebhook, setShowNewWebhook] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const [keysRes, hooksRes] = await Promise.all([
      supabase.from("api_keys").select("id, name, key_prefix, permissions, is_active, created_at, last_used_at").order("created_at", { ascending: false }),
      supabase.from("webhooks").select("id, name, url, events, is_active, created_at, last_triggered_at, failure_count").order("created_at", { ascending: false }),
    ]);
    if (keysRes.data) setApiKeys(keysRes.data as ApiKey[]);
    if (hooksRes.data) setWebhooks(hooksRes.data as WebhookEntry[]);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) { toast.error("Nombre requerido"); return; }
    if (newKeyPerms.length === 0) { toast.error("Selecciona al menos un permiso"); return; }

    const rawKey = generateApiKey();
    const keyHash = await hashKey(rawKey);
    const keyPrefix = rawKey.slice(0, 8) + "...";

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("api_keys").insert({
      name: newKeyName,
      key_hash: keyHash,
      key_prefix: keyPrefix,
      permissions: newKeyPerms,
      created_by: user.id,
    });

    if (error) { toast.error(error.message); return; }

    setGeneratedKey(rawKey);
    setNewKeyName("");
    setNewKeyPerms([]);
    toast.success("API Key creada");
    fetchData();
  };

  const handleDeleteKey = async (id: string) => {
    await supabase.from("api_keys").delete().eq("id", id);
    toast.success("API Key eliminada");
    fetchData();
  };

  const handleCreateWebhook = async () => {
    if (!newWebhookName.trim() || !newWebhookUrl.trim()) { toast.error("Nombre y URL requeridos"); return; }
    if (newWebhookEvents.length === 0) { toast.error("Selecciona al menos un evento"); return; }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("webhooks").insert({
      name: newWebhookName,
      url: newWebhookUrl,
      secret: newWebhookSecret || null,
      events: newWebhookEvents,
      created_by: user.id,
    });

    if (error) { toast.error(error.message); return; }
    setNewWebhookName("");
    setNewWebhookUrl("");
    setNewWebhookSecret("");
    setNewWebhookEvents([]);
    setShowNewWebhook(false);
    toast.success("Webhook creado");
    fetchData();
  };

  const handleDeleteWebhook = async (id: string) => {
    await supabase.from("webhooks").delete().eq("id", id);
    toast.success("Webhook eliminado");
    fetchData();
  };

  const togglePerm = (perm: string) => {
    setNewKeyPerms((prev) => prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]);
  };

  const toggleEvent = (event: string) => {
    setNewWebhookEvents((prev) => prev.includes(event) ? prev.filter((e) => e !== event) : [...prev, event]);
  };

  if (loading) return <div className="flex justify-center py-12"><RefreshCw className="animate-spin text-muted-foreground" /></div>;

  const baseUrl = `${window.location.origin.replace('localhost:8080', '<tu-supabase-url>')}/functions/v1/platform-api`;

  return (
    <div className="space-y-8">
      {/* API Documentation Quick Reference */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><Key size={18} /> API REST de la Plataforma</CardTitle>
          <CardDescription>
            Usa tu API Key en el header <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded text-xs">X-API-Key</code> para autenticar las peticiones.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-background rounded-lg p-3 font-mono text-xs space-y-1 border">
            <p className="text-muted-foreground">Base URL:</p>
            <p className="text-primary break-all">https://oeckhqqkspbqzavlwwco.supabase.co/functions/v1/platform-api</p>
            <div className="pt-2 space-y-0.5 text-muted-foreground">
              <p>GET  /users — Listar usuarios</p>
              <p>GET  /users/:id — Detalle de usuario</p>
              <p>PATCH /users/:id — Actualizar usuario</p>
              <p>GET  /posts — Listar posts</p>
              <p>POST /posts — Crear post</p>
              <p>DELETE /posts/:id — Eliminar post</p>
              <p>GET  /resources — Listar recursos</p>
              <p>POST /resources — Crear recurso</p>
              <p>GET  /cohorts — Listar cohortes</p>
              <p>POST /cohorts — Crear cohorte</p>
              <p>GET  /payments — Listar pagos</p>
              <p>GET  /webhooks — Listar webhooks</p>
              <p>POST /webhooks — Crear webhook</p>
              <p>GET  /meta — Info de la API</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generated key alert */}
      {generatedKey && (
        <Card className="border-accent bg-accent/10">
          <CardContent className="pt-6">
            <p className="text-sm font-medium mb-2">🔑 Tu nueva API Key (cópiala ahora, no se mostrará de nuevo):</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-background p-2 rounded text-xs break-all border">{generatedKey}</code>
              <Button size="icon" variant="outline" onClick={() => { navigator.clipboard.writeText(generatedKey); toast.success("Copiada"); }}>
                <Copy size={14} />
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="mt-2" onClick={() => setGeneratedKey(null)}>Entendido, cerrar</Button>
          </CardContent>
        </Card>
      )}

      {/* API Keys Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2"><Key size={16} /> API Keys</h3>
          <Button size="sm" onClick={() => setShowNewKey(!showNewKey)} variant={showNewKey ? "secondary" : "default"}>
            <Plus size={14} className="mr-1" /> {showNewKey ? "Cancelar" : "Nueva Key"}
          </Button>
        </div>

        {showNewKey && (
          <Card className="mb-4">
            <CardContent className="pt-6 space-y-4">
              <Input placeholder="Nombre (ej: n8n-producción)" value={newKeyName} onChange={(e) => setNewKeyName(e.target.value)} />
              <div>
                <p className="text-sm font-medium mb-2">Permisos:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {ALL_PERMISSIONS.map((perm) => (
                    <label key={perm} className="flex items-center gap-2 text-sm cursor-pointer">
                      <Checkbox checked={newKeyPerms.includes(perm)} onCheckedChange={() => togglePerm(perm)} />
                      {perm}
                    </label>
                  ))}
                </div>
                <Button variant="link" size="sm" className="mt-1 p-0 h-auto" onClick={() => setNewKeyPerms([...ALL_PERMISSIONS])}>
                  Seleccionar todos
                </Button>
              </div>
              <Button onClick={handleCreateKey}>Crear API Key</Button>
            </CardContent>
          </Card>
        )}

        <div className="space-y-2">
          {apiKeys.map((key) => (
            <Card key={key.id}>
              <CardContent className="pt-4 pb-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{key.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{key.key_prefix}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {key.permissions.map((p) => <Badge key={p} variant="secondary" className="text-[10px]">{p}</Badge>)}
                  </div>
                  {key.last_used_at && (
                    <p className="text-[10px] text-muted-foreground mt-1">Último uso: {new Date(key.last_used_at).toLocaleDateString("es-ES")}</p>
                  )}
                </div>
                <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDeleteKey(key.id)}>
                  <Trash2 size={14} />
                </Button>
              </CardContent>
            </Card>
          ))}
          {apiKeys.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No hay API Keys creadas</p>}
        </div>
      </div>

      {/* Webhooks Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2"><Webhook size={16} /> Webhooks</h3>
          <Button size="sm" onClick={() => setShowNewWebhook(!showNewWebhook)} variant={showNewWebhook ? "secondary" : "default"}>
            <Plus size={14} className="mr-1" /> {showNewWebhook ? "Cancelar" : "Nuevo Webhook"}
          </Button>
        </div>

        {showNewWebhook && (
          <Card className="mb-4">
            <CardContent className="pt-6 space-y-4">
              <Input placeholder="Nombre (ej: n8n-notificaciones)" value={newWebhookName} onChange={(e) => setNewWebhookName(e.target.value)} />
              <Input placeholder="URL (ej: https://tu-n8n.app/webhook/xxx)" value={newWebhookUrl} onChange={(e) => setNewWebhookUrl(e.target.value)} />
              <Input placeholder="Secret (opcional, para firmar payloads)" value={newWebhookSecret} onChange={(e) => setNewWebhookSecret(e.target.value)} />
              <div>
                <p className="text-sm font-medium mb-2">Eventos:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {ALL_EVENTS.map((event) => (
                    <label key={event} className="flex items-center gap-2 text-sm cursor-pointer">
                      <Checkbox checked={newWebhookEvents.includes(event)} onCheckedChange={() => toggleEvent(event)} />
                      {event}
                    </label>
                  ))}
                </div>
                <Button variant="link" size="sm" className="mt-1 p-0 h-auto" onClick={() => setNewWebhookEvents([...ALL_EVENTS])}>
                  Seleccionar todos
                </Button>
              </div>
              <Button onClick={handleCreateWebhook}>Crear Webhook</Button>
            </CardContent>
          </Card>
        )}

        <div className="space-y-2">
          {webhooks.map((hook) => (
            <Card key={hook.id}>
              <CardContent className="pt-4 pb-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{hook.name}</p>
                  <p className="text-xs text-muted-foreground break-all">{hook.url}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {hook.events.map((e) => <Badge key={e} variant="outline" className="text-[10px]">{e}</Badge>)}
                  </div>
                  <div className="flex gap-3 mt-1 text-[10px] text-muted-foreground">
                    {hook.last_triggered_at && <span>Último trigger: {new Date(hook.last_triggered_at).toLocaleDateString("es-ES")}</span>}
                    {hook.failure_count > 0 && <span className="text-destructive">Fallos: {hook.failure_count}</span>}
                  </div>
                </div>
                <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDeleteWebhook(hook.id)}>
                  <Trash2 size={14} />
                </Button>
              </CardContent>
            </Card>
          ))}
          {webhooks.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No hay webhooks configurados</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminAPI;
