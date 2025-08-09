# KL Helper - Sistema de Gestión de Órdenes

![KL Helper Logo](https://img.shields.io/badge/KL%20Helper-Sistema%20de%20Gestión-blue)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-38B2AC?logo=tailwind-css)

## 📋 Descripción

KL Helper es un sistema web de gestión de órdenes diseñado para manejar pedidos de servicios electrónicos. El sistema permite a los usuarios solicitar diferentes tipos de servicios mientras mantiene un control estricto sobre la cantidad de órdenes y los días de operación.

## 🌐 URL del Sitio

**KLHelper-electronic.help.com**

## ✨ Características Principales

### 🔐 Sistema de Autenticación
- Registro e inicio de sesión con email y contraseña
- Contraseñas únicas (no se pueden repetir entre usuarios)
- Panel especial de administrador con código de acceso

### 📅 Control de Operaciones
- **Días activos**: Solo lunes y martes para usuarios regulares
- **Acceso completo**: Administrador puede operar todos los días
- **Límite de órdenes**: Máximo 5 pedidos por semana entre todos los usuarios
- **Sin límites para admin**: El administrador puede crear órdenes sin restricciones

### 🛠️ Servicios Disponibles

#### 1. Elementos de Circuito Físico
- **Con elementos entregados:**
  - Fácil: $2.00
  - Medio: $3.00
  - Complicado: $5.50
- **Sin entregar elementos:** Precio según dificultad y materiales

#### 2. Diagramas de Circuito
- Fácil: $0.50
- Medio: $0.75
- Complicado: $1.10

#### 3. Ayuda Teórica
- **Costo de acceso:** $2.00
- **Código de acceso:** KL_a. (contactar al controlador)
- **Asistente IA:** KL_01 con respuestas detalladas tipo Gemini

### 🎨 Temas Visuales
- **Tema Oscuro:** Negro con morado infinito
- **Tema Claro:** Blue Grey con Forest Green
- **Toggle de tema:** Intercambiable por el usuario

### 👨‍💼 Panel de Administrador
- **Email de admin:** klaytandrade@gmail.com
- **Código de controlador:** A_#64
- Gestión completa de órdenes
- Marcar órdenes como entregadas
- Estadísticas del sistema

## 🚀 Tecnologías Utilizadas

- **Frontend:** React 18.3.1 con TypeScript
- **Styling:** Tailwind CSS 3.4.1
- **Icons:** Lucide React
- **Build Tool:** Vite 5.4.2
- **Storage:** LocalStorage para persistencia de datos

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/kl-helper.git
cd kl-helper
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

4. **Construir para producción**
```bash
npm run build
```

5. **Previsualizar build de producción**
```bash
npm run preview
```

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run lint` - Ejecuta el linter
- `npm run preview` - Previsualiza el build de producción

## 📁 Estructura del Proyecto

```
kl-helper/
├── public/
├── src/
│   ├── components/
│   │   ├── AdminPanel.tsx
│   │   ├── CircuitElementsSection.tsx
│   │   ├── Dashboard.tsx
│   │   ├── DiagramsSection.tsx
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── TheoreticalHelpSection.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useOrders.ts
│   │   └── useTheme.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🚀 Despliegue

### Opciones de Despliegue

#### 1. GitHub Pages
El proyecto incluye configuración automática para GitHub Pages mediante GitHub Actions.

#### 2. Netlify (Recomendado)
- **Automático**: Conecta tu repositorio de GitHub a Netlify
- **Manual**: Arrastra la carpeta `dist/` después de `npm run build`
- **CLI**: Usa `npm run netlify` después de instalar Netlify CLI

#### 3. Otros proveedores
Compatible con Vercel, Firebase Hosting, Surge.sh y otros.

### Configuración de dominio personalizado
El archivo `public/CNAME` está configurado para: `KLHelper-electronic.help.com`

## 🔑 Credenciales de Acceso

### Administrador
- **Email:** klaytandrade@gmail.com
- **Código de controlador:** A_#64

### Ayuda Teórica
- **Código de acceso:** KL_a.
- **Costo:** $2.00

## 📱 Funcionalidades del Sistema

### Para Usuarios Regulares
- ✅ Registro con email y contraseña única
- ✅ Acceso solo lunes y martes
- ✅ Máximo 5 órdenes por semana (compartidas)
- ✅ Tres tipos de servicios disponibles
- ✅ Cambio de tema claro/oscuro

### Para Administrador
- ✅ Acceso completo todos los días
- ✅ Sin límite de órdenes
- ✅ Panel de gestión de órdenes
- ✅ Marcar órdenes como entregadas
- ✅ Estadísticas del sistema

## 🛡️ Seguridad

- Contraseñas únicas entre usuarios
- Código de acceso para funciones administrativas
- Código de acceso para ayuda teórica
- Validación de días activos
- Control de límites de órdenes

## 🌟 Características Especiales

### Asistente IA KL_01
- Respuestas detalladas tipo Gemini
- Información técnica completa
- Análisis de circuitos y electrónica
- Soporte para Arduino y programación
- Formato estructurado con ejemplos

### Sistema de Órdenes Inteligente
- Control automático de límites
- Notificaciones de estado
- Gestión de fechas y horarios
- Persistencia de datos local

## 📞 Soporte

Para obtener el código de acceso a la ayuda teórica, contacta al controlador mediante el número de la tarjeta de recomendación.

## 📄 Licencia

Este proyecto es privado y está destinado únicamente para el uso de KL Helper.

---

**Desarrollado con ❤️ para KL Helper**