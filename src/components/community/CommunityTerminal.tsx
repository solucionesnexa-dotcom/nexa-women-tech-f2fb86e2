import { useState, useRef, useEffect, useCallback } from "react";
import { Terminal as TerminalIcon } from "lucide-react";

interface Line {
  type: "input" | "output" | "error" | "info";
  text: string;
}

const FILESYSTEM: Record<string, string[]> = {
  "~": ["documentos", "proyectos", "scripts", ".bashrc"],
  "~/documentos": ["notas.txt", "plan.md"],
  "~/proyectos": ["mi-web", "automatizacion"],
  "~/proyectos/mi-web": ["index.html", "style.css"],
  "~/proyectos/automatizacion": ["workflow.py", "README.md"],
  "~/scripts": ["backup.sh", "deploy.sh"],
};

const FILE_CONTENTS: Record<string, string> = {
  "~/documentos/notas.txt": "📝 Nota: Aprender a usar la terminal es el primer paso hacia la soberanía digital.",
  "~/documentos/plan.md": "# Plan Semanal\n- Lunes: Visión\n- Miércoles: Práctica\n- Viernes: Reto",
  "~/.bashrc": "# Configuración de bash\nexport PATH=$PATH:~/scripts\nalias ll='ls -la'",
  "~/proyectos/mi-web/index.html": "<!DOCTYPE html>\n<html>\n<head><title>Mi Web</title></head>\n<body><h1>Hola Mundo!</h1></body>\n</html>",
  "~/proyectos/mi-web/style.css": "body { font-family: sans-serif; background: #0a0a0a; color: #e0e0e0; }",
  "~/proyectos/automatizacion/workflow.py": "# Workflow de automatización\nimport schedule\n\ndef tarea():\n    print('Tarea automatizada ✅')\n\nschedule.every(1).hour.do(tarea)",
  "~/proyectos/automatizacion/README.md": "# Automatización\nEste proyecto automatiza tareas repetitivas con Python.",
  "~/scripts/backup.sh": "#!/bin/bash\necho 'Creando backup...'\ntar -czf backup.tar.gz ~/proyectos/\necho 'Backup completado ✅'",
  "~/scripts/deploy.sh": "#!/bin/bash\necho 'Desplegando proyecto...'\necho 'Deploy completado 🚀'",
};

const HINTS: Record<string, string> = {
  ls: "Lista archivos y carpetas en el directorio actual",
  cd: "Cambia de directorio. Ej: cd documentos",
  cat: "Muestra el contenido de un archivo. Ej: cat notas.txt",
  pwd: "Muestra la ruta del directorio actual",
  echo: "Imprime texto en la terminal. Ej: echo Hola",
  mkdir: "Crea un directorio. Ej: mkdir nueva-carpeta",
  clear: "Limpia la pantalla de la terminal",
  help: "Muestra los comandos disponibles",
  whoami: "Muestra el usuario actual",
  date: "Muestra la fecha y hora actual",
  history: "Muestra el historial de comandos",
};

const WELCOME: Line[] = [
  { type: "info", text: "╔═══════════════════════════════════════════╗" },
  { type: "info", text: "║   🖥️  Terminal Nexa — Simulador Ubuntu    ║" },
  { type: "info", text: "║   Practica comandos Linux de forma segura ║" },
  { type: "info", text: "║   Escribe 'help' para ver los comandos    ║" },
  { type: "info", text: "╚═══════════════════════════════════════════╝" },
  { type: "output", text: "" },
];

