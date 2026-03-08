import { useState } from "react";
import { motion } from "framer-motion";
import { Users, CreditCard, Shield, BookOpen, MessageSquare, Settings } from "lucide-react";

const TABS = ["Usuarios", "Pagos", "Roles", "Cohortes", "Posts", "Config"] as const;
type Tab = typeof TABS[number];

const tabIcons: Record<Tab, typeof Users> = {
  Usuarios: Users,
  Pagos: CreditCard,
  Roles: Shield,
  Cohortes: BookOpen,
  Posts: MessageSquare,
  Config: Settings,
};

const mockUsers = [
  { id: "1", email: "ana@email.com", role: "Fundadora", is_founder: true, created_at: "2026-03-01" },
  { id: "2", email: "maria@email.com", role: "Alumna", is_founder: false, created_at: "2026-03-02" },
  { id: "3", email: "laura@email.com", role: "Fundadora", is_founder: true, created_at: "2026-03-03" },
];

const mockPayments = [
  { id: "pay_1", email: "ana@email.com", amount: 19, status: "Completado", date: "2026-03-01" },
  { id: "pay_2", email: "laura@email.com", amount: 19, status: "Completado", date: "2026-03-03" },
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Usuarios");

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-3xl font-bold">
            Panel de <span className="text-gradient-hero">Administración</span>
          </h1>
          <p className="mt-2 text-muted-foreground">Gestiona usuarios, pagos, cohortes y contenido.</p>
        </motion.div>

        <div className="flex gap-6 flex-col lg:flex-row">
          {/* Sidebar */}
          <div className="lg:w-56 shrink-0">
            <nav className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
              {TABS.map((tab) => {
                const Icon = tabIcons[tab];
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center gap-2 shrink-0 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <Icon size={16} />
                    {tab}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {activeTab === "Usuarios" && (
              <div className="rounded-2xl bg-gradient-card border border-border overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h2 className="font-display font-bold">Usuarios ({mockUsers.length})</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-xs text-muted-foreground">
                        <th className="px-4 py-3">Email</th>
                        <th className="px-4 py-3">Rol</th>
                        <th className="px-4 py-3">Fundadora</th>
                        <th className="px-4 py-3">Registro</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockUsers.map((u) => (
                        <tr key={u.id} className="border-b border-border/50 hover:bg-muted/20">
                          <td className="px-4 py-3">{u.email}</td>
                          <td className="px-4 py-3">
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              u.role === "Fundadora" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                            }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="px-4 py-3">{u.is_founder ? "✓" : "—"}</td>
                          <td className="px-4 py-3 text-muted-foreground">{u.created_at}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "Pagos" && (
              <div className="rounded-2xl bg-gradient-card border border-border overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h2 className="font-display font-bold">Pagos ({mockPayments.length})</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-xs text-muted-foreground">
                        <th className="px-4 py-3">ID</th>
                        <th className="px-4 py-3">Email</th>
                        <th className="px-4 py-3">Importe</th>
                        <th className="px-4 py-3">Estado</th>
                        <th className="px-4 py-3">Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockPayments.map((p) => (
                        <tr key={p.id} className="border-b border-border/50 hover:bg-muted/20">
                          <td className="px-4 py-3 text-muted-foreground">{p.id}</td>
                          <td className="px-4 py-3">{p.email}</td>
                          <td className="px-4 py-3">{p.amount}€</td>
                          <td className="px-4 py-3">
                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                              {p.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">{p.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "Roles" && (
              <div className="rounded-2xl bg-gradient-card border border-border p-8 text-center">
                <Shield size={32} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-display text-lg font-bold mb-2">Gestión de roles</h3>
                <p className="text-sm text-muted-foreground">Asigna roles (Alumna, Fundadora, Admin) a los usuarios de la plataforma.</p>
              </div>
            )}

            {activeTab === "Cohortes" && (
              <div className="rounded-2xl bg-gradient-card border border-border p-8 text-center">
                <BookOpen size={32} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-display text-lg font-bold mb-2">Gestión de cohortes</h3>
                <p className="text-sm text-muted-foreground">Crea y gestiona programas de aprendizaje para la comunidad.</p>
              </div>
            )}

            {activeTab === "Posts" && (
              <div className="rounded-2xl bg-gradient-card border border-border p-8 text-center">
                <MessageSquare size={32} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-display text-lg font-bold mb-2">Gestión de posts</h3>
                <p className="text-sm text-muted-foreground">Modera y gestiona el contenido de la comunidad.</p>
              </div>
            )}

            {activeTab === "Config" && (
              <div className="rounded-2xl bg-gradient-card border border-border p-8 text-center">
                <Settings size={32} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-display text-lg font-bold mb-2">Configuración</h3>
                <p className="text-sm text-muted-foreground">Ajustes generales de la plataforma.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
