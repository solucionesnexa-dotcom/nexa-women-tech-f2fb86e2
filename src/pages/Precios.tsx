import { motion } from "framer-motion";
import { Check, ArrowRight, Shield, ShieldCheck, Sparkles, Crown, Zap, Compass, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PLANS = [
  {
    id: "free",
    name: "Acceso Gratuito",
    subtitle: "Comienza tu viaje",
    price: "0€",
    period: "",
    description: "Acceso básico a la comunidad y recursos fundamentales",
    icon: Shield,
    color: "text-muted-foreground",
    bgColor: "bg-muted/30",
    features: [
      "Acceso a la comunidad básica",
      "Recursos gratuitos de automatización",
      "Sesiones grabadas públicas",
      "Acceso limitado a biblioteca",
    ],
    cta: "Comenzar Gratis",
    ctaLink: "/auth?mode=register",
    popular: false,
  },
  {
    id: "premium",
    name: "Nivel 1 - Premium",
    subtitle: "Acelera tu crecimiento",
    price: "29€",
    period: "/mes",
    description: "Acceso completo a contenido premium y retos avanzados",
    icon: Crown,
    color: "text-primary",
    bgColor: "bg-primary/5 border-primary/40",
    features: [
      "Todo lo del plan gratuito",
      "Acceso completo a biblioteca premium",
      "Retos semanales avanzados",
      "Sesiones en vivo exclusivas",
      "Soporte prioritario",
      "Recursos descargables premium",
      "Badge de miembro premium",
    ],
    cta: "Upgrade a Premium",
    ctaLink: "/auth?mode=register",
    popular: true,
  },
  {
    id: "pro",
    name: "Ruta PRO",
    subtitle: "Construye tu negocio",
    price: "49€",
    period: "/mes",
    description: "Para quienes quieren monetizar su conocimiento con IA",
    icon: Rocket,
    color: "text-secondary",
    bgColor: "bg-secondary/5 border-secondary/40",
    features: [
      "Todo lo del plan Premium",
      "Estrategias de monetización con IA",
      "Consultoría grupal mensual",
      "Acceso a cohortes PRO exclusivas",
      "Plantillas de negocio avanzadas",
      "Networking con empresarias tech",
      "Badge de Ruta PRO",
      "Acceso anticipado a nuevas features",
    ],
    cta: "Comenzar Ruta PRO",
    ctaLink: "/auth",
    popular: false,
  },
];

const ROUTES = [
  {
    name: "Ruta Automatiza",
    icon: Zap,
    description: "Domina la automatización con IA",
    included: true,
  },
  {
    name: "Ruta Claridad",
    icon: Compass,
    description: "Encuentra tu camino digital",
    included: true,
  },
  {
    name: "Ruta Profesional",
    icon: Rocket,
    description: "Convierte conocimiento en ingresos",
    included: "pro",
  },
];

const Precios = () => (
  <div className="min-h-screen bg-background pt-24 pb-16">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
          Planes de Membresía
        </p>
        <h1 className="font-display text-3xl font-bold md:text-4xl">
          Elige tu <span className="text-gradient-hero">camino digital</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Desde principiante hasta empresaria tech. Todos los niveles incluyen acceso a nuestra comunidad.
        </p>
      </motion.div>

      {/* Routes Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <h2 className="text-center text-xl font-semibold mb-8">Rutas Disponibles</h2>
        <div className="grid gap-4 md:grid-cols-3 max-w-4xl mx-auto">
          {ROUTES.map((route, index) => (
            <motion.div
              key={route.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <Card className={`text-center ${route.included === "pro" ? "border-secondary/40" : ""}`}>
                <CardContent className="pt-6">
                  <route.icon className={`h-8 w-8 mx-auto mb-3 ${route.included === "pro" ? "text-secondary" : "text-primary"}`} />
                  <h3 className="font-semibold mb-2">{route.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{route.description}</p>
                  {route.included === "pro" && (
                    <Badge variant="secondary">Ruta PRO</Badge>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Pricing Plans */}
      <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {PLANS.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="relative"
          >
            <Card className={`h-full ${plan.bgColor} ${plan.popular ? "ring-2 ring-primary/40 shadow-lg" : ""}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">Más Popular</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${plan.bgColor} mb-4`}>
                  <plan.icon className={`h-6 w-6 ${plan.color}`} />
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{plan.subtitle}</p>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`w-full ${plan.popular ? "bg-cyan-500 hover:bg-cyan-600" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  <Link to={plan.ctaLink}>
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Legacy Founder Access */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16 max-w-lg mx-auto"
      >
        <Card className="border-primary/40 shadow-glow-primary bg-gradient-card">
          <CardContent className="p-6 text-center">
            <div className="mb-4">
              <Sparkles className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-lg">Acceso Fundador (Opcional)</h3>
              <p className="text-sm text-muted-foreground">
                Para quienes quieren apoyar desde el inicio
              </p>
            </div>
            <div className="text-center mb-4">
              <p className="text-2xl font-bold">19€</p>
              <p className="text-xs text-muted-foreground">reserva + 29€/mes</p>
            </div>
            <Button asChild variant="outline" className="w-full">
              <Link to="/auth">Acceder como Fundadora</Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  </div>
);

export default Precios;
