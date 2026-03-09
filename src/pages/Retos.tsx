import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, CheckCircle, Clock, Lock, Star, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PaywallGuard } from "@/components/PaywallGuard";

const CHALLENGES = [
  {
    id: 1,
    title: "Semana 1: Tu Primera Automatización",
    description: "Crea una automatización simple que ahorre al menos 30 minutos semanales",
    difficulty: "Fácil",
    points: 100,
    status: "completed", // completed, in-progress, locked
    deadline: "2026-03-15",
    progress: 100,
    premium: false,
    tasks: [
      { id: 1, title: "Identificar tarea repetitiva", completed: true },
      { id: 2, title: "Crear automatización básica", completed: true },
      { id: 3, title: "Probar y ajustar", completed: true },
    ],
  },
  {
    id: 2,
    title: "Semana 2: Optimización de Flujos",
    description: "Mejora 3 procesos existentes combinando múltiples herramientas",
    difficulty: "Medio",
    points: 150,
    status: "in-progress",
    deadline: "2026-03-22",
    progress: 60,
    premium: false,
    tasks: [
      { id: 4, title: "Analizar procesos actuales", completed: true },
      { id: 5, title: "Diseñar flujo optimizado", completed: true },
      { id: 6, title: "Implementar mejoras", completed: false },
      { id: 7, title: "Medir resultados", completed: false },
    ],
  },
  {
    id: 3,
    title: "Semana 3: Automatización Avanzada",
    description: "Crea un sistema que involucre IA y múltiples plataformas",
    difficulty: "Difícil",
    points: 200,
    status: "locked",
    deadline: "2026-03-29",
    progress: 0,
    premium: true,
    tasks: [
      { id: 8, title: "Investigar APIs disponibles", completed: false },
      { id: 9, title: "Diseñar arquitectura", completed: false },
      { id: 10, title: "Desarrollar prototipo", completed: false },
      { id: 11, title: "Testing exhaustivo", completed: false },
    ],
  },
  {
    id: 4,
    title: "Semana 4: Escalabilidad",
    description: "Haz que tus automatizaciones funcionen para equipos enteros",
    difficulty: "Experto",
    points: 250,
    status: "locked",
    deadline: "2026-04-05",
    progress: 0,
    premium: true,
    tasks: [
      { id: 12, title: "Documentar procesos", completed: false },
      { id: 13, title: "Crear manuales", completed: false },
      { id: 14, title: "Entrenar a otros", completed: false },
    ],
  },
];

const Retos = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "locked":
        return <Lock className="h-5 w-5 text-gray-400" />;
      default:
        return <Target className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "border-green-200 bg-green-50";
      case "in-progress":
        return "border-blue-200 bg-blue-50";
      case "locked":
        return "border-gray-200 bg-gray-50 opacity-60";
      default:
        return "";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil":
        return "bg-green-100 text-green-800";
      case "Medio":
        return "bg-yellow-100 text-yellow-800";
      case "Difícil":
        return "bg-orange-100 text-orange-800";
      case "Experto":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalPoints = CHALLENGES.reduce((sum, challenge) =>
    challenge.status === "completed" ? sum + challenge.points : sum, 0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-4">
          <Trophy className="h-8 w-8 text-yellow-500" />
          <div>
            <h1 className="text-3xl font-bold">Retos Semanales</h1>
            <p className="text-muted-foreground">
              Completa desafíos progresivos y gana puntos por tu crecimiento
            </p>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Star className="h-6 w-6 text-yellow-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Puntos Totales</p>
                  <p className="text-2xl font-bold">{totalPoints}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Próximo reto</p>
                <p className="font-medium">Semana 3: Automatización Avanzada</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-6">
        {CHALLENGES.map((challenge, index) => {
          const challengeCard = (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`transition-all duration-200 ${getStatusColor(challenge.status)}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(challenge.status)}
                      <div>
                        <CardTitle className="text-xl">{challenge.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {challenge.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getDifficultyColor(challenge.difficulty)}>
                        {challenge.difficulty}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        {challenge.points} pts
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progreso</span>
                        <span>{challenge.progress}%</span>
                      </div>
                      <Progress value={challenge.progress} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Tareas:</p>
                      {challenge.tasks.map((task) => (
                        <div key={task.id} className="flex items-center gap-2">
                          <CheckCircle
                            className={`h-4 w-4 ${
                              task.completed ? "text-green-500" : "text-gray-300"
                            }`}
                          />
                          <span className={`text-sm ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                            {task.title}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm text-muted-foreground">
                        Fecha límite: {new Date(challenge.deadline).toLocaleDateString()}
                      </span>
                      <Button
                        size="sm"
                        disabled={challenge.status === "locked"}
                        onClick={() => setSelectedChallenge(challenge.id)}
                      >
                        {challenge.status === "completed" ? "Ver Resultados" :
                         challenge.status === "in-progress" ? "Continuar" : "Empezar"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );

          if (challenge.premium) {
            return (
              <PaywallGuard
                key={challenge.id}
                title="Reto Premium"
                description="Este reto requiere una suscripción activa"
                feature={challenge.title}
              >
                {challengeCard}
              </PaywallGuard>
            );
          }

          return challengeCard;
        })}
      </div>
    </div>
  );
};

export default Retos;