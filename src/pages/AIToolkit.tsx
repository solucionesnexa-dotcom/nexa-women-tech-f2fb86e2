import { motion } from "framer-motion";
import { Bot, Sparkles, Target, Send, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

const TOOLKIT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-toolkit`;

type Msg = { role: "user" | "assistant"; content: string };

const AIToolkit = () => {
  const [activeTool, setActiveTool] = useState<"copy" | "strategy">("copy");
  const [messages, setMessages] = useState<Record<string, Msg[]>>({ copy: [], strategy: [] });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeTool]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: Msg = { role: "user", content: input.trim() };
    const currentMsgs = [...(messages[activeTool] || []), userMsg];
    setMessages((prev) => ({ ...prev, [activeTool]: currentMsgs }));
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";

    try {
      const resp = await fetch(TOOLKIT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: currentMsgs, tool: activeTool }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Error de conexión" }));
        toast({ title: "Error", description: err.error, variant: "destructive" });
        setIsLoading(false);
        return;
      }

      const reader = resp.body?.getReader();
      if (!reader) throw new Error("No reader");
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantSoFar += content;
              setMessages((prev) => {
                const msgs = [...(prev[activeTool] || [])];
                // Find last user msg index
                const lastIdx = msgs.length - 1;
                if (msgs[lastIdx]?.role === "assistant") {
                  msgs[lastIdx] = { ...msgs[lastIdx], content: assistantSoFar };
                } else {
                  msgs.push({ role: "assistant", content: assistantSoFar });
                }
                return { ...prev, [activeTool]: msgs };
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const currentMessages = messages[activeTool] || [];

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Bot size={24} />
          </div>
          <h1 className="font-display text-3xl font-bold">AI Toolkit</h1>
        </div>
        <p className="text-muted-foreground">Tu arsenal de herramientas de Inteligencia Artificial.</p>
      </motion.div>

      <Tabs value={activeTool} onValueChange={(v) => setActiveTool(v as "copy" | "strategy")}>
        <TabsList className="mb-4">
          <TabsTrigger value="copy" className="gap-2">
            <Sparkles size={14} /> Generador de Copy
          </TabsTrigger>
          <TabsTrigger value="strategy" className="gap-2">
            <Target size={14} /> Asistente Estratégico
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTool}>
          <Card className="border-border">
            <CardContent className="p-0">
              {/* Chat area */}
              <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                {currentMessages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                    {activeTool === "copy" ? (
                      <>
                        <Sparkles size={40} className="mb-3 opacity-30" />
                        <p className="text-sm">Describe tu negocio y qué tipo de texto necesitas.</p>
                        <p className="text-xs mt-1">Ej: "Necesito un caption para Instagram sobre mi curso de coaching"</p>
                      </>
                    ) : (
                      <>
                        <Target size={40} className="mb-3 opacity-30" />
                        <p className="text-sm">Cuéntame tu situación actual y te ayudo a trazar una estrategia.</p>
                        <p className="text-xs mt-1">Ej: "Tengo un negocio de diseño web y quiero escalar a 5K/mes"</p>
                      </>
                    )}
                  </div>
                )}
                {currentMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {msg.role === "assistant" ? (
                        <ReactMarkdown className="prose prose-sm dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                          {msg.content}
                        </ReactMarkdown>
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && currentMessages[currentMessages.length - 1]?.role !== "assistant" && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl px-4 py-2.5">
                      <Loader2 size={16} className="animate-spin text-muted-foreground" />
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>

              {/* Input */}
              <div className="border-t border-border p-3 flex gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder={activeTool === "copy" ? "Describe qué texto necesitas..." : "Cuéntame tu situación..."}
                  rows={1}
                  className="min-h-[40px] resize-none"
                />
                <Button onClick={sendMessage} disabled={isLoading || !input.trim()} size="icon" className="shrink-0">
                  <Send size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIToolkit;
