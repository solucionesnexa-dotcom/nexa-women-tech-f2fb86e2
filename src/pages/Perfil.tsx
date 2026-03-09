import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { User, Camera, Loader2, CreditCard } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Perfil = () => {
  const { user, isFounder } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);

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
    // Fetch subscription
    supabase.functions
      .invoke("check-subscription")
      .then(({ data }) => setSubscription(data));
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
