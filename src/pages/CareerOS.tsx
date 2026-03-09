import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import {
  Target, Brain, Cpu, Zap, Rocket, Calendar, TrendingUp,
  Plus, X, Save, Sparkles
} from "lucide-react";

type CareerData = {
  career_vision: {
    objective?: string;
    flexibility?: string;
    income_target?: string;
    work_type?: string[];
    preferences?: string[];
  };
  skills_map: {
    current_skills?: { name: string; level: number }[];
    new_skills?: { name: string; level: number }[];
  };
  ai_stack: { tool: string; use_case: string }[];
  automation_builder: { task: string; solution: string; tool: string }[];
  opportunity_builder: { opportunity: string; type: string; status: string }[];
  personal_workflow: {
    [key: string]: string;
  };
  progress_tracker: {
    skills_learned?: number;
    automations_created?: number;
    projects_launched?: number;
  };
};

const DEFAULT_DATA: CareerData = {
  career_vision: { objective: "", flexibility: "", income_target: "", work_type: [], preferences: [] },
  skills_map: { current_skills: [], new_skills: [] },
  ai_stack: [],
  automation_builder: [],
  opportunity_builder: [],
  personal_workflow: {
    lunes: "Planificación con IA",
    martes: "Trabajo profundo",
    miercoles: "Automatización",
    jueves: "Proyectos",
    viernes: "Aprendizaje",
  },
  progress_tracker: { skills_learned: 0, automations_created: 0, projects_launched: 0 },
};

const VISION_PREFERENCES = [
  "Trabajar remoto",
  "Reducir tareas repetitivas",
  "Crear proyectos propios",
  "Usar IA en mi trabajo",
  "Flexibilidad horaria",
  "Ingresos pasivos",
];

const DAYS = [
  { key: "lunes", label: "Lunes" },
  { key: "martes", label: "Martes" },
  { key: "miercoles", label: "Miércoles" },
  { key: "jueves", label: "Jueves" },
  { key: "viernes", label: "Viernes" },
];

