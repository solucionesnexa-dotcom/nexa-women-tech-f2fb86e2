
## Plan: Área Privada y Dashboard

Para implementar la estructura del área privada ("Plataforma") con su propio menú lateral y el Dashboard principal, realizaremos los siguientes cambios:

### 1. Sistema de Rutas y Layouts
Actualmente el `Navbar` superior se muestra en todas las páginas. Separaremos la navegación en dos "Layouts" distintos utilizando `react-router-dom`:
- **Public Layout**: Con el `Navbar` superior actual para la landing page, manifiesto, precios y auth.
- **Private Layout**: Un nuevo entorno que envuelve las rutas privadas con un `Sidebar` (menú lateral) utilizando los componentes de Shadcn UI (`SidebarProvider`).

### 2. Guardia de Autenticación (`AuthGuard`)
Crearemos el componente `AuthGuard` (similar al `AdminGuard` existente) para proteger todas las rutas del área privada. Si una usuaria no autenticada intenta entrar, será redirigida a `/auth`.

### 3. Layout Privado y Sidebar (`PrivateLayout` y `AppSidebar`)
Implementaremos un menú lateral persistente (colapsable en móvil) con los siguientes enlaces:
- **Dashboard** (`/dashboard`)
- **Ruta** (`/ruta`)
- **Comunidad** (`/comunidad`)
- **Labs** (`/labs`)
- **AI Toolkit** (`/ai-toolkit`)
- **Perfil** (`/perfil`)

*Nota: Moveremos las páginas existentes de Comunidad y Ruta a este entorno privado.*

### 4. Página Principal: Dashboard (`/dashboard`)
Crearemos la vista principal (inicio de la usuaria) con los siguientes elementos:
- **Mensaje de bienvenida**: "Hola [Nombre] 👋" obteniendo el nombre del perfil de la usuaria.
- **Tu Progreso**: Tarjeta visual indicando el nivel (ej. "Exploradora — 40%") en la Ruta Nexa.
- **Próximo Evento**: Tarjeta destacando el siguiente "Nexa Lab".
- **Actividad de la Comunidad**: Resumen rápido de los últimos movimientos o posts en la comunidad.
- **Accesos Rápidos**: Atajos a recursos clave y herramientas de IA.

### 5. Páginas Placeholder
Crearemos la estructura inicial (archivos vacíos o con estructura básica) para las nuevas secciones solicitadas (`Labs`, `AIToolkit` y `Perfil`) para que el menú funcione correctamente y podamos iterar sobre ellas en los próximos pasos.
