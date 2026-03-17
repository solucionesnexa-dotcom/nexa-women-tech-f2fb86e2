import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Save } from "lucide-react";
import { toast } from "sonner";

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  is_founder: boolean;
  created_at: string;
}

interface UserRole {
  user_id: string;
  role: string;
}

const ROLES = ["alumna", "fundadora", "admin"] as const;

const AdminUsers = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Local draft state for unsaved changes
  const [draftFounder, setDraftFounder] = useState<Record<string, boolean>>({});
  const [draftRoles, setDraftRoles] = useState<Record<string, string[]>>({});
  const [hasChanges, setHasChanges] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const [{ data: p }, { data: r }] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("user_roles").select("*"),
    ]);
    setProfiles(p ?? []);
    setUserRoles(r ?? []);
    // Reset drafts
    setDraftFounder({});
    setDraftRoles({});
    setHasChanges(false);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const getOriginalRoles = useCallback((userId: string) =>
    userRoles.filter((r) => r.user_id === userId).map((r) => r.role),
  [userRoles]);

  const getCurrentRoles = useCallback((userId: string) => {
    if (draftRoles[userId] !== undefined) return draftRoles[userId];
    return getOriginalRoles(userId);
  }, [draftRoles, getOriginalRoles]);

  const getCurrentFounder = useCallback((userId: string, original: boolean) => {
    if (draftFounder[userId] !== undefined) return draftFounder[userId];
    return original;
  }, [draftFounder]);

  const toggleRole = (userId: string, role: string) => {
    const current = getCurrentRoles(userId);
    const updated = current.includes(role)
      ? current.filter((r) => r !== role)
      : [...current, role];
    setDraftRoles((prev) => ({ ...prev, [userId]: updated }));
    setHasChanges(true);
  };

  const toggleFounder = (userId: string, currentVal: boolean) => {
    setDraftFounder((prev) => ({ ...prev, [userId]: !currentVal }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Save founder changes
      const founderPromises = Object.entries(draftFounder).map(([userId, isFounder]) =>
        supabase.from("profiles").update({ is_founder: isFounder }).eq("user_id", userId)
      );

      // Save role changes
      const rolePromises = Object.entries(draftRoles).flatMap(([userId, newRoles]) => {
        const original = getOriginalRoles(userId);
        const toAdd = newRoles.filter((r) => !original.includes(r));
        const toRemove = original.filter((r) => !newRoles.includes(r));

        return [
          ...toAdd.map((role) =>
            supabase.from("user_roles").insert({ user_id: userId, role: role as any })
          ),
          ...toRemove.map((role) =>
            supabase.from("user_roles").delete().eq("user_id", userId).eq("role", role as any)
          ),
        ];
      });

      await Promise.all([...founderPromises, ...rolePromises]);
      toast.success("Cambios guardados correctamente");
      await fetchData();
    } catch {
      toast.error("Error al guardar los cambios");
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    setDraftFounder({});
    setDraftRoles({});
    setHasChanges(false);
  };

  if (loading) return <div className="text-center py-12 text-muted-foreground">Cargando usuarios...</div>;

  return (
    <div className="space-y-4">
      {/* Save bar */}
      {hasChanges && (
        <div className="flex items-center justify-between rounded-xl border border-primary/30 bg-primary/5 px-5 py-3 animate-in fade-in slide-in-from-top-2">
          <span className="text-sm font-medium text-primary">Tienes cambios sin guardar</span>
          <div className="flex gap-2">
            <button
              onClick={handleDiscard}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted/50"
            >
              Descartar
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2 text-sm font-bold text-white transition hover:bg-cyan-600 disabled:opacity-50"
            >
              <Save size={14} />
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-gradient-card border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="font-display font-bold">Usuarios ({profiles.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Fundadora</th>
                <th className="px-4 py-3">Roles</th>
                <th className="px-4 py-3">Registro</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((p) => {
                const roles = getCurrentRoles(p.user_id);
                const isFounder = getCurrentFounder(p.user_id, p.is_founder);
                const founderChanged = draftFounder[p.user_id] !== undefined;
                const rolesChanged = draftRoles[p.user_id] !== undefined;

                return (
                  <tr key={p.id} className={`border-b border-border/50 hover:bg-muted/20 ${founderChanged || rolesChanged ? "bg-primary/[0.03]" : ""}`}>
                    <td className="px-4 py-3">{p.full_name || "Sin nombre"}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleFounder(p.user_id, isFounder)}
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold transition ${
                          isFounder ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                        } ${founderChanged ? "ring-1 ring-primary/40" : ""}`}
                      >
                        {isFounder ? "✓ Fundadora" : "No"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 flex-wrap">
                        {ROLES.map((role) => {
                          const active = roles.includes(role);
                          const changed = rolesChanged && active !== getOriginalRoles(p.user_id).includes(role);
                          return (
                            <button
                              key={role}
                              onClick={() => toggleRole(p.user_id, role)}
                              className={`rounded-full px-2 py-0.5 text-[10px] font-bold transition ${
                                active
                                  ? "bg-primary/10 text-primary"
                                  : "bg-muted text-muted-foreground hover:bg-muted/80"
                              } ${changed ? "ring-1 ring-primary/40" : ""}`}
                            >
                              {role}
                            </button>
                          );
                        })}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(p.created_at).toLocaleDateString("es-ES")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
