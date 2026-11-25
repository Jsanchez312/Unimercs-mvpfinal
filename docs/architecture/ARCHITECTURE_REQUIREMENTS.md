# Arquitectura del Sistema y Matriz de Requisitos — UniMercs Javeriana

**Pontificia Universidad Javeriana — Facultad de Ingeniería de Sistemas**  
*Proyecto de Innovación en TI: Mercado Seguro Javeriana*  
**Versión:** 1.0.0 (2026)

---

## 1. Visión General y Arquitectura

UniMercs es una plataforma de comercio electrónico seguro, exclusivo para la comunidad de la **Pontificia Universidad Javeriana**, diseñada para mitigar el riesgo de estafas digitales, encuentros inseguros y perfiles falsos mediante:
1. **Autenticación Institucional Obligatoria** (`@javeriana.edu.co`).
2. **Insignia de Estudiante Verificado**.
3. **Puntos de Encuentro Seguros y Vigilados en el Campus**.
4. **Sistema de Reputación y Calificaciones de Vendedores**.
5. **Panel de Moderación Administrativa y Baneo de Cuentas**.
6. **Integración Directa con WhatsApp para Negociación Instantánea**.

```
┌────────────────────────────────────────────────────────┐
│             FRONTEND CLIENT (HTML5 / JS / CSS)          │
│  index.html  │  login.html  │  register.html  │  admin.html│
└───────────────────────────┬────────────────────────────┘
                            │ REST API (JSON + JWT)
┌───────────────────────────▼────────────────────────────┐
│              EXPRESS.JS BACKEND SERVER                 │
│  ├── /api/auth          (Registro, Login, Reset Pwd)   │
│  ├── /api/posts         (Catálogo, Filtros, Estado)    │
│  ├── /api/reviews       (Calificaciones 1-5 estrellas) │
│  ├── /api/reports       (Moderación y Fraude)          │
│  ├── /api/safezones     (Puntos Seguros Javeriana)     │
│  ├── /api/notifications (Alertas en App y Correo)      │
│  ├── /api/admin         (Baneo, Auditoría, Backups)    │
│  └── /api/health        (Uptime y Diagnóstico)         │
└───────────────────────────┬────────────────────────────┘
                            │ Mongoose ODM
┌───────────────────────────▼────────────────────────────┐
│               MONGODB ATLAS DATABASE                   │
│   Users │ Posts │ Reviews │ Reports │ AuditLogs        │
└────────────────────────────────────────────────────────┘
```

---

## 2. Matriz de Requisitos Funcionales (RF / HU)

| Código | Historia de Usuario (HU) | Endpoint / Ruta Backend | Componente / Vista Frontend | Estado |
| :--- | :--- | :--- | :--- | :---: |
| **HU-01 (RF-01)** | Registro e inicio de sesión únicamente con `@javeriana.edu.co` | `POST /api/auth/register`<br>`POST /api/auth/login` | `register.html`<br>`login.html` | ✅ Implementado |
| **HU-02 (RF-02)** | Verificación de estado activo en la universidad | `middleware/auth.js` (`protect`) | Badge `🛡️ Verificado` | ✅ Implementado |
| **HU-03 (RF-03)** | Recuperación de contraseña segura vía correo institucional | `POST /api/auth/forgot-password`<br>`POST /api/auth/reset-password` | Modal en `login.html` | ✅ Implementado |
| **HU-04 (RF-04)** | Insignia de verificación visible en perfiles y productos | `GET /api/posts`<br>`GET /api/auth/me` | Badges en `index.html` y detalle | ✅ Implementado |
| **HU-05 (RF-05)** | Configurar preferencia de correo para notificaciones | `PUT /api/auth/profile`<br>`GET /api/auth/me` | Modal Perfil en `index.html` | ✅ Implementado |
| **HU-06 (RF-06)** | Registro de número de WhatsApp en perfil | `POST /api/auth/register`<br>`PUT /api/auth/profile` | Formulario en `register.html` y `post.html` | ✅ Implementado |
| **HU-07 (RF-07)** | Publicar producto con título, descripción, precio, fotos, categoría | `POST /api/posts` (Multer upload) | `post.html` | ✅ Implementado |
| **HU-08 (RF-08)** | Buscar, filtrar y ver detalle de productos disponibles | `GET /api/posts?category&search&minPrice&maxPrice`<br>`GET /api/posts/:id` | Sidebar y Modal Detalle en `index.html` | ✅ Implementado |
| **HU-09 (RF-09)** | Marcar producto como "Disponible", "Reservado" o "Vendido" | `PATCH /api/posts/:id/status` | Selector de estado en `index.html` | ✅ Implementado |
| **HU-10 (RF-10)** | Editar o eliminar publicaciones propias del vendedor | `PUT /api/posts/:id`<br>`DELETE /api/posts/:id` | Acciones de vendedor en `index.html` | ✅ Implementado |
| **HU-11 (RF-11)** | Contactar al vendedor directamente por WhatsApp desde el detalle | `GET /api/posts/:id` (Genera deep link `wa.me`) | Botón WhatsApp en `index.html` | ✅ Implementado |
| **HU-12 (RF-12)** | Recomendaciones de puntos de encuentro seguros dentro del campus | `GET /api/safezones` | Modal Puntos Seguros en `index.html` | ✅ Implementado |
| **HU-13 (RF-13)** | Calificar (1-5 estrellas) y comentar la reputación de un vendedor | `POST /api/reviews`<br>`GET /api/reviews/seller/:sellerId` | Modal Calificaciones en `index.html` | ✅ Implementado |
| **HU-14 (RF-14)** | Reportar publicaciones o perfiles sospechosos | `POST /api/reports` | Modal Reportar en `index.html` | ✅ Implementado |
| **HU-15 (RF-15)** | Panel de administrador para visualizar y gestionar reportes | `GET /api/admin/reports`<br>`PATCH /api/admin/reports/:id` | Pestaña Reportes en `admin.html` | ✅ Implementado |
| **HU-16 (RF-16)** | Suspender o banear cuentas de usuarios infractores | `POST /api/admin/users/:id/ban`<br>`POST /api/admin/users/:id/suspend` | Pestaña Usuarios en `admin.html` | ✅ Implementado |
| **HU-17 (RF-17)** | Notificaciones por correo sobre cambios y reportes | `services/notificationService.js`<br>`GET /api/notifications` | Drawer Notificaciones en `index.html` | ✅ Implementado |

