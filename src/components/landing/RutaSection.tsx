import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const stages = [
  {
    stage: "01",
    title: "Exploradora",
    items: ["Introducción a IA", "Prompts básicos", "Herramientas clave"],
    color: "text-primary",
    bgColor: "bg-primary",
    borderColor: "border-primary/20",
  },
  {
    stage: "02",
    title: "Constructora",
    items: ["Automatización de tareas", "IA aplicada al trabajo", "Sistemas de productividad"],
    color: "text-accent",
    bgColor: "bg-accent",
    borderColor: "border-accent/20",
  },
  {
    stage: "03",
    title: "Arquitecta",
    items: ["Diseñar sistemas profesionales", "Crear proyectos digitales", "Nuevas carreras con IA"],
    color: "text-secondary",
    bgColor: "bg-secondary",
    borderColor: "border-secondary/20",
  },
];

const RutaSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">La Ruta Nexa</p>
        <h2 className="font-display text-3xl font-bold md:text-4xl">
          Tu camino de <span className="text-gradient-accent">Exploradora a Arquitecta</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Un sistema de aprendizaje progresivo con vídeos, recursos, ejercicios y comunidad.
        </p>
      </motion.div>

      <div className="mx-auto max-w-5xl">
        <div className="grid gap-6 md:grid-cols-3 relative">
          <div className="hidden md:block absolute top-20 left-[16.6%] right-[16.6%] h-0.5 bg-border" />

          {stages.map((stage, i) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-2xl bg-gradient-card border ${stage.borderColor} p-8 text-center`}
            >
              <div className={`relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full ${stage.bgColor} font-display text-lg font-bold text-accent-foreground mb-5`}>
                {stage.stage}
              </div>
              <h3 className={`font-display text-xl font-bold mb-4 ${stage.color}`}>{stage.title}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {stage.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 justify-center">
                    <span className={`h-1.5 w-1.5 rounded-full ${stage.bgColor}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <Link to="/ruta" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
            Ver la ruta completa <ChevronRight size={14} />
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
);

export default RutaSection;
