# Guía de Deploy a Cloudflare

## 📊 Arquitectura Post-Migración

```
Frontend (React/TypeScript) → Cloudflare Pages
                          ↓
Backend (Supabase) ← Auth, BD, Edge Functions (MANTIENEN LOS DATOS)
```

## ✅ Lo que Cambió

1. **Frontend** alojado en **Cloudflare Pages** (rápido, global, CDN incluido)
2. **Backend/Datos** siguen en **Supabase** (seguros, sin cambios)
3. Vite compilado sin `componentTagger` (incompatible con Cloudflare)
4. Rutas SPA configuradas en `_routes.json`

## ⚠️ DATOS: SIN PÉRDIDAS

✅ Todos los datos en Supabase están **completamente seguros**
✅ Base de datos intacta
✅ Authenticación sin cambios
✅ Edge Functions de Supabase funcionan igual

**Supabase = Fuente de verdad para todos los datos**

---

## 🚀 Pasos para Deploy

### 1. Instalar Wrangler
```bash
bun install -g wrangler
# O con npm: npm install -g wrangler
```

### 2. Autenticarse en Cloudflare
```bash
wrangler login
```

### 3. Build Local (Test)
```bash
npm run build:cf
npm run preview:cf
# Visita http://localhost:8788
```

### 4. Deploy a Cloudflare Pages
**Opción A: Desde CLI**
```bash
npm run deploy:cf
```

**Opción B: Git (Automático)**
1. Push a GitHub: `git push`
2. Conecta repo en Cloudflare Dashboard
3. Configura:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Framework preset**: None (o Vite)

### 5. Configurar Variables de Entorno en Cloudflare
En **Cloudflare Dashboard → Pages → Tu Proyecto**:

```
VITE_SUPABASE_URL=https://your-supabase.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-key
```

---

## 🔐 Variables de Entorno

El proyecto necesita acceso a Supabase. Hay 3 formas:

### 1. Archivo `.env.local` (Desarrollo)
```bash
VITE_SUPABASE_URL=https://[YOUR_SUPABASE].supabase.co
VITE_SUPABASE_ANON_KEY=[YOUR_ANON_KEY]
```

### 2. Cloudflare Pages Variables
En Dashboard → Pages → Settings → Environment Variables

### 3. `.env.production` (Producción)
```bash
VITE_SUPABASE_URL=https://[YOUR_SUPABASE].supabase.co
VITE_SUPABASE_ANON_KEY=[YOUR_ANON_KEY]
```

---

## ✨ Optimizaciones Realizadas

1. **Vite v5.4.19** → Configuración mejorada para CF
2. **Tree-shaking** → Solo código usado en bundle
3. **Code Splitting** → Chunks separados (vendor, supabase, query)
4. **Sourcemaps** → Solo en desarrollo (producción más ligero)
5. **Terser optimization** → Minificación automática

---

## 🛠️ Archivos Nuevos/Modificados

| Archivo | Cambio |
|---------|--------|
| `wrangler.toml` | ✨ Nuevo - Configuración Cloudflare |
| `public/_routes.json` | ✨ Nuevo - Rutas SPA |
| `vite.config.ts` | 🔄 Actualizado - Removido `componentTagger`, optimizaciones CF |
| `package.json` | 🔄 Actualizado - Scripts deploy |

---

## 🚨 Checklist Pre-Deploy

- [ ] `npm run build:cf` sin errores
- [ ] `npm run preview:cf` funciona localmente
- [ ] Variables de Supabase correctas
- [ ] Tests pasando: `npm test`
- [ ] Linter limpio: `npm run lint`
- [ ] Conexión a Supabase verificada en dev
- [ ] `.env.local` creado con credenciales reales

---

## 📚 URLs Útiles

- Cloudflare Pages: https://pages.cloudflare.com/
- Cloudflare Dashboard: https://dash.cloudflare.com/
- Supabase Console: https://app.supabase.com/
- Wrangler Docs: https://developers.cloudflare.com/workers/wrangler/

---

## 🔄 Rollback (si hay problemas)

```bash
# Ver historial de deploys
wrangler pages deployments list

# Revertir a deploy anterior
wrangler pages rollback --message "Rollback a versión estable"
```

---

## 💡 Notas Importantes

- **Cloudflare Pages ≠ Cloudflare Workers** (Pages es mejor para SPA)
- Si quieres migrar Edge Functions de Supabase → Cloudflare Workers, contacta al equipo
- Los datos en Supabase son independientes de dónde alojes el frontend
- Puedes usar múltiples deploys (test, staging, producción)

✅ **Proyecto Listo para Producción**
