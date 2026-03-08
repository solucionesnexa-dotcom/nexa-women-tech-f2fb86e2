import { motion } from "framer-motion";

const ProblemSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-secondary">El problema</p>
        <h2 className="font-display text-3xl font-bold md:text-4xl leading-tight">
          El sistema profesional actual no está diseñado para{" "}
          <span className="text-secondary">muchas mujeres</span>.
        </h2>
        <div className="mt-8 space-y-4 text-muted-foreground text-lg leading-relaxed">
          <p>
            Muchas mujeres profesionales sienten que deben elegir entre carrera, conciliación y estabilidad.
          </p>
          <p>
            La inteligencia artificial y la tecnología están abriendo nuevas posibilidades para diseñar sistemas profesionales propios.
          </p>
          <p className="text-foreground font-medium">
            Nexa Women Tech existe para apoyar esa transición.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ProblemSection;
