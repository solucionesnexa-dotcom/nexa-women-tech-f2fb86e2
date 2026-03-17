

## Plan: Añadir acceso al panel de administración + fix build error

### 1. Fix build error en edge functions
El error es que las edge functions no encuentran `@supabase/supabase-js`. Necesitan un `import_map.json` o `deno.json` con las dependencias mapeadas. Revisaré las edge functions existentes para ver cómo importan Supabase y unificar el patrón usando `import { createClient } from "https://esm.sh/@supabase/supabase-js@2"`.

### 2. Añadir enlace de Admin en el sidebar (solo para admins)
En `AppSidebar.tsx`:
- Importar `useAuth` para acceder a `roles`
- Añadir condicionalmente un enlace a `/admin` con icono `Settings` cuando el usuario tiene rol `admin`

### Archivos a modificar
- `src/components/AppSidebar.tsx` — añadir enlace condicional al admin
- `supabase/functions/check-subscription/index.ts` — fix import de Supabase para Deno
- Revisar otras edge functions para el mismo problema

