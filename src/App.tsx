import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import PublicLayout from "@/components/layouts/PublicLayout";
import PrivateLayout from "@/components/layouts/PrivateLayout";
import AdminGuard from "@/components/AdminGuard";

import Index from "./pages/Index";
import Comunidad from "./pages/Comunidad";
import Precios from "./pages/Precios";
import Auth from "./pages/Auth";
import Manifiesto from "./pages/Manifiesto";
import Admin from "./pages/Admin";
import Privacidad from "./pages/Privacidad";
import Cookies from "./pages/Cookies";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import AIToolkit from "./pages/AIToolkit";
import Perfil from "./pages/Perfil";
import RutaAutomatiza from "./pages/RutaAutomatiza";
import N8nAutomatiza from "./pages/N8nAutomatiza";
import RutaClaridad from "./pages/RutaClaridad";
import RutaPro from "./pages/RutaPro";
import MiProgreso from "./pages/MiProgreso";
import Biblioteca from "./pages/Biblioteca";
import Retos from "./pages/Retos";
import Sesiones from "./pages/Sesiones";
import WhatsAppButton from "@/components/WhatsAppButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Rutas Públicas */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/precios" element={<Precios />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/manifiesto" element={<Manifiesto />} />
              <Route path="/privacidad" element={<Privacidad />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>

            {/* Rutas Privadas */}
            <Route element={<PrivateLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/comunidad" element={<Comunidad />} />
              <Route path="/mi-progreso" element={<MiProgreso />} />
              <Route path="/biblioteca" element={<Biblioteca />} />
              <Route path="/retos" element={<Retos />} />
              <Route path="/sesiones" element={<Sesiones />} />
              <Route path="/ruta-automatiza" element={<RutaAutomatiza />} />
              <Route path="/ruta-claridad" element={<RutaClaridad />} />
              <Route path="/ruta-pro" element={<RutaPro />} />
              <Route path="/ai-toolkit" element={<AIToolkit />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/admin" element={<AdminGuard><Admin /></AdminGuard>} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>

          <WhatsAppButton />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
