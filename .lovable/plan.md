

## Plan: Arreglar badge "Cohorte Fundadora", renombrar "Precios" y CTA turquesa

### Cambios

1. **`src/pages/Precios.tsx`**:
   - Mover el badge "Cohorte Fundadora" de `absolute -top-3` a dentro del card con `mt` para que no se corte.
   - Cambiar el CTA (`Link`) a turquesa explícito: `bg-[hsl(183,72%,56%)]` (que es el primary, pero aseguramos que sea turquesa claro).

2. **`src/components/Navbar.tsx`**:
   - Cambiar label "Precios" por "Suscripción" en el nav.

3. **Ruta**: Se mantiene `/precios` para no romper enlaces, solo cambia el label visible.

