import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import nexaLogo from "@/assets/nexa-logo.png";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if this is a recovery flow
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const type = hashParams.get("type");
    if (type === "recovery") {
      setIsRecovery(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "La contraseña debe tener al menos 6 caracteres",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      
      setSuccess(true);
      toast({
        title: "¡Contraseña actualizada!",
        description: "Ya puedes iniciar sesión con tu nueva contraseña.",
      });
      
      setTimeout(() => navigate("/auth"), 2000);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isRecovery) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-2xl bg-gradient-card border border-border p-8 text-center"
        >
          <img src={nexaLogo} alt="Nexa" className="mx-auto mb-4 h-16 w-16" />
          <h1 className="font-display text-2xl font-bold mb-2">Enlace inválido</h1>
          <p className="text-sm text-muted-foreground mb-4">
            Este enlace de recuperación no es válido o ha expirado.
          </p>
          <button
            onClick={() => navigate("/auth")}
            className="text-primary hover:underline text-sm"
          >
            Volver al inicio de sesión
          </button>
        </motion.div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-2xl bg-gradient-card border border-border p-8 text-center"
        >
          <CheckCircle size={48} className="mx-auto mb-4 text-primary" />
          <h1 className="font-display text-2xl font-bold mb-2">¡Listo!</h1>
          <p className="text-sm text-muted-foreground">
            Tu contraseña ha sido actualizada. Redirigiendo...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl bg-gradient-card border border-border p-8"
      >
        <div className="mb-8 text-center">
          <img src={nexaLogo} alt="Nexa" className="mx-auto mb-4 h-16 w-16" />
          <h1 className="font-display text-2xl font-bold">Nueva contraseña</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Introduce tu nueva contraseña
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/50 px-4 py-3">
            <Lock size={16} className="text-muted-foreground" />
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              required
              minLength={6}
            />
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/50 px-4 py-3">
            <Lock size={16} className="text-muted-foreground" />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-display text-sm font-bold text-primary-foreground transition-all hover:shadow-glow-primary hover:scale-[1.02] disabled:opacity-50"
          >
            {loading ? "Actualizando..." : "Actualizar contraseña"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
