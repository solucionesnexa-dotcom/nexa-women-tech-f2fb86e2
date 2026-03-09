import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, Compass, Rocket, ArrowRight, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Step = "home" | "q1" | "q2" | "result";
type Profile = "automatiza" | "claridad" | "pro";

const PROFILES: Record<Profile, { title: string; subtitle: string; description: string; cta: string; link: string; icon: typeof Zap }> = {
  automatiza: {
    title: "Constructora Inicial",
    subtitle: "Tu superpoder: automatizar lo repetitivo",
    description: "Estás lista para dar tu primer paso digital. Vamos a construir tu primera automatización juntas — sin código, sin complicaciones.",
    cta: "Empezar Ruta Automatiza",
    link: "/ruta-automatiza",
    icon: Zap,
  },
  claridad: {
    title: "Arquitecta en Descubrimiento",
    subtitle: "Tu superpoder: encontrar tu dirección",
    description: "Tienes ideas y potencial. Solo necesitas un mapa claro para saber qué camino digital encaja contigo.",
    cta: "Descubrir Ruta Claridad",
    link: "/ruta-claridad",
    icon: Compass,
  },
  pro: {
    title: "Constructora PRO",
    subtitle: "Tu superpoder: ejecutar con visión",
    description: "Ya tienes base. Es hora de convertir tu conocimiento en ingresos reales con IA y estrategia profesional.",
    cta: "Explorar Ruta Profesional IA",
    link: "/ruta-pro",
    icon: Rocket,
  },
};

const Dashboard = () => {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(" ")[0] || "Soberana";
  const [step, setStep] = useState<Step>("home");
  const [q1Answer, setQ1Answer] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const handleQ1 = (answer: string) => {
    setQ1Answer(answer);
    if (answer === "avanzar") {
      setProfile("pro");
      setStep("result");
    } else {
      setStep("q2");
    }
  };

  const handleQ2 = (answer: string) => {
    if (q1Answer === "automatizar") {
      setProfile("automatiza");
    } else if (q1Answer === "camino" || q1Answer === "ideas") {
      setProfile("claridad");
    } else {
      // fallback based on q2
      if (answer === "sistemas" || answer === "tiempo") setProfile("automatiza");
      else if (answer === "libertad") setProfile("claridad");
      else setProfile("pro");
    }
    setStep("result");
  };

  const reset = () => {
    setStep("home");
    setQ1Answer(null);
    setProfile(null);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <AnimatePresence mode="wait">
        {/* HOME */}
        {step === "home" && (
          <motion.div key="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
            <div className="text-center space-y-2">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Nexa Women Tech</p>
              <h1 className="font-display text-3xl md:text-4xl font-bold">
                Tu siguiente paso digital
              </h1>
              <p className="text-muted-foreground">Hola, <span className="text-primary font-medium">{firstName}</span> 👋</p>
            </div>

            <Card className="bg-gradient-card border-border">
              <CardContent className="py-10 text-center space-y-6">
                <Sparkles size={36} className="mx-auto text-primary" />
                <h2 className="font-display text-xl md:text-2xl font-bold">
                  Descubre si necesitas automatizar, claridad o ruta profesional
                </h2>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  En 2 minutos sabrás exactamente cómo empezar a construir tu soberanía digital
                </p>
                <div className="grid gap-4 sm:grid-cols-3 max-w-2xl mx-auto pt-4">
                  <Button variant="outline" size="lg" className="h-auto py-6 flex flex-col gap-2 border-primary/30 hover:border-primary hover:bg-primary/5" asChild>
                    <Link to="/ruta-automatiza">
                      <Zap size={24} className="text-primary" />
                      <span className="font-display font-bold">Quiero automatizar</span>
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="h-auto py-6 flex flex-col gap-2 border-accent/30 hover:border-accent hover:bg-accent/5" asChild>
                    <Link to="/ruta-claridad">
                      <Compass size={24} className="text-accent" />
                      <span className="font-display font-bold">Quiero claridad</span>
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="h-auto py-6 flex flex-col gap-2 border-secondary/30 hover:border-secondary hover:bg-secondary/5" asChild>
                    <Link to="/ruta-pro">
                      <Rocket size={24} className="text-secondary" />
                      <span className="font-display font-bold">Ruta PRO</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button onClick={() => setStep("q1")} size="lg" className="gap-2">
                <Sparkles size={18} />
                No sé cuál elegir — Ayúdame
              </Button>
            </div>
          </motion.div>
        )}

        {/* Q1 */}
        {step === "q1" && (
          <motion.div key="q1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary font-medium">
                <Sparkles size={14} /> Pregunta 1 de 2
              </div>
              <h2 className="font-display text-2xl font-bold">¿Qué necesitas ahora mismo?</h2>
            </div>
            <div className="grid gap-3">
              {[
                { key: "automatizar", label: "Aprender a automatizar", icon: Zap },
                { key: "camino", label: "Encontrar mi camino digital", icon: Compass },
                { key: "ideas", label: "Tengo varias ideas y necesito enfoque", icon: Sparkles },
                { key: "avanzar", label: "Ya sé lo que quiero y quiero avanzar", icon: Rocket },
              ].map((opt) => (
                <Button key={opt.key} variant="outline" size="lg" className="h-auto py-5 justify-start gap-4 text-left" onClick={() => handleQ1(opt.key)}>
                  <opt.icon size={20} className="text-primary shrink-0" />
                  <span className="font-medium">{opt.label}</span>
                </Button>
              ))}
            </div>
            <button onClick={reset} className="text-xs text-muted-foreground hover:text-foreground mx-auto block">← Volver</button>
          </motion.div>
        )}

        {/* Q2 */}
        {step === "q2" && (
          <motion.div key="q2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary font-medium">
                <Sparkles size={14} /> Pregunta 2 de 2
              </div>
              <h2 className="font-display text-2xl font-bold">¿Qué te atrae más de la tecnología?</h2>
            </div>
            <div className="grid gap-3">
              {[
                { key: "sistemas", label: "Crear sistemas" },
                { key: "tiempo", label: "Ahorrar tiempo" },
                { key: "libertad", label: "Tener más libertad profesional" },
                { key: "profesion", label: "Crear una profesión o servicio digital" },
              ].map((opt) => (
                <Button key={opt.key} variant="outline" size="lg" className="h-auto py-5 justify-start gap-4 text-left" onClick={() => handleQ2(opt.key)}>
                  <span className="font-medium">{opt.label}</span>
                </Button>
              ))}
            </div>
            <button onClick={() => setStep("q1")} className="text-xs text-muted-foreground hover:text-foreground mx-auto block">← Volver</button>
          </motion.div>
        )}

        {/* RESULT */}
        {step === "result" && profile && (
          <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Tu perfil en Nexa</p>
              <h2 className="font-display text-3xl font-bold">{PROFILES[profile].title}</h2>
              <p className="text-accent font-medium">{PROFILES[profile].subtitle}</p>
            </div>
            <Card className="bg-gradient-card border-border">
              <CardContent className="py-8 text-center space-y-6">
                {(() => { const Icon = PROFILES[profile].icon; return <Icon size={40} className="mx-auto text-primary" />; })()}
                <p className="text-muted-foreground max-w-md mx-auto">{PROFILES[profile].description}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button size="lg" className="gap-2" asChild>
                    <Link to={PROFILES[profile].link}>
                      {PROFILES[profile].cta}
                      <ArrowRight size={16} />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="gap-2" onClick={reset}>
                    <RotateCcw size={16} />
                    Probar otra ruta
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
