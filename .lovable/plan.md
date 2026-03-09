

## Plan: Login solo con email/contraseña + "Olvidé mi contraseña"

### Cambios

1. **`src/pages/Auth.tsx`** — Simplificar para que el modo login muestre solo email + contraseña (sin registro). Añadir un tercer modo `"forgot"` que muestre solo el campo de email y llame a `supabase.auth.resetPasswordForEmail()` con redirect a `/reset-password`. Enlace "¿Olvidaste tu contraseña?" visible en modo login.

2. **`src/pages/ResetPassword.tsx`** (nuevo) — Página pública donde la usuaria introduce su nueva contraseña. Detecta el token `type=recovery` en el hash de la URL, y llama a `supabase.auth.updateUser({ password })`.

3. **`src/App.tsx`** — Añadir ruta pública `/reset-password` apuntando al nuevo componente.

No se necesitan migraciones ni cambios en backend.

