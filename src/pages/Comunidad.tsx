import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, FlaskConical, Calendar, Users } from "lucide-react";
import AIChatbot from "@/components/AIChatbot";
import CommunityFeed from "@/components/community/CommunityFeed";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const TABS = ["Feed", "Cohortes", "Recursos", "Directorio", "Eventos"] as const;
type Tab = (typeof TABS)[number];

const Comunidad = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Feed");

  const { data: cohorts = [] } = useQuery({
    queryKey: ["cohorts"],
    queryFn: async () => {
      const { data } = await supabase.from("cohorts").select("*, cohort_members(count)");
      return data ?? [];
    },
    enabled: activeTab === "Cohortes",
  });

  const { data: resources = [] } = useQuery({
    queryKey: ["resources"],
    queryFn: async () => {
      const { data } = await supabase.from("resources").select("*").order("created_at", { ascending: false });
      return data ?? [];
    },
    enabled: activeTab === "Recursos",
  });

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-3xl font-bold md:text-4xl">
            Comunidad <span className="text-gradient-hero">Nexa</span>
          </h1>
          <p className="mt-2 text-muted-foreground">Mujeres construyendo carreras digitales juntas.</p>
        </motion.div>

        <div className="mb-8 flex items-center gap-1 overflow-x-auto pb-2 border-b border-border">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 px-5 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Feed" && <CommunityFeed />}

        {activeTab === "Cohortes" && (
          <div className="mx-auto max-w-2xl space-y-4">
            {cohorts.map((cohort: any) => (
              <div key={cohort.id} className="rounded-2xl bg-gradient-card border border-border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <BookOpen size={18} className="text-primary" />
                      <h3 className="font-display font-bold">{cohort.name}</h3>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {cohort.start_date ?? "Próximamente"} · {cohort.cohort_members?.[0]?.count ?? 0} miembros
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Recursos" && (
          <div className="mx-auto max-w-2xl space-y-4">
            {resources.map((res: any) => (
              <div key={res.id} className="flex items-center justify-between rounded-2xl bg-gradient-card border border-border p-6">
                <div className="flex items-center gap-3">
                  <FlaskConical size={18} className="text-accent" />
                  <span className="text-sm font-medium">{res.title}</span>
                </div>
                <span className="rounded-full bg-muted px-3 py-1 text-[10px] font-bold text-muted-foreground">{res.type}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Directorio" && (
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl bg-gradient-card border border-border p-8 text-center">
              <Users size={32} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-display text-lg font-bold mb-2">Directorio de miembros</h3>
              <p className="text-sm text-muted-foreground">El directorio estará disponible cuando te unas a la comunidad.</p>
            </div>
          </div>
        )}

        {activeTab === "Eventos" && (
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl bg-gradient-card border border-border p-8 text-center">
              <Calendar size={32} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-display text-lg font-bold mb-2">Eventos y Labs</h3>
              <p className="text-sm text-muted-foreground">Calendario de sesiones en directo, labs de IA y eventos exclusivos para miembros.</p>
            </div>
          </div>
        )}
      </div>
      <AIChatbot />
    </div>
  );
};

export default Comunidad;
