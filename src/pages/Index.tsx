import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Users, BookOpen, FlaskConical, CheckCircle2, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import nexaLogo from "@/assets/nexa-logo.png";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7 },
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
        </div>

        <div className="container relative z-10 mx-auto px-4 pt-24 text-center max-w-4xl">
          <motion.div {...fadeUp}>
            <img src={nexaLogo} alt="Nexa Women Tech" className="mx-auto mb-10 h-20 w-20 animate-float" />
            <h1 className="font-display text-4xl font-bold leading-[1.15] sm:text-5xl md:text-6xl lg:text-7xl">
              La próxima generación de carreras será diseñada por mujeres que dominan{" "}
              <span className="text-gradient-hero">la IA</span>.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Únete como Fundadora de Nexa Women Tech y aprende a usar inteligencia artificial y tecnología para construir una carrera flexible, autónoma y diseñada por ti.
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
              Reservar mi plaza como Fundadora — 19€
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Plazas limitadas · acceso anticipado a la comunidad fundadora.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-14 mx-auto max-w-xl space-y-3"
          >
            {[
              "Aprende IA aplicada al trabajo real",
              "Diseña tu propio sistema profesional flexible",
              "Conecta con mujeres construyendo nuevas carreras digitales",
            ].map((text) => (
              <div key={text} className="flex items-center gap-3">
                <CheckCircle2 size={18} className="shrink-0 text-primary" />
                <span className="text-sm text-foreground/80">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      <section className="border-t border-border py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
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

      {/* How the community works */}
      <section className="border-t border-border py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Cómo funciona</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Tres pilares de <span className="text-gradient-hero">transformación</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {[
              {
                icon: Users,
                title: "Comunidad",
                desc: "Conecta con mujeres que están rediseñando su carrera profesional.",
                color: "text-primary",
                border: "border-primary/20 hover:border-primary/40",
                bg: "bg-primary/10",
              },
              {
                icon: BookOpen,
                title: "Cohortes",
                desc: "Programas de aprendizaje práctico para construir tu sistema profesional digital.",
                color: "text-accent",
                border: "border-accent/20 hover:border-accent/40",
                bg: "bg-accent/10",
              },
              {
                icon: FlaskConical,
                title: "Nexa Labs",
                desc: "Sesiones prácticas para experimentar con herramientas de IA y automatización.",
                color: "text-secondary",
                border: "border-secondary/20 hover:border-secondary/40",
                bg: "bg-secondary/10",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl bg-gradient-card border ${item.border} p-8 transition-all`}
              >
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${item.bg} ${item.color}`}>
                  <item.icon size={24} />
                </div>
                <h3 className="mb-3 font-display text-xl font-bold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Member Journey */}
      <section className="border-t border-border py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Tu recorrido</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              De Exploradora a <span className="text-gradient-accent">Independiente</span>
            </h2>
          </motion.div>

          <div className="mx-auto max-w-4xl">
            <div className="grid gap-0 md:grid-cols-3 relative">
              {/* Connection line */}
              <div className="hidden md:block absolute top-16 left-[16.6%] right-[16.6%] h-0.5 bg-border" />

              {[
                {
                  stage: "01",
                  title: "Exploradora",
                  desc: "Aprende herramientas de IA y sistemas digitales. Descubre nuevas posibilidades profesionales.",
                  color: "text-primary",
                  bgColor: "bg-primary",
                },
                {
                  stage: "02",
                  title: "Constructora",
                  desc: "Diseña tu propio sistema profesional digital. Construye workflows y automatizaciones.",
                  color: "text-accent",
                  bgColor: "bg-accent",
                },
                {
                  stage: "03",
                  title: "Independiente",
                  desc: "Construye una carrera flexible y autónoma. Genera ingresos con tus propios sistemas.",
                  color: "text-secondary",
                  bgColor: "bg-secondary",
                },
              ].map((stage, i) => (
                <motion.div
                  key={stage.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative flex flex-col items-center text-center px-6 py-8"
                >
                  <div className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-full ${stage.bgColor} font-display text-lg font-bold text-primary-foreground mb-6`}>
                    {stage.stage}
                  </div>
                  <h3 className={`font-display text-xl font-bold mb-3 ${stage.color}`}>{stage.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{stage.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto Quote */}
      <section className="border-t border-border py-24">
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

      {/* CTA */}
      <section className="border-t border-border py-24">
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

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={nexaLogo} alt="Nexa" className="h-6 w-6 rounded" />
            <p className="text-xs text-muted-foreground">© 2026 Nexa Women Tech · Una iniciativa de Nexa Soluciones.</p>
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link to="/manifiesto" className="hover:text-primary transition-colors">Manifiesto</Link>
            <a href="mailto:info@nexasoluciones.es" className="hover:text-primary transition-colors">info@nexasoluciones.es</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
