import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { User } from "lucide-react";

const Perfil = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
            <User size={24} />
          </div>
          <h1 className="font-display text-3xl font-bold">Tu Perfil</h1>
        </div>
        <p className="text-muted-foreground">Gestiona tus datos y preferencias.</p>
      </motion.div>

      <div className="rounded-2xl border border-border p-6 bg-card">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Nombre</label>
            <p className="text-sm font-medium mt-1">{user?.user_metadata?.full_name || "Soberana Digital"}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</label>
            <p className="text-sm font-medium mt-1">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;