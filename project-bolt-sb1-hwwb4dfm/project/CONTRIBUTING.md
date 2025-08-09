# Guía de Contribución - KL Helper

## 🤝 Cómo Contribuir

Gracias por tu interés en contribuir a KL Helper. Este documento te guiará a través del proceso.

## 📋 Antes de Empezar

1. **Fork** el repositorio
2. **Clone** tu fork localmente
3. **Instala** las dependencias: `npm install`
4. **Crea** una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`

## 🔧 Configuración del Entorno de Desarrollo

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/kl-helper.git
cd kl-helper

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

## 📝 Estándares de Código

### TypeScript
- Usa TypeScript para todos los archivos nuevos
- Define interfaces para props y estados
- Evita el uso de `any`

### React
- Usa componentes funcionales con hooks
- Implementa proper error boundaries
- Mantén componentes pequeños y reutilizables

### Styling
- Usa Tailwind CSS para estilos
- Mantén consistencia con el sistema de temas
- Usa las clases de utilidad existentes

### Naming Conventions
- **Componentes**: PascalCase (`LoginForm.tsx`)
- **Hooks**: camelCase con prefijo `use` (`useAuth.ts`)
- **Variables**: camelCase
- **Constantes**: UPPER_SNAKE_CASE

## 🧪 Testing

```bash
# Ejecutar tests (cuando estén implementados)
npm run test

# Linting
npm run lint
```

## 📦 Estructura de Commits

Usa conventional commits:

```
feat: agregar nueva funcionalidad de notificaciones
fix: corregir error en cálculo de precios
docs: actualizar README con nuevas instrucciones
style: mejorar estilos del tema claro
refactor: reorganizar componentes de autenticación
test: agregar tests para useOrders hook
```

## 🔍 Pull Request Process

1. **Actualiza** tu rama con los últimos cambios de main
2. **Asegúrate** de que el código pase el linting
3. **Prueba** tu funcionalidad localmente
4. **Escribe** una descripción clara del PR
5. **Incluye** screenshots si hay cambios visuales

### Template de PR

```markdown
## Descripción
Breve descripción de los cambios realizados.

## Tipo de cambio
- [ ] Bug fix
- [ ] Nueva funcionalidad
- [ ] Breaking change
- [ ] Documentación

## Testing
- [ ] Probado localmente
- [ ] Funciona en ambos temas
- [ ] Responsive design verificado

## Screenshots
(Si aplica)
```

## 🐛 Reportar Bugs

Usa el template de issues para reportar bugs:

```markdown
**Descripción del bug**
Descripción clara del problema.

**Pasos para reproducir**
1. Ve a '...'
2. Haz clic en '...'
3. Observa el error

**Comportamiento esperado**
Lo que debería pasar.

**Screenshots**
Si aplica, agrega screenshots.

**Información del sistema:**
- OS: [e.g. iOS]
- Browser: [e.g. chrome, safari]
- Version: [e.g. 22]
```

## ✨ Sugerir Funcionalidades

Para nuevas funcionalidades:

```markdown
**¿Tu solicitud está relacionada con un problema?**
Descripción clara del problema.

**Describe la solución que te gustaría**
Descripción clara de lo que quieres que pase.

**Describe alternativas consideradas**
Otras soluciones o funcionalidades consideradas.

**Contexto adicional**
Cualquier otro contexto o screenshots.
```

## 📚 Áreas de Contribución

### 🔧 Desarrollo
- Nuevas funcionalidades
- Corrección de bugs
- Optimizaciones de performance
- Mejoras de UX/UI

### 📖 Documentación
- Mejorar README
- Documentar APIs
- Crear tutoriales
- Traducir contenido

### 🧪 Testing
- Escribir unit tests
- Testing de integración
- Testing manual
- Automatización de tests

### 🎨 Diseño
- Mejorar UI/UX
- Crear nuevos temas
- Optimizar responsive design
- Accessibility improvements

## 🚫 Qué NO hacer

- No hagas cambios directos a la rama main
- No incluyas archivos de configuración personal
- No rompas la funcionalidad existente
- No ignores los estándares de código
- No hagas commits con mensajes poco descriptivos

## 📞 Contacto

Si tienes preguntas sobre cómo contribuir:

- Abre un issue con la etiqueta `question`
- Contacta al maintainer principal

## 🎉 Reconocimientos

Todos los contribuidores serán reconocidos en el README principal.

---

¡Gracias por contribuir a KL Helper! 🚀