import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const ProblemSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-secondary">
          <AlertTriangle size={14} className="inline mr-1 -mt-0.5" />
          El fin del engaño
        </p>
        <h2 className="font-display text-3xl font-bold md:text-4xl leading-tight">
          Vivimos en un ecosistema laboral que practica el{" "}
          <span className="text-secondary">gaslighting tecnológico</span>.
        </h2>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          Nos han vendido el "cuento" de la conciliación mientras usan lo digital como una correa para encadenarnos 24/7.
        </p>

        <div className="mt-10 space-y-4 text-left max-w-2xl mx-auto">
          {[
            "Basta de explotación analógica disfrazada de «cultura de empresa».",
            "Basta de burocracia manual que drena el talento femenino.",
          ].map((text) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-start gap-3 rounded-xl border border-secondary/20 bg-secondary/5 px-5 py-4"
            >
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-secondary" />
              <span className="text-foreground font-medium">{text}</span>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-lg text-foreground font-semibold leading-relaxed">
          La verdadera conciliación no se negocia; es un derecho que la tecnología hace posible cuando tomamos el mando.
        </p>
      </motion.div>
    </div>
  </section>
);

export default ProblemSection;