export default function CareerOS() {
  const { user } = useAuth();
  const [data, setData] = useState<CareerData>(DEFAULT_DATA);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("career_os")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data: row }) => {
        if (row) {
          setData({
            career_vision: (row.career_vision as any) || DEFAULT_DATA.career_vision,
            skills_map: (row.skills_map as any) || DEFAULT_DATA.skills_map,
            ai_stack: (row.ai_stack as any) || DEFAULT_DATA.ai_stack,
            automation_builder: (row.automation_builder as any) || DEFAULT_DATA.automation_builder,
            opportunity_builder: (row.opportunity_builder as any) || DEFAULT_DATA.opportunity_builder,
            personal_workflow: (row.personal_workflow as any) || DEFAULT_DATA.personal_workflow,
            progress_tracker: (row.progress_tracker as any) || DEFAULT_DATA.progress_tracker,
          });
        }
        setLoaded(true);
      });
  }, [user]);

  const save = async () => {
    if (!user) return;
    setSaving(true);
    const payload = {
      user_id: user.id,
      career_vision: data.career_vision as any,
      skills_map: data.skills_map as any,
      ai_stack: data.ai_stack as any,
      automation_builder: data.automation_builder as any,
      opportunity_builder: data.opportunity_builder as any,
      personal_workflow: data.personal_workflow as any,
      progress_tracker: data.progress_tracker as any,
    };
    const { error } = await supabase.from("career_os").upsert(payload, { onConflict: "user_id" });
    setSaving(false);
    if (error) toast({ title: "Error al guardar", variant: "destructive" });
    else toast({ title: "Career OS guardado ✓" });
  };

  const update = <K extends keyof CareerData>(key: K, value: CareerData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const vision = data.career_vision;
  const skills = data.skills_map;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-5xl mx-auto"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-display)] text-foreground flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Career OS
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Tu sistema operativo profesional potenciado con IA
          </p>
        </div>
        <Button onClick={save} disabled={saving} className="gap-2">
          <Save className="h-4 w-4" />
          {saving ? "Guardando..." : "Guardar todo"}
        </Button>
      </div>

      <Tabs defaultValue="vision" className="w-full">
        <TabsList className="w-full flex-wrap h-auto gap-1 bg-card border border-border p-1">
          <TabsTrigger value="vision" className="gap-1.5 text-xs"><Target className="h-3.5 w-3.5" />Visión</TabsTrigger>
          <TabsTrigger value="skills" className="gap-1.5 text-xs"><Brain className="h-3.5 w-3.5" />Skills</TabsTrigger>
          <TabsTrigger value="aistack" className="gap-1.5 text-xs"><Cpu className="h-3.5 w-3.5" />AI Stack</TabsTrigger>
          <TabsTrigger value="automation" className="gap-1.5 text-xs"><Zap className="h-3.5 w-3.5" />Automatización</TabsTrigger>
          <TabsTrigger value="opportunities" className="gap-1.5 text-xs"><Rocket className="h-3.5 w-3.5" />Oportunidades</TabsTrigger>
          <TabsTrigger value="workflow" className="gap-1.5 text-xs"><Calendar className="h-3.5 w-3.5" />Workflow</TabsTrigger>
          <TabsTrigger value="progress" className="gap-1.5 text-xs"><TrendingUp className="h-3.5 w-3.5" />Progreso</TabsTrigger>
        </TabsList>

        {/* 1 — Career Vision */}
        <TabsContent value="vision">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-primary" />Visión Profesional</CardTitle>
              <CardDescription>Define qué tipo de vida profesional quieres construir</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Objetivo profesional</Label>
                  <Textarea
                    placeholder="Ej: Ser freelance digital con ingresos estables usando IA"
                    value={vision.objective || ""}
                    onChange={(e) => update("career_vision", { ...vision, objective: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Ingresos objetivo</Label>
                  <Input
                    placeholder="Ej: 3.000€/mes"
                    value={vision.income_target || ""}
                    onChange={(e) => update("career_vision", { ...vision, income_target: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Nivel de flexibilidad</Label>
                  <Select
                    value={vision.flexibility || ""}
                    onValueChange={(v) => update("career_vision", { ...vision, flexibility: v })}
                  >
                    <SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="total">Total (100% remoto)</SelectItem>
                      <SelectItem value="alta">Alta (mayoría remoto)</SelectItem>
                      <SelectItem value="media">Media (híbrido)</SelectItem>
                      <SelectItem value="baja">Baja (presencial)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tipo de trabajo</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Empleo", "Freelance", "Proyectos", "Híbrido"].map((t) => {
                      const sel = vision.work_type || [];
                      const active = sel.includes(t);
                      return (
                        <Badge
                          key={t}
                          variant={active ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() =>
                            update("career_vision", {
                              ...vision,
                              work_type: active ? sel.filter((x) => x !== t) : [...sel, t],
                            })
                          }
                        >
                          {t}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Quiero...</Label>
                <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                  {VISION_PREFERENCES.map((pref) => {
                    const prefs = vision.preferences || [];
                    return (
                      <div key={pref} className="flex items-center gap-2">
                        <Checkbox
                          checked={prefs.includes(pref)}
                          onCheckedChange={(checked) =>
                            update("career_vision", {
                              ...vision,
                              preferences: checked ? [...prefs, pref] : prefs.filter((p) => p !== pref),
                            })
                          }
                        />
                        <span className="text-sm text-foreground">{pref}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 2 — Skills Map */}
        <TabsContent value="skills">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Brain className="h-5 w-5 text-primary" />Mapa de Habilidades</CardTitle>
              <CardDescription>Identifica tus habilidades actuales y las que quieres desarrollar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <SkillsList
                title="Habilidades actuales"
                items={skills.current_skills || []}
                onChange={(v) => update("skills_map", { ...skills, current_skills: v })}
              />
              <SkillsList
                title="Habilidades nuevas"
                items={skills.new_skills || []}
                onChange={(v) => update("skills_map", { ...skills, new_skills: v })}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* 3 — AI Stack */}
        <TabsContent value="aistack">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Cpu className="h-5 w-5 text-primary" />AI Stack Personal</CardTitle>
              <CardDescription>Crea tu stack de herramientas de IA para el día a día</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.ai_stack.map((item, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Input
                    placeholder="Herramienta (ej: ChatGPT)"
                    value={item.tool}
                    onChange={(e) => {
                      const arr = [...data.ai_stack];
                      arr[i] = { ...arr[i], tool: e.target.value };
                      update("ai_stack", arr);
                    }}
                    className="flex-1"
                  />
                  <span className="text-muted-foreground">→</span>
                  <Input
                    placeholder="Uso (ej: escritura)"
                    value={item.use_case}
                    onChange={(e) => {
                      const arr = [...data.ai_stack];
                      arr[i] = { ...arr[i], use_case: e.target.value };
                      update("ai_stack", arr);
                    }}
                    className="flex-1"
                  />
                  <Button size="icon" variant="ghost" onClick={() => update("ai_stack", data.ai_stack.filter((_, j) => j !== i))}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => update("ai_stack", [...data.ai_stack, { tool: "", use_case: "" }])} className="gap-1">
                <Plus className="h-4 w-4" /> Añadir herramienta
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 4 — Automation Builder */}
        <TabsContent value="automation">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5 text-accent" />Automation Builder</CardTitle>
              <CardDescription>Identifica tareas repetitivas y automatízalas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.automation_builder.map((item, i) => (
                <div key={i} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 items-center">
                  <Input placeholder="Tarea" value={item.task} onChange={(e) => { const arr = [...data.automation_builder]; arr[i] = { ...arr[i], task: e.target.value }; update("automation_builder", arr); }} />
                  <Input placeholder="Solución" value={item.solution} onChange={(e) => { const arr = [...data.automation_builder]; arr[i] = { ...arr[i], solution: e.target.value }; update("automation_builder", arr); }} />
                  <Input placeholder="Herramienta" value={item.tool} onChange={(e) => { const arr = [...data.automation_builder]; arr[i] = { ...arr[i], tool: e.target.value }; update("automation_builder", arr); }} />
                  <Button size="icon" variant="ghost" onClick={() => update("automation_builder", data.automation_builder.filter((_, j) => j !== i))}><X className="h-4 w-4" /></Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => update("automation_builder", [...data.automation_builder, { task: "", solution: "", tool: "" }])} className="gap-1">
                <Plus className="h-4 w-4" /> Añadir automatización
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 5 — Opportunity Builder */}
        <TabsContent value="opportunities">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Rocket className="h-5 w-5 text-secondary" />Opportunity Builder</CardTitle>
              <CardDescription>Identifica oportunidades profesionales nuevas gracias a IA</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.opportunity_builder.map((item, i) => (
                <div key={i} className="grid grid-cols-[1fr_auto_auto_auto] gap-2 items-center">
                  <Input placeholder="Oportunidad" value={item.opportunity} onChange={(e) => { const arr = [...data.opportunity_builder]; arr[i] = { ...arr[i], opportunity: e.target.value }; update("opportunity_builder", arr); }} />
                  <Select value={item.type} onValueChange={(v) => { const arr = [...data.opportunity_builder]; arr[i] = { ...arr[i], type: v }; update("opportunity_builder", arr); }}>
                    <SelectTrigger className="w-[140px]"><SelectValue placeholder="Tipo" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="empleo">Empleo</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                      <SelectItem value="proyecto">Proyecto</SelectItem>
                      <SelectItem value="producto">Producto</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={item.status} onValueChange={(v) => { const arr = [...data.opportunity_builder]; arr[i] = { ...arr[i], status: v }; update("opportunity_builder", arr); }}>
                    <SelectTrigger className="w-[130px]"><SelectValue placeholder="Estado" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="idea">💡 Idea</SelectItem>
                      <SelectItem value="explorando">🔍 Explorando</SelectItem>
                      <SelectItem value="en_marcha">🚀 En marcha</SelectItem>
                      <SelectItem value="completado">✅ Completado</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="icon" variant="ghost" onClick={() => update("opportunity_builder", data.opportunity_builder.filter((_, j) => j !== i))}><X className="h-4 w-4" /></Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => update("opportunity_builder", [...data.opportunity_builder, { opportunity: "", type: "proyecto", status: "idea" }])} className="gap-1">
                <Plus className="h-4 w-4" /> Añadir oportunidad
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 6 — Personal Workflow */}
        <TabsContent value="workflow">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" />Personal Workflow</CardTitle>
              <CardDescription>Diseña tu sistema de trabajo semanal ideal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {DAYS.map((day) => (
                <div key={day.key} className="flex items-center gap-3">
                  <span className="w-24 text-sm font-medium text-foreground">{day.label}</span>
                  <span className="text-muted-foreground">→</span>
                  <Input
                    value={data.personal_workflow[day.key] || ""}
                    onChange={(e) => update("personal_workflow", { ...data.personal_workflow, [day.key]: e.target.value })}
                    placeholder="¿Qué haces este día?"
                    className="flex-1"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 7 — Progress Tracker */}
        <TabsContent value="progress">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-accent" />Progress Tracker</CardTitle>
              <CardDescription>Tu evolución profesional con Career OS</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { key: "skills_learned" as const, label: "Habilidades aprendidas", max: 20 },
                { key: "automations_created" as const, label: "Automatizaciones creadas", max: 10 },
                { key: "projects_launched" as const, label: "Proyectos lanzados", max: 5 },
              ].map(({ key, label, max }) => {
                const val = data.progress_tracker[key] || 0;
                return (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground font-medium">{label}</span>
                      <span className="text-muted-foreground">{val}/{max}</span>
                    </div>
                    <Progress value={(val / max) * 100} className="h-2" />
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => update("progress_tracker", { ...data.progress_tracker, [key]: Math.max(0, val - 1) })}>−</Button>
                      <Button size="sm" variant="outline" onClick={() => update("progress_tracker", { ...data.progress_tracker, [key]: val + 1 })}>+</Button>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

/* ---------- Subcomponent: SkillsList ---------- */
function SkillsList({
  title,
  items,
  onChange,
}: {
  title: string;
  items: { name: string; level: number }[];
  onChange: (v: { name: string; level: number }[]) => void;
}) {
  return (
    <div className="space-y-3">
      <Label className="text-base">{title}</Label>
      {items.map((skill, i) => (
        <div key={i} className="flex gap-2 items-center">
          <Input
            placeholder="Habilidad"
            value={skill.name}
            onChange={(e) => {
              const arr = [...items];
              arr[i] = { ...arr[i], name: e.target.value };
              onChange(arr);
            }}
            className="flex-1"
          />
          <Select
            value={String(skill.level)}
            onValueChange={(v) => {
              const arr = [...items];
              arr[i] = { ...arr[i], level: Number(v) };
              onChange(arr);
            }}
          >
            <SelectTrigger className="w-[130px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Básico</SelectItem>
              <SelectItem value="2">Intermedio</SelectItem>
              <SelectItem value="3">Avanzado</SelectItem>
            </SelectContent>
          </Select>
          <Button size="icon" variant="ghost" onClick={() => onChange(items.filter((_, j) => j !== i))}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={() => onChange([...items, { name: "", level: 1 }])} className="gap-1">
        <Plus className="h-4 w-4" /> Añadir
      </Button>
    </div>
  );
}
