import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WhatsAppButton = () => {
  const WhatsAppNumber = "34123456789"; // Cambia esto por el número real de WhatsApp
  const WhatsAppMessage = encodeURIComponent(
    "Hola Nexa! Me gustaría conocer más sobre la plataforma de mujeres emprendedoras."
  );
  const WhatsAppURL = `https://wa.me/${WhatsAppNumber}?text=${WhatsAppMessage}`;

  return (
    <motion.a
      href={WhatsAppURL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-lg hover:shadow-green-500/50 hover:bg-green-600 transition-all"
      title="Contáctanos por WhatsApp"
    >
      <MessageCircle size={26} />
    </motion.a>
  );
};

export default WhatsAppButton;
