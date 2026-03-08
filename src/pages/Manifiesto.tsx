import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const principles = [
  {
    title: "El trabajo debe adaptarse a la vida",
    text: "No al revés. Rechazamos un sistema que obliga a las mujeres a elegir entre carrera y vida personal. El trabajo flexible no es un privilegio — es un derecho.",
  },
  {
    title: "La tecnología es una herramienta de soberanía",
    text: "La inteligencia artificial y la automatización permiten a las mujeres construir sistemas profesionales propios, más flexibles y autónomos que cualquier empleo tradicional.",
  },
  {
    title: "El conocimiento se comparte, no se acumula",
    text: "Creemos en una comunidad donde cada mujer que avanza eleva a las demás. Compartir conocimiento es un acto de generosidad y de fuerza.",
  },
  {
    title: "Construir en público es un acto de valentía",
    text: "Mostrar tu proceso, tus errores y tus avances inspira a otras. La transparencia construye confianza y comunidad.",
  },
  {
    title: "Cada mujer diseña su propio camino",
    text: "No existe una única fórmula de éxito. Nexa Women Tech apoya a mujeres que quieren diseñar carreras profesionales únicas, adaptadas a su realidad.",
  },
  {
    title: "La IA no sustituye — amplifica",
    text: "La inteligencia artificial no viene a quitarnos el trabajo. Viene a permitirnos hacer más con menos, a liberar tiempo y a abrir posibilidades que antes no existían.",
  },
];

const Manifiesto = () => (
  <div className="min-h-screen bg-background pt-24 pb-16">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-3xl text-center mb-16"
      >
        <Sparkles className="mx-auto mb-6 text-accent" size={36} />
        <h1 className="font-display text-4xl font-bold md:text-5xl leading-tight">
          Manifiesto <span className="text-gradient-hero">Nexa Women Tech</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          Creemos que la próxima generación de carreras profesionales será diseñada por mujeres que dominan la tecnología y la inteligencia artificial.
        </p>
      </motion.div>

      <div className="mx-auto max-w-3xl space-y-8">
        {principles.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl bg-gradient-card border border-border p-8"
          >
            <h3 className="font-display text-xl font-bold mb-3">{p.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{p.text}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mx-auto max-w-3xl mt-16 text-center"
      >
        <p className="text-lg text-foreground font-display font-medium mb-6">
          "Nexa Women Tech apoya a mujeres que quieren diseñar sus propias carreras."
        </p>
        <Link
          to="/precios"
          className="inline-flex items-center gap-2 rounded-2xl bg-primary px-10 py-4 font-display text-sm font-bold text-primary-foreground transition-all hover:shadow-glow-primary hover:scale-105"
        >
          Únete como Fundadora
        </Link>
      </motion.div>
    </div>
  </div>
);

export default Manifiesto;
