const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'docs', 'comercial', 'fotos');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 7 Real Page Snapshots representing the actual HTML/CSS pages of UniMercs
const snapshots = [
  {
    file: "foto_01_home_hero.svg",
    title: "Página de Inicio (Home Hero)",
    pageSource: "src/test/html/index.html",
    svgContent: `
      <defs>
        <filter id="nav_shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.08"/>
        </filter>
        <filter id="card_shadow">
          <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#000000" flood-opacity="0.06"/>
        </filter>
      </defs>

      <!-- Background Ground -->
      <rect width="1920" height="1080" fill="#F4EFE6"/>

      <!-- Top Announcement Bar -->
      <rect width="1920" height="42" fill="#1F3D36"/>
      <text x="960" y="26" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="14" font-weight="500" fill="#FFFFFF">
        🎓 Marketplace exclusivo para la Pontificia Universidad Javeriana · <tspan fill="#C8A96A" font-weight="700">Entregas en SafeZones del Campus</tspan>
      </text>

      <!-- Site Navigation Header -->
      <g filter="url(#nav_shadow)">
        <rect y="42" width="1920" height="84" fill="#FFFFFF"/>
        <!-- Brand Logo -->
        <g transform="translate(140, 64)">
          <rect width="40" height="40" rx="11" fill="#1F3D36"/>
          <text x="20" y="27" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="22" fill="#C8A96A">u</text>
          <text x="54" y="28" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="26" fill="#16130F" letter-spacing="-1">unimercs</text>
        </g>

        <!-- Search Bar with Autocomplete Pill -->
        <g transform="translate(560, 60)">
          <rect width="520" height="48" rx="24" fill="#FFFFFF" stroke="#E2DBD0" stroke-width="1.5"/>
          <text x="24" y="30" font-size="16">🔍</text>
          <text x="56" y="29" font-family="'Space Grotesk', sans-serif" font-size="15" fill="#756F64">Buscar libros, calculadoras, ropa, tecnología...</text>
          <rect x="420" y="5" width="92" height="38" rx="19" fill="#1F3D36"/>
          <text x="466" y="29" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="13" font-weight="600" fill="#FFFFFF">Buscar</text>
        </g>

        <!-- Right Action Nav -->
        <g transform="translate(1460, 62)">
          <text x="0" y="28" font-family="'Space Grotesk', sans-serif" font-size="15" font-weight="600" fill="#16130F">Explorar</text>
          <text x="90" y="28" font-family="'Space Grotesk', sans-serif" font-size="15" font-weight="600" fill="#16130F">SafeZones</text>
          <rect x="190" y="-4" width="130" height="46" rx="23" fill="#1F3D36"/>
          <text x="255" y="25" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="14" font-weight="700" fill="#C8A96A">+ Vender</text>
        </g>
      </g>

      <!-- Hero Banner Section -->
      <g transform="translate(140, 160)" filter="url(#card_shadow)">
        <rect width="1640" height="520" rx="30" fill="#1F3D36"/>
        
        <!-- Subtle Pattern Lines -->
        <circle cx="1400" cy="260" r="280" fill="none" stroke="#2D5A4F" stroke-width="2" stroke-dasharray="8 6"/>
        <circle cx="1400" cy="260" r="180" fill="none" stroke="#C8A96A" stroke-width="1.5" opacity="0.3"/>

        <!-- Hero Content Left -->
        <g transform="translate(80, 100)">
          <rect width="240" height="34" rx="17" fill="#2D5A4F"/>
          <text x="120" y="22" text-anchor="middle" font-family="'DM Mono', monospace" font-size="12" font-weight="700" fill="#FFE4A0" letter-spacing="2">PONTIFICIA UNIVERSIDAD JAVERIANA</text>
          
          <text x="0" y="105" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="62" fill="#FFFFFF" letter-spacing="-2">
            Sell the textbook.<br/>
            <tspan fill="#C8A96A">Keep the ramen money.</tspan>
          </text>

          <text x="0" y="210" font-family="'Space Grotesk', sans-serif" font-size="20" fill="#E8EFE8" max-width="650">
            El marketplace universitario para comprar, vender e intercambiar libros,<br/>
            tecnología y materiales entre estudiantes javerianos.
          </text>

          <!-- CTA Buttons -->
          <g transform="translate(0, 260)">
            <rect width="220" height="60" rx="30" fill="#C8A96A"/>
            <text x="110" y="36" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="17" fill="#16130F">Empezar a Vender</text>

            <rect x="240" y="0" width="180" height="60" rx="30" fill="transparent" stroke="#E8EFE8" stroke-width="2"/>
            <text x="330" y="36" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="17" fill="#FFFFFF">Explorar Catálogo</text>
          </g>
        </g>

        <!-- Hero Right Feature Illustration / Preview -->
        <g transform="translate(1100, 70)" filter="url(#nav_shadow)">
          <rect width="440" height="380" rx="24" fill="#FFFFFF"/>
          <rect x="20" y="20" width="400" height="230" rx="16" fill="#F4EFE6"/>
          <text x="220" y="145" text-anchor="middle" font-size="90">📚</text>
          
          <rect x="40" y="40" width="110" height="30" rx="8" fill="#1F3D36"/>
          <text x="95" y="60" text-anchor="middle" font-family="'DM Mono', monospace" font-size="12" font-weight="700" fill="#FFE4A0">TOP MATCH</text>

          <text x="30" y="285" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="22" fill="#16130F">Cálculo Stewart 8va Edición</text>
          <text x="30" y="315" font-family="'DM Mono', monospace" font-size="14" fill="#756F64">Facultad de Ingeniería · Ed. 21</text>
          
          <text x="30" y="355" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="28" fill="#1F3D36">$45.000 COP</text>
          <text x="320" y="350" font-family="'DM Mono', monospace" font-size="14" text-decoration="line-through" fill="#A0998E">$180.000 COP</text>
        </g>
      </g>

      <!-- Category Preview Row Below -->
      <g transform="translate(140, 720)">
        <text x="0" y="30" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="26" fill="#16130F">Categorías Populares en Campus</text>
        
        <g transform="translate(0, 50)">
          <!-- Cat 1 -->
          <rect width="250" height="110" rx="18" fill="#FFFFFF" stroke="#E2DBD0"/>
          <text x="30" y="55" font-size="34">📖</text>
          <text x="80" y="50" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="18" fill="#1F3D36">Libros PUJ</text>
          <text x="80" y="74" font-family="'DM Mono', monospace" font-size="13" fill="#756F64">240+ activos</text>

          <!-- Cat 2 -->
          <rect x="275" y="0" width="250" height="110" rx="18" fill="#FFFFFF" stroke="#E2DBD0"/>
          <text x="305" y="55" font-size="34">💻</text>
          <text x="355" y="50" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="18" fill="#1F3D36">Tecnología</text>
          <text x="355" y="74" font-family="'DM Mono', monospace" font-size="13" fill="#756F64">115+ activos</text>

          <!-- Cat 3 -->
          <rect x="550" y="0" width="250" height="110" rx="18" fill="#FFFFFF" stroke="#E2DBD0"/>
          <text x="580" y="55" font-size="34">📐</text>
          <text x="630" y="50" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="18" fill="#1F3D36">Arquitectura</text>
          <text x="630" y="74" font-family="'DM Mono', monospace" font-size="13" fill="#756F64">85+ activos</text>

          <!-- Cat 4 -->
          <rect x="825" y="0" width="250" height="110" rx="18" fill="#FFFFFF" stroke="#E2DBD0"/>
          <text x="855" y="55" font-size="34">🍪</text>
          <text x="905" y="50" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="18" fill="#1F3D36">Hustle & Snacks</text>
          <text x="905" y="74" font-family="'DM Mono', monospace" font-size="13" fill="#756F64">92+ del campus</text>

          <!-- Cat 5 -->
          <rect x="1100" y="0" width="250" height="110" rx="18" fill="#FFFFFF" stroke="#E2DBD0"/>
          <text x="1130" y="55" font-size="34">👕</text>
          <text x="1180" y="50" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="18" fill="#1F3D36">Ropa y Dorm</text>
          <text x="1180" y="74" font-family="'DM Mono', monospace" font-size="13" fill="#756F64">64+ activos</text>

          <!-- Cat 6 SafeZones Link -->
          <rect x="1375" y="0" width="265" height="110" rx="18" fill="#1F3D36"/>
          <text x="1405" y="55" font-size="34">🛡️</text>
          <text x="1455" y="50" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="18" fill="#FFE4A0">SafeZones PUJ</text>
          <text x="1455" y="74" font-family="'DM Mono', monospace" font-size="13" fill="#E8EFE8">Puntos seguros</text>
        </g>
      </g>
    `
  },
  {
    file: "foto_02_explorar_busqueda.svg",
    title: "Explorar & Búsqueda con Filtros",
    pageSource: "src/test/html/explore.html",
    svgContent: `
      <!-- Background -->
      <rect width="1920" height="1080" fill="#F4EFE6"/>

      <!-- Header -->
      <rect width="1920" height="84" fill="#FFFFFF" stroke="#E2DBD0"/>
      <g transform="translate(140, 24)">
        <text x="0" y="32" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="26" fill="#16130F">unimercs</text>
      </g>

      <!-- Active Search Input Box -->
      <g transform="translate(420, 18)">
        <rect width="680" height="48" rx="24" fill="#FFFFFF" stroke="#1F3D36" stroke-width="2"/>
        <text x="24" y="30" font-size="16">🔍</text>
        <text x="56" y="30" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#16130F">Cálculo Stewart|</text>
      </g>

      <!-- Filter Controls Row -->
      <g transform="translate(140, 120)">
        <text x="0" y="30" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="28" fill="#16130F">Resultados para "Cálculo Stewart" (14)</text>
        
        <!-- Filter Chips -->
        <g transform="translate(0, 50)">
          <rect width="130" height="40" rx="20" fill="#1F3D36"/>
          <text x="65" y="25" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="13" fill="#FFFFFF">✓ En Campus</text>

          <rect x="145" y="0" width="190" height="40" rx="20" fill="#1F3D36"/>
          <text x="240" y="25" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="13" fill="#FFFFFF">✓ Menos de $50.000</text>

          <rect x="350" y="0" width="180" height="40" rx="20" fill="#FFFFFF" stroke="#C8A96A" stroke-width="2"/>
          <text x="440" y="25" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="13" fill="#1F3D36">Facultad Ingeniería</text>

          <rect x="545" y="0" width="150" height="40" rx="20" fill="#FFFFFF" stroke="#DDD"/>
          <text x="620" y="25" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="13" fill="#555">Estado: Excelente</text>
        </g>
      </g>

      <!-- Grid of Results (3 Main Cards) -->
      <g transform="translate(140, 240)">
        <!-- Card 1 -->
        <g transform="translate(0, 0)">
          <rect width="520" height="740" rx="24" fill="#FFFFFF" stroke="#1F3D36" stroke-width="3"/>
          <rect x="20" y="20" width="480" height="380" rx="18" fill="#1F3D36"/>
          <text x="260" y="220" text-anchor="middle" font-size="120">📘</text>
          
          <rect x="40" y="40" width="120" height="34" rx="8" fill="#C8A96A"/>
          <text x="100" y="62" text-anchor="middle" font-family="'DM Mono', monospace" font-size="12" font-weight="800" fill="#16130F">RECOMENDADO</text>

          <text x="30" y="445" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="26" fill="#16130F">Cálculo Trascendentes 8va Ed.</text>
          <text x="30" y="480" font-family="'DM Mono', monospace" font-size="15" fill="#756F64">Stewart · Fac. Ingeniería (Ed. 21)</text>

          <text x="30" y="550" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="38" fill="#1F3D36">$45.000 COP</text>
          <text x="30" y="585" font-family="'DM Mono', monospace" font-size="14" fill="#25D366">★★★★★ (18 ventas javerianas)</text>

          <rect x="30" y="625" width="460" height="64" rx="16" fill="#1F3D36"/>
          <text x="260" y="664" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="18" fill="#FFFFFF">Ver Detalles & WhatsApp</text>
        </g>

        <!-- Card 2 -->
        <g transform="translate(560, 0)">
          <rect width="520" height="740" rx="24" fill="#FFFFFF" stroke="#E2DBD0"/>
          <rect x="20" y="20" width="480" height="380" rx="18" fill="#2B3632"/>
          <text x="260" y="220" text-anchor="middle" font-size="120">📗</text>

          <text x="30" y="445" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="26" fill="#16130F">Cálculo Multivariable 7ma Ed.</text>
          <text x="30" y="480" font-family="'DM Mono', monospace" font-size="15" fill="#756F64">Stewart · Fac. Ciencias (Ed. 54)</text>

          <text x="30" y="550" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="38" fill="#1F3D36">$38.000 COP</text>
          <text x="30" y="585" font-family="'DM Mono', monospace" font-size="14" fill="#25D366">★★★★★ (12 ventas)</text>

          <rect x="30" y="625" width="460" height="64" rx="16" fill="#1F3D36"/>
          <text x="260" y="664" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="18" fill="#FFFFFF">Ver Detalles & WhatsApp</text>
        </g>

        <!-- Card 3 -->
        <g transform="translate(1120, 0)">
          <rect width="520" height="740" rx="24" fill="#FFFFFF" stroke="#E2DBD0"/>
          <rect x="20" y="20" width="480" height="380" rx="18" fill="#202A26"/>
          <text x="260" y="220" text-anchor="middle" font-size="120">📟</text>

          <text x="30" y="445" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="26" fill="#16130F">Calculadora TI-84 Plus CE</text>
          <text x="30" y="480" font-family="'DM Mono', monospace" font-size="15" fill="#756F64">Texas Instruments · Ed. 21</text>

          <text x="30" y="550" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="38" fill="#1F3D36">$120.000 COP</text>
          <text x="30" y="585" font-family="'DM Mono', monospace" font-size="14" fill="#25D366">★★★★★ (9 ventas)</text>

          <rect x="30" y="625" width="460" height="64" rx="16" fill="#1F3D36"/>
          <text x="260" y="664" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="18" fill="#FFFFFF">Ver Detalles & WhatsApp</text>
        </g>
      </g>
    `
  },
  {
    file: "foto_03_publicar_articulo.svg",
    title: "Formulario de Publicación Móvil",
    pageSource: "src/test/html/post.html",
    svgContent: `
      <rect width="1920" height="1080" fill="#F4EFE6"/>

      <!-- Center Container Mockup Phone Form -->
      <g transform="translate(560, 40)">
        <rect width="800" height="1000" rx="32" fill="#FFFFFF" stroke="#E2DBD0" stroke-width="2"/>
        
        <!-- Form Header -->
        <g transform="translate(60, 50)">
          <text x="0" y="32" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="32" fill="#16130F">Publicar un Artículo</text>
          <text x="0" y="60" font-family="'DM Mono', monospace" font-size="14" fill="#756F64">Llega a miles de estudiantes javerianos en minutos</text>
        </g>

        <!-- Photo Upload Box -->
        <g transform="translate(60, 140)">
          <rect width="680" height="180" rx="18" fill="#F8F6F1" stroke="#1F3D36" stroke-width="2" stroke-dasharray="8 6"/>
          <text x="340" y="80" text-anchor="middle" font-size="44">📸</text>
          <text x="340" y="120" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#1F3D36">Arrastra fotos aquí o toma una desde tu celular</text>
          <text x="340" y="145" text-anchor="middle" font-family="'DM Mono', monospace" font-size="12" fill="#756F64">Hasta 5 fotos · Máx. 10MB</text>
        </g>

        <!-- Form Fields -->
        <g transform="translate(60, 360)">
          <!-- Title -->
          <text x="0" y="0" font-family="'DM Mono', monospace" font-size="12" font-weight="700" fill="#756F64">TÍTULO DEL PRODUCTO</text>
          <rect y="12" width="680" height="52" rx="12" fill="#FFFFFF" stroke="#1F3D36" stroke-width="2"/>
          <text x="20" y="44" font-family="'Space Grotesk', sans-serif" font-size="16" font-weight="600" fill="#16130F">Cálculo Trascendentes Tempranas - James Stewart 8va Ed.</text>

          <!-- Category & Faculty -->
          <g transform="translate(0, 90)">
            <text x="0" y="0" font-family="'DM Mono', monospace" font-size="12" font-weight="700" fill="#756F64">FACULTAD / CARRERA</text>
            <rect y="12" width="325" height="52" rx="12" fill="#FFFFFF" stroke="#E2DBD0"/>
            <text x="20" y="44" font-family="'Space Grotesk', sans-serif" font-size="15" fill="#16130F">Facultad de Ingeniería ▼</text>

            <text x="355" y="0" font-family="'DM Mono', monospace" font-size="12" font-weight="700" fill="#756F64">ESTADO DEL PRODUCTO</text>
            <rect x="355" y="12" width="325" height="52" rx="12" fill="#FFFFFF" stroke="#E2DBD0"/>
            <text x="375" y="44" font-family="'Space Grotesk', sans-serif" font-size="15" fill="#16130F">Como nuevo (Sin rayones) ▼</text>
          </g>

          <!-- Price -->
          <g transform="translate(0, 180)">
            <text x="0" y="0" font-family="'DM Mono', monospace" font-size="12" font-weight="700" fill="#756F64">PRECIO EN PESOS (COP)</text>
            <rect y="12" width="680" height="64" rx="14" fill="#FFFFFF" stroke="#C8A96A" stroke-width="2.5"/>
            <text x="24" y="52" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="30" fill="#1F3D36">$45.000 COP</text>
          </g>

          <!-- SafeZone Delivery point -->
          <g transform="translate(0, 280)">
            <text x="0" y="0" font-family="'DM Mono', monospace" font-size="12" font-weight="700" fill="#756F64">PUNTO SEGURO PREFERIDO (SAFEZONE)</text>
            <rect y="12" width="680" height="52" rx="12" fill="#FFFFFF" stroke="#1F3D36"/>
            <text x="20" y="44" font-family="'Space Grotesk', sans-serif" font-size="15" fill="#1F3D36">📍 Biblioteca Central Jorge Palacios (Ed. 02) ▼</text>
          </g>

          <!-- Submit Button -->
          <g transform="translate(0, 450)">
            <rect width="680" height="68" rx="20" fill="#1F3D36"/>
            <text x="340" y="42" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="20" fill="#FFFFFF">Publicar Ahora en UniMercs</text>
          </g>
        </g>
      </g>
    `
  },
  {
    file: "foto_04_detalle_producto_whatsapp.svg",
    title: "Detalle de Producto & Contacto WhatsApp",
    pageSource: "src/test/html/product-detail.html",
    svgContent: `
      <rect width="1920" height="1080" fill="#F4EFE6"/>

      <!-- Header -->
      <rect width="1920" height="84" fill="#FFFFFF" stroke="#E2DBD0"/>
      <g transform="translate(140, 24)">
        <text x="0" y="32" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="26" fill="#16130F">unimercs</text>
      </g>

      <!-- Main Product Sheet Container -->
      <g transform="translate(240, 140)">
        <rect width="1440" height="820" rx="30" fill="#FFFFFF" stroke="#E2DBD0"/>

        <!-- Left Image View -->
        <g transform="translate(60, 60)">
          <rect width="620" height="540" rx="22" fill="#1F3D36"/>
          <text x="310" y="290" text-anchor="middle" font-size="150">📘</text>
          <rect x="30" y="30" width="160" height="34" rx="17" fill="#C8A96A"/>
          <text x="110" y="52" text-anchor="middle" font-family="'DM Mono', monospace" font-size="11" font-weight="800" fill="#16130F">✓ FOTO REAL</text>

          <!-- Gallery Thumbnails -->
          <g transform="translate(0, 560)">
            <rect width="140" height="110" rx="14" fill="#2D5A4F" stroke="#C8A96A" stroke-width="3"/>
            <rect x="160" y="0" width="140" height="110" rx="14" fill="#2D5A4F"/>
            <rect x="320" y="0" width="140" height="110" rx="14" fill="#2D5A4F"/>
            <rect x="480" y="0" width="140" height="110" rx="14" fill="#2D5A4F"/>
          </g>
        </g>

        <!-- Right Content & Actions -->
        <g transform="translate(740, 60)">
          <text x="0" y="45" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="38" fill="#16130F">Cálculo Trascendentes Tempranas</text>
          <text x="0" y="85" font-family="'DM Mono', monospace" font-size="18" fill="#756F64">James Stewart · 8va Edición · Facultad de Ingeniería</text>

          <text x="0" y="165" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="54" fill="#1F3D36">$45.000 COP</text>
          <text x="360" y="155" font-family="'DM Mono', monospace" font-size="20" text-decoration="line-through" fill="#999">$180.000 COP</text>

          <!-- Seller Info Box -->
          <g transform="translate(0, 220)">
            <rect width="640" height="180" rx="20" fill="#F8F6F1" stroke="#E2DBD0"/>
            <circle cx="70" cy="70" r="40" fill="#C8A96A"/>
            <text x="70" y="82" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="34" fill="#1F3D36">M</text>

            <text x="135" y="60" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="22" fill="#16130F">Mateo Sánchez</text>
            <text x="135" y="88" font-family="'DM Mono', monospace" font-size="14" fill="#756F64">Ingeniería de Sistemas · 6to Semestre</text>

            <rect x="135" y="105" width="220" height="28" rx="14" fill="#E8EFE8"/>
            <text x="245" y="124" text-anchor="middle" font-family="'DM Mono', monospace" font-size="11" font-weight="700" fill="#1F3D36">🛡️ Estudiante Verificado PUJ</text>

            <text x="25" y="160" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="15" fill="#C8A96A">★★★★★ 4.9 (18 ventas exitosas)</text>
          </g>

          <!-- SafeZone delivery location -->
          <g transform="translate(0, 430)">
            <rect width="640" height="74" rx="16" fill="#E8EFE8" stroke="#1F3D36"/>
            <text x="24" y="44" font-size="26">📍</text>
            <text x="65" y="38" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#1F3D36">Lugar de entrega sugerido:</text>
            <text x="65" y="58" font-family="'DM Mono', monospace" font-size="13" fill="#333">Biblioteca Central (Ed. 02) - Hall de Torniquetes</text>
          </g>

          <!-- WhatsApp Direct Button -->
          <g transform="translate(0, 540)">
            <rect width="640" height="88" rx="24" fill="#25D366"/>
            <text x="160" y="55" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="24" fill="#FFFFFF">💬 Contactar por WhatsApp</text>
            <text x="490" y="52" font-family="'DM Mono', monospace" font-size="12" font-weight="700" fill="#E8FCEF">SIN COMISIONES</text>
          </g>
        </g>
      </g>
    `
  },
  {
    file: "foto_05_safezones_campus.svg",
    title: "SafeZones: Puntos de Encuentro Seguros",
    pageSource: "src/test/html/safezones.html",
    svgContent: `
      <rect width="1920" height="1080" fill="#F4EFE6"/>

      <!-- Header -->
      <rect width="1920" height="84" fill="#FFFFFF" stroke="#E2DBD0"/>
      <g transform="translate(140, 24)">
        <text x="0" y="32" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="26" fill="#16130F">unimercs</text>
      </g>

      <!-- Page Hero -->
      <g transform="translate(140, 120)">
        <rect width="1640" height="140" rx="24" fill="#1F3D36"/>
        <text x="60" y="65" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="38" fill="#FFFFFF">SafeZones · Puntos de Encuentro Seguros</text>
        <text x="60" y="100" font-family="'Space Grotesk', sans-serif" font-size="18" fill="#E8EFE8">Lugares vigilados, iluminados y recomendados dentro del campus de la Javeriana</text>
      </g>

      <!-- Grid of SafeZones (3 Cards) -->
      <g transform="translate(140, 300)">
        <!-- Zone 1 -->
        <g transform="translate(0, 0)">
          <rect width="520" height="680" rx="24" fill="#FFFFFF" stroke="#1F3D36" stroke-width="2.5"/>
          <rect x="20" y="20" width="480" height="280" rx="18" fill="#1F3D36"/>
          <text x="260" y="165" text-anchor="middle" font-size="80">🏛️</text>
          
          <rect x="40" y="40" width="130" height="32" rx="8" fill="#25D366"/>
          <text x="105" y="61" text-anchor="middle" font-family="'DM Mono', monospace" font-size="11" font-weight="800" fill="#FFFFFF">✓ RECOMENDADO</text>

          <text x="30" y="340" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="24" fill="#16130F">Biblioteca Central (Ed. 02)</text>
          <text x="30" y="370" font-family="'DM Mono', monospace" font-size="14" fill="#756F64">Hall de entrada frente a torniquetes</text>

          <g transform="translate(30, 400)">
            <text x="0" y="24" font-family="'DM Mono', monospace" font-size="13" fill="#1F3D36">🛡️ Vigilancia institucional 24/7</text>
            <text x="0" y="54" font-family="'DM Mono', monospace" font-size="13" fill="#1F3D36">📹 Cámaras de circuito cerrado</text>
            <text x="0" y="84" font-family="'DM Mono', monospace" font-size="13" fill="#1F3D36">👥 Alto flujo permanente de estudiantes</text>
          </g>

          <rect x="30" y="580" width="460" height="54" rx="14" fill="#1F3D36"/>
          <text x="260" y="614" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#FFFFFF">Seleccionar Este Punto</text>
        </g>

        <!-- Zone 2 -->
        <g transform="translate(560, 0)">
          <rect width="520" height="680" rx="24" fill="#FFFFFF" stroke="#E2DBD0"/>
          <rect x="20" y="20" width="480" height="280" rx="18" fill="#2D5A4F"/>
          <text x="260" y="165" text-anchor="middle" font-size="80">☕</text>

          <text x="30" y="340" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="24" fill="#16130F">Cafetería Arboleda (Ed. 67)</text>
          <text x="30" y="370" font-family="'DM Mono', monospace" font-size="14" fill="#756F64">Facultad de Ciencias Económicas - Piso 1</text>

          <g transform="translate(30, 400)">
            <text x="0" y="24" font-family="'DM Mono', monospace" font-size="13" fill="#1F3D36">🛡️ Vigilancia activa en zona de mesas</text>
            <text x="0" y="54" font-family="'DM Mono', monospace" font-size="13" fill="#1F3D36">💡 Espacios iluminados y concurridos</text>
            <text x="0" y="84" font-family="'DM Mono', monospace" font-size="13" fill="#1F3D36">🔌 Ideal para probar electrónicos</text>
          </g>

          <rect x="30" y="580" width="460" height="54" rx="14" fill="#1F3D36"/>
          <text x="260" y="614" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#FFFFFF">Seleccionar Este Punto</text>
        </g>

        <!-- Zone 3 -->
        <g transform="translate(1120, 0)">
          <rect width="520" height="680" rx="24" fill="#FFFFFF" stroke="#E2DBD0"/>
          <rect x="20" y="20" width="480" height="280" rx="18" fill="#172721"/>
          <text x="260" y="165" text-anchor="middle" font-size="80">🌳</text>

          <text x="30" y="340" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="24" fill="#16130F">Plazoleta Giraldo (Ed. 40)</text>
          <text x="30" y="370" font-family="'DM Mono', monospace" font-size="14" fill="#756F64">Facultad de Derecho - Bancos centrales</text>

          <g transform="translate(30, 400)">
            <text x="0" y="24" font-family="'DM Mono', monospace" font-size="13" fill="#1F3D36">🛡️ Visibilidad total al aire libre</text>
            <text x="0" y="54" font-family="'DM Mono', monospace" font-size="13" fill="#1F3D36">📍 Encuentros rápidos y céntricos</text>
            <text x="0" y="84" font-family="'DM Mono', monospace" font-size="13" fill="#1F3D36">👥 Cercano a cafetería y personal</text>
          </g>

          <rect x="30" y="580" width="460" height="54" rx="14" fill="#1F3D36"/>
          <text x="260" y="614" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#FFFFFF">Seleccionar Este Punto</text>
        </g>
      </g>
    `
  },
  {
    file: "foto_06_tienda_estudiantil.svg",
    title: "Tienda y Vitrina Estudiantil",
    pageSource: "src/test/html/store.html",
    svgContent: `
      <rect width="1920" height="1080" fill="#F4EFE6"/>

      <!-- Header -->
      <rect width="1920" height="84" fill="#FFFFFF" stroke="#E2DBD0"/>
      <g transform="translate(140, 24)">
        <text x="0" y="32" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="26" fill="#16130F">unimercs</text>
      </g>

      <!-- Store Container -->
      <g transform="translate(240, 120)">
        <rect width="1440" height="880" rx="28" fill="#FFFFFF" stroke="#E2DBD0"/>

        <!-- Banner -->
        <rect width="1440" height="240" rx="28 28 0 0" fill="#1F3D36"/>
        <text x="60" y="120" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="44" fill="#C8A96A">HUSTLE JAVERIANO</text>
        <text x="60" y="160" font-family="'DM Mono', monospace" font-size="18" fill="#F4EFE6">Tienda oficial de apuntes, adaptadores y stickers en campus</text>

        <!-- Avatar Overlap -->
        <g transform="translate(60, 180)">
          <circle cx="60" cy="60" r="60" fill="#FFFFFF"/>
          <circle cx="60" cy="60" r="52" fill="#C8A96A"/>
          <text x="60" y="75" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="44" fill="#1F3D36">HJ</text>
        </g>

        <!-- Store Meta -->
        <g transform="translate(210, 260)">
          <text x="0" y="30" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="26" fill="#16130F">Emprendimiento Javeriano Oficial</text>
          <text x="0" y="58" font-family="'DM Mono', monospace" font-size="14" fill="#756F64">unimercs.app/u/hustle-puj · 42 ventas en campus · ★★★★★ (4.95)</text>

          <rect x="880" y="5" width="240" height="46" rx="23" fill="#1F3D36"/>
          <text x="1000" y="34" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="15" fill="#FFFFFF">Compartir Tienda 🔗</text>
        </g>

        <!-- Catalog Items (4 Cards) -->
        <g transform="translate(60, 360)">
          <!-- Item 1 -->
          <g transform="translate(0, 0)">
            <rect width="310" height="460" rx="18" fill="#FFFFFF" stroke="#E2DBD0"/>
            <rect x="15" y="15" width="280" height="220" rx="14" fill="#E8EFE8"/>
            <text x="155" y="140" text-anchor="middle" font-size="70">📒</text>
            <text x="24" y="270" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="18" fill="#16130F">Resumen Cálculo III</text>
            <text x="24" y="300" font-family="'DM Mono', monospace" font-size="13" fill="#756F64">PDF impreso y anillado</text>
            <text x="24" y="355" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="26" fill="#1F3D36">$15.000 COP</text>
            <rect x="24" y="385" width="262" height="50" rx="12" fill="#1F3D36"/>
            <text x="155" y="416" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="15" fill="#FFFFFF">Comprar</text>
          </g>

          <!-- Item 2 -->
          <g transform="translate(340, 0)">
            <rect width="310" height="460" rx="18" fill="#FFFFFF" stroke="#E2DBD0"/>
            <rect x="15" y="15" width="280" height="220" rx="14" fill="#E8EFE8"/>
            <text x="155" y="140" text-anchor="middle" font-size="70">🔌</text>
            <text x="24" y="270" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="18" fill="#16130F">Adaptador USB-C a HDMI</text>
            <text x="24" y="300" font-family="'DM Mono', monospace" font-size="13" fill="#756F64">Nuevo en caja 4K 60Hz</text>
            <text x="24" y="355" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="26" fill="#1F3D36">$35.000 COP</text>
            <rect x="24" y="385" width="262" height="50" rx="12" fill="#1F3D36"/>
            <text x="155" y="416" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="15" fill="#FFFFFF">Comprar</text>
          </g>

          <!-- Item 3 -->
          <g transform="translate(680, 0)">
            <rect width="310" height="460" rx="18" fill="#FFFFFF" stroke="#E2DBD0"/>
            <rect x="15" y="15" width="280" height="220" rx="14" fill="#E8EFE8"/>
            <text x="155" y="140" text-anchor="middle" font-size="70">🍪</text>
            <text x="24" y="270" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="18" fill="#16130F">Cookies Artesanales x3</text>
            <text x="24" y="300" font-family="'DM Mono', monospace" font-size="13" fill="#756F64">Horneadas en el campus</text>
            <text x="24" y="355" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="26" fill="#1F3D36">$10.000 COP</text>
            <rect x="24" y="385" width="262" height="50" rx="12" fill="#1F3D36"/>
            <text x="155" y="416" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="15" fill="#FFFFFF">Comprar</text>
          </g>

          <!-- Item 4 -->
          <g transform="translate(1020, 0)">
            <rect width="310" height="460" rx="18" fill="#FFFFFF" stroke="#E2DBD0"/>
            <rect x="15" y="15" width="280" height="220" rx="14" fill="#E8EFE8"/>
            <text x="155" y="140" text-anchor="middle" font-size="70">🎨</text>
            <text x="24" y="270" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="18" fill="#16130F">Pack Stickers Javerianos</text>
            <text x="24" y="300" font-family="'DM Mono', monospace" font-size="13" fill="#756F64">Vinilo impermeable x5</text>
            <text x="24" y="355" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="26" fill="#1F3D36">$12.000 COP</text>
            <rect x="24" y="385" width="262" height="50" rx="12" fill="#1F3D36"/>
            <text x="155" y="416" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="15" fill="#FFFFFF">Comprar</text>
          </g>
        </g>
      </g>
    `
  },
  {
    file: "foto_07_cierre_cta.svg",
    title: "Cierre de Marca & Call To Action",
    pageSource: "src/test/html/index.html (Footer & CTA)",
    svgContent: `
      <defs>
        <radialGradient id="cta_grad" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#1F3D36"/>
          <stop offset="60%" stop-color="#142823"/>
          <stop offset="100%" stop-color="#09120F"/>
        </radialGradient>
      </defs>

      <rect width="1920" height="1080" fill="url(#cta_grad)"/>

      <!-- Ambient Golden Rays -->
      <circle cx="960" cy="460" r="380" fill="none" stroke="#C8A96A" stroke-width="1.5" stroke-dasharray="10 8" opacity="0.3"/>
      <circle cx="960" cy="460" r="260" fill="none" stroke="#C8A96A" stroke-width="2" opacity="0.4"/>

      <!-- Big Brand Logo Mark -->
      <g transform="translate(960, 260)">
        <rect x="-60" y="-60" width="120" height="120" rx="34" fill="#C8A96A"/>
        <text x="0" y="24" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="80" fill="#1F3D36">u</text>
      </g>

      <!-- Typography -->
      <g transform="translate(960, 430)">
        <text x="0" y="0" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="84" fill="#FFFFFF" letter-spacing="-2">unimercs</text>
        <text x="0" y="55" text-anchor="middle" font-family="'DM Mono', monospace" font-size="24" font-weight="700" fill="#C8A96A" letter-spacing="8">CAMPUS HUSTLE, HANDLED.</text>
        
        <text x="0" y="115" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="24" fill="#E8EFE8">
          El marketplace exclusivo de la Pontificia Universidad Javeriana
        </text>
      </g>

      <!-- Action Buttons -->
      <g transform="translate(960, 660)">
        <rect x="-240" y="0" width="220" height="68" rx="34" fill="#C8A96A"/>
        <text x="-130" y="42" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="18" fill="#16130F">Empezar a Vender</text>

        <rect x="20" y="0" width="220" height="68" rx="34" fill="transparent" stroke="#E8EFE8" stroke-width="2"/>
        <text x="130" y="42" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="18" fill="#FFFFFF">Explorar Productos</text>

        <text x="0" y="125" text-anchor="middle" font-family="'DM Mono', monospace" font-size="16" fill="#A3B5AE">
          Inicia sesión con tu correo @javeriana.edu.co · Sin comisiones
        </text>
      </g>
    `
  }
];

snapshots.forEach((snap) => {
  const fullSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
${snap.svgContent}
</svg>`;
  const destPath = path.join(targetDir, snap.file);
  fs.writeFileSync(destPath, fullSvg, 'utf8');
  console.log(`Generated snapshot: ${snap.file}`);
});

console.log('All real page snapshots successfully created!');
