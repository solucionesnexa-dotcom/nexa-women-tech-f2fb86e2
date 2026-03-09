import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const CtaSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mx-auto max-w-2xl"
      >
        <h2 className="font-display text-3xl font-bold md:text-4xl">
          ¿Lista para recuperar tu{" "}
          <span className="text-gradient-hero">autonomía intelectual y vital</span>?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          No dejes que el sistema decida por ti. Únete a las 20 fundadoras y empieza a construir tu libertad real hoy mismo.
        </p>
        <Link
          to="/precios"
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-cyan-500 px-10 py-5 font-display text-base font-bold text-white transition-all hover:shadow-lg hover:scale-105"
        >
          RESERVAR PLAZA FUNDADORA — 19€
          <ArrowRight size={16} />
        </Link>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck size={16} className="text-primary" />
          <span>Pago seguro · Acceso inmediato · Los 19€ se descuentan de tu primera cuota de 29€/mes</span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Compromiso mínimo de 3 meses · Suscripción fundadora: 29€/mes
        </p>
      </motion.div>
    </div>
  </section>
);

export default CtaSection;
