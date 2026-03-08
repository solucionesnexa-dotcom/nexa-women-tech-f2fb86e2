import { motion } from "framer-motion";
import { MessageSquare, Lightbulb, FolderOpen, Share2 } from "lucide-react";

const features = [
  { icon: MessageSquare, title: "Presentaciones", desc: "Conoce a las demás miembros y comparte tu historia." },
  { icon: Lightbulb, title: "Preguntas", desc: "Resuelve dudas con la ayuda de la comunidad." },
  { icon: FolderOpen, title: "Proyectos", desc: "Comparte lo que estás construyendo y recibe feedback." },
  { icon: Share2, title: "Recursos", desc: "Descubre y comparte herramientas, tutoriales y plantillas." },
];

const CommunitySection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Comunidad</p>
        <h2 className="font-display text-3xl font-bold md:text-4xl">
          Conecta con mujeres que están{" "}
          <span className="text-gradient-hero">rediseñando su carrera</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Un espacio privado para compartir, aprender y crecer juntas.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
        {features.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex items-start gap-4 rounded-2xl bg-gradient-card border border-border p-6 hover:border-primary/30 transition-all"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <item.icon size={20} />
            </div>
            <div>
              <h3 className="font-display font-bold">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CommunitySection;
