import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { BookOpen, Calendar, MessageSquare, Zap, FlaskConical } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const Dashboard = () => {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(" ")[0] || "Soberana";

  // Latest 3 community posts with profile info
  const { data: latestPosts } = useQuery({
    queryKey: ["dashboard-posts"],
    queryFn: async () => {
      const { data } = await supabase
        .from("community_posts")
        .select("id, content, pillar, created_at, user_id, profiles!inner(full_name)")
        .order("created_at", { ascending: false })
        .limit(3);
      return data ?? [];
    },
  });

  // Next upcoming cohort
  const { data: nextEvent } = useQuery({
    queryKey: ["dashboard-next-event"],
    queryFn: async () => {
      const today = new Date().toISOString().split("T")[0];
      const { data } = await supabase
        .from("cohorts")
        .select("name, start_date, description")
        .gte("start_date", today)
        .order("start_date", { ascending: true })
        .limit(1);
      return data?.[0] ?? null;
    },
  });

  // Today's activity stats
  const { data: todayStats } = useQuery({
    queryKey: ["dashboard-today-stats"],
    queryFn: async () => {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const { count: postsToday } = await supabase
        .from("community_posts")
        .select("id", { count: "exact", head: true })
        .gte("created_at", todayStart.toISOString());
      const { count: challengesToday } = await supabase
        .from("community_posts")
        .select("id", { count: "exact", head: true })
        .gte("created_at", todayStart.toISOString())
        .eq("is_challenge", true);
      return { posts: postsToday ?? 0, challenges: challengesToday ?? 0 };
    },
  });

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-display text-3xl font-bold">
          Hola, <span className="text-primary">{firstName}</span> 👋
        </h1>
        <p className="mt-2 text-muted-foreground">Bienvenida a tu centro de control de Nexa.</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Tu Progreso */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="h-full bg-gradient-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen size={18} className="text-primary" />
                Tu Progreso
              </CardTitle>
              <CardDescription>Ruta Nexa: Exploradora</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Módulo 1: Inmersión</span>
                  <span className="text-primary font-medium">40%</span>
                </div>
                <Progress value={40} className="h-2" />
                <Link to="/ruta" className="text-xs text-primary hover:underline mt-2 inline-block">
                  Continuar ruta →
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Próximo Evento */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="h-full bg-gradient-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar size={18} className="text-accent" />
                Próximo Evento
              </CardTitle>
            </CardHeader>
            <CardContent>
              {nextEvent ? (
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="font-medium text-sm">{nextEvent.name}</p>
                  {nextEvent.description && (
                    <p className="text-xs text-muted-foreground mt-1">{nextEvent.description}</p>
                  )}
                  {nextEvent.start_date && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(new Date(nextEvent.start_date), "EEEE, d 'de' MMMM", { locale: es })}
                    </p>
                  )}
                </div>
              ) : (
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-sm text-muted-foreground">No hay eventos próximos.</p>
                </div>
              )}
              <Link to="/comunidad" className="text-xs text-accent hover:underline mt-3 inline-block">
                Ver calendario →
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Actividad Comunidad */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="h-full bg-gradient-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare size={18} className="text-secondary" />
                Comunidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {latestPosts && latestPosts.length > 0 ? (
                  latestPosts.map((post: any) => (
                    <div key={post.id} className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-secondary mt-1.5 shrink-0" />
                      <p className="text-sm line-clamp-2">{post.content}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Sin actividad reciente.</p>
                )}
                {todayStats && (
                  <p className="text-xs text-muted-foreground">
                    Hoy: {todayStats.posts} posts · {todayStats.challenges} retos
                  </p>
                )}
              </div>
              <Link to="/comunidad" className="text-xs text-secondary hover:underline mt-4 inline-block">
                Ir a la comunidad →
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Accesos Rápidos */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-8">
        <h2 className="font-display text-xl font-bold mb-4">Accesos Rápidos</h2>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          <Link to="/ai-toolkit" className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:bg-muted transition-colors">
            <Zap size={20} className="text-primary" />
            <span className="font-medium text-sm">AI Toolkit</span>
          </Link>
          <Link to="/labs" className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:bg-muted transition-colors">
            <FlaskConical size={20} className="text-accent" />
            <span className="font-medium text-sm">Labs</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
