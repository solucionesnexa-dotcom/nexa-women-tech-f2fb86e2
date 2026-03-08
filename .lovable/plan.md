

## Plan: Nuevo headline combinando empoderamiento personal y colectivo

Reemplazar el `<h1>` actual en `src/pages/Index.tsx` (líneas ~33-38) con un headline que transmita: "al fundar este movimiento, te empoderas tú y empoderas a otras mujeres".

**Propuesta:**

```
Funda el movimiento.
Empodérate con IA. Empodera a otras.
```

- "Funda el movimiento" → rol de fundadora
- "Empodérate con IA" → beneficio personal
- "Empodera a otras" → impacto colectivo
- La segunda línea va en gradiente (`text-gradient-hero`)

**Cambio técnico** en `src/pages/Index.tsx`:

```tsx
<h1 className="font-display text-4xl font-bold leading-[1.15] sm:text-5xl md:text-6xl lg:text-7xl">
  Funda el movimiento.
  <br />
  <span className="text-gradient-hero">Empodérate con IA. Empodera a otras.</span>
</h1>
```

