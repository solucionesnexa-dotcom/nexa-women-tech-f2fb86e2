import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { User, Camera, Loader2, CreditCard, Zap, Compass, Rocket, TrendingUp, BookOpen, Trophy, Target } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const Perfil = () => {
  const { user, isFounder, subscription, refreshSubscription } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user) return;
    // Fetch profile
    supabase
      .from("profiles")
      .select("full_name, bio, avatar_url")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setFullName(data.full_name ?? "");
          setBio(data.bio ?? "");
          setAvatarUrl(data.avatar_url);
        }
      });
    void refreshSubscription();
  }, [user]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${user.id}/avatar.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true });
      if (uploadError) throw uploadError;
      const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(path);
      const newUrl = `${urlData.publicUrl}?t=${Date.now()}`;
      setAvatarUrl(newUrl);
      await supabase.from("profiles").update({ avatar_url: newUrl }).eq("user_id", user.id);
      toast({ title: "Avatar actualizado" });
    } catch (err: any) {
      toast({ title: "Error subiendo avatar", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName, bio })
      .eq("user_id", user.id);
    setSaving(false);
    if (error) {
      toast({ title: "Error guardando", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Perfil actualizado ✨" });
    }
  };

  const handleManageSubscription = async () => {
    const { data, error } = await supabase.functions.invoke("customer-portal");
    if (data?.url) {
      window.open(data.url, "_blank");
      void refreshSubscription();
    } else {
      toast({ title: "Error", description: error?.message || "No se pudo abrir el portal.", variant: "destructive" });
    }
  };

  const initials = (fullName || user?.email || "U").slice(0, 2).toUpperCase();

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
            <User size={24} />
          </div>
          <h1 className="font-display text-3xl font-bold">Tu Perfil</h1>
        </div>
        <p className="text-muted-foreground">Gestiona tus datos y preferencias.</p>
      </motion.div>

      <div className="space-y-6">
        {/* Avatar + Name */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-5">
              <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <Avatar className="h-20 w-20">
                  <AvatarImage src={avatarUrl ?? undefined} />
                  <AvatarFallback className="text-lg">{initials}</AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  {uploading ? <Loader2 size={20} className="text-white animate-spin" /> : <Camera size={20} className="text-white" />}
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Nombre</label>
                  <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Tu nombre" className="mt-1" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</label>
                  <p className="text-sm font-medium mt-1 text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bio */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Bio</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Cuéntanos sobre ti..." rows={3} />
          </CardContent>
        </Card>

        {/* Ruta Actual */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Target size={16} />
              Tu Ruta Actual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Ruta Automatiza</p>
                  <p className="text-sm text-muted-foreground">Constructor Inicial</p>
                </div>
              </div>
              <Badge variant="secondary">Nivel 1</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Progreso */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp size={16} />
              Tu Progreso
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Ruta Automatiza</span>
                <span>65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">12</p>
                <p className="text-xs text-muted-foreground">Lecciones completadas</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">450</p>
                <p className="text-xs text-muted-foreground">Puntos ganados</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">3</p>
                <p className="text-xs text-muted-foreground">Retos completados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recursos Desbloqueados */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen size={16} />
              Recursos Desbloqueados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Prompts para Automatización</p>
                    <p className="text-sm text-muted-foreground">Colección de prompts probados</p>
                  </div>
                </div>
                <Badge variant="outline">Descargado</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-secondary" />
                  <div>
                    <p className="font-medium">Reto: Primera Automatización</p>
                    <p className="text-sm text-muted-foreground">Completado - 100 puntos</p>
                  </div>
                </div>
                <Badge variant="default">Completado</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg opacity-60">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">JSONs de Flujos de Trabajo</p>
                    <p className="text-sm text-muted-foreground">Plantillas JSON avanzadas</p>
                  </div>
                </div>
                <Badge variant="secondary">Premium</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CreditCard size={16} />
              Suscripción
            </CardTitle>
          </CardHeader>
          <CardContent>
            {subscription?.subscribed ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="default">Activa</Badge>
                  {isFounder && <Badge variant="secondary">Fundadora</Badge>}
                </div>
                {subscription.subscription_end && (
                  <p className="text-sm text-muted-foreground">
                    Próxima renovación: {new Date(subscription.subscription_end).toLocaleDateString("es-ES")}
                  </p>
                )}
                <Button variant="outline" size="sm" onClick={handleManageSubscription}>
                  Gestionar suscripción
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">No tienes una suscripción activa.</p>
                <Button variant="default" size="sm" asChild>
                  <a href="/precios">Ver planes</a>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Save button */}
        <Button onClick={handleSave} disabled={saving} className="w-full">
          {saving ? <Loader2 size={16} className="mr-2 animate-spin" /> : null}
          Guardar cambios
        </Button>
      </div>
    </div>
  );
};

export default Perfil;
