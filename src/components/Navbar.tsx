import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import nexaLogo from "@/assets/nexa-logo.png";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/manifiesto", label: "Manifiesto" },
  { to: "/precios", label: "Suscripción" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={nexaLogo} alt="Nexa Women Tech" className="h-10 w-10 rounded-lg" />
          <span className="font-display text-lg font-bold tracking-wide">
            <span className="text-primary">NEXA</span> <span className="text-accent">WOMEN TECH</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === l.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          {user ? (
            <Link
              to="/dashboard"
              className="rounded-lg bg-cyan-500 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-cyan-600 hover:shadow-lg"
            >
              Ir a Plataforma
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/auth"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/auth?mode=register"
                className="rounded-lg bg-cyan-500 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-cyan-600 hover:shadow-lg"
              >
                Regístrate
              </Link>
            </div>
          )}
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border"
          >
            <div className="flex flex-col gap-4 p-6">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`text-sm font-medium ${
                    location.pathname === l.to ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              {user ? (
                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="rounded-lg bg-cyan-500 px-5 py-2 text-center text-sm font-semibold text-white"
                >
                  Ir a Plataforma
                </Link>
              ) : (
                <>
                  <Link
                    to="/auth"
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-muted-foreground"
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    to="/auth?mode=register"
                    onClick={() => setOpen(false)}
                    className="rounded-lg bg-cyan-500 px-5 py-2 text-center text-sm font-semibold text-white"
                  >
                    Regístrate
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
