import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import nexaLogo from "@/assets/nexa-logo.png";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/comunidad", label: "Comunidad" },
  { to: "/ruta", label: "Ruta" },
  { to: "/manifiesto", label: "Manifiesto" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, roles, signOut } = useAuth();
  const isAdmin = roles.includes("admin");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={nexaLogo} alt="Nexa Women Tech" className="h-10 w-10 rounded-lg" />
          <span className="font-display text-lg font-bold tracking-wide text-foreground">
            NEXA <span className="text-primary">WOMEN TECH</span>
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
          {isAdmin && (
            <Link
              to="/admin"
              className={`text-sm font-medium transition-colors hover:text-accent ${
                location.pathname === "/admin" ? "text-accent" : "text-muted-foreground"
              }`}
            >
              Admin
            </Link>
          )}
          {user ? (
            <button
              onClick={signOut}
              className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-secondary hover:text-secondary"
            >
              <LogOut size={14} />
              Salir
            </button>
          ) : (
            <Link
              to="/precios"
              className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:shadow-glow-primary"
            >
              Únete — 19€
            </Link>
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
              {isAdmin && (
                <Link to="/admin" onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground">
                  Admin
                </Link>
              )}
              {user ? (
                <button
                  onClick={() => { signOut(); setOpen(false); }}
                  className="flex items-center gap-1.5 text-sm font-medium text-secondary"
                >
                  <LogOut size={14} /> Salir
                </button>
              ) : (
                <Link
                  to="/precios"
                  onClick={() => setOpen(false)}
                  className="rounded-lg bg-primary px-5 py-2 text-center text-sm font-semibold text-primary-foreground"
                >
                  Únete — 19€
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
