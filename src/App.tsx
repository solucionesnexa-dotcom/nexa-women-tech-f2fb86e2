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
import Ruta from "./pages/Ruta";
import Precios from "./pages/Precios";
import Auth from "./pages/Auth";
import Manifiesto from "./pages/Manifiesto";
import Admin from "./pages/Admin";
import Privacidad from "./pages/Privacidad";
import Cookies from "./pages/Cookies";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Labs from "./pages/Labs";
import AIToolkit from "./pages/AIToolkit";
import Perfil from "./pages/Perfil";

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
            </Route>

            {/* Rutas Privadas */}
            <Route element={<PrivateLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/comunidad" element={<Comunidad />} />
              <Route path="/ruta" element={<Ruta />} />
              <Route path="/labs" element={<Labs />} />
              <Route path="/ai-toolkit" element={<AIToolkit />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/admin" element={<AdminGuard><Admin /></AdminGuard>} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
