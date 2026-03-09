import { motion } from "framer-motion";
import { FlaskConical, Play, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const Labs = () => {
  const { data: labs, isLoading } = useQuery({
    queryKey: ["labs"],
    queryFn: async () => {
      const { data } = await supabase
        .from("labs")
        .select("*")
        .order("lab_date", { ascending: false });
      return data ?? [];
    },
  });

  const upcomingLabs = labs?.filter((l: any) => !l.is_past) ?? [];
  const pastLabs = labs?.filter((l: any) => l.is_past) ?? [];

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-accent/10 rounded-lg text-accent">
            <FlaskConical size={24} />
          </div>
          <h1 className="font-display text-3xl font-bold">Labs</h1>
        </div>
        <p className="text-muted-foreground">Experimentos y sesiones prácticas.</p>
      </motion.div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      ) : labs && labs.length === 0 ? (
        <div className="rounded-2xl border border-border border-dashed p-12 text-center bg-muted/20">
          <FlaskConical size={48} className="mx-auto mb-4 text-muted-foreground/50" />
          <h2 className="text-lg font-bold mb-2">Próximamente</h2>
          <p className="text-sm text-muted-foreground">Estamos preparando el laboratorio. Vuelve pronto.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Upcoming Labs */}
          {upcomingLabs.length > 0 && (
            <section>
              <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar size={18} className="text-accent" /> Próximos Labs
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {upcomingLabs.map((lab: any) => (
                  <Card key={lab.id} className="border-accent/30">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{lab.title}</CardTitle>
                        <Badge variant="outline" className="text-accent border-accent">Próximo</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {lab.description && <p className="text-sm text-muted-foreground mb-2">{lab.description}</p>}
                      {lab.lab_date && (
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(lab.lab_date), "EEEE, d 'de' MMMM yyyy", { locale: es })}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Past Labs */}
          {pastLabs.length > 0 && (
            <section>
              <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                <Play size={18} className="text-muted-foreground" /> Grabaciones
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {pastLabs.map((lab: any) => (
                  <Card key={lab.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{lab.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {lab.description && <p className="text-sm text-muted-foreground mb-2">{lab.description}</p>}
                      {lab.video_url ? (
                        <a
                          href={lab.video_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline flex items-center gap-1"
                        >
                          <Play size={12} /> Ver grabación
                        </a>
                      ) : (
                        <p className="text-xs text-muted-foreground">Grabación no disponible.</p>
                      )}
                      {lab.lab_date && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(new Date(lab.lab_date), "d MMM yyyy", { locale: es })}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default Labs;
