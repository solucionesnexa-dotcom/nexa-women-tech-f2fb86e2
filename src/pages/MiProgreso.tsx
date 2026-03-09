import { motion } from "framer-motion";
import { TrendingUp, BookOpen, Zap, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const MiProgreso = () => (
  <div className="container mx-auto p-6 max-w-4xl">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <TrendingUp size={24} />
        </div>
        <h1 className="font-display text-3xl font-bold">Mi Progreso</h1>
      </div>
      <p className="text-muted-foreground">Tu avance en las rutas de Nexa Women Tech</p>
    </motion.div>

    <div className="grid gap-6 md:grid-cols-3">
      {[
        { title: "Ruta Automatiza", progress: 0, icon: Zap, color: "text-primary" },
        { title: "Ruta Claridad", progress: 0, icon: BookOpen, color: "text-accent" },
        { title: "Ruta Profesional", progress: 0, icon: Target, color: "text-secondary" },
      ].map((ruta, i) => (
        <motion.div key={ruta.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
          <Card className="bg-gradient-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <ruta.icon size={18} className={ruta.color} />
                {ruta.title}
              </CardTitle>
              <CardDescription>Sin iniciar</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={ruta.progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">{ruta.progress}% completado</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
);

export default MiProgreso;
