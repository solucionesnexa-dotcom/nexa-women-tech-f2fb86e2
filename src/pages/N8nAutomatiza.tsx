import { motion } from "framer-motion";
import { ArrowLeft, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const N8nAutomatiza = () => (
  <div className="flex flex-col h-[calc(100vh-4rem)]">
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 p-4 border-b border-border"
    >
      <Button variant="ghost" size="icon" asChild>
        <Link to="/ruta-automatiza">
          <ArrowLeft size={18} />
        </Link>
      </Button>
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
          <Zap size={18} />
        </div>
        <div>
          <h1 className="font-display text-lg font-bold">Mi primera automatización</h1>
          <p className="text-xs text-muted-foreground">Construye tu flujo con n8n</p>
        </div>
      </div>
    </motion.div>

    <div className="flex-1 w-full">
      <iframe
        src="https://n8n.io"
        title="n8n Automatización"
        className="w-full h-full border-0"
        allow="clipboard-read; clipboard-write"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
    </div>
  </div>
);

export default N8nAutomatiza;
