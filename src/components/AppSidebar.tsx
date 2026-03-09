import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Users, FlaskConical, Bot, User, LogOut, Briefcase } from "lucide-react";
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
  { title: "Ruta", url: "/ruta", icon: BookOpen },
  { title: "Comunidad", url: "/comunidad", icon: Users },
  { title: "Labs", url: "/labs", icon: FlaskConical },
  { title: "AI Toolkit", url: "/ai-toolkit", icon: Bot },
  { title: "Career OS", url: "/career-os", icon: Briefcase },
  { title: "Perfil", url: "/perfil", icon: User },
];

export function AppSidebar() {
  const location = useLocation();
  const { signOut } = useAuth();

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