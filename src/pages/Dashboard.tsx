import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, Compass, Rocket, ArrowRight, RotateCcw, Bot, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Profile = "automatiza" | "claridad" | "pro";

const PROFILES: Record<Profile, { title: string; subtitle: string; description: string; cta: string; link: string; icon: typeof Zap; color: string }> = {
  automatiza: {
    title: "Constructora Inicial",
    subtitle: "Tu superpoder: automatizar lo repetitivo",
    description: "Estás lista para dar tu primer paso digital. Vamos a construir tu primera automatización juntas — sin código, sin complicaciones.",
    cta: "Empezar Ruta Automatiza",
    link: "/ruta-automatiza",
    icon: Zap,
    color: "text-primary",
  },
  claridad: {
    title: "Arquitecta en Descubrimiento",
    subtitle: "Tu superpoder: encontrar tu dirección",
    description: "Tienes ideas y potencial. Solo necesitas un mapa claro para saber qué camino digital encaja contigo.",
    cta: "Descubrir Ruta Claridad",
    link: "/ruta-claridad",
    icon: Compass,
    color: "text-accent",
  },
  pro: {
    title: "Constructora PRO",
    subtitle: "Tu superpoder: ejecutar con visión",
    description: "Ya tienes base. Es hora de convertir tu conocimiento en ingresos reales con IA y estrategia profesional.",
    cta: "Explorar Ruta Profesional IA",
    link: "/ruta-pro",
    icon: Rocket,
    color: "text-secondary",
  },
};

const STEPS = [
  {
    question: "¿Qué necesitas ahora mismo?",
    options: [
      { label: "Aprender a automatizar", scores: { automatiza: 2, claridad: 0, pro: 0 } },
      { label: "Encontrar mi camino digital", scores: { automatiza: 0, claridad: 2, pro: 0 } },
      { label: "Tengo varias ideas y necesito enfoque", scores: { automatiza: 0, claridad: 2, pro: 1 } },
      { label: "Ya sé lo que quiero y quiero avanzar", scores: { automatiza: 0, claridad: 0, pro: 3 } },
    ],
  },
  {
    question: "¿Qué te atrae más de la tecnología?",
    options: [
      { label: "Crear sistemas", scores: { automatiza: 2, claridad: 0, pro: 1 } },
      { label: "Ahorrar tiempo", scores: { automatiza: 2, claridad: 1, pro: 0 } },
      { label: "Tener más libertad profesional", scores: { automatiza: 0, claridad: 2, pro: 1 } },
      { label: "Crear una profesión o servicio digital", scores: { automatiza: 0, claridad: 0, pro: 2 } },
      { label: "Entender qué encaja conmigo", scores: { automatiza: 0, claridad: 2, pro: 0 } },
    ],
  },
  {
    question: "¿En qué punto estás hoy?",
    options: [
      { label: "No he empezado aún", scores: { automatiza: 2, claridad: 1, pro: 0 } },
      { label: "He probado cosas sueltas", scores: { automatiza: 1, claridad: 2, pro: 0 } },
      { label: "Ya uso algunas herramientas", scores: { automatiza: 0, claridad: 1, pro: 2 } },
      { label: "Quiero profesionalizarme", scores: { automatiza: 0, claridad: 0, pro: 3 } },
    ],
  },
];

type SavedResult = { profile: Profile; date: string };

