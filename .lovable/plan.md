

## Plan: Quitar los puntos del headline

Eliminar los puntos finales del headline del hero en `src/pages/Index.tsx` para un estilo más limpio y moderno.

**De:**
```
Funda el movimiento.
Empodérate con IA. Empodera a otras.
```

**A:**
```
Funda el movimiento
Empodérate con IA — Empodera a otras
```

Usar un em dash (—) en lugar del punto para separar las dos frases de la segunda línea, manteniendo el ritmo sin puntuación formal.

### Cambio técnico

En `src/pages/Index.tsx`, reemplazar el contenido del `<h1>`:

```tsx
<h1 className="font-display text-4xl font-bold leading-[1.15] sm:text-5xl md:text-6xl lg:text-7xl">
  Funda el movimiento
  <br />
  <span className="text-gradient-hero">Empodérate con IA — Empodera a otras</span>
</h1>
```

