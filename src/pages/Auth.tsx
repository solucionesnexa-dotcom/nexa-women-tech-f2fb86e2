import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Shield } from "lucide-react";
import nexaLogo from "@/assets/nexa-logo.png";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "register">("register");

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

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {mode === "register" && (
            <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/50 px-4 py-3">
              <User size={16} className="text-muted-foreground" />
              <input type="text" placeholder="Nombre completo" className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
            </div>
          )}
          <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/50 px-4 py-3">
            <Mail size={16} className="text-muted-foreground" />
            <input type="email" placeholder="Email" className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/50 px-4 py-3">
            <Lock size={16} className="text-muted-foreground" />
            <input type="password" placeholder="Contraseña" className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-display text-sm font-bold text-primary-foreground transition-all hover:shadow-glow-primary hover:scale-[1.02]"
          >
            {mode === "register" ? (
              <>
                <Shield size={14} />
                Reservar mi plaza como Fundadora — 19€
              </>
            ) : (
              <>
                Entrar
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {mode === "register" && (
          <p className="mt-4 text-center text-[11px] text-muted-foreground">
            Plazas limitadas · acceso anticipado a la comunidad fundadora.
          </p>
        )}

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
