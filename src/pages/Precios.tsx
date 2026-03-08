import { motion } from "framer-motion";
import { Check, Zap, Crown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Nivel 1",
    subtitle: "Comunidad Autonomía Digital",
    price: "29",
    period: "/mes",
    highlight: false,
    features: [
      "Ruta estructurada de aprendizaje",
      "Retos mensuales con accountability",
      "Sesión en directo de IA aplicada",
      "Comunidad de constructoras",
      "Dinámica semanal Lun-Mie-Vie",
      "Acceso al feed por pilares",
    ],
    cta: "Reservar plaza — Cohorte Fundadora",
    icon: Zap,
  },
  {
    name: "Nivel 2 PRO",
    subtitle: "Ruta Profesional IA",
    price: "88",
    period: "/mes (29€ + 59€)",
    highlight: true,
    features: [
      "Todo del Nivel 1",
      "Laboratorio práctico avanzado",
      "Simulaciones de negocio reales",
      "Feedback personalizado",
      "Sistema de accountability PRO",
      "Acceso a módulos avanzados",
      "Agentes IA personalizados",
    ],
    cta: "Unirse al Nivel PRO",
    icon: Crown,
  },
];

const Precios = () => (
  <div className="min-h-screen bg-background pt-24 pb-16">
    <div className="container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Precios</p>
        <h1 className="font-display text-3xl font-bold md:text-4xl">
          Invierte en tu <span className="text-gradient-hero">soberanía digital</span>
        </h1>
        <p className="mt-3 text-muted-foreground">Cohorte fundadora: 20 plazas. Compromiso mínimo 3 meses.</p>
      </motion.div>

      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`relative rounded-2xl border p-8 ${
              plan.highlight
                ? "border-primary/40 shadow-glow-primary bg-gradient-card"
                : "border-border bg-gradient-card"
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                Recomendado
              </div>
            )}
            <div className="mb-1 flex items-center gap-2">
              <plan.icon size={20} className={plan.highlight ? "text-primary" : "text-accent"} />
              <h3 className="font-display text-xl font-bold">{plan.name}</h3>
            </div>
            <p className="mb-6 text-xs text-muted-foreground">{plan.subtitle}</p>

            <div className="mb-8">
              <span className="font-display text-5xl font-bold">{plan.price}€</span>
              <span className="text-sm text-muted-foreground">{plan.period}</span>
            </div>

            <ul className="mb-8 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                  <span className="text-foreground/80">{f}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/auth"
              className={`flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 font-display text-sm font-bold transition-all hover:scale-105 ${
                plan.highlight
                  ? "bg-primary text-primary-foreground hover:shadow-glow-primary"
                  : "border border-border text-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {plan.cta}
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default Precios;
