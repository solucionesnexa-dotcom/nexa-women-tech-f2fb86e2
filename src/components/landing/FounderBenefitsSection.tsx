import { motion } from "framer-motion";
import { Crown, Zap, Star, Gift } from "lucide-react";

const benefits = [
  { icon: Crown, text: "Badge exclusivo de Fundadora" },
  { icon: Zap, text: "Acceso anticipado a nuevas funciones" },
  { icon: Star, text: "Precio fundador para siempre (19€)" },
  { icon: Gift, text: "Acceso a la primera cohorte y labs" },
];

const FounderBenefitsSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-3xl"
      >
        <div className="rounded-3xl border border-accent/20 bg-gradient-card p-10 md:p-14 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Edición limitada</p>
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Beneficios de ser <span className="text-gradient-accent">Fundadora</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Las primeras miembros que se unan recibirán beneficios exclusivos que no estarán disponibles después.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 text-left">
            {benefits.map((b, i) => (
              <motion.div
                key={b.text}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 rounded-xl bg-accent/5 border border-accent/10 px-5 py-4"
              >
                <b.icon size={20} className="shrink-0 text-accent" />
                <span className="text-sm font-medium">{b.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default FounderBenefitsSection;
