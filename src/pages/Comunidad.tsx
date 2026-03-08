import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Heart, Send, Trophy, Filter } from "lucide-react";

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
}

const mockPosts: Post[] = [
  { id: 1, author: "Ana García", avatar: "AG", pillar: "Identidad", content: "Hoy decidí dejar de negociar mi tiempo. Mi primer workflow automatizado me ahorra 3 horas semanales. La soberanía digital empieza con un 'no' al presentismo.", likes: 24, comments: 8, date: "Hace 2h" },
  { id: 2, author: "María López", avatar: "ML", pillar: "Educación", content: "Tutorial: Cómo crear tu primer agente de IA para responder emails. Lo configuré en 30 min y ya lleva 2 semanas funcionando solo. Prompt incluido 👇", likes: 42, comments: 15, date: "Hace 5h" },
  { id: 3, author: "Nexa Team", avatar: "NX", pillar: "Build in Public", content: "🏆 RETO SEMANAL: Automatiza UNA tarea que repites más de 3 veces por semana. Comparte tu resultado el viernes. Sin excusas, sin espectadoras.", likes: 56, comments: 23, date: "Hace 1d", isChallenge: true },
  { id: 4, author: "Laura Ruiz", avatar: "LR", pillar: "Conversación", content: "¿Alguien más siente que su empresa usa Slack como una correa digital? Necesitamos hablar de cómo la 'cultura de empresa' se ha convertido en vigilancia 24/7.", likes: 38, comments: 19, date: "Hace 1d" },
];

const Comunidad = () => {
  const [filter, setFilter] = useState<Pillar>("Todos");
  const filtered = filter === "Todos" ? mockPosts : mockPosts.filter((p) => p.pillar === filter);

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="font-display text-3xl font-bold md:text-4xl">
            Comunidad <span className="text-gradient-hero">Nexa</span>
          </h1>
          <p className="mt-2 text-muted-foreground">Constructoras compartiendo avances, no excusas.</p>
        </motion.div>

        {/* Filters */}
        <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2">
          <Filter size={16} className="shrink-0 text-muted-foreground" />
          {PILLAR_FILTERS.map((p) => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                filter === p
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="mx-auto max-w-2xl space-y-4">
          {filtered.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-2xl bg-gradient-card border p-6 ${
                post.isChallenge ? "border-accent/40" : "border-border"
              }`}
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
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {post.pillar}
                    </span>
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

        {/* New post */}
        <div className="mx-auto mt-6 max-w-2xl">
          <div className="flex items-center gap-3 rounded-2xl bg-gradient-card border border-border p-4">
            <input
              type="text"
              placeholder="Comparte tu avance, constructora..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <button className="rounded-lg bg-primary p-2 text-primary-foreground transition hover:shadow-glow-primary">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comunidad;
