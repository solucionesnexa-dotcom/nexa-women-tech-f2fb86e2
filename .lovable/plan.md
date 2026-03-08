

## Plan: Nuevo headline del hero

Cambiar el headline actual en `src/pages/Index.tsx` (líneas ~33-38) por uno más corto y potente que transmita:
1. Ser fundadora de un movimiento
2. Empoderamiento digital colectivo de mujeres
3. Empoderamiento personal

**Propuesta de headline:**

```
Sé fundadora del movimiento que
empodera a mujeres con IA
```

Con "empodera a mujeres con IA" usando el gradiente `text-gradient-hero`.

**Alternativas a considerar:**
- "Únete como fundadora. Empodera a mujeres con IA — empezando por ti."
- "Funda el movimiento. Domina la IA. Diseña tu carrera."

### Cambio técnico

En `src/pages/Index.tsx`, líneas ~33-38, reemplazar el `<h1>` actual por el nuevo copy más corto, manteniendo el `<br />` para forzar dos líneas y el `text-gradient-hero` en la parte destacada. Se puede subir ligeramente el tamaño de fuente ya que el texto es más corto.

