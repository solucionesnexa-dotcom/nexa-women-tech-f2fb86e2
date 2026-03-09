import { motion } from "framer-motion";
import { Sparkles, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const pillars = [
  {
    text: "La tecnología es el arma",
    desc: "Usamos la IA como ventaja táctica disruptiva.",
  },
  {
    text: "Sistemas sobre Esfuerzo",
    desc: "Si puede ser automatizado, DEBE ser automatizado.",
  },
  {
    text: "Automatiza lo mundano, prioriza lo humano",
    desc: "Delegamos tareas que agotan para dedicar el talento a la estrategia y la vida.",
  },
];

const ManifestoSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mx-auto max-w-3xl text-center"
      >
        <Sparkles className="mx-auto mb-6 text-accent" size={32} />
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Nuestra Declaración de Insurgencia</p>
        <blockquote className="font-display text-2xl font-medium leading-relaxed md:text-3xl">
          "La Soberanía Digital Femenina no es una formación técnica; es un{" "}
          <span className="text-gradient-accent">acto de insurgencia profesional</span>."
        </blockquote>

        <div className="mt-10 space-y-4 text-left max-w-2xl mx-auto">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-accent/10 bg-accent/5 px-5 py-4"
            >
              <p className="font-display font-bold text-foreground">{p.text}</p>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <Link
          to="/manifiesto"
          className="mt-8 inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          Leer manifiesto completo <ChevronRight size={14} />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default ManifestoSection;
