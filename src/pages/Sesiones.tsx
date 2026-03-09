

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, Play, Video, MessageCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SESSIONS = [
  {
    id: 1,
    title: "Live: Automatización para Principiantes",
    description: "Aprende los fundamentos de la automatización sin código",
    date: "2026-03-10",
    time: "18:00",
    duration: "60 min",
    instructor: "Ana García",
    instructorAvatar: "/avatars/ana.jpg",
    attendees: 245,
    status: "upcoming", // upcoming, live, recorded
    tags: ["Automatización", "Principiantes"],
    recordingUrl: null,
  },
  {
    id: 2,
    title: "Q&A: Dudas de la Semana",
    description: "Resolvemos todas tus preguntas sobre las rutas",
    date: "2026-03-12",
    time: "19:00",
    duration: "45 min",
    instructor: "Equipo Nexa",
    instructorAvatar: "/avatars/team.jpg",
    attendees: 189,
    status: "upcoming",
    tags: ["Q&A", "Soporte"],
    recordingUrl: null,
  },
  {
    id: 3,
    title: "Masterclass: IA en el Trabajo",
    description: "Cómo integrar IA en tu flujo de trabajo diario",
    date: "2026-03-08",
    time: "17:00",
    duration: "90 min",
    instructor: "María López",
    instructorAvatar: "/avatars/maria.jpg",
    attendees: 312,
    status: "recorded",
    tags: ["IA", "Productividad"],
    recordingUrl: "https://youtube.com/watch?v=example1",
  },
  {
    id: 4,
    title: "Networking: Conecta con Otras Mujeres Tech",
    description: "Sesión de networking exclusiva para la comunidad",
    date: "2026-03-15",
    time: "20:00",
    duration: "75 min",
    instructor: "Comunidad Nexa",
    instructorAvatar: "/avatars/community.jpg",
    attendees: 156,
    status: "upcoming",
    tags: ["Networking", "Comunidad"],
    recordingUrl: null,
  },
];

const Sesiones = () => {
  const [filter, setFilter] = useState<"all" | "upcoming" | "recorded">("all");

  const filteredSessions = SESSIONS.filter(session => {
    if (filter === "all") return true;
    return session.status === filter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge variant="secondary">Próxima</Badge>;
      case "live":
        return <Badge variant="destructive" className="bg-red-500">EN VIVO</Badge>;
      case "recorded":
        return <Badge variant="outline">Grabada</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case "live":
        return <Video className="h-5 w-5 text-red-500" />;
      case "recorded":
        return <Play className="h-5 w-5 text-green-500" />;
      default:
        return <Calendar className="h-5 w-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-4">
          <Calendar className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Sesiones en Vivo</h1>
            <p className="text-muted-foreground">
              Únete a nuestras sesiones en vivo y accede a grabaciones anteriores
            </p>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            Todas
          </Button>
          <Button
            variant={filter === "upcoming" ? "default" : "outline"}
            onClick={() => setFilter("upcoming")}
          >
            Próximas
          </Button>
          <Button
            variant={filter === "recorded" ? "default" : "outline"}
            onClick={() => setFilter("recorded")}
          >
            Grabadas
          </Button>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredSessions.map((session, index) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  {getStatusIcon(session.status)}
                  {getStatusBadge(session.status)}
                </div>
                <CardTitle className="text-lg leading-tight">{session.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {session.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{session.time} • {session.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(session.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{session.attendees} asistentes</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.instructorAvatar} />
                    <AvatarFallback>{session.instructor[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{session.instructor}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {session.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="mt-auto">
                  <Button
                    className="w-full"
                    disabled={session.status === "recorded" && !session.recordingUrl}
                  >
                    {session.status === "live" && (
                      <>
                        <Video className="h-4 w-4 mr-2" />
                        Unirme Ahora
                      </>
                    )}
                    {session.status === "upcoming" && (
                      <>
                        <Calendar className="h-4 w-4 mr-2" />
                        Recordatorio
                      </>
                    )}
                    {session.status === "recorded" && session.recordingUrl && (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Ver Grabación
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredSessions.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No hay sesiones disponibles</h3>
          <p className="text-muted-foreground">
            No se encontraron sesiones con el filtro seleccionado.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Sesiones;