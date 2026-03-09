import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, Plus, Trash2 } from "lucide-react";

interface Cohort {
  id: string;
  name: string;
  description: string | null;
  start_date: string | null;
  max_members: number | null;
  created_at: string;
}

const AdminCohorts = () => {
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [maxMembers, setMaxMembers] = useState("20");

  const fetchCohorts = async () => {
    setLoading(true);
    const { data } = await supabase.from("cohorts").select("*").order("created_at", { ascending: false });
    setCohorts(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchCohorts(); }, []);

  const handleCreate = async () => {
    if (!name.trim()) return;
    await supabase.from("cohorts").insert({
      name: name.trim(),
      description: description.trim() || null,
      start_date: startDate || null,
      max_members: parseInt(maxMembers) || 20,
    });
    setName("");
    setDescription("");
    setStartDate("");
    setMaxMembers("20");
    fetchCohorts();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("cohorts").delete().eq("id", id);
    fetchCohorts();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-card border border-border p-6">
        <h3 className="font-display font-bold mb-4 flex items-center gap-2">
          <Plus size={18} className="text-primary" /> Crear cohorte
        </h3>
        <div className="space-y-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre de la cohorte"
            className="w-full rounded-lg bg-muted/50 border border-border px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary" />
          <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción (opcional)"
            className="w-full rounded-lg bg-muted/50 border border-border px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary" />
          <div className="flex gap-3 flex-wrap items-end">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Fecha inicio</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                className="rounded-lg bg-muted/50 border border-border px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Máx. miembros</label>
              <input type="number" value={maxMembers} onChange={(e) => setMaxMembers(e.target.value)} min="1"
                className="w-24 rounded-lg bg-muted/50 border border-border px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary" />
            </div>
            <button onClick={handleCreate} disabled={!name.trim()}
              className="ml-auto rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-cyan-600 disabled:opacity-50">
              Crear
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-gradient-card border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="font-display font-bold">Cohortes ({cohorts.length})</h2>
        </div>
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Cargando...</div>
        ) : cohorts.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No hay cohortes todavía.</div>
        ) : (
          <div className="divide-y divide-border/50">
            {cohorts.map((c) => (
              <div key={c.id} className="flex items-center justify-between px-4 py-3 hover:bg-muted/20">
                <div className="flex items-center gap-3 min-w-0">
                  <BookOpen size={16} className="shrink-0 text-primary" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {c.start_date ? new Date(c.start_date).toLocaleDateString("es-ES") : "Sin fecha"} · Máx. {c.max_members ?? 20} miembros
                    </p>
                  </div>
                </div>
                <button onClick={() => handleDelete(c.id)} className="text-destructive/60 hover:text-destructive shrink-0 ml-3">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCohorts;