function getStoredResult(): SavedResult | null {
  try {
    const raw = localStorage.getItem("nexa-bot-result");
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function storeResult(profile: Profile) {
  localStorage.setItem("nexa-bot-result", JSON.stringify({ profile, date: new Date().toISOString() }));
}

function clearResult() {
  localStorage.removeItem("nexa-bot-result");
}

const Dashboard = () => {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(" ")[0] || "Soberana";

  const [botActive, setBotActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [scores, setScores] = useState({ automatiza: 0, claridad: 0, pro: 0 });
  const [result, setResult] = useState<Profile | null>(null);
  const [savedResult, setSavedResult] = useState<SavedResult | null>(getStoredResult());
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const startBot = () => {
    setBotActive(true);
    setCurrentStep(0);
    setAnswers([]);
    setScores({ automatiza: 0, claridad: 0, pro: 0 });
    setResult(null);
    setSelectedOption(null);
  };

  const selectOption = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    const option = STEPS[currentStep].options[optionIndex];
    const newScores = {
      automatiza: scores.automatiza + option.scores.automatiza,
      claridad: scores.claridad + option.scores.claridad,
      pro: scores.pro + option.scores.pro,
    };
    setScores(newScores);
    setAnswers([...answers, optionIndex]);

    setTimeout(() => {
      setSelectedOption(null);
      if (currentStep < STEPS.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Calculate result
        const max = Math.max(newScores.automatiza, newScores.claridad, newScores.pro);
        let profile: Profile = "claridad";
        if (newScores.pro === max) profile = "pro";
        else if (newScores.automatiza === max) profile = "automatiza";
        setResult(profile);
        storeResult(profile);
        setSavedResult({ profile, date: new Date().toISOString() });
      }
    }, 400);
  };

  const resetBot = () => {
    clearResult();
    setSavedResult(null);
    startBot();
  };

  const closeBotWithResult = () => {
    setBotActive(false);
    setResult(null);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Nexa Women Tech</p>
        <h1 className="font-display text-3xl md:text-4xl font-bold">Tu siguiente paso digital</h1>
        <p className="text-muted-foreground mt-1">Hola, <span className="text-primary font-medium">{firstName}</span> 👋</p>
      </motion.div>

      {/* Saved result banner */}
      {savedResult && !botActive && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="py-4 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                {(() => { const P = PROFILES[savedResult.profile]; const Icon = P.icon; return <Icon size={20} className={P.color} />; })()}
                <div>
                  <p className="text-sm font-medium">Tu ruta actual: <span className="text-primary font-bold">{PROFILES[savedResult.profile].title}</span></p>
                  <p className="text-xs text-muted-foreground">{PROFILES[savedResult.profile].subtitle}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-1 text-xs" onClick={resetBot}>
                  <RotateCcw size={12} /> Rehacer test
                </Button>
                <Button size="sm" className="gap-1 text-xs" asChild>
                  <Link to={PROFILES[savedResult.profile].link}>
                    Ir a mi ruta <ArrowRight size={12} />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Bot block */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="bg-gradient-card border-border overflow-hidden">
          <CardContent className="p-0">
            {/* Bot header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-card/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                <Bot size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg">Descubre tu siguiente paso digital</h2>
                <p className="text-xs text-muted-foreground">Bot de orientación • 3 preguntas • 1 minuto</p>
              </div>
            </div>

            {/* Bot content */}
            <div className="px-6 py-8 min-h-[340px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {/* Idle state */}
                {!botActive && !result && (
                  <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-6">
                    <div className="space-y-2">
                      <Sparkles size={36} className="mx-auto text-primary/60" />
                      <p className="text-muted-foreground max-w-md mx-auto">
                        En 3 preguntas rápidas sabrás exactamente qué ruta de Nexa encaja con tu momento actual.
                      </p>
                    </div>
                    <Button size="lg" className="gap-2" onClick={startBot}>
                      <Bot size={18} />
                      Empezar diagnóstico
                    </Button>
                  </motion.div>
                )}

                {/* Questions */}
                {botActive && result === null && currentStep < STEPS.length && (
                  <motion.div key={`step-${currentStep}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="space-y-6">
                    {/* Progress */}
                    <div className="flex items-center gap-2 justify-center">
                      {STEPS.map((_, i) => (
                        <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i <= currentStep ? "bg-primary w-10" : "bg-muted w-6"}`} />
                      ))}
                    </div>

                    {/* Bot message bubble */}
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 mt-1">
                        <Bot size={16} className="text-primary" />
                      </div>
                      <div className="rounded-2xl rounded-tl-md bg-muted px-5 py-3">
                        <p className="font-medium">{STEPS[currentStep].question}</p>
                        <p className="text-[11px] text-muted-foreground mt-1">Paso {currentStep + 1} de {STEPS.length}</p>
                      </div>
                    </div>

                    {/* Options as clickable buttons */}
                    <div className="space-y-2 pl-11">
                      {STEPS[currentStep].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + i * 0.06 }}
                          onClick={() => selectOption(i)}
                          disabled={selectedOption !== null}
                          className={`w-full text-left rounded-xl border px-4 py-3 text-sm font-medium transition-all flex items-center justify-between gap-2 ${
                            selectedOption === i
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-card hover:border-primary/40 hover:bg-primary/5"
                          } disabled:cursor-default`}
                        >
                          <span>{opt.label}</span>
                          <ChevronRight size={14} className={`shrink-0 transition-colors ${selectedOption === i ? "text-primary" : "text-muted-foreground"}`} />
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Result */}
                {result && (
                  <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center space-y-6">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Tu perfil en Nexa</p>
                      <h3 className="font-display text-2xl font-bold">{PROFILES[result].title}</h3>
                      <p className={`font-medium text-sm ${PROFILES[result].color}`}>{PROFILES[result].subtitle}</p>
                    </div>

                    {(() => { const Icon = PROFILES[result].icon; return <Icon size={44} className={`mx-auto ${PROFILES[result].color}`} />; })()}

                    <p className="text-muted-foreground text-sm max-w-md mx-auto">{PROFILES[result].description}</p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                      <Button size="lg" className="gap-2" asChild onClick={closeBotWithResult}>
                        <Link to={PROFILES[result].link}>
                          {PROFILES[result].cta}
                          <ArrowRight size={16} />
                        </Link>
                      </Button>
                      <Button variant="outline" size="lg" className="gap-2" onClick={resetBot}>
                        <RotateCcw size={16} />
                        Rehacer test
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick access */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-3">
        {(["automatiza", "claridad", "pro"] as Profile[]).map((key) => {
          const p = PROFILES[key];
          const Icon = p.icon;
          return (
            <Link key={key} to={p.link} className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:bg-muted transition-colors">
              <Icon size={20} className={p.color} />
              <span className="font-medium text-sm">{p.cta.replace("Empezar ", "").replace("Descubrir ", "").replace("Explorar ", "")}</span>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Dashboard;