const CommunityTerminal = () => {
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("~");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const addLines = useCallback((newLines: Line[]) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  const resolvePath = (path: string): string => {
    if (path === "~" || path === "/home/nexa") return "~";
    if (path === "..") {
      const parts = cwd.split("/");
      return parts.length > 1 ? parts.slice(0, -1).join("/") || "~" : "~";
    }
    if (path === ".") return cwd;
    if (path.startsWith("~/")) return path;
    return cwd === "~" ? `~/${path}` : `${cwd}/${path}`;
  };

  const processCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim();
      if (!trimmed) return;

      addLines([{ type: "input", text: `nexa@ubuntu:${cwd}$ ${trimmed}` }]);
      setCommandHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);

      const [command, ...args] = trimmed.split(/\s+/);
      const arg = args.join(" ");

      switch (command) {
        case "help": {
          const helpLines: Line[] = [
            { type: "info", text: "Comandos disponibles:" },
            ...Object.entries(HINTS).map(([cmd, desc]) => ({
              type: "output" as const,
              text: `  ${cmd.padEnd(10)} ${desc}`,
            })),
          ];
          addLines(helpLines);
          break;
        }
        case "ls": {
          const target = arg ? resolvePath(arg) : cwd;
          const contents = FILESYSTEM[target];
          if (contents) {
            addLines([{ type: "output", text: contents.join("  ") }]);
          } else {
            addLines([{ type: "error", text: `ls: no se puede acceder a '${arg}': No existe el directorio` }]);
          }
          break;
        }
        case "cd": {
          if (!arg || arg === "~") {
            setCwd("~");
          } else {
            const target = resolvePath(arg);
            if (FILESYSTEM[target]) {
              setCwd(target);
            } else {
              addLines([{ type: "error", text: `cd: ${arg}: No existe el directorio` }]);
            }
          }
          break;
        }
        case "pwd":
          addLines([{ type: "output", text: cwd.replace("~", "/home/nexa") }]);
          break;
        case "cat": {
          if (!arg) {
            addLines([{ type: "error", text: "cat: falta el operando del archivo" }]);
          } else {
            const filePath = resolvePath(arg);
            const content = FILE_CONTENTS[filePath];
            if (content) {
              content.split("\n").forEach((line) => addLines([{ type: "output", text: line }]));
            } else {
              addLines([{ type: "error", text: `cat: ${arg}: No existe el archivo` }]);
            }
          }
          break;
        }
        case "echo":
          addLines([{ type: "output", text: arg || "" }]);
          break;
        case "whoami":
          addLines([{ type: "output", text: "nexa" }]);
          break;
        case "date":
          addLines([{ type: "output", text: new Date().toLocaleString("es-ES", { dateStyle: "full", timeStyle: "medium" }) }]);
          break;
        case "mkdir":
          if (!arg) {
            addLines([{ type: "error", text: "mkdir: falta el operando" }]);
          } else {
            addLines([{ type: "output", text: `Directorio '${arg}' creado (simulado)` }]);
          }
          break;
        case "clear":
          setLines([]);
          break;
        case "history":
          commandHistory.forEach((cmd, i) =>
            addLines([{ type: "output", text: `  ${i + 1}  ${cmd}` }])
          );
          break;
        default:
          addLines([{ type: "error", text: `${command}: comando no encontrado. Escribe 'help' para ver los comandos disponibles.` }]);
      }
    },
    [cwd, commandHistory, addLines]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      processCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Simple tab completion
      const contents = FILESYSTEM[cwd];
      if (contents && input) {
        const match = contents.find((f) => f.startsWith(input.split(/\s+/).pop() || ""));
        if (match) {
          const parts = input.split(/\s+/);
          parts[parts.length - 1] = match;
          setInput(parts.join(" "));
        }
      }
    }
  };

  const lineColor = (type: Line["type"]) => {
    switch (type) {
      case "input": return "text-primary";
      case "error": return "text-destructive";
      case "info": return "text-accent";
      default: return "text-foreground/80";
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl border border-border overflow-hidden bg-[#0d1117]">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161b22] border-b border-border">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-destructive/70" />
            <span className="h-3 w-3 rounded-full bg-accent/70" />
            <span className="h-3 w-3 rounded-full bg-primary/70" />
          </div>
          <span className="text-xs text-muted-foreground ml-2 flex items-center gap-1.5">
            <TerminalIcon size={12} /> nexa@ubuntu: {cwd.replace("~", "~")}
          </span>
        </div>

        {/* Terminal body */}
        <div
          className="h-[400px] overflow-y-auto p-4 font-mono text-sm cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line, i) => (
            <div key={i} className={`${lineColor(line.type)} whitespace-pre-wrap leading-relaxed`}>
              {line.text}
            </div>
          ))}

          {/* Input line */}
          <div className="flex items-center text-primary">
            <span className="shrink-0">nexa@ubuntu:{cwd}$&nbsp;</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-foreground outline-none caret-primary font-mono text-sm"
              spellCheck={false}
              autoFocus
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Simulador de terminal Ubuntu. Escribe <code className="text-primary">help</code> para ver los comandos disponibles.
      </p>
    </div>
  );
};

export default CommunityTerminal;
