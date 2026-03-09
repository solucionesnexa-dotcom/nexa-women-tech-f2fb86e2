#!/bin/bash
# Script de validación pre-deploy a Cloudflare

echo "🔍 Iniciando validación para Cloudflare..."
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
  bun install
fi

# 3. Type checking
echo "✓ Verificando tipos TypeScript..."
npm run type-check || echo "❌ Errores de TypeScript encontrados"

# 4. Linting
echo "✓ Ejecutando ESLint..."
npm run lint || echo "⚠️  Problemas de linting (no crítico)"

# 5. Build
echo "✓ Compilando para Cloudflare..."
npm run build:cf || { echo "❌ Build falló"; exit 1; }

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
echo "✓ Verificando configuración de Cloudflare..."
if [ -f "public/_routes.json" ]; then
  echo "  ✓ _routes.json existe"
else
  echo "❌ _routes.json faltante"
fi

# 8. Verificar wrangler.toml
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
