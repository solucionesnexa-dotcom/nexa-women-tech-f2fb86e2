import { motion } from "framer-motion";
import { Zap, Calendar, CheckSquare, Bot, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const cards = [
  { title: "Agenda", description: "Automatiza tu calendario y nunca más pierdas una cita importante", icon: Calendar },
  { title: "Tareas", description: "Crea flujos automáticos para tus tareas repetitivas del día a día", icon: CheckSquare },
  { title: "IA básica", description: "Aprende a usar IA para escribir, organizar y decidir más rápido", icon: Bot },
];

const RutaAutomatiza = () => (
  <div className="container mx-auto p-6 max-w-4xl">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <Zap size={24} />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold">Tu primera automatización</h1>
          <p className="text-muted-foreground text-sm">Empieza a construir sistemas que trabajen por ti</p>
        </div>
      </div>
    </motion.div>

    <div className="grid gap-6 md:grid-cols-3 mb-10">
      {cards.map((card, i) => (
        <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
          <Card className="h-full bg-gradient-card border-border hover:border-primary/20 transition-colors">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-xl w-fit mb-2">
                <card.icon size={24} className="text-primary" />
              </div>
              <CardTitle className="text-lg">{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      ))}
    </div>

    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-center">
      <Button size="lg" className="gap-2" asChild>
        <Link to="/n8n-automatiza">
          Empezar mi primera automatización
          <ArrowRight size={16} />
        </Link>
      </Button>
    </motion.div>
  </div>
);

export default RutaAutomatiza;
