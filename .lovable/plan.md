

## Plan: Desarrollo completo de las 4 funcionalidades

Implementaremos las 4 secciones en orden de dependencia.

---

### 1. Dashboard Dinámico (datos reales)

Conectar el dashboard existente a datos reales de la base de datos:

- **Últimos posts**: Query a `community_posts` con join a `profiles` para mostrar los 3 posts más recientes.
- **Progreso en la Ruta**: Por ahora calcular progreso basado en los módulos hardcoded (módulo 1 completado = 25%). En el futuro se puede crear una tabla `user_progress`.
- **Próximo evento**: Mostrar el próximo cohort por `start_date` desde la tabla `cohorts`.
- **Contador de actividad**: Número total de posts del día y retos completados (`is_challenge = true`).

---

### 2. Perfil Completo

Expandir `Perfil.tsx` para permitir edición real:

- **Formulario editable**: Nombre, avatar (upload a storage bucket `resources` o crear uno nuevo `avatars`), bio opcional.
- **Guardar cambios**: Update directo a `profiles` table (RLS ya permite `UPDATE` para el propio user).
- **Avatar upload**: Usar el bucket de storage existente o crear uno `avatars`.
- **Info de suscripción**: Mostrar estado de suscripción llamando a `check-subscription`, con botón para gestionar vía `customer-portal`.
- **Migración**: Añadir columna `bio` a `profiles`.

---

### 3. AI Toolkit

Crear herramientas de IA funcionales usando Lovable AI (ya tiene `LOVABLE_API_KEY` configurado):

- **Generador de textos para negocio**: Input de contexto → genera copy para redes, emails, propuestas.
- **Asistente estratégico**: Chat simple donde la usuaria describe su situación y recibe recomendaciones.
- Reutilizar el edge function `community-chat` como base, o crear uno nuevo `ai-toolkit` con prompts específicos por herramienta.
- UI con tabs para cada herramienta, streaming de respuestas token-by-token.

---

### 4. Labs

Crear la página de Labs con contenido dinámico:

- **Nueva tabla `labs`**: `id`, `title`, `description`, `video_url`, `date`, `is_past`, `created_at`.
- **Vista**: Sección de próximos labs (calendario) y labs pasados (grabaciones).
- **RLS**: Viewable por authenticated users, manageable por admins.

---

### Detalles técnicos

**Migraciones necesarias:**
1. `ALTER TABLE profiles ADD COLUMN bio text;`
2. Crear tabla `labs` con columnas mencionadas y RLS.
3. Crear storage bucket `avatars` (público).

**Edge functions:**
- Nuevo `ai-toolkit/index.ts` con system prompts específicos por herramienta (tipo: `copy`, `strategy`).

**Archivos a modificar/crear:**
- `src/pages/Dashboard.tsx` — queries reales a community_posts, cohorts
- `src/pages/Perfil.tsx` — formulario editable con avatar upload
- `src/pages/AIToolkit.tsx` — UI con tabs + streaming AI
- `src/pages/Labs.tsx` — lista dinámica desde DB
- `supabase/functions/ai-toolkit/index.ts` — nueva edge function

