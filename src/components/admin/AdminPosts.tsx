import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare, Trash2 } from "lucide-react";

interface Post {
  id: string;
  content: string;
  pillar: string;
  is_challenge: boolean;
  likes_count: number;
  comments_count: number;
  created_at: string;
  user_id: string;
}

const AdminPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase.from("community_posts").select("*").order("created_at", { ascending: false });
    setPosts(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleDelete = async (id: string) => {
    await supabase.from("community_posts").delete().eq("id", id);
    fetchPosts();
  };

  return (
    <div className="rounded-2xl bg-gradient-card border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <h2 className="font-display font-bold">Posts de la comunidad ({posts.length})</h2>
      </div>
      {loading ? (
        <div className="p-8 text-center text-muted-foreground">Cargando...</div>
      ) : posts.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">No hay posts todavía.</div>
      ) : (
        <div className="divide-y divide-border/50">
          {posts.map((post) => (
            <div key={post.id} className="px-4 py-3 hover:bg-muted/20">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">{post.pillar}</span>
                    {post.is_challenge && (
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent">Reto</span>
                    )}
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(post.created_at).toLocaleDateString("es-ES")}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/90 line-clamp-2">{post.content}</p>
                  <div className="mt-1 flex gap-4 text-xs text-muted-foreground">
                    <span>❤ {post.likes_count}</span>
                    <span>💬 {post.comments_count}</span>
                  </div>
                </div>
                <button onClick={() => handleDelete(post.id)} className="text-destructive/60 hover:text-destructive shrink-0 mt-1">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPosts;
