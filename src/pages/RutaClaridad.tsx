import { motion } from "framer-motion";
import { Compass, Zap, Globe, Briefcase, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const options = [
  { title: "Automatización", description: "Descubre cómo la automatización puede transformar tu trabajo actual", icon: Zap },
  { title: "Servicio digital", description: "Explora cómo crear un servicio online basado en tus habilidades", icon: Globe },
  { title: "Nueva vía profesional", description: "Encuentra una dirección profesional que combine tecnología y propósito", icon: Briefcase },
];

const RutaClaridad = () => (
  <div className="container mx-auto p-6 max-w-4xl">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-accent/10 rounded-lg text-accent">
          <Compass size={24} />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold">Encuentra tu camino digital</h1>
          <p className="text-muted-foreground text-sm">Descubre qué dirección encaja con tu perfil y tus objetivos</p>
        </div>
      </div>
    </motion.div>

    <div className="grid gap-6 md:grid-cols-3 mb-10">
      {options.map((opt, i) => (
        <motion.div key={opt.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
          <Card className="h-full bg-gradient-card border-border hover:border-accent/20 transition-colors">
            <CardHeader>
              <div className="p-3 bg-accent/10 rounded-xl w-fit mb-2">
                <opt.icon size={24} className="text-accent" />
              </div>
              <CardTitle className="text-lg">{opt.title}</CardTitle>
              <CardDescription>{opt.description}</CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      ))}
    </div>

    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-center">
      <Button size="lg" className="gap-2">
        Descubrir mi dirección
        <ArrowRight size={16} />
      </Button>
    </motion.div>
  </div>
);

export default RutaClaridad;
