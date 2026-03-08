import { motion } from "framer-motion";
import { Bot } from "lucide-react";

const AIToolkit = () => {
  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Bot size={24} />
          </div>
          <h1 className="font-display text-3xl font-bold">AI Toolkit</h1>
        </div>
        <p className="text-muted-foreground">Tu arsenal de herramientas de Inteligencia Artificial.</p>
      </motion.div>

      <div className="rounded-2xl border border-border border-dashed p-12 text-center bg-muted/20">
        <Bot size={48} className="mx-auto mb-4 text-muted-foreground/50" />
        <h2 className="text-lg font-bold mb-2">Próximamente</h2>
        <p className="text-sm text-muted-foreground">Las herramientas se están calibrando. Vuelve pronto.</p>
      </div>
    </div>
  );
};

export default AIToolkit;