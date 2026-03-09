import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const stages = [
  {
    stage: "01",
    title: "Autonomía Digital",
    subtitle: "Inmersión cultural y bases",
    items: [
      "Rutas estructuradas",
      "Retos mensuales",
      "Sesiones de IA aplicada",
    ],
    color: "text-primary",
    bgColor: "bg-primary",
    borderColor: "border-primary/20",
  },
  {
    stage: "02",
    title: "Ruta Profesional IA",
    subtitle: "Generar ingresos con alta técnica",
    items: [
      "Laboratorios prácticos",
      "Simulaciones de negocio",
      "Sistema de accountability",
    ],
    color: "text-accent",
    bgColor: "bg-accent",
    borderColor: "border-accent/20",
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
          De Empleada a{" "}
          <span className="text-gradient-accent">Soberana</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Nuestra metodología de aprendizaje se divide en niveles de escalada técnica con entregables tácticos reales.
        </p>
      </motion.div>

      <div className="mx-auto max-w-4xl">
        <div className="grid gap-8 md:grid-cols-2 relative">
          <div className="hidden md:block absolute top-20 left-[25%] right-[25%] h-0.5 bg-border" />

          {stages.map((stage, i) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-2xl bg-gradient-card border ${stage.borderColor} p-8 text-center`}
            >
              <div className={`relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full ${stage.bgColor} font-display text-lg font-bold text-accent-foreground mb-4`}>
                {stage.stage}
              </div>
              <h3 className={`font-display text-xl font-bold mb-1 ${stage.color}`}>{stage.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{stage.subtitle}</p>
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
