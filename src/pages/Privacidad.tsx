import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Privacidad = () => (
  <div className="min-h-screen bg-background pt-24 pb-16">
    <div className="container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-bold md:text-4xl mb-8">
          Política de <span className="text-gradient-hero">Privacidad</span>
        </h1>

        <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="font-display text-lg font-bold text-foreground mb-3">1. Responsable del tratamiento</h2>
            <p>
              Nexa Women Tech (en adelante, "Nexa") es responsable del tratamiento de los datos personales recogidos a través de este sitio web. Puedes contactarnos en{" "}
              <a href="mailto:nexawomentech@gmail.com" className="text-primary hover:underline">nexawomentech@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground mb-3">2. Datos que recogemos</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Nombre completo y dirección de correo electrónico al registrarte.</li>
              <li>Datos de pago procesados de forma segura a través de Stripe (no almacenamos datos de tarjeta).</li>
              <li>Contenido que publicas en la comunidad (posts, comentarios).</li>
              <li>Datos de uso y navegación mediante cookies analíticas.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground mb-3">3. Finalidad del tratamiento</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Gestionar tu cuenta y acceso a la plataforma.</li>
              <li>Procesar pagos y suscripciones.</li>
              <li>Enviar comunicaciones relacionadas con el servicio.</li>
              <li>Mejorar la experiencia de usuario y el funcionamiento de la plataforma.</li>
              <li>Cumplir con obligaciones legales.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground mb-3">4. Base legal</h2>
            <p>
              El tratamiento se basa en el consentimiento del usuario al registrarse, la ejecución del contrato de suscripción, y el interés legítimo de Nexa en mejorar sus servicios.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground mb-3">5. Conservación de datos</h2>
            <p>
              Los datos se conservarán mientras mantengas tu cuenta activa y durante el tiempo necesario para cumplir obligaciones legales. Puedes solicitar la eliminación de tu cuenta en cualquier momento.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground mb-3">6. Compartición de datos</h2>
            <p>
              No vendemos ni compartimos tus datos personales con terceros, salvo los necesarios para el funcionamiento del servicio (proveedores de hosting, procesamiento de pagos) y cuando sea requerido por ley.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground mb-3">7. Tus derechos</h2>
            <p>Tienes derecho a:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Acceder a tus datos personales.</li>
              <li>Rectificar datos inexactos.</li>
              <li>Solicitar la supresión de tus datos.</li>
              <li>Oponerte al tratamiento o solicitar su limitación.</li>
              <li>Portabilidad de tus datos.</li>
            </ul>
            <p className="mt-2">
              Para ejercer estos derechos, escríbenos a{" "}
              <a href="mailto:nexawomentech@gmail.com" className="text-primary hover:underline">nexawomentech@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground mb-3">8. Seguridad</h2>
            <p>
              Implementamos medidas técnicas y organizativas para proteger tus datos personales contra accesos no autorizados, pérdida o alteración.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground mb-3">9. Cambios en esta política</h2>
            <p>
              Podemos actualizar esta política periódicamente. Te notificaremos de cambios significativos a través del email registrado.
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

export default Privacidad;
