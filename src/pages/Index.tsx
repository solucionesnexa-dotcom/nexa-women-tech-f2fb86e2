import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Cpu, Users, Target, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import nexaLogo from "@/assets/nexa-logo.png";

const pillars = [
  {
    icon: Shield,
    title: "Identidad y Visión",
    desc: "Refuerzo del Manifiesto Nexa. Pertenencia real a un movimiento de insurgencia profesional.",
  },
  {
    icon: Cpu,
    title: "Educación Digital Aplicada",
    desc: "Tutoriales prácticos, automatizaciones y sistemas para recuperar tu tiempo.",
  },
  {
    icon: Users,
    title: "Conversación Real",
    desc: "Espacio para denunciar barreras sistémicas, miedos y lo que realmente agota.",
  },
  {
    icon: Target,
    title: "Construcción Pública",
    desc: "Comparte experimentos, avances y resultados reales. Build in Public.",
  },
];

const stats = [
  { value: "20", label: "Plazas cohorte fundadora" },
  { value: "29€", label: "Nivel 1 / mes" },
  { value: "3", label: "Meses compromiso mínimo" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/5 blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-border/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-border/10" />
        </div>

        <div className="container relative z-10 mx-auto px-4 pt-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img src={nexaLogo} alt="Nexa Women Tech" className="mx-auto mb-8 h-24 w-24 animate-float" />

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              El fin del mito de la conciliación
            </p>

            <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Mujeres digitalmente soberanas que construyen{" "}
              <span className="text-gradient-hero">sistemas</span>, no{" "}
              <span className="text-secondary">cadenas</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              No necesitas elegir entre tu vida y tu carrera. Con tecnología puedes construir un sistema profesional propio. La verdadera conciliación no es una negociación; es un derecho.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/auth"
              className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-display text-sm font-bold text-primary-foreground transition-all hover:shadow-glow-primary hover:scale-105"
            >
              <Zap size={18} />
              Reserva tu plaza — Cohorte Fundadora
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/ruta"
              className="flex items-center gap-2 rounded-xl border border-border px-8 py-4 font-display text-sm font-medium text-muted-foreground transition-all hover:border-primary hover:text-primary"
            >
              Explorar la ruta
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 flex items-center justify-center gap-12 flex-wrap"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl font-bold text-accent">{s.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Manifesto quote */}
      <section className="border-t border-border py-24">
        <div className="container mx-auto px-4">
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <Sparkles className="mx-auto mb-6 text-accent" size={32} />
            <p className="font-display text-2xl font-medium leading-relaxed text-foreground md:text-3xl">
              "La tecnología no es para trabajar más, es para que el sistema{" "}
              <span className="text-gradient-accent">trabaje para ti</span>."
            </p>
            <footer className="mt-6 text-sm text-muted-foreground">
              — Manifiesto Nexa Women Tech, 2026
            </footer>
          </motion.blockquote>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-t border-border py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Pilares de contenido</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Cuatro ejes de <span className="text-gradient-hero">ejecución</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl bg-gradient-card border border-border p-6 transition-all hover:border-primary/30 hover:shadow-glow-primary"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <p.icon size={24} />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly dynamic */}
      <section className="border-t border-border py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Ritmo semanal</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Unidad de ejecución, <span className="text-secondary">no foro</span>
            </h2>
          </motion.div>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            {[
              { day: "Lunes", type: "Estratégico", desc: "Visión y ruptura de creencias. De empleada a soberana.", color: "text-primary", border: "border-primary/30" },
              { day: "Miércoles", type: "Práctico", desc: "Contenido técnico puro. Herramientas y prompts listos para copiar.", color: "text-accent", border: "border-accent/30" },
              { day: "Viernes", type: "Reto", desc: "Debate y obligatoriedad de compartir resultados.", color: "text-secondary", border: "border-secondary/30" },
            ].map((d, i) => (
              <motion.div
                key={d.day}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`rounded-2xl bg-gradient-card border ${d.border} p-6`}
              >
                <div className={`mb-1 text-xs font-bold uppercase tracking-widest ${d.color}`}>{d.day}</div>
                <h3 className="mb-3 font-display text-xl font-bold">{d.type}</h3>
                <p className="text-sm text-muted-foreground">{d.desc}</p>
              </motion.div>
            ))}
          </div>
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
              ¿Lista para dejar de ser <span className="text-secondary">espectadora</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Este movimiento no es para espectadoras. Es para mujeres que están listas para construir su propia libertad.
            </p>
            <Link
              to="/precios"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-10 py-4 font-display text-sm font-bold text-primary-foreground transition-all hover:shadow-glow-primary hover:scale-105"
            >
              Ver planes y precios
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2026 Nexa Women Tech. Todos los derechos reservados.</p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <a href="mailto:info@nexasoluciones.es" className="hover:text-primary transition-colors">info@nexasoluciones.es</a>
            <span>+34 614 41 41 54</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
