import { motion } from "framer-motion";
import { Sparkles, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const ManifestoSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <motion.blockquote
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mx-auto max-w-3xl text-center"
      >
        <Sparkles className="mx-auto mb-6 text-accent" size={32} />
        <p className="font-display text-2xl font-medium leading-relaxed md:text-3xl">
          "El trabajo debe adaptarse a la vida. La tecnología y la IA permiten a las mujeres construir{" "}
          <span className="text-gradient-accent">sistemas profesionales propios</span>."
        </p>
        <footer className="mt-6 text-sm text-muted-foreground">— Manifiesto Nexa Women Tech</footer>
        <Link
          to="/manifiesto"
          className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          Leer manifiesto completo <ChevronRight size={14} />
        </Link>
      </motion.blockquote>
    </div>
  </section>
);

export default ManifestoSection;