---

## 3. Matriz de Requisitos No Funcionales (RNF / HU-NF)

| Código | Requisito No Funcional | Mecanismo de Implementación | Estado |
| :--- | :--- | :--- | :---: |
| **RNF-01 (Seguridad)** | Cifrado de contraseñas y datos sensibles | Hasheo con `bcryptjs` (salt 10) y tokens firmados JWT con expiración de 7 días. | ✅ Cumplido |
| **RNF-02 (Privacidad)** | Cumplimiento Ley 1581 de 2013 (Habeas Data) | Checkbox obligatorio en registro, aviso legal y modal de políticas de privacidad. | ✅ Cumplido |
| **RNF-03 (Auditoría)** | Registro auditable de acciones administrativas | Colección y modelo `AuditLog` registrando admin, timestamp, acción, objetivo e IP. | ✅ Cumplido |
| **RNF-04 (Privacidad)** | WhatsApp visible únicamente para miembros autenticados | `optionalAuth` en backend oculta el teléfono a usuarios no autenticados. | ✅ Cumplido |
| **RNF-05 (Rendimiento)** | Carga del catálogo en menos de 3 segundos | Consultas indexadas compuestas en MongoDB y renderizado DOM optimizado. | ✅ Cumplido |
| **RNF-06 (Rendimiento)** | Apertura de WhatsApp en menos de 2 segundos | Enlaces directos `https://wa.me/57...` con mensaje preformateado. | ✅ Cumplido |
| **RNF-07 (Disponibilidad)** | Disponibilidad 99% y monitoreo de salud | Endpoint `GET /api/health` y middleware global de captura de excepciones. | ✅ Cumplido |
| **RNF-08 (Respaldo)** | Copias de seguridad de la base de datos | Script `scripts/backup.js`, `npm run backup` y descarga JSON en `admin.html`. | ✅ Cumplido |
| **RNF-09 (Usabilidad)** | Publicación ágil en pocos pasos sin tutorial | Formulario intuitivo de 1 página con previsualización en vivo en `post.html`. | ✅ Cumplido |
| **RNF-10 (Usabilidad)** | 100% en español y diseño responsivo | Interfaz completamente en español con soporte fluido móvil y escritorio. | ✅ Cumplido |
| **RNF-11 (Escalabilidad)** | Soporte concurrente e indexación | Índices en `Post` (categoría, estado, precio, texto) y `User` (email, rol, status). | ✅ Cumplido |
| **RNF-12 (Interoperabilidad)**| Compatibilidad con WhatsApp Móvil y WhatsApp Web | Deep-links universales `https://wa.me/` compatibles con cualquier dispositivo. | ✅ Cumplido |
| **RNF-13 (Compatibilidad)**| Compatibilidad multiplataforma y navegadores | Estándares HTML5, CSS Flexbox/Grid y JavaScript ES6+ soportados globalmente. | ✅ Cumplido |
| **RNF-14 (Mantenibilidad)**| Documentación clara de arquitectura y código | Guías en `docs/architecture/`, arquitectura limpia MVC y patrones de diseño. | ✅ Cumplido |
| **RNF-15 (Accesibilidad)** | Accesibilidad web WCAG 2.1 nivel AA | Labels semánticos, contrastes de color testeados y navegación por teclado. | ✅ Cumplido |
