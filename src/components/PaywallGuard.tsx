import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Lock, Crown, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PaywallGuardProps {
  children: ReactNode;
  title?: string;
  description?: string;
  requiredLevel?: "premium" | "pro";
  feature?: string;
}

export const PaywallGuard = ({
  children,
  title = "Contenido Premium",
  description = "Este contenido requiere una suscripción activa",
  requiredLevel = "premium",
  feature
}: PaywallGuardProps) => {
  const { subscription, subscriptionLoading } = useAuth();

  const subscribed = Boolean(subscription?.subscribed);
  const plan = (subscription?.plan ?? "").toLowerCase();
  const isPro = subscribed && plan.includes("pro");
  const isPremium = subscribed && (plan.includes("premium") || plan.includes("pro"));
  const hasAccess = requiredLevel === "premium" ? isPremium : isPro;

  if (subscriptionLoading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center bg-background rounded-lg border border-border">
        <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (hasAccess) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 rounded-lg" />

      {/* Blurred content */}
      <div className="pointer-events-none select-none filter blur-sm opacity-50">
        {children}
      </div>

      {/* Paywall card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center p-6">
        <Card className="max-w-md w-full border-2 border-primary/20 bg-card/95 backdrop-blur-sm">
          <CardContent className="pt-6 text-center">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                {requiredLevel === "pro" ? (
                  <Crown className="h-6 w-6 text-primary" />
                ) : (
                  <Lock className="h-6 w-6 text-primary" />
                )}
              </div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{description}</p>
              {feature && (
                <Badge variant="secondary" className="mb-4">
                  {feature}
                </Badge>
              )}
            </div>

            <div className="space-y-3">
              <Button asChild className="w-full">
                <a href="/precios">
                  <Crown className="h-4 w-4 mr-2" />
                  {requiredLevel === "pro" ? "Upgrade a Ruta PRO" : "Upgrade a Premium"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </Button>

              <p className="text-xs text-muted-foreground">
                Accede a contenido exclusivo, recursos premium y soporte prioritario
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};
