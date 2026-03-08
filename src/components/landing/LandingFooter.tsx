import { Link } from "react-router-dom";
import nexaLogo from "@/assets/nexa-logo.png";

const LandingFooter = () => (
  <footer className="py-8">
    <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <img src={nexaLogo} alt="Nexa" className="h-6 w-6 rounded" />
        <p className="text-xs text-muted-foreground">© 2026 Nexa Women Tech · Una iniciativa de Nexa Soluciones.</p>
      </div>
      <div className="flex gap-4 text-xs text-muted-foreground">
        <Link to="/manifiesto" className="hover:text-primary transition-colors">Manifiesto</Link>
        <Link to="/privacidad" className="hover:text-primary transition-colors">Privacidad</Link>
        <Link to="/cookies" className="hover:text-primary transition-colors">Cookies</Link>
        <a href="mailto:nexawomentech@gmail.com" className="hover:text-primary transition-colors">nexawomentech@gmail.com</a>
      </div>
    </div>
  </footer>
);

export default LandingFooter;
