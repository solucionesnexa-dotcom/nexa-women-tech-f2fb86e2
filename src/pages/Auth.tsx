import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import nexaLogo from "@/assets/nexa-logo.png";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "register">("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp, signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "register") {
        const { error } = await signUp(email, password, fullName);
        if (error) throw error;
        toast({
          title: "¡Cuenta creada!",
          description: "Revisa tu email para confirmar tu cuenta.",
        });
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
        navigate("/comunidad");
      }
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
            {mode === "register" ? "Únete como Fundadora" : "Bienvenida de vuelta"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "register" ? "Acceso anticipado · Plazas limitadas" : "Accede a tu cuenta"}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === "register" && (
            <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/50 px-4 py-3">
              <User size={16} className="text-muted-foreground" />
              <input
                type="text"
                placeholder="Nombre completo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                required
              />
            </div>
          )}
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
            {loading ? (
              "Procesando..."
            ) : mode === "register" ? (
              <>
                <Shield size={14} />
                Crear cuenta
              </>
            ) : (
              <>
                Entrar
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {mode === "register" ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
          <button
            onClick={() => setMode(mode === "register" ? "login" : "register")}
            className="text-primary hover:underline"
          >
            {mode === "register" ? "Inicia sesión" : "Regístrate"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
