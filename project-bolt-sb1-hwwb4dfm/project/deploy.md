# Guía de Despliegue para KL Helper

## 🚀 Opciones de Despliegue

### 1. GitHub Pages

#### Configuración automática:
1. Sube tu código a GitHub
2. Ve a Settings > Pages
3. Selecciona "GitHub Actions" como source
4. El archivo `.github/workflows/deploy.yml` se encargará del resto

#### Configuración manual:
```bash
npm run build
# Sube la carpeta dist/ a la rama gh-pages
```

### 2. Netlify

#### Opción 1: Desde GitHub (Recomendado):
1. Conecta tu repositorio de GitHub a Netlify
2. La configuración se detectará automáticamente desde `netlify.toml`
3. El sitio se desplegará automáticamente en cada push

#### Opción 2: Netlify CLI:
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login a Netlify
netlify login

# Desplegar desde la carpeta del proyecto
netlify deploy

# Para producción
netlify deploy --prod
```

#### Configuración manual (si es necesario):
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 18

#### Drag & Drop:
1. Ejecuta `npm run build`
2. Arrastra la carpeta `dist/` a Netlify

### 3. Vercel

#### Desde GitHub:
1. Conecta tu repositorio a Vercel
2. Vercel detectará automáticamente la configuración de Vite

#### CLI:
```bash
npm install -g vercel
vercel --prod
```

### 4. Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

### 5. Surge.sh

```bash
npm install -g surge
npm run build
cd dist
surge
```

## ⚙️ Variables de Entorno

El proyecto no requiere variables de entorno especiales ya que usa LocalStorage para persistencia.

## 🔧 Configuraciones Especiales

### Para GitHub Pages:
- Asegúrate de que el `base` en `vite.config.ts` coincida con tu repositorio
- Si tu repo se llama `kl-helper`, usa `base: '/kl-helper/'`

### Para dominios personalizados:
- Configura el archivo `CNAME` en la carpeta `public/`
- Contenido: `KLHelper-electronic.help.com`

## 📋 Checklist Pre-Despliegue

- [ ] Código subido a GitHub
- [ ] `npm run build` ejecutado sin errores
- [ ] Archivos de configuración incluidos
- [ ] README.md actualizado
- [ ] .gitignore configurado
- [ ] Dependencias actualizadas

## 🐛 Solución de Problemas

### Error de rutas en producción:
- Verifica la configuración de `base` en `vite.config.ts`
- Para GitHub Pages: `base: '/nombre-repositorio/'`
- Para dominio propio: `base: '/'`

### Archivos no encontrados:
- Asegúrate de que la carpeta `dist/` se está generando correctamente
- Verifica que el build command sea `npm run build`

### Problemas de CORS:
- No aplica para este proyecto ya que no hace llamadas a APIs externas
- Todo se maneja con LocalStorage

## 📱 Optimizaciones

### Performance:
- El proyecto ya está optimizado con Vite
- Lazy loading implementado donde es necesario
- Tailwind CSS purgeado automáticamente

### SEO:
- Meta tags configurados en `index.html`
- Título descriptivo incluido
- Estructura semántica HTML

## 🔄 Actualizaciones

Para actualizar el sitio:
1. Haz cambios en tu código local
2. Commit y push a GitHub
3. El despliegue se actualizará automáticamente (si usas GitHub Actions)

## 📊 Monitoreo

### Analytics recomendados:
- Google Analytics
- Hotjar para UX
- Sentry para errores

### Métricas importantes:
- Tiempo de carga
- Tasa de conversión de órdenes
- Uso por días de la semana
- Errores de JavaScript