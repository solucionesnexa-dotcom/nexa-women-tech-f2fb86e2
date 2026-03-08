import { useState } from "react";
import { motion } from "framer-motion";
import { Users, CreditCard, BookOpen, MessageSquare, FileText, Settings } from "lucide-react";
import AdminUsers from "@/components/admin/AdminUsers";
import AdminPayments from "@/components/admin/AdminPayments";
import AdminResources from "@/components/admin/AdminResources";
import AdminCohorts from "@/components/admin/AdminCohorts";
import AdminPosts from "@/components/admin/AdminPosts";

const TABS = ["Usuarios", "Pagos", "Recursos", "Cohortes", "Posts"] as const;
type Tab = typeof TABS[number];

const tabIcons: Record<Tab, typeof Users> = {
  Usuarios: Users,
  Pagos: CreditCard,
  Recursos: FileText,
  Cohortes: BookOpen,
  Posts: MessageSquare,
};

const Admin = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Usuarios");

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-3xl font-bold">
            Panel de <span className="text-gradient-hero">Administración</span>
          </h1>
          <p className="mt-2 text-muted-foreground">Gestiona usuarios, pagos, recursos, cohortes y contenido.</p>
        </motion.div>

        <div className="flex gap-6 flex-col lg:flex-row">
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

          <div className="flex-1 min-w-0">
            {activeTab === "Usuarios" && <AdminUsers />}
            {activeTab === "Pagos" && <AdminPayments />}
            {activeTab === "Recursos" && <AdminResources />}
            {activeTab === "Cohortes" && <AdminCohorts />}
            {activeTab === "Posts" && <AdminPosts />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
