import { motion } from "framer-motion";
import { Rocket, ArrowRight, Crown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RutaPro = () => (
  <div className="container mx-auto p-6 max-w-4xl">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
          <Rocket size={24} />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold">Ruta Profesional IA</h1>
          <p className="text-muted-foreground text-sm">Para mujeres que ya tienen base y quieren ingresos reales</p>
        </div>
      </div>
    </motion.div>

    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
      <Card className="bg-gradient-card border-border">
        <CardContent className="py-10 text-center space-y-6">
          <Crown size={48} className="mx-auto text-accent" />
          <h2 className="font-display text-2xl font-bold">Transforma tu conocimiento en ingresos digitales</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Esta ruta es para ti si ya tienes base técnica o profesional y quieres dar el salto a generar ingresos reales con IA, automatización y estrategia digital. Labs prácticos, feedback personalizado y una comunidad de mujeres que ejecutan.
          </p>
          <Button size="lg" className="gap-2">
            Ver si es para mí
            <ArrowRight size={16} />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  </div>
);

export default RutaPro;
