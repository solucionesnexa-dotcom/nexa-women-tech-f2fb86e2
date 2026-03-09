import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Download, Lock, Zap, Compass, Rocket } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaywallGuard } from "@/components/PaywallGuard";

const RESOURCES = {
  automatiza: [
    {
      id: 1,
      title: "Prompts para Automatización",
      description: "Colección de prompts probados para automatizar tareas repetitivas",
      type: "prompts",
      premium: false,
      downloads: 1247,
    },
    {
      id: 2,
      title: "JSONs de Flujos de Trabajo",
      description: "Plantillas JSON listas para usar en tus automatizaciones",
      type: "json",
      premium: true,
      downloads: 892,
    },
    {
      id: 3,
      title: "Tutorial: Primera Automatización",
      description: "Guía paso a paso para crear tu primera automatización sin código",
      type: "tutorial",
      premium: false,
      downloads: 2156,
    },
  ],
  claridad: [
    {
      id: 4,
      title: "Cuestionario de Autodescubrimiento",
      description: "Preguntas profundas para encontrar tu camino digital",
      type: "prompts",
      premium: false,
      downloads: 987,
    },
    {
      id: 5,
      title: "Mapas Mentales de Carreras Digitales",
      description: "Visualizaciones de diferentes caminos profesionales",
      type: "tutorial",
      premium: true,
      downloads: 654,
    },
  ],
  pro: [
    {
      id: 6,
      title: "Estrategias de Monetización IA",
      description: "Modelos probados para convertir conocimientos en ingresos",
      type: "tutorial",
      premium: true,
      downloads: 432,
    },
    {
      id: 7,
      title: "Prompts para Clientes Empresariales",
      description: "Colección avanzada de prompts para consultoría",
      type: "prompts",
      premium: true,
      downloads: 321,
    },
  ],
};

const Biblioteca = () => {
  const [selectedTab, setSelectedTab] = useState("automatiza");

  const getIcon = (type: string) => {
    switch (type) {
      case "prompts":
        return BookOpen;
      case "json":
        return Download;
      case "tutorial":
        return BookOpen;
      default:
        return BookOpen;
    }
  };

  const getRouteIcon = (route: string) => {
    switch (route) {
      case "automatiza":
        return Zap;
      case "claridad":
        return Compass;
      case "pro":
        return Rocket;
      default:
        return BookOpen;
    }
  };

  const getRouteColor = (route: string) => {
    switch (route) {
      case "automatiza":
        return "text-primary";
      case "claridad":
        return "text-accent";
      case "pro":
        return "text-secondary";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Biblioteca de Recursos</h1>
        <p className="text-muted-foreground">
          Accede a prompts, tutoriales y herramientas exclusivas para tu crecimiento digital
        </p>
      </motion.div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="automatiza" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Ruta Automatiza
          </TabsTrigger>
          <TabsTrigger value="claridad" className="flex items-center gap-2">
            <Compass className="h-4 w-4" />
            Ruta Claridad
          </TabsTrigger>
          <TabsTrigger value="pro" className="flex items-center gap-2">
            <Rocket className="h-4 w-4" />
            Ruta Profesional
          </TabsTrigger>
        </TabsList>

        {Object.entries(RESOURCES).map(([route, resources]) => (
          <TabsContent key={route} value={route}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {resources.map((resource) => {
                const IconComponent = getIcon(resource.type);
                const cardContent = (
                  <Card key={resource.id} className="relative overflow-hidden">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <IconComponent className={`h-5 w-5 ${getRouteColor(route)}`} />
                          <Badge variant={resource.premium ? "default" : "secondary"}>
                            {resource.type}
                          </Badge>
                        </div>
                        {resource.premium && (
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {resource.downloads} descargas
                        </span>
                        <Button
                          size="sm"
                          disabled={resource.premium}
                          className={resource.premium ? "opacity-50" : ""}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          {resource.premium ? "Premium" : "Descargar"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );

                if (resource.premium) {
                  return (
                    <PaywallGuard
                      key={resource.id}
                      title="Recurso Premium"
                      description="Este recurso requiere una suscripción activa"
                      feature={resource.title}
                    >
                      {cardContent}
                    </PaywallGuard>
                  );
                }

                return cardContent;
              })}
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Biblioteca;