import { Link, useLocation } from "react-router-dom";
import { Home, TrendingUp, Zap, Compass, Rocket, User, LogOut, BookOpen, Trophy, Calendar, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import nexaLogo from "@/assets/nexa-logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Mi Progreso", url: "/mi-progreso", icon: TrendingUp },
  { title: "Biblioteca", url: "/biblioteca", icon: BookOpen },
  { title: "Retos", url: "/retos", icon: Trophy },
  { title: "Sesiones", url: "/sesiones", icon: Calendar },
  { title: "Ruta Automatiza", url: "/ruta-automatiza", icon: Zap },
  { title: "Ruta Claridad", url: "/ruta-claridad", icon: Compass },
  { title: "Ruta Profesional", url: "/ruta-pro", icon: Rocket },
  { title: "Mi Perfil", url: "/perfil", icon: User },
];

export function AppSidebar() {
  const location = useLocation();
  const { signOut, roles } = useAuth();
  const isAdmin = roles.includes("admin");

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-card">
      <SidebarHeader className="flex items-center justify-center py-4">
        <Link to="/dashboard" className="flex items-center gap-2">
          <img src={nexaLogo} alt="Nexa" className="h-8 w-8 rounded-lg" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={signOut}>
              <LogOut className="h-5 w-5" />
              <span>Salir</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
