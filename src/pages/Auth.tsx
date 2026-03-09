import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import nexaLogo from "@/assets/nexa-logo.png";

type AuthMode = "login" | "forgot";

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
      navigate("/comunidad");
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

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      toast({
        title: "Email enviado",
        description: "Revisa tu bandeja de entrada para restablecer tu contraseña.",
      });
      setMode("login");
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl bg-gradient-card border border-border p-8"
      >
        <div className="mb-8 text-center">
          <img src={nexaLogo} alt="Nexa" className="mx-auto mb-4 h-16 w-16" />
          <h1 className="font-display text-2xl font-bold">
            {mode === "login" ? "Bienvenida de vuelta" : "Recuperar contraseña"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "login" ? "Accede a tu cuenta" : "Te enviaremos un enlace para restablecer tu contraseña"}
          </p>
        </div>

        {mode === "login" ? (
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/50 px-4 py-3">
              <Mail size={16} className="text-muted-foreground" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                required
              />
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/50 px-4 py-3">
              <Lock size={16} className="text-muted-foreground" />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              {loading ? "Procesando..." : (
                <>
                  Entrar
                  <ArrowRight size={14} />
                </>
              )}
            </button>

            <p className="text-center text-xs text-muted-foreground">
              <button
                type="button"
                onClick={() => setMode("forgot")}
                className="text-primary hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </p>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handleForgotPassword}>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/50 px-4 py-3">
              <Mail size={16} className="text-muted-foreground" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-display text-sm font-bold text-primary-foreground transition-all hover:shadow-glow-primary hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Enviar enlace de recuperación"}
            </button>

            <p className="text-center text-xs text-muted-foreground">
              <button
                type="button"
                onClick={() => setMode("login")}
                className="flex items-center justify-center gap-1 text-primary hover:underline mx-auto"
              >
                <ArrowLeft size={12} />
                Volver al inicio de sesión
              </button>
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Auth;
