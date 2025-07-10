# CerveretaDev - Sitio Web Profesional

## 🌟 Descripción
CerveretaDev es un sitio web profesional moderno diseñado para mostrar servicios de desarrollo web. El proyecto está construido completamente con tecnologías web estándar: HTML5, CSS3 y JavaScript vanilla, sin frameworks ni librerías externas.

## ✨ Características Principales

### 🎨 Diseño y Estilo
- **Diseño Glassmorphism**: Efectos de vidrio esmerilado modernos
- **Tema Claro/Oscuro**: Alternador automático con persistencia local
- **Diseño Responsivo**: Adaptable a todas las pantallas (móvil, tablet, desktop)
- **Gradientes Animados**: Elementos visuales dinámicos y atractivos
- **Tipografía Moderna**: Fuente Inter para una apariencia profesional

### 🚀 Funcionalidades
- **Navegación Suave**: Scroll animado entre secciones
- **Portafolio Filtrable**: Sistema de filtros para proyectos
- **Barras de Habilidades Animadas**: Indicadores visuales de competencias
- **Formulario de Contacto**: Validación completa y notificaciones
- **Animaciones al Scroll**: Efectos visuales progresivos
- **Menú Móvil**: Navegación optimizada para dispositivos táctiles

### 📱 Responsive Design
- **Breakpoints Optimizados**: 
  - Desktop: > 768px
  - Tablet: 768px - 480px
  - Mobile: < 480px
- **Navegación Adaptativa**: Menú hamburguesa en móviles
- **Imágenes Flexibles**: Ajuste automático de contenido visual

## 📂 Estructura del Proyecto

```
CerveretaDev/
├── index.html          # Página principal
├── styles.css          # Estilos CSS completos
├── script.js           # JavaScript funcional
├── images/             # Recursos de imagen
│   └── yo5.png         # Imagen de perfil/logo
└── README.md           # Documentación del proyecto
```

## 🔧 Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica moderna
- **CSS3**: Variables CSS, Grid, Flexbox, Animaciones
- **JavaScript ES6+**: Funcionalidades interactivas

### Características CSS Avanzadas
- **Variables CSS**: Sistema de temas dinámico
- **Grid & Flexbox**: Layouts responsivos modernos
- **Backdrop-filter**: Efectos glassmorphism
- **Transform & Transition**: Animaciones suaves
- **Media Queries**: Diseño responsivo

### JavaScript Funcional
- **Event Listeners**: Interactividad completa
- **Local Storage**: Persistencia de preferencias
- **Intersection Observer**: Animaciones al scroll
- **Form Validation**: Validación robusta de formularios

## 🎯 Secciones del Sitio

### 1. **Inicio/Hero**
- Presentación principal con imagen de perfil
- Botones de llamada a la acción
- Elementos flotantes animados
- Gradientes dinámicos

### 2. **Servicios**
- Tarjetas de servicios con hover effects
- Iconografía moderna
- Descripción detallada de cada servicio

### 3. **Portafolio**
- Sistema de filtros por categoría
- Tarjetas de proyectos interactivas
- Placeholders visuales para proyectos
- Enlaces a proyectos externos

### 4. **Tecnologías**
- Barras de progreso animadas
- Categorización por tipo de tecnología
- Iconografía de herramientas

### 5. **Contacto**
- Formulario funcional con validación
- Información de contacto
- Sistema de notificaciones
- Diseño en dos columnas

### 6. **Footer**
- Enlaces organizados por categorías
- Redes sociales
- Información corporativa

## 🎨 Sistema de Temas

### Tema Claro
- Fondo: Tonos blancos y grises claros
- Texto: Colores oscuros para contraste
- Efectos: Sombras suaves

### Tema Oscuro
- Fondo: Tonos azules oscuros y negros
- Texto: Colores claros para legibilidad
- Efectos: Resplandores sutiles

## 📱 Optimización Mobile

### Navegación Móvil
- Menú hamburguesa animado
- Navegación full-screen
- Gestos táctiles optimizados

### Layout Responsivo
- Grid que se adapta automáticamente
- Imágenes escalables
- Texto legible en todas las pantallas

## 🚀 Rendimiento

### Optimizaciones Incluidas
- **CSS Optimizado**: Variables para reduce redundancia
- **JavaScript Eficiente**: Event delegation y debouncing
- **Imágenes Optimizadas**: Formatos modernos recomendados
- **Carga Progresiva**: Lazy loading para elementos pesados

### Puntuaciones Estimadas
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 90+
- **SEO**: 85+

## 🔧 Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- No requiere servidor local (funciona con file://)

### Instalación
1. Descargar todos los archivos del proyecto
2. Mantener la estructura de carpetas
3. Abrir `index.html` en cualquier navegador

### Configuración
- **Imágenes**: Reemplazar `yo5.png` con imagen personalizada
- **Contenido**: Editar textos en `index.html`
- **Colores**: Modificar variables CSS en `styles.css`
- **Funcionalidades**: Personalizar en `script.js`

## 🎯 Funcionalidades JavaScript

### Gestión de Temas
```javascript
// Cambio automático de tema con persistencia
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    // Aplicar tema y configurar toggle
}
```

### Filtros de Portafolio
```javascript
// Sistema de filtros dinámico
function initializePortfolioFilters() {
    // Filtrado por categorías con animaciones
}
```

### Formulario de Contacto
```javascript
// Validación completa y envío simulado
function handleFormSubmission(data) {
    // Validación, feedback y persistencia
}
```

## 🎨 Personalización

### Cambiar Colores
Modificar variables en `:root` del archivo `styles.css`:
```css
:root {
    --primary-color: #4f46e5;    /* Color principal */
    --secondary-color: #06b6d4;   /* Color secundario */
    --accent-color: #f59e0b;      /* Color de acento */
}
```

### Añadir Nuevas Secciones
1. Crear HTML en `index.html`
2. Añadir estilos en `styles.css`
3. Implementar funcionalidad en `script.js`
4. Actualizar navegación

### Modificar Animaciones
```css
/* Personalizar animaciones existentes */
@keyframes customAnimation {
    from { /* estado inicial */ }
    to { /* estado final */ }
}
```

## 📈 SEO y Accesibilidad

### SEO Optimizado
- Meta tags descriptivos
- Estructura HTML semántica
- URLs amigables (anclas)
- Alt text en imágenes

### Accesibilidad
- Contraste de colores WCAG AA
- Navegación por teclado
- ARIA labels apropiados
- Tamaños de texto escalables

## 🔄 Actualizaciones Futuras

### Posibles Mejoras
- [ ] PWA (Progressive Web App)
- [ ] Integración con CMS
- [ ] Blog integrado
- [ ] Galería de imágenes avanzada
- [ ] Chat en vivo
- [ ] Analytics integrado

### Mantenimiento
- Actualizar contenido regularmente
- Optimizar imágenes nuevas
- Revisar compatibilidad de navegadores
- Actualizar información de contacto

## 📞 Soporte

Para soporte técnico o personalizaciones:
- **Email**: contacto@cerveretadev.com
- **Teléfono**: +34 600 123 456

## 📄 Licencia

Este proyecto está desarrollado como sitio web profesional personalizado. 
Todos los derechos reservados © 2025 CerveretaDev.

---

**Desarrollado con ❤️ usando tecnologías web modernas**
**HTML5 + CSS3 + JavaScript = Experiencia web excepcional**