import { motion } from "framer-motion";

const Cookies = () => (
  <div className="min-h-screen bg-background pt-24 pb-16">
    <div className="container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-bold md:text-4xl mb-8">
          Política de <span className="text-gradient-hero">Cookies</span>
        </h1>

        <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="font-display text-lg font-bold text-foreground mb-3">1. ¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo al visitar un sitio web. Permiten que el sitio recuerde tus preferencias y mejore tu experiencia de navegación.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground mb-3">2. Cookies que utilizamos</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm mt-2">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">Tipo</th>
                    <th className="pb-3 pr-4 font-medium">Finalidad</th>
                    <th className="pb-3 font-medium">Duración</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium text-foreground">Esenciales</td>
                    <td className="py-3 pr-4">Necesarias para el funcionamiento del sitio (autenticación, sesión).</td>
                    <td className="py-3">Sesión</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium text-foreground">Funcionales</td>
                    <td className="py-3 pr-4">Recordar tus preferencias (idioma, tema).</td>
                    <td className="py-3">1 año</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium text-foreground">Analíticas</td>
                    <td className="py-3 pr-4">Entender cómo usas la plataforma para mejorarla.</td>
                    <td className="py-3">2 años</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground mb-3">3. Cookies de terceros</h2>
            <p>
              Utilizamos servicios de terceros que pueden establecer sus propias cookies:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong className="text-foreground">Stripe</strong> — para el procesamiento seguro de pagos.</li>
              <li><strong className="text-foreground">Servicios de autenticación</strong> — para gestionar el inicio de sesión.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground mb-3">4. Gestión de cookies</h2>
            <p>
              Puedes configurar tu navegador para rechazar cookies o recibir un aviso antes de que se instalen. Ten en cuenta que desactivar las cookies esenciales puede afectar al funcionamiento de la plataforma.
            </p>
            <p className="mt-2">Cómo gestionar cookies en los navegadores más comunes:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Chrome: Configuración → Privacidad y seguridad → Cookies</li>
              <li>Firefox: Preferencias → Privacidad y seguridad</li>
              <li>Safari: Preferencias → Privacidad</li>
              <li>Edge: Configuración → Cookies y permisos del sitio</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground mb-3">5. Cambios en esta política</h2>
            <p>
              Podemos actualizar esta política de cookies en cualquier momento. Los cambios se publicarán en esta página con la fecha de última actualización.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground mb-3">6. Contacto</h2>
            <p>
              Si tienes preguntas sobre nuestra política de cookies, escríbenos a{" "}
              <a href="mailto:nexawomentech@gmail.com" className="text-primary hover:underline">nexawomentech@gmail.com</a>.
            </p>
          </section>

          <p className="text-xs text-muted-foreground/60 pt-4 border-t border-border">
            Última actualización: marzo 2026
          </p>
        </div>
      </motion.div>
    </div>
  </div>
);

export default Cookies;
