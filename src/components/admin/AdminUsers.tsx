import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Shield } from "lucide-react";

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

  const fetchData = async () => {
    setLoading(true);
    const [{ data: p }, { data: r }] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("user_roles").select("*"),
    ]);
    setProfiles(p ?? []);
    setUserRoles(r ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const getRoles = (userId: string) =>
    userRoles.filter((r) => r.user_id === userId).map((r) => r.role);

  const toggleRole = async (userId: string, role: string) => {
    const existing = userRoles.find((r) => r.user_id === userId && r.role === role);
    if (existing) {
      await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", role as any);
    } else {
      await supabase.from("user_roles").insert({ user_id: userId, role: role as any });
    }
    fetchData();
  };

  const toggleFounder = async (userId: string, current: boolean) => {
    await supabase.from("profiles").update({ is_founder: !current }).eq("user_id", userId);
    fetchData();
  };

  if (loading) return <div className="text-center py-12 text-muted-foreground">Cargando usuarios...</div>;

  return (
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
              const roles = getRoles(p.user_id);
              return (
                <tr key={p.id} className="border-b border-border/50 hover:bg-muted/20">
                  <td className="px-4 py-3">{p.full_name || "Sin nombre"}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleFounder(p.user_id, p.is_founder)}
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold transition ${
                        p.is_founder ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {p.is_founder ? "✓ Fundadora" : "No"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      {ROLES.map((role) => (
                        <button
                          key={role}
                          onClick={() => toggleRole(p.user_id, role)}
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold transition ${
                            roles.includes(role)
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {role}
                        </button>
                      ))}
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
  );
};

export default AdminUsers;
