

## Plan: Combinar opciones 1 y 2 del headline

Fusionar ambas opciones en un headline que combine el concepto de "fundar el movimiento" con la acción personal de "dominar la IA":

```
Sé fundadora del movimiento que
empodera a mujeres con IA
```

**Nueva propuesta combinada:**

```
Funda el movimiento que
empodera a mujeres con IA
```

O una versión más completa con tres beats:

```
Sé fundadora del movimiento.
Domina la IA. Empodera tu carrera.
```

### Cambio técnico

En `src/pages/Index.tsx`, línea ~33-38, reemplazar el `<h1>` actual. Propondré esta combinación:

```tsx
<h1 className="font-display text-4xl font-bold leading-[1.15] sm:text-5xl md:text-6xl lg:text-7xl">
  Funda el movimiento.
  <br />
  <span className="text-gradient-hero">Domina la IA. Empodera tu carrera.</span>
</h1>
```

Esto toma de la opción 1 el concepto de fundar un movimiento y de la opción 2 los verbos de acción "Domina la IA" + el empoderamiento personal con "Empodera tu carrera" en gradiente.

