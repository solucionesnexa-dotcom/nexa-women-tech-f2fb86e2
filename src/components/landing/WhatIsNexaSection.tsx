import { motion } from "framer-motion";
import { Sparkles, Brain, Shield, Rocket } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Aprende IA aplicada",
    desc: "Formación práctica en inteligencia artificial para tu carrera profesional. Sin tecnicismos, con resultados.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Shield,
    title: "Comunidad de mujeres",
    desc: "Un espacio seguro para compartir, aprender y crecer junto a mujeres con los mismos objetivos.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Rocket,
    title: "Herramientas y sistemas",
    desc: "Acceso a prompts, plantillas, automatizaciones y recursos para construir tu sistema profesional digital.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
];

const WhatIsNexaSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
          <Sparkles size={14} className="inline mr-1 -mt-0.5" />
          Qué es Nexa
        </p>
        <h2 className="font-display text-3xl font-bold md:text-4xl">
          Una plataforma para mujeres que quieren{" "}
          <span className="text-gradient-hero">dominar la IA</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Nexa Women Tech combina aprendizaje, comunidad y herramientas para que diseñes una carrera profesional flexible y autónoma.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
        {features.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl bg-gradient-card border border-border hover:border-primary/30 p-8 transition-all"
          >
            <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${item.bg} ${item.color}`}>
              <item.icon size={24} />
            </div>
            <h3 className="mb-3 font-display text-xl font-bold">{item.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhatIsNexaSection;
