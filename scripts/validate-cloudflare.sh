#!/bin/bash
# Script de validación para Cloudflare Pages

echo "🔍 Iniciando validación para Cloudflare Pages..."
echo ""

# 1. Verificar Node.js
echo "✓ Verificando Node.js..."
node --version || echo "❌ Node.js no instalado"

# 2. Verificar dependencias
echo "✓ Verificando dependencias..."
if [ -d "node_modules" ]; then
  echo "  ✓ node_modules existe"
else
  echo "  ⚠️  Instalando dependencias..."
  npm install
fi

# 3. Type checking
echo "✓ Verificando tipos TypeScript..."
npm run type-check || echo "❌ Errores de TypeScript encontrados"

# 4. Linting (no bloqueante para deploy)
echo "✓ Ejecutando ESLint..."
npm run lint || echo "⚠️  Problemas de linting (no crítico para Pages)"

# 5. Build
echo "✓ Compilando para Cloudflare Pages..."
npm run build || { echo "❌ Build falló"; exit 1; }

# 6. Verificar output
echo "✓ Verificando carpeta dist..."
if [ -d "dist" ]; then
  echo "  ✓ dist/ generada correctamente"
  echo "  Archivos: $(find dist -type f | wc -l) archivos"
else
  echo "❌ dist/ no fue generada"
  exit 1
fi

# 7. Verificar _routes.json
echo "✓ Verificando configuración de rutas SPA..."
if [ -f "public/_routes.json" ]; then
  echo "  ✓ _routes.json existe para SPA routing"
else
  echo "❌ _routes.json faltante (necesario para SPA)"
fi

# 8. Verificar wrangler.toml
echo "✓ Verificando configuración de Cloudflare..."
if [ -f "wrangler.toml" ]; then
  echo "  ✓ wrangler.toml existe"
  if grep -q "pages_build_output_dir" wrangler.toml; then
    echo "  ✓ Configurado para Cloudflare Pages"
  else
    echo "  ⚠️  wrangler.toml podría necesitar ajustes para Pages"
  fi
else
  echo "❌ wrangler.toml faltante"
fi

# 9. Verificar variables de entorno
echo "✓ Verificando variables de entorno..."
if [ -f ".env" ]; then
  echo "  ✓ Archivo .env existe"
  if grep -q "VITE_SUPABASE_URL" .env && grep -q "VITE_SUPABASE_ANON_KEY" .env; then
    echo "  ✓ Variables de Supabase configuradas"
  else
    echo "  ⚠️  Variables de Supabase podrían estar incompletas"
  fi
else
  echo "  ⚠️  Archivo .env no encontrado (usa .env.example como referencia)"
fi

# 10. Verificar Wrangler
echo "✓ Verificando Wrangler CLI..."
if command -v npx &> /dev/null; then
  if npx wrangler --version &> /dev/null; then
    echo "  ✓ Wrangler disponible via npx"
  else
    echo "  ❌ Wrangler no disponible"
  fi
else
  echo "  ❌ npx no disponible"
fi

echo ""
echo "🎉 Validación completada!"
echo ""
echo "Para hacer deploy:"
echo "  npm run deploy:cf"
echo ""
echo "Para preview local:"
echo "  npm run preview:cf"
if [ -f "wrangler.toml" ]; then
  echo "  ✓ wrangler.toml existe"
else
  echo "❌ wrangler.toml faltante"
fi

# 9. Tests
echo "✓ Ejecutando tests..."
npm test || echo "⚠️  Algunos tests fallaron (revisar)"

echo ""
echo "✅ Validación completada!"
echo ""
echo "Próximos pasos:"
echo "  1. Instalar wrangler: npm install -g wrangler"
echo "  2. Login en Cloudflare: wrangler login"
echo "  3. Deploy: npm run deploy:cf"
echo ""
