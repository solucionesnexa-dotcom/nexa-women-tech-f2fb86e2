import { motion } from "framer-motion";
import { Check, ArrowRight, Shield, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const incluye = [
  "Acceso a la comunidad de mujeres fundadoras",
  "Cohortes de aprendizaje práctico con IA",
  "Retos semanales con accountability real",
  "Sesiones en directo de IA aplicada",
  "Acceso a Nexa Labs y recursos de IA",
  "Badge de Fundadora permanente",
  "Acceso anticipado a nuevas funcionalidades",
  "Soporte prioritario de la comunidad",
];

const Precios = () => (
  <div className="min-h-screen bg-background pt-24 pb-16">
    <div className="container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Suscripción Fundadora</p>
        <h1 className="font-display text-3xl font-bold md:text-4xl">
          Todo lo que incluye tu <span className="text-gradient-hero">plaza fundadora</span>
        </h1>
        <p className="mt-3 text-muted-foreground">Plazas limitadas · acceso anticipado a todo.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="relative mx-auto max-w-lg rounded-2xl border border-primary/40 shadow-glow-primary bg-gradient-card p-10"
      >
        <div className="mb-6 -mt-2 flex justify-center">
          <span className="rounded-full bg-primary px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
            Cohorte Fundadora
          </span>
        </div>

        <div className="mb-6 flex items-center gap-2">
          <Shield size={20} className="text-primary" />
          <h3 className="font-display text-xl font-bold">Founder Access</h3>
        </div>

        {/* Pricing breakdown */}
        <div className="mb-8 space-y-4 rounded-xl border border-border/50 bg-muted/30 p-5">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Reserva tu plaza</p>
              <p className="text-xs text-muted-foreground">Pago único · se descuenta de tu 1ª cuota</p>
            </div>
            <span className="font-display text-3xl font-bold">19€</span>
          </div>

          <div className="border-t border-border/50" />

          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Suscripción mensual</p>
              <p className="text-xs text-muted-foreground">Compromiso mínimo de 3 meses</p>
            </div>
            <div className="text-right">
              <span className="font-display text-3xl font-bold">29€</span>
              <span className="text-sm text-muted-foreground">/mes</span>
            </div>
          </div>
        </div>

        {/* What's included */}
        <div className="mb-2 flex items-center gap-2">
          <Sparkles size={16} className="text-primary" />
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Qué incluye</p>
        </div>
        <ul className="mb-8 space-y-3">
          {incluye.map((f) => (
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
          Reservar mi plaza — 19€
          <ArrowRight size={14} />
        </Link>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck size={14} className="text-primary" />
          <span>Pago seguro · Los 19€ se descuentan de tu primera cuota de 29€/mes</span>
        </div>
      </motion.div>
    </div>
  </div>
);

export default Precios;
