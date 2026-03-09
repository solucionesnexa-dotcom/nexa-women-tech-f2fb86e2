

## Plan: Actualizar página de Precios con detalles de suscripción correctos

El problema: `Precios.tsx` muestra "19€/mes" cuando debería explicar el modelo real (19€ reserva + 29€/mes suscripción). Además, la página debería funcionar más como detalle de la suscripción fundadora.

### Cambios en `src/pages/Precios.tsx`:

1. **Precio principal**: Cambiar de "19€/mes" a mostrar dos bloques claros:
   - **Reserva**: 19€ (pago único, se descuenta de la primera cuota)
   - **Suscripción Fundadora**: 29€/mes (compromiso mínimo 3 meses)

2. **Estructura**: Convertirla en una página de "Suscripción Fundadora" con:
   - Encabezado: "Suscripción Fundadora" en vez de solo "Acceso Fundadora"
   - Sección de qué incluye (la lista actual de features, ampliada)
   - Desglose claro del pricing (reserva vs suscripción)
   - Nota sobre los 19€ descontados de la primera cuota
   - CTA: "Reservar mi plaza — 19€"

3. **CTA de CtaSection.tsx**: Ya está correcto con la info de 29€/mes, no necesita cambios.

No se necesitan migraciones ni cambios en backend.

