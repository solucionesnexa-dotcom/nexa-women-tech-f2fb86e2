import { motion } from "framer-motion";
import { Check, Zap, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  "Ruta estructurada de aprendizaje (Módulo 1)",
  "Retos semanales con accountability real",
  "Sesiones en directo de IA aplicada",
  "Comunidad de constructoras",
  "Dinámica semanal Lun-Mié-Vie",
  "Acceso al feed por pilares",
  "Inmersión cultural + mentalidad soberana",
];

const Precios = () => (
  <div className="min-h-screen bg-background pt-24 pb-16">
    <div className="container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Comunidad Autónoma Digital</p>
        <h1 className="font-display text-3xl font-bold md:text-4xl">
          Tu entrada a la <span className="text-gradient-hero">soberanía digital</span>
        </h1>
        <p className="mt-3 text-muted-foreground">Cohorte fundadora: 20 plazas. Compromiso mínimo 3 meses.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="relative mx-auto max-w-lg rounded-2xl border border-primary/40 shadow-glow-primary bg-gradient-card p-10"
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
          Cohorte Fundadora
        </div>

        <div className="mb-2 flex items-center gap-2">
          <Zap size={20} className="text-primary" />
          <h3 className="font-display text-xl font-bold">Comunidad Autónoma Digital</h3>
        </div>
        <p className="mb-6 text-xs text-muted-foreground">Inmersión + retos semanales + comunidad</p>

        <div className="mb-8">
          <span className="font-display text-5xl font-bold">29€</span>
          <span className="text-sm text-muted-foreground">/mes</span>
        </div>

        <ul className="mb-8 space-y-3">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm">
              <Check size={16} className="mt-0.5 shrink-0 text-primary" />
              <span className="text-foreground/80">{f}</span>
            </li>
          ))}
        </ul>

        <Link
          to="/auth"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-display text-sm font-bold text-primary-foreground transition-all hover:shadow-glow-primary hover:scale-105"
        >
          Reservar plaza — Cohorte Fundadora
          <ArrowRight size={14} />
        </Link>

        <div className="mt-6 flex items-start gap-2 rounded-lg bg-muted/50 p-3">
          <Sparkles size={14} className="mt-0.5 shrink-0 text-accent" />
          <p className="text-xs text-muted-foreground">
            Después del Módulo 1 podrás desbloquear la <strong className="text-accent">Ruta PRO</strong> (+49€/mes) con Labs IA, feedback personalizado y módulos avanzados para generar ingresos reales.
          </p>
        </div>
      </motion.div>
    </div>
  </div>
);

export default Precios;
