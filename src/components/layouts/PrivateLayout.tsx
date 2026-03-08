import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet } from "react-router-dom";
import AuthGuard from "@/components/AuthGuard";

const PrivateLayout = () => {
  return (
    <AuthGuard>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background">
          <AppSidebar />
          <div className="flex w-full flex-col">
            <header className="flex h-14 items-center gap-4 border-b border-border px-6 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
              <SidebarTrigger />
            </header>
            <main className="flex-1 overflow-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </AuthGuard>
  );
};

export default PrivateLayout;