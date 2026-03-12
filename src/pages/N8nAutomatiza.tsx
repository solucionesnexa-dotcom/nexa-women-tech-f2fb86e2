import { motion } from "framer-motion";
import { ArrowLeft, Zap, ExternalLink, Play, BookOpen, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";

const steps = [
  { icon: BookOpen, title: "1. Crea tu cuenta en n8n", desc: "Regístrate gratis en n8n.io y accede a tu espacio de trabajo." },
  { icon: Workflow, title: "2. Crea tu primer flujo", desc: "Arrastra nodos, conecta apps y define tu automatización paso a paso." },
  { icon: Play, title: "3. Activa y prueba", desc: "Ejecuta tu flujo, revisa los resultados y ajusta hasta que funcione perfecto." },
];

const N8nAutomatiza = () => (
  <div className="container mx-auto p-6 max-w-3xl">
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-8">
      <Button variant="ghost" size="icon" asChild>
        <Link to="/ruta-automatiza"><ArrowLeft size={18} /></Link>
      </Button>
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-primary/10 rounded-lg text-primary"><Zap size={18} /></div>
        <div>
          <h1 className="font-display text-2xl font-bold">Mi primera automatización</h1>
          <p className="text-sm text-muted-foreground">Construye tu flujo con n8n</p>
        </div>
      </div>
    </motion.div>

    <div className="grid gap-4 mb-8">
      {steps.map((s, i) => (
        <motion.div key={s.title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
          <Card className="bg-gradient-card border-border">
            <CardHeader className="flex-row items-center gap-4 pb-2">
              <div className="p-2 bg-primary/10 rounded-lg text-primary"><s.icon size={20} /></div>
              <div>
                <CardTitle className="text-base">{s.title}</CardTitle>
                <CardDescription>{s.desc}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        </motion.div>
      ))}
    </div>

    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-center">
      <Button size="lg" className="gap-2" asChild>
        <a href="https://app.n8n.cloud/register" target="_blank" rel="noopener noreferrer">
          Abrir n8n y empezar <ExternalLink size={16} />
        </a>
      </Button>
    </motion.div>
  </div>
);

export default N8nAutomatiza;
