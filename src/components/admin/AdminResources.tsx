import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Upload, Trash2, FileText, ExternalLink } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string | null;
  type: string;
  file_url: string | null;
  created_at: string;
}

const AdminResources = () => {
  const { user } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("PDF");
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchResources = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("resources")
      .select("*")
      .order("created_at", { ascending: false });
    setResources((data as Resource[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchResources(); }, []);

  const handleUpload = async () => {
    if (!title.trim() || !user) return;
    setUploading(true);

    let fileUrl: string | null = null;
    const file = fileRef.current?.files?.[0];

    if (file) {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("resources").upload(path, file);
      if (!error) {
        const { data: urlData } = supabase.storage.from("resources").getPublicUrl(path);
        fileUrl = urlData.publicUrl;
      }
    }

    await supabase.from("resources").insert({
      title: title.trim(),
      description: description.trim() || null,
      type,
      file_url: fileUrl,
      uploaded_by: user.id,
    } as any);

    setTitle("");
    setDescription("");
    setType("PDF");
    if (fileRef.current) fileRef.current.value = "";
    setUploading(false);
    fetchResources();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("resources").delete().eq("id", id);
    fetchResources();
  };

  return (
    <div className="space-y-6">
      {/* Upload form */}
      <div className="rounded-2xl bg-gradient-card border border-border p-6">
        <h3 className="font-display font-bold mb-4 flex items-center gap-2">
          <Upload size={18} className="text-primary" /> Subir recurso
        </h3>
        <div className="space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título del recurso"
            className="w-full rounded-lg bg-muted/50 border border-border px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción (opcional)"
            className="w-full rounded-lg bg-muted/50 border border-border px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
          />
          <div className="flex gap-3 flex-wrap items-center">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-lg bg-muted/50 border border-border px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
            >
              <option value="PDF">PDF</option>
              <option value="Doc">Doc</option>
              <option value="Notion">Notion</option>
              <option value="Video">Video</option>
              <option value="Template">Template</option>
              <option value="Otro">Otro</option>
            </select>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.md,.csv,.zip,.png,.jpg,.jpeg,.mp4"
              className="text-sm text-muted-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-primary/10 file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-primary file:cursor-pointer"
            />
            <button
              onClick={handleUpload}
              disabled={!title.trim() || uploading}
              className="ml-auto rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition hover:shadow-glow-primary disabled:opacity-50"
            >
              {uploading ? "Subiendo..." : "Subir"}
            </button>
          </div>
        </div>
      </div>

      {/* Resources list */}
      <div className="rounded-2xl bg-gradient-card border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="font-display font-bold">Recursos ({resources.length})</h2>
        </div>
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Cargando...</div>
        ) : resources.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No hay recursos todavía.</div>
        ) : (
          <div className="divide-y divide-border/50">
            {resources.map((res) => (
              <div key={res.id} className="flex items-center justify-between px-4 py-3 hover:bg-muted/20">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText size={16} className="shrink-0 text-accent" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{res.title}</p>
                    {res.description && <p className="text-xs text-muted-foreground truncate">{res.description}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-3">
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">{res.type}</span>
                  {res.file_url && (
                    <a href={res.file_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                      <ExternalLink size={14} />
                    </a>
                  )}
                  <button onClick={() => handleDelete(res.id)} className="text-destructive/60 hover:text-destructive">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminResources;
