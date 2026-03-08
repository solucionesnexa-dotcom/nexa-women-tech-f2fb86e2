import { motion } from "framer-motion";
import { Lock, CheckCircle2, Play, BookOpen, Target, Zap, Crown, ArrowRight, Info } from "lucide-react";
import { Link } from "react-router-dom";

interface Module {
  id: number;
  title: string;
  desc: string;
  weeks: number;
  locked: boolean;
  completed: boolean;
  pro: boolean;
  sessions: { day: string; type: string; icon: typeof BookOpen }[];
}

const modules: Module[] = [
  {
    id: 1, title: "Inmersión Cultural", desc: "Rompe creencias. Adopta la mentalidad soberana.", weeks: 4, locked: false, completed: true, pro: false,
    sessions: [
      { day: "Lunes", type: "Visión: El fin del mito de la conciliación", icon: BookOpen },
      { day: "Miércoles", type: "Setup: Tus primeras herramientas IA", icon: Zap },
      { day: "Viernes", type: "Reto: Automatiza tu primera tarea", icon: Target },
    ],
  },
  {
    id: 2, title: "Bases de Autonomía Digital", desc: "Construye tu ecosistema de herramientas propio.", weeks: 4, locked: false, completed: false, pro: false,
    sessions: [
      { day: "Lunes", type: "Estrategia: Infraestructura propia vs dependencia", icon: BookOpen },
      { day: "Miércoles", type: "Práctico: Workflows de automatización", icon: Zap },
      { day: "Viernes", type: "Reto: Comparte tu workflow", icon: Target },
    ],
  },
  {
    id: 3, title: "IA Aplicada al Negocio", desc: "Genera ingresos con ejecución técnica de alto nivel.", weeks: 4, locked: true, completed: false, pro: true,
    sessions: [
      { day: "Lunes", type: "Visión: Monetización de servicios digitales", icon: BookOpen },
      { day: "Miércoles", type: "Lab: Simulaciones de negocio reales", icon: Zap },
      { day: "Viernes", type: "Reto: Propuesta de servicio real", icon: Target },
    ],
  },
  {
    id: 4, title: "Despliegue y Escala", desc: "Lanza tu servicio digital y genera ingresos online.", weeks: 4, locked: true, completed: false, pro: true,
    sessions: [
      { day: "Lunes", type: "Estrategia: Go-to-market soberano", icon: BookOpen },
      { day: "Miércoles", type: "Práctico: Agentes IA personalizados", icon: Zap },
      { day: "Viernes", type: "Reto: Lanzamiento público", icon: Target },
    ],
  },
];

const dayColors: Record<string, string> = {
  Lunes: "text-primary",
  Miércoles: "text-accent",
  Viernes: "text-secondary",
};

const Ruta = () => (
  <div className="min-h-screen bg-background py-8">
    <div className="container mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Ruta de aprendizaje</p>
        <h1 className="font-display text-3xl font-bold md:text-4xl">
          De empleada a <span className="text-gradient-hero">soberana digital</span>
        </h1>
        <p className="mt-3 text-muted-foreground">Cada módulo sigue la dinámica Lunes-Miércoles-Viernes. Acción, no teoría.</p>
      </motion.div>

      <div className="mx-auto max-w-3xl space-y-6">
        {modules.map((m, i) => (
          <div key={m.id}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl bg-gradient-card border p-6 transition-all ${
                m.locked ? "border-border opacity-60" : m.completed ? "border-primary/30" : "border-border hover:border-primary/20"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-display text-lg font-bold ${
                  m.completed ? "bg-primary text-primary-foreground" : m.locked ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
                }`}>
                  {m.completed ? <CheckCircle2 size={24} /> : m.locked ? <Lock size={20} /> : <Play size={20} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-display text-lg font-bold">{m.title}</h3>
                    {m.pro && (
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent">
                        PRO
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{m.weeks} semanas</p>

                  {!m.locked && (
                    <div className="mt-4 space-y-2">
                      {m.sessions.map((s) => (
                        <div key={s.day} className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2">
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${dayColors[s.day]}`}>
                            {s.day}
                          </span>
                          <s.icon size={14} className="text-muted-foreground" />
                          <span className="text-xs text-foreground/80">{s.type}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* PRO upsell after Module 1 */}
            {m.id === 1 && m.completed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mx-4 mt-4 rounded-xl border border-accent/30 bg-accent/5 p-5"
              >
                <div className="flex items-start gap-3">
                  <Crown size={20} className="mt-0.5 shrink-0 text-accent" />
                  <div className="flex-1">
                    <h4 className="font-display text-sm font-bold text-accent">Desbloquea la Ruta PRO</h4>
                    <p className="mt-1 text-xs text-muted-foreground">
                      +49€/mes (total 88€). Labs IA + feedback personalizado para generar ingresos reales.
                    </p>
                    <div className="mt-3 flex items-center gap-3 flex-wrap">
                      <Link
                        to="/auth"
                        className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-xs font-bold text-accent-foreground transition-all hover:shadow-glow-accent hover:scale-105"
                      >
                        Activar Ruta PRO
                        <ArrowRight size={12} />
                      </Link>
                      <span className="group relative flex items-center gap-1 text-[10px] text-muted-foreground cursor-help">
                        <Info size={12} />
                        Trial 7 días gratis
                        <span className="absolute bottom-full left-0 mb-2 hidden w-48 rounded-lg bg-popover border border-border p-2 text-[10px] text-popover-foreground shadow-lg group-hover:block">
                          Prueba la Ruta PRO 7 días sin compromiso. Labs IA + feedback para ingresos reales.
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Ruta;
