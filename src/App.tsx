import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import Comunidad from "./pages/Comunidad";
import Ruta from "./pages/Ruta";
import Precios from "./pages/Precios";
import Auth from "./pages/Auth";
import Manifiesto from "./pages/Manifiesto";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/comunidad" element={<Comunidad />} />
          <Route path="/ruta" element={<Ruta />} />
          <Route path="/precios" element={<Precios />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/manifiesto" element={<Manifiesto />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
