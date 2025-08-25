# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Configuración de Idioma
- SIEMPRE responder en español
- Mantener respuestas concisas y directas
- Usar terminología técnica apropiada en español

## Arquitectura del Proyecto

### Estructura Principal
- **Frontend**: Sitio web estático construido con HTML5, CSS3 y JavaScript vanilla
- **Backend**: Servidor Node.js con Express para funcionalidad de chatbot con Claude API
- **Sin framework**: Proyecto completamente vanilla, sin dependencias frontend

### Componentes Clave

#### Frontend (`/`)
- `index.html`: Página principal con estructura semántica completa
- `styles.css`: Estilos con sistema de temas (claro/oscuro), glassmorphism y diseño responsivo
- `script.js`: Funcionalidades JavaScript vanilla:
  - Sistema de temas con localStorage
  - Navegación móvil
  - Filtros de portafolio
  - Animaciones al scroll
  - Formulario de contacto con validación
  - Chatbot integration

#### Backend (`backend-chatbot/`)
- `server.js`: Servidor Express con integración de Claude API
- API endpoint `/chat` para procesamiento de mensajes
- CORS configurado para desarrollo

### Sistema de Temas
- Variables CSS en `:root` para modo claro y oscuro
- Persistencia automática con `localStorage`
- Transiciones suaves entre temas

### Diseño Responsivo
- Breakpoints: Desktop (>768px), Tablet (768px-480px), Mobile (<480px)
- Grid y Flexbox para layouts adaptativos
- Menú hamburguesa para móviles

## Comandos de Desarrollo

### Frontend
```bash
# Abrir directamente en navegador (no requiere servidor local)
open index.html
# O simplemente abrir el archivo index.html en cualquier navegador web moderno
```

### Backend (Chatbot)
```bash
# Navegar al directorio del backend
cd backend-chatbot

# Instalar dependencias (si existen)
npm install

# Ejecutar servidor de desarrollo
node server.js

# El servidor normalmente corre en puerto 3001
```

## Consideraciones de Desarrollo

### Compatibilidad de Navegadores
- Código optimizado para Safari (manejo especial de backdrop-filter)
- Funciona en todos los navegadores modernos
- No requiere transpilación ni bundling

### Performance
- CSS optimizado con variables para reducir redundancia
- JavaScript eficiente con event delegation
- Imágenes deben optimizarse manualmente
- Lazy loading implementado para elementos pesados

### Personalización
- Variables CSS en `:root` para cambios de color rápidos
- Contenido editable directamente en HTML
- Funcionalidades JavaScript modulares y reutilizables

### Seguridad
- API keys deben configurarse en variables de entorno (.env)
- CORS configurado para desarrollo (ajustar en producción)
- Validación de formularios tanto en frontend como backend

## Notas Técnicas
- Proyecto completamente funcional sin frameworks
- Diseño glassmorphism con efectos de vidrio esmerilado
- Sistema de filtros dinámico para portafolio
- Integración con Claude API para chatbot
- Formulario de contacto con validación completa
- Animaciones CSS y JavaScript para UX mejorada