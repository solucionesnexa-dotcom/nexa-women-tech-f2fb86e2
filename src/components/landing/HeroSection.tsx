import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import nexaHeroLogo from "@/assets/nexa-hero-logo.png";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7 },
};

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
    </div>

    <div className="container relative z-10 mx-auto px-4 pt-24 text-center max-w-4xl">
      <motion.div {...fadeUp}>
        <img src={nexaHeroLogo} alt="Nexa Women Tech" className="mx-auto mb-10 h-40 w-40 animate-float" />
        <h1 className="font-display text-4xl font-bold leading-[1.15] sm:text-5xl md:text-6xl lg:text-7xl">
          Lidera la Revolución de la{" "}
          <span className="text-gradient-hero">Soberanía Digital Femenina</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          No construyas cadenas, diseña sistemas. Deja de elegir entre tu éxito profesional y tu vida personal con el poder de la IA y la automatización.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-10"
      >
        <Link
          to="/precios"
          className="group inline-flex items-center gap-2 rounded-2xl bg-primary px-10 py-5 font-display text-base font-bold text-primary-foreground transition-all hover:shadow-glow-primary hover:scale-105"
        >
          Reservar mi plaza fundadora — 19€
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
        <p className="mt-4 text-sm text-muted-foreground">
          Acceso anticipado · comunidad fundadora · plazas limitadas
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="mt-14 mx-auto max-w-xl space-y-3"
      >
        {[
          "IA como ventaja táctica para tu carrera",
          "Automatiza lo mundano, prioriza lo humano",
          "20 fundadoras construyendo soberanía digital real",
        ].map((text) => (
          <div key={text} className="flex items-center gap-3">
            <CheckCircle2 size={18} className="shrink-0 text-primary" />
            <span className="text-sm text-foreground/80">{text}</span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
