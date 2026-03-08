import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Heart, Send, Trophy, Filter, BookOpen, FlaskConical, Calendar, Users } from "lucide-react";
import AIChatbot from "@/components/AIChatbot";

const TABS = ["Feed", "Cohortes", "Recursos", "Directorio", "Eventos"] as const;
type Tab = typeof TABS[number];

const PILLAR_FILTERS = ["Todos", "Identidad", "Educación", "Conversación", "Build in Public"] as const;
type Pillar = typeof PILLAR_FILTERS[number];

interface Post {
  id: number;
  author: string;
  avatar: string;
  pillar: Pillar;
  content: string;
  likes: number;
  comments: number;
  date: string;
  isChallenge?: boolean;
  isFounder?: boolean;
}

const mockPosts: Post[] = [
  { id: 1, author: "Ana García", avatar: "AG", pillar: "Identidad", content: "Hoy decidí dejar de negociar mi tiempo. Mi primer workflow automatizado me ahorra 3 horas semanales.", likes: 24, comments: 8, date: "Hace 2h", isFounder: true },
  { id: 2, author: "María López", avatar: "ML", pillar: "Educación", content: "Tutorial: Cómo crear tu primer agente de IA para responder emails. Lo configuré en 30 min y ya lleva 2 semanas funcionando solo. Prompt incluido 👇", likes: 42, comments: 15, date: "Hace 5h", isFounder: true },
  { id: 3, author: "Nexa Team", avatar: "NX", pillar: "Build in Public", content: "🏆 RETO SEMANAL: Automatiza UNA tarea que repites más de 3 veces por semana. Comparte tu resultado el viernes.", likes: 56, comments: 23, date: "Hace 1d", isChallenge: true },
  { id: 4, author: "Laura Ruiz", avatar: "LR", pillar: "Conversación", content: "¿Alguien más siente que la IA puede ser la clave para diseñar horarios realmente flexibles? Estoy experimentando con un sistema de productividad nuevo.", likes: 38, comments: 19, date: "Hace 1d" },
];

const mockCohorts = [
  { id: 1, name: "Cohorte Fundadora", members: 18, status: "Activa", startDate: "Marzo 2026" },
  { id: 2, name: "IA para Productividad", members: 0, status: "Próximamente", startDate: "Abril 2026" },
];

const mockResources = [
  { id: 1, title: "Guía: Primeros pasos con ChatGPT para trabajo", type: "PDF" },
  { id: 2, title: "Template: Workflow de automatización semanal", type: "Notion" },
  { id: 3, title: "Prompts: 20 prompts para email profesional", type: "Doc" },
];

const Comunidad = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Feed");
  const [filter, setFilter] = useState<Pillar>("Todos");
  const filtered = filter === "Todos" ? mockPosts : mockPosts.filter((p) => p.pillar === filter);

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-3xl font-bold md:text-4xl">
            Comunidad <span className="text-gradient-hero">Nexa</span>
          </h1>
          <p className="mt-2 text-muted-foreground">Mujeres construyendo carreras digitales juntas.</p>
        </motion.div>

        {/* Platform Tabs */}
        <div className="mb-8 flex items-center gap-1 overflow-x-auto pb-2 border-b border-border">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 px-5 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Feed Tab */}
        {activeTab === "Feed" && (
          <>
            <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2">
              <Filter size={16} className="shrink-0 text-muted-foreground" />
              {PILLAR_FILTERS.map((p) => (
                <button
                  key={p}
                  onClick={() => setFilter(p)}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                    filter === p ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="mx-auto max-w-2xl space-y-4">
              {/* Compose box at top */}
              <div className="flex items-center gap-3 rounded-2xl bg-gradient-card border border-border p-4">
                <input
                  type="text"
                  placeholder="Comparte tu avance..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
                <button className="rounded-lg bg-primary p-2 text-primary-foreground transition hover:shadow-glow-primary">
                  <Send size={16} />
                </button>
              </div>

              {filtered.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`rounded-2xl bg-gradient-card border p-6 ${post.isChallenge ? "border-accent/40" : "border-border"}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-xs font-bold ${
                      post.isChallenge ? "bg-accent text-accent-foreground" : "bg-primary/20 text-primary"
                    }`}>
                      {post.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold">{post.author}</span>
                        {post.isFounder && (
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">Fundadora</span>
                        )}
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{post.pillar}</span>
                        {post.isChallenge && (
                          <span className="flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent">
                            <Trophy size={10} /> Reto
                          </span>
                        )}
                        <span className="text-[10px] text-muted-foreground">{post.date}</span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/90">{post.content}</p>
                      <div className="mt-4 flex items-center gap-6">
                        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-secondary transition-colors">
                          <Heart size={14} /> {post.likes}
                        </button>
                        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                          <MessageSquare size={14} /> {post.comments}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </>
        )}

        {/* Cohortes Tab */}
        {activeTab === "Cohortes" && (
          <div className="mx-auto max-w-2xl space-y-4">
            {mockCohorts.map((cohort) => (
              <div key={cohort.id} className="rounded-2xl bg-gradient-card border border-border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <BookOpen size={18} className="text-primary" />
                      <h3 className="font-display font-bold">{cohort.name}</h3>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{cohort.startDate} · {cohort.members} miembros</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                    cohort.status === "Activa" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  }`}>
                    {cohort.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recursos Tab */}
        {activeTab === "Recursos" && (
          <div className="mx-auto max-w-2xl space-y-4">
            {mockResources.map((res) => (
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

        {/* Directorio Tab */}
        {activeTab === "Directorio" && (
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl bg-gradient-card border border-border p-8 text-center">
              <Users size={32} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-display text-lg font-bold mb-2">Directorio de miembros</h3>
              <p className="text-sm text-muted-foreground">El directorio estará disponible cuando te unas a la comunidad.</p>
            </div>
          </div>
        )}

        {/* Eventos Tab */}
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
