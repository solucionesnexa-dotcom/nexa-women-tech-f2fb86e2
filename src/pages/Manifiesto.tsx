import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const principles = [
  {
    title: "El trabajo debe adaptarse a la vida",
    text: "No al revés. Rechazamos un sistema que obliga a las mujeres a elegir entre carrera y vida personal. El trabajo flexible no es un privilegio — es un derecho. Diseñar tu horario, tu espacio y tu ritmo no debería ser la excepción, sino la norma.",
  },
  {
    title: "La tecnología es una herramienta de soberanía",
    text: "La inteligencia artificial y la automatización permiten a las mujeres construir sistemas profesionales propios, más flexibles y autónomos que cualquier empleo tradicional. No dependemos de un jefe que apruebe nuestro talento — lo demostramos con lo que construimos.",
  },
  {
    title: "El conocimiento se comparte, no se acumula",
    text: "Creemos en una comunidad donde cada mujer que avanza eleva a las demás. Compartir conocimiento es un acto de generosidad y de fuerza. No competimos entre nosotras — nos potenciamos mutuamente.",
  },
  {
    title: "Construir en público es un acto de valentía",
    text: "Mostrar tu proceso, tus errores y tus avances inspira a otras. La transparencia construye confianza y comunidad. No esperamos a tener todo perfecto — avanzamos mientras aprendemos y lo hacemos visible.",
  },
  {
    title: "Cada mujer diseña su propio camino",
    text: "No existe una única fórmula de éxito. Nexa Women Tech apoya a mujeres que quieren diseñar carreras profesionales únicas, adaptadas a su realidad. Ya sea freelance, emprendedora, creadora o una combinación de todo — tu camino es válido.",
  },
  {
    title: "La IA no sustituye — amplifica",
    text: "La inteligencia artificial no viene a quitarnos el trabajo. Viene a permitirnos hacer más con menos, a liberar tiempo y a abrir posibilidades que antes no existían. La IA es nuestra aliada, no nuestra competencia.",
  },
  {
    title: "La independencia económica es libertad",
    text: "Cuando una mujer controla sus ingresos, controla su vida. Construir fuentes de ingreso propias con tecnología es el camino más directo a la autonomía real. No pedimos permiso — creamos oportunidades.",
  },
  {
    title: "La comunidad es el multiplicador",
    text: "Solas podemos llegar lejos, pero juntas llegamos más rápido. Una red de mujeres que se apoyan, comparten recursos y celebran los logros de las demás es imparable. Nexa es más que una plataforma — es un movimiento.",
  },
  {
    title: "Aprender haciendo, no solo estudiando",
    text: "Los cursos infinitos no cambian vidas — la acción sí. En Nexa priorizamos proyectos reales, retos prácticos y resultados tangibles. Cada semana avanzas, cada mes creces, cada trimestre transformas tu carrera.",
  },
  {
    title: "El futuro del trabajo es femenino, flexible y tecnológico",
    text: "Las mujeres que dominen la IA y la automatización no solo tendrán mejores carreras — redefinirán las reglas del juego profesional. Nosotras no nos adaptamos al futuro del trabajo. Lo estamos creando.",
  },
];

const Manifiesto = () => (
  <div className="min-h-screen bg-background pt-24 pb-16">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-3xl text-center mb-16"
      >
        <Sparkles className="mx-auto mb-6 text-accent" size={36} />
        <h1 className="font-display text-4xl font-bold md:text-5xl leading-tight">
          Manifiesto <span className="text-gradient-hero">Nexa Women Tech</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Creemos que la próxima generación de carreras profesionales será diseñada por mujeres que dominan la tecnología y la inteligencia artificial. Este es nuestro compromiso con cada mujer que se une a este movimiento.
        </p>
      </motion.div>

      {/* Intro quote */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mx-auto max-w-3xl mb-12"
      >
        <blockquote className="rounded-2xl bg-primary/5 border border-primary/20 p-8 text-center">
          <p className="font-display text-lg md:text-xl font-medium text-foreground leading-relaxed italic">
            "No queremos un asiento en la mesa de otros. Estamos construyendo nuestra propia mesa — con tecnología, con comunidad, con inteligencia artificial."
          </p>
        </blockquote>
      </motion.div>

      <div className="mx-auto max-w-3xl space-y-6">
        {principles.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl bg-gradient-card border border-border p-8"
          >
            <div className="flex items-start gap-4">
              <span className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-xl font-bold mb-3">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{p.text}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Closing */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mx-auto max-w-3xl mt-16 text-center space-y-6"
      >
        <div className="rounded-2xl bg-gradient-card border border-border p-10">
          <p className="text-lg text-foreground leading-relaxed mb-2">
            Este manifiesto no es solo un texto — es una declaración de intenciones.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Cada mujer que se une a Nexa Women Tech se compromete con estos principios. No porque se los impongamos, sino porque los siente propios. Porque sabe que el futuro del trabajo se construye hoy, y quiere ser parte de ese cambio.
          </p>
        </div>

        <Link
          to="/precios"
          className="inline-flex items-center gap-2 rounded-2xl bg-primary px-10 py-4 font-display text-sm font-bold text-primary-foreground transition-all hover:shadow-glow-primary hover:scale-105"
        >
          Únete como Fundadora
        </Link>
      </motion.div>
    </div>
  </div>
);

export default Manifiesto;
