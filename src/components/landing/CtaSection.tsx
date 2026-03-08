import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CtaSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-3xl font-bold md:text-4xl">
          ¿Lista para diseñar tu <span className="text-gradient-hero">propia carrera</span>?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          Únete a la comunidad fundadora y empieza a construir un sistema profesional flexible con IA y tecnología.
        </p>
        <Link
          to="/precios"
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-primary px-10 py-5 font-display text-base font-bold text-primary-foreground transition-all hover:shadow-glow-primary hover:scale-105"
        >
          Reservar mi plaza como Fundadora — 19€
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default CtaSection;
