import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Manifiesto = () => (
  <div className="min-h-screen bg-background pt-24 pb-16">
    <div className="container mx-auto px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-3xl text-center mb-16"
      >
        <Sparkles className="mx-auto mb-6 text-accent" size={36} />
        <h1 className="font-display text-4xl font-bold md:text-5xl leading-tight">
          Manifiesto <span className="text-gradient-hero">Nexa Women Tech</span>
        </h1>
        <p className="mt-4 font-display text-xl md:text-2xl font-medium text-foreground">
          El Fin del Mito de la Conciliación
        </p>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto italic">
          Mujeres digitalmente soberanas que construyen sistemas, no cadenas
        </p>
        <p className="mt-2 text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          No necesitas elegir entre tu vida y tu carrera. Con tecnología puedes construir un sistema profesional propio
        </p>
      </motion.div>

      <div className="mx-auto max-w-3xl space-y-10">
        {/* I. Preámbulo */}
        <ManifestoSection number="I" title="Preámbulo: El Fin del Engaño" delay={0}>
          <p>
            Vivimos en un ecosistema laboral que practica el gaslighting tecnológico. Se nos ha vendido el "cuento" de la conciliación mientras se utilizan las herramientas digitales como una correa de cuello para encadenarnos a una disponibilidad de 24/7. Nos han hecho creer que elegir entre el éxito profesional y la vida personal es inevitable. Nexa Women Tech nace para romper ese mito. No aceptamos la explotación analógica disfrazada de "cultura de empresa" ni la burocracia manual que drena el talento femenino. La verdadera conciliación no es una negociación con el sistema; es un derecho que la tecnología hace posible cuando tomamos el mando.
          </p>
        </ManifestoSection>

        {/* II. Declaración */}
        <ManifestoSection number="II" title="Nuestra Declaración de Insurgencia" delay={0.06}>
          <blockquote className="rounded-xl bg-primary/5 border border-primary/20 p-6 mb-4 italic font-display text-lg text-foreground">
            "Estamos aquí para liderar una nueva revolución digital: mujeres digitalmente soberanas que construyen sistemas, no cadenas".
          </blockquote>
          <p>
            La Soberanía Digital Femenina no es una formación técnica; es un acto de insurgencia profesional. Reclamamos el control absoluto sobre nuestro tiempo y nuestra producción. Ser soberana significa hackear la obsolescencia del trabajo tradicional de 9 a 5 para recuperar nuestra autonomía intelectual y vital.
          </p>
        </ManifestoSection>

        {/* III. Pilares */}
        <ManifestoSection number="III" title="Los Tres Pilares Innegociables" delay={0.12}>
          <ol className="list-decimal list-outside ml-5 space-y-4">
            <li>
              <strong>La tecnología es el arma, no el enemigo:</strong> Dejamos de ser consumidoras pasivas para convertirnos en arquitectas de flujos de trabajo. No tememos a la IA; la usamos como una ventaja táctica disruptiva para recuperar nuestro poder.
            </li>
            <li>
              <strong>La conciliación es un derecho, no una negociación:</strong> No pedimos permiso para equilibrar nuestra vida. Diseñamos sistemas digitales que garantizan ese equilibrio por diseño y por defecto.
            </li>
            <li>
              <strong>Sistemas sobre Esfuerzo:</strong> Repudiamos la cultura del "presentismo" digital. Nuestra máxima es clara: si puede ser automatizado, debe ser automatizado. La tecnología no es para trabajar más, es para que el sistema trabaje para nosotras.
            </li>
          </ol>
        </ManifestoSection>

        {/* IV. Valores */}
        <ManifestoSection number="IV" title="Los Valores de la Mujer Nexa" delay={0.18}>
          <ul className="space-y-4">
            <li>
              <strong>Erradicación de la Pasividad Técnica:</strong> Transformamos la duda en ejecución. En Nexa, quien no construye, no evoluciona.
            </li>
            <li>
              <strong>Infraestructura Propia:</strong> Fomentamos que cada mujer sea dueña de su propio ecosistema de herramientas, eliminando dependencias externas y recuperando la soberanía sobre su carrera.
            </li>
            <li>
              <strong>Automatiza lo mundano, prioriza lo humano:</strong> Delegamos en la IA las tareas que nos agotan para dedicar nuestro talento a lo que realmente importa: la creatividad, la estrategia y la vida.
            </li>
            <li>
              <strong>Liderazgo desde la trinchera:</strong> No creemos en jerarquías de estatus, sino en una comunidad de constructoras que comparten avances, se ayudan y ejecutan juntas.
            </li>
          </ul>
        </ManifestoSection>

        {/* V. Visión */}
        <ManifestoSection number="V" title="Nuestra Visión de Futuro" delay={0.24}>
          <p>
            No solo estamos creando una comunidad; estamos construyendo la infraestructura profesional para las mujeres en la nueva economía digital. Queremos una generación de mujeres capaces de crear carreras flexibles, lanzar sus propios servicios digitales y generar ingresos online sin sacrificar su libertad profesional ni personal. Nexa es el hub donde la digitalización es el camino real hacia la autonomía.
          </p>
        </ManifestoSection>

        {/* VI. Llamado */}
        <ManifestoSection number="VI" title="El Llamado a las Constructoras" delay={0.3}>
          <p>
            Este movimiento no es para espectadoras. Es para mujeres que están listas para dejar de sentirse atrapadas por el sistema y empezar a construir su propia libertad. El empoderamiento digital es nuestra revolución. La soberanía digital es nuestra libertad real.
          </p>
        </ManifestoSection>
      </div>

      {/* Hashtags & Closing */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mx-auto max-w-3xl mt-16 text-center space-y-6"
      >

        <Link
          to="/register"
          className="inline-flex items-center gap-2 rounded-2xl bg-cyan-500 px-10 py-4 font-display text-sm font-bold text-white transition-all hover:shadow-lg hover:scale-105"
        >
          Regístrate Gratis
        </Link>
      </motion.div>
    </div>
  </div>
);

const ManifestoSection = ({
  number,
  title,
  delay,
  children,
}: {
  number: string;
  title: string;
  delay: number;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="rounded-2xl bg-gradient-card border border-border p-8"
  >
    <div className="flex items-start gap-4">
      <span className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary">
        {number}
      </span>
      <div className="space-y-4">
        <h2 className="font-display text-xl font-bold">{title}</h2>
        <div className="text-muted-foreground leading-relaxed">{children}</div>
      </div>
    </div>
  </motion.div>
);

export default Manifiesto;
