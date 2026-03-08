import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { MessageSquare, Heart, Send, Trophy, Filter } from "lucide-react";
import { toast } from "sonner";

const PILLAR_FILTERS = ["Todos", "Identidad", "Educación", "Conversación", "Build in Public"] as const;
type Pillar = (typeof PILLAR_FILTERS)[number];

interface PostWithProfile {
  id: string;
  content: string;
  pillar: string;
  is_challenge: boolean;
  likes_count: number;
  comments_count: number;
  created_at: string;
  user_id: string;
  profile?: { full_name: string | null; is_founder: boolean; avatar_url: string | null } | null;
}

const timeAgo = (date: string) => {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "Ahora";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `Hace ${minutes}min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Hace ${hours}h`;
  const days = Math.floor(hours / 24);
  return `Hace ${days}d`;
};

const getInitials = (name: string | null) => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const CommunityFeed = () => {
  const { user, isFounder } = useAuth();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<Pillar>("Todos");
  const [newContent, setNewContent] = useState("");
  const [selectedPillar, setSelectedPillar] = useState<string>("Identidad");

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["community-posts"],
    queryFn: async () => {
      const { data: postsOnly, error } = await supabase
        .from("community_posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;

      const userIds = [...new Set((postsOnly ?? []).map((p) => p.user_id))];
      const { data: profiles } = userIds.length
        ? await supabase.from("profiles").select("user_id, full_name, is_founder, avatar_url").in("user_id", userIds)
        : { data: [] };

      const profileMap = new Map((profiles ?? []).map((p) => [p.user_id, p] as const));
      return (postsOnly ?? []).map((p) => ({
        ...p,
        profile: profileMap.get(p.user_id) ?? null,
      })) as PostWithProfile[];
    },
  });

  const createPost = useMutation({
    mutationFn: async (content: string) => {
      if (!user) throw new Error("Debes iniciar sesión");
      const { error } = await supabase.from("community_posts").insert({
        content,
        user_id: user.id,
        pillar: selectedPillar,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setNewContent("");
      queryClient.invalidateQueries({ queryKey: ["community-posts"] });
      toast.success("¡Post publicado!");
    },
    onError: (err) => {
      toast.error(err.message || "Error al publicar");
    },
  });

  const handleSubmit = () => {
    const trimmed = newContent.trim();
    if (!trimmed) return;
    createPost.mutate(trimmed);
  };

  const filtered = filter === "Todos" ? posts : posts.filter((p) => p.pillar === filter);

  return (
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
        {/* Compose box */}
        {user ? (
          <div className="rounded-2xl bg-gradient-card border border-border p-4 space-y-3">
            <div className="flex items-center gap-2">
              <select
                value={selectedPillar}
                onChange={(e) => setSelectedPillar(e.target.value)}
                className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground outline-none"
              >
                {PILLAR_FILTERS.filter((p) => p !== "Todos").map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Comparte tu avance..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSubmit()}
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              <button
                onClick={handleSubmit}
                disabled={createPost.isPending || !newContent.trim()}
                className="rounded-lg bg-primary p-2 text-primary-foreground transition hover:shadow-glow-primary disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-gradient-card border border-border p-4 text-center text-sm text-muted-foreground">
            <a href="/auth" className="text-primary hover:underline">Inicia sesión</a> para publicar en la comunidad.
          </div>
        )}

        {isLoading ? (
          <div className="text-center text-sm text-muted-foreground py-8">Cargando posts...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground py-8">No hay posts todavía. ¡Sé la primera en publicar!</div>
        ) : (
          filtered.map((post, i) => {
            const profile = Array.isArray(post.profile) ? post.profile[0] : post.profile;
            const name = profile?.full_name ?? "Usuaria";
            const postIsFounder = profile?.is_founder ?? false;

            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-2xl bg-gradient-card border p-6 ${post.is_challenge ? "border-accent/40" : "border-border"}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-xs font-bold ${
                      post.is_challenge ? "bg-accent text-accent-foreground" : "bg-primary/20 text-primary"
                    }`}
                  >
                    {getInitials(name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold">{name}</span>
                      {postIsFounder && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">Fundadora</span>
                      )}
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{post.pillar}</span>
                      {post.is_challenge && (
                        <span className="flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent">
                          <Trophy size={10} /> Reto
                        </span>
                      )}
                      <span className="text-[10px] text-muted-foreground">{timeAgo(post.created_at)}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/90">{post.content}</p>
                    <div className="mt-4 flex items-center gap-6">
                      <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-secondary transition-colors">
                        <Heart size={14} /> {post.likes_count}
                      </button>
                      <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                        <MessageSquare size={14} /> {post.comments_count}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })
        )}
      </div>
    </>
  );
};

export default CommunityFeed;
