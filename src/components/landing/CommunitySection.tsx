import { motion } from "framer-motion";
import { MessageSquare, Code2, ShieldAlert } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Conversación Real",
    desc: "Espacios para denunciar barreras sistémicas y miedos reales. Sin tabúes.",
  },
  {
    icon: Code2,
    title: "Build in Public",
    desc: "Compartimos experimentos, errores y avances técnicos en abierto.",
  },
  {
    icon: ShieldAlert,
    title: "Estrategia Anti-pasividad",
    desc: "Aquí se penaliza el consumo pasivo; la evolución requiere entregas tangibles.",
  },
];

const CommunitySection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Comunidad</p>
        <h2 className="font-display text-3xl font-bold md:text-4xl">
          El Hub de las{" "}
          <span className="text-gradient-hero">Constructoras</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          No buscamos espectadoras, buscamos arquitectas de flujos de trabajo.
        </p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-3 max-w-4xl mx-auto">
        {features.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex flex-col items-start gap-4 rounded-2xl bg-gradient-card border border-border p-6 hover:border-primary/30 transition-all"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <item.icon size={20} />
            </div>
            <div>
              <h3 className="font-display font-bold">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CommunitySection;
