const fs = require('fs');
const path = require('path');

const mockupsDir = path.join(__dirname, '..', 'docs', 'mockups');
if (!fs.existsSync(mockupsDir)) {
  fs.mkdirSync(mockupsDir, { recursive: true });
}

// Device frame wrapper helper
function wrapInDevice(title, url, contentWidth, contentHeight, innerSvg) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1200" width="1920" height="1200">
  <defs>
    <radialGradient id="stage_bg" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#182420"/>
      <stop offset="60%" stop-color="#0E1513"/>
      <stop offset="100%" stop-color="#070908"/>
    </radialGradient>
    <filter id="device_shadow">
      <feDropShadow dx="0" dy="30" stdDeviation="40" flood-color="#000000" flood-opacity="0.8"/>
      <feDropShadow dx="0" dy="0" stdDeviation="2" flood-color="#C8A96A" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Studio Stage Background -->
  <rect width="1920" height="1200" fill="url(#stage_bg)"/>

  <!-- Top Title Header -->
  <g transform="translate(100, 60)">
    <rect width="1720" height="60" rx="16" fill="#141C19" stroke="#23312C"/>
    <text x="30" y="38" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="20" fill="#FFFFFF">${title}</text>
    <rect x="1380" y="14" width="310" height="32" rx="16" fill="#1F3D36"/>
    <text x="1535" y="35" text-anchor="middle" font-family="'DM Mono', monospace" font-size="12" font-weight="700" fill="#FFE4A0">MOCKUP OFICIAL · PUJ BOGOTÁ</text>
  </g>

  <!-- MacBook Pro 16" Mockup Frame -->
  <g transform="translate(140, 150)" filter="url(#device_shadow)">
    <!-- Aluminum Outer Bezel -->
    <rect width="1640" height="960" rx="28" fill="#1A201E" stroke="#374540" stroke-width="4"/>
    
    <!-- Notch / Camera & Browser Bar -->
    <rect x="4" y="4" width="1632" height="42" rx="24 24 0 0" fill="#121715"/>
    <!-- Window Control Buttons -->
    <circle cx="36" cy="25" r="6" fill="#FF5F56"/>
    <circle cx="58" cy="25" r="6" fill="#FFBD2E"/>
    <circle cx="80" cy="25" r="6" fill="#27C93F"/>

    <!-- URL Pill Bar -->
    <g transform="translate(480, 10)">
      <rect width="680" height="26" rx="13" fill="#1B2421" stroke="#2D3B36"/>
      <text x="340" y="17" text-anchor="middle" font-family="'DM Mono', monospace" font-size="11" fill="#A4B5AC">🔒 https://unimercs.javeriana.edu.co/${url}</text>
    </g>

    <!-- Inner Screen Display Area (1632 x 910) -->
    <g transform="translate(4, 46)">
      <rect width="1632" height="910" fill="#F4EFE6"/>
      <g transform="scale(${1632 / contentWidth}, ${910 / contentHeight})">
        ${innerSvg}
      </g>
    </g>
  </g>
</svg>`;
}

// 14 Mockups for all pages of UniMercs
const mockups = [
  // 1. Home
  {
    name: "mockup_01_home.svg",
    title: "01 · PÁGINA DE INICIO (HOME)",
    url: "src/test/html/index.html",
    svg: `
      <!-- Top Announcement -->
      <rect width="1600" height="38" fill="#1F3D36"/>
      <text x="800" y="24" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="14" fill="#FFFFFF">
        🎓 Marketplace exclusivo para la Pontificia Universidad Javeriana · <tspan fill="#C8A96A" font-weight="700">Entregas en SafeZones del Campus</tspan>
      </text>

      <!-- Nav -->
      <rect y="38" width="1600" height="74" fill="#FFFFFF" stroke="#E2DBD0"/>
      <text x="80" y="84" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="28" fill="#1F3D36">unimercs</text>
      
      <g transform="translate(420, 52)">
        <rect width="520" height="46" rx="23" fill="#FFFFFF" stroke="#E2DBD0" stroke-width="1.5"/>
        <text x="24" y="28" font-size="16">🔍</text>
        <text x="56" y="28" font-family="'Space Grotesk', sans-serif" font-size="14" fill="#756F64">Buscar libros, calculadoras, tecnología...</text>
      </g>

      <g transform="translate(1220, 56)">
        <text x="0" y="25" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="15" fill="#16130F">Explorar</text>
        <text x="80" y="25" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="15" fill="#16130F">SafeZones</text>
        <rect x="180" y="-8" width="120" height="42" rx="21" fill="#1F3D36"/>
        <text x="240" y="19" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="14" fill="#C8A96A">+ Vender</text>
      </g>

      <!-- Hero Banner -->
      <g transform="translate(80, 140)">
        <rect width="1440" height="440" rx="26" fill="#1F3D36"/>
        <g transform="translate(70, 70)">
          <text x="0" y="40" font-family="'DM Mono', monospace" font-size="13" font-weight="700" fill="#C8A96A">PONTIFICIA UNIVERSIDAD JAVERIANA</text>
          <text x="0" y="115" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="54" fill="#FFFFFF">Sell the textbook.<br/><tspan fill="#C8A96A">Keep the ramen money.</tspan></text>
          <text x="0" y="210" font-family="'Space Grotesk', sans-serif" font-size="18" fill="#E8EFE8">El marketplace universitario para comprar, vender e intercambiar artículos en campus.</text>
          <rect y="250" width="200" height="54" rx="27" fill="#C8A96A"/>
          <text x="100" y="283" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="16" fill="#16130F">Empezar a Vender</text>
        </g>
        <g transform="translate(980, 60)">
          <rect width="380" height="320" rx="20" fill="#FFFFFF"/>
          <text x="190" y="140" text-anchor="middle" font-size="80">📚</text>
          <text x="30" y="240" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="20" fill="#16130F">Cálculo Stewart 8va Ed.</text>
          <text x="30" y="285" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="26" fill="#1F3D36">$45.000 COP</text>
        </g>
      </g>

      <!-- Category Pills -->
      <g transform="translate(80, 620)">
        <text x="0" y="30" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="24" fill="#16130F">Categorías en Campus</text>
        <g transform="translate(0, 50)">
          <rect width="260" height="90" rx="14" fill="#FFFFFF" stroke="#E2DBD0"/>
          <text x="30" y="55" font-size="30">📖</text>
          <text x="80" y="46" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#1F3D36">Libros PUJ</text>
          <text x="80" y="68" font-family="'DM Mono', monospace" font-size="12" fill="#756F64">240+ activos</text>

          <rect x="290" y="0" width="260" height="90" rx="14" fill="#FFFFFF" stroke="#E2DBD0"/>
          <text x="320" y="55" font-size="30">⚡</text>
          <text x="370" y="46" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#1F3D36">Tecnología</text>
          <text x="370" y="68" font-family="'DM Mono', monospace" font-size="12" fill="#756F64">115+ activos</text>

          <rect x="580" y="0" width="260" height="90" rx="14" fill="#FFFFFF" stroke="#E2DBD0"/>
          <text x="610" y="55" font-size="30">📐</text>
          <text x="660" y="46" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#1F3D36">Arquitectura</text>
          <text x="660" y="68" font-family="'DM Mono', monospace" font-size="12" fill="#756F64">85+ activos</text>

          <rect x="870" y="0" width="260" height="90" rx="14" fill="#FFFFFF" stroke="#E2DBD0"/>
          <text x="900" y="55" font-size="30">🍪</text>
          <text x="950" y="46" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#1F3D36">Snacks & Hustle</text>
          <text x="950" y="68" font-family="'DM Mono', monospace" font-size="12" fill="#756F64">92+ del campus</text>

          <rect x="1160" y="0" width="280" height="90" rx="14" fill="#1F3D36"/>
          <text x="1190" y="55" font-size="30">🛡️</text>
          <text x="1240" y="46" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#FFE4A0">SafeZones PUJ</text>
          <text x="1240" y="68" font-family="'DM Mono', monospace" font-size="12" fill="#E8EFE8">Puntos seguros</text>
        </g>
      </g>
    `
  },

  // 2. Explore
  {
    name: "mockup_02_explore.svg",
    title: "02 · EXPLORAR & BÚSQUEDA INTELIGENTE",
    url: "src/test/html/explore.html",
    svg: `
      <rect width="1600" height="74" fill="#FFFFFF" stroke="#E2DBD0"/>
      <text x="80" y="48" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="28" fill="#1F3D36">unimercs</text>
      
      <!-- Search with Dropdown Query -->
      <g transform="translate(380, 14)">
        <rect width="720" height="46" rx="23" fill="#FFFFFF" stroke="#1F3D36" stroke-width="2"/>
        <text x="24" y="28" font-size="16">🔍</text>
        <text x="56" y="28" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="15" fill="#16130F">Cálculo Stewart|</text>
      </g>

      <!-- Active Filters Row -->
      <g transform="translate(80, 110)">
        <text x="0" y="30" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="26" fill="#16130F">Resultados para "Cálculo Stewart" (14)</text>
        <g transform="translate(0, 50)">
          <rect width="120" height="36" rx="18" fill="#1F3D36"/>
          <text x="60" y="22" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="12" fill="#FFF">✓ En Campus</text>
          <rect x="135" y="0" width="180" height="36" rx="18" fill="#1F3D36"/>
          <text x="225" y="22" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="12" fill="#FFF">✓ Menos de $50.000</text>
          <rect x="330" y="0" width="170" height="36" rx="18" fill="#FFF" stroke="#C8A96A" stroke-width="2"/>
          <text x="415" y="22" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="12" fill="#1F3D36">Facultad Ingeniería</text>
        </g>
      </g>

      <!-- 3 Products Grid -->
      <g transform="translate(80, 230)">
        <!-- P1 -->
        <g transform="translate(0, 0)">
          <rect width="450" height="600" rx="20" fill="#FFFFFF" stroke="#1F3D36" stroke-width="2.5"/>
          <rect x="20" y="20" width="410" height="300" rx="16" fill="#1F3D36"/>
          <text x="225" y="180" text-anchor="middle" font-size="100">📘</text>
          <text x="30" y="360" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="22" fill="#16130F">Cálculo Stewart 8va Ed.</text>
          <text x="30" y="390" font-family="'DM Mono', monospace" font-size="14" fill="#756F64">Fac. Ingeniería · Ed. 21</text>
          <text x="30" y="450" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="34" fill="#1F3D36">$45.000 COP</text>
          <rect x="30" y="500" width="390" height="54" rx="14" fill="#1F3D36"/>
          <text x="225" y="534" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#FFF">Ver Detalles & WhatsApp</text>
        </g>

        <!-- P2 -->
        <g transform="translate(490, 0)">
          <rect width="450" height="600" rx="20" fill="#FFFFFF" stroke="#E2DBD0"/>
          <rect x="20" y="20" width="410" height="300" rx="16" fill="#2B3632"/>
          <text x="225" y="180" text-anchor="middle" font-size="100">📗</text>
          <text x="30" y="360" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="22" fill="#16130F">Cálculo Multivariable 7ma</text>
          <text x="30" y="390" font-family="'DM Mono', monospace" font-size="14" fill="#756F64">Fac. Ciencias · Ed. 54</text>
          <text x="30" y="450" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="34" fill="#1F3D36">$38.000 COP</text>
          <rect x="30" y="500" width="390" height="54" rx="14" fill="#1F3D36"/>
          <text x="225" y="534" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#FFF">Ver Detalles & WhatsApp</text>
        </g>

        <!-- P3 -->
        <g transform="translate(980, 0)">
          <rect width="450" height="600" rx="20" fill="#FFFFFF" stroke="#E2DBD0"/>
          <rect x="20" y="20" width="410" height="300" rx="16" fill="#202A26"/>
          <text x="225" y="180" text-anchor="middle" font-size="100">📟</text>
          <text x="30" y="360" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="22" fill="#16130F">Calculadora TI-84 Plus</text>
          <text x="30" y="390" font-family="'DM Mono', monospace" font-size="14" fill="#756F64">Ciencias Económicas · Ed. 67</text>
          <text x="30" y="450" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="34" fill="#1F3D36">$120.000 COP</text>
          <rect x="30" y="500" width="390" height="54" rx="14" fill="#1F3D36"/>
          <text x="225" y="534" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#FFF">Ver Detalles & WhatsApp</text>
        </g>
      </g>
    `
  },

  // 3. Product Detail
  {
    name: "mockup_03_product_detail.svg",
    title: "03 · DETALLE DE PRODUCTO & WHATSAPP",
    url: "src/test/html/product-detail.html",
    svg: `
      <rect width="1600" height="74" fill="#FFFFFF" stroke="#E2DBD0"/>
      <text x="80" y="48" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="28" fill="#1F3D36">unimercs</text>
      
      <g transform="translate(80, 110)">
        <rect width="1440" height="740" rx="24" fill="#FFFFFF" stroke="#E2DBD0"/>
        
        <!-- Left Product Gallery -->
        <g transform="translate(50, 50)">
          <rect width="580" height="480" rx="18" fill="#1F3D36"/>
          <text x="290" y="270" text-anchor="middle" font-size="140">📘</text>
          <g transform="translate(0, 510)">
            <rect width="130" height="100" rx="12" fill="#2D5A4F" stroke="#C8A96A" stroke-width="3"/>
            <rect x="150" y="0" width="130" height="100" rx="12" fill="#2D5A4F"/>
            <rect x="300" y="0" width="130" height="100" rx="12" fill="#2D5A4F"/>
            <rect x="450" y="0" width="130" height="100" rx="12" fill="#2D5A4F"/>
          </g>
        </g>

        <!-- Right Content -->
        <g transform="translate(680, 50)">
          <text x="0" y="40" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="34" fill="#16130F">Cálculo Trascendentes Tempranas</text>
          <text x="0" y="75" font-family="'DM Mono', monospace" font-size="16" fill="#756F64">Stewart 8va Edición · Facultad de Ingeniería</text>
          
          <text x="0" y="150" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="48" fill="#1F3D36">$45.000 COP</text>
          
          <!-- Seller -->
          <g transform="translate(0, 200)">
            <rect width="700" height="160" rx="18" fill="#F8F6F1" stroke="#E2DBD0"/>
            <circle cx="65" cy="65" r="36" fill="#C8A96A"/>
            <text x="65" y="76" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="28" fill="#1F3D36">M</text>
            <text x="125" y="55" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="20" fill="#16130F">Mateo Sánchez</text>
            <text x="125" y="80" font-family="'DM Mono', monospace" font-size="13" fill="#756F64">Ingeniería de Sistemas · 6to Semestre</text>
            <text x="25" y="135" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="14" fill="#C8A96A">★★★★★ 4.9 (18 ventas exitosas en campus)</text>
          </g>

          <!-- SafeZone -->
          <g transform="translate(0, 390)">
            <rect width="700" height="68" rx="14" fill="#E8EFE8" stroke="#1F3D36"/>
            <text x="20" y="42" font-size="24">📍</text>
            <text x="60" y="36" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="15" fill="#1F3D36">Punto de entrega SafeZone:</text>
            <text x="60" y="55" font-family="'DM Mono', monospace" font-size="13" fill="#333">Biblioteca Central (Ed. 02) frente a torniquetes</text>
          </g>

          <!-- WhatsApp Button -->
          <g transform="translate(0, 490)">
            <rect width="700" height="80" rx="20" fill="#25D366"/>
            <text x="180" y="48" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="22" fill="#FFF">💬 Contactar por WhatsApp</text>
          </g>
        </g>
      </g>
    `
  },

  // 4. Post
  {
    name: "mockup_04_post.svg",
    title: "04 · PUBLICAR ARTÍCULO EN CAMPUS",
    url: "src/test/html/post.html",
    svg: `
      <rect width="1600" height="74" fill="#FFFFFF" stroke="#E2DBD0"/>
      <text x="80" y="48" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="28" fill="#1F3D36">unimercs</text>
      
      <g transform="translate(360, 100)">
        <rect width="880" height="760" rx="24" fill="#FFFFFF" stroke="#E2DBD0"/>
        <text x="60" y="60" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="28" fill="#16130F">Publicar un Artículo</text>

        <!-- Dropzone -->
        <g transform="translate(60, 90)">
          <rect width="760" height="150" rx="16" fill="#F8F6F1" stroke="#1F3D36" stroke-width="2" stroke-dasharray="6 4"/>
          <text x="380" y="70" text-anchor="middle" font-size="36">📸</text>
          <text x="380" y="105" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="15" fill="#1F3D36">Sube fotos reales del producto</text>
        </g>

        <!-- Fields -->
        <g transform="translate(60, 270)">
          <text x="0" y="0" font-family="'DM Mono', monospace" font-size="11" font-weight="700" fill="#756F64">TÍTULO DEL PRODUCTO</text>
          <rect y="10" width="760" height="46" rx="10" fill="#FFFFFF" stroke="#1F3D36"/>
          <text x="16" y="38" font-family="'Space Grotesk', sans-serif" font-size="15" fill="#16130F">Cálculo Stewart 8va Edición</text>

          <g transform="translate(0, 80)">
            <text x="0" y="0" font-family="'DM Mono', monospace" font-size="11" font-weight="700" fill="#756F64">PRECIO (COP)</text>
            <rect y="10" width="365" height="52" rx="10" fill="#FFFFFF" stroke="#C8A96A" stroke-width="2"/>
            <text x="20" y="42" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="24" fill="#1F3D36">$45.000 COP</text>

            <text x="395" y="0" font-family="'DM Mono', monospace" font-size="11" font-weight="700" fill="#756F64">ESTADO</text>
            <rect x="395" y="10" width="365" height="52" rx="10" fill="#FFFFFF" stroke="#DDD"/>
            <text x="415" y="42" font-family="'Space Grotesk', sans-serif" font-size="15" fill="#16130F">Como nuevo ▼</text>
          </g>

          <g transform="translate(0, 180)">
            <text x="0" y="0" font-family="'DM Mono', monospace" font-size="11" font-weight="700" fill="#756F64">SAFEZONE RECOMENDADA</text>
            <rect y="10" width="760" height="46" rx="10" fill="#FFFFFF" stroke="#1F3D36"/>
            <text x="16" y="38" font-family="'Space Grotesk', sans-serif" font-size="15" fill="#1F3D36">📍 Biblioteca Central Jorge Palacios (Ed. 02) ▼</text>
          </g>

          <g transform="translate(0, 310)">
            <rect width="760" height="60" rx="16" fill="#1F3D36"/>
            <text x="380" y="38" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="18" fill="#FFF">Publicar Ahora</text>
          </g>
        </g>
      </g>
    `
  },

  // 5. SafeZones
  {
    name: "mockup_05_safezones.svg",
    title: "05 · SAFEZONES EN EL CAMPUS JAVERIANO",
    url: "src/test/html/safezones.html",
    svg: `
      <rect width="1600" height="74" fill="#FFFFFF" stroke="#E2DBD0"/>
      <text x="80" y="48" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="28" fill="#1F3D36">unimercs</text>

      <g transform="translate(80, 110)">
        <rect width="1440" height="120" rx="20" fill="#1F3D36"/>
        <text x="50" y="55" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="32" fill="#FFFFFF">SafeZones · Puntos de Encuentro Seguros</text>
        <text x="50" y="88" font-family="'Space Grotesk', sans-serif" font-size="16" fill="#E8EFE8">Lugares vigilados e iluminados en la Javeriana</text>
      </g>

      <!-- 3 SafeZone Cards -->
      <g transform="translate(80, 260)">
        <!-- Zone 1 -->
        <g transform="translate(0, 0)">
          <rect width="450" height="580" rx="20" fill="#FFFFFF" stroke="#1F3D36" stroke-width="2"/>
          <rect x="20" y="20" width="410" height="240" rx="14" fill="#1F3D36"/>
          <text x="225" y="145" text-anchor="middle" font-size="70">🏛️</text>
          <rect x="35" y="35" width="120" height="28" rx="6" fill="#25D366"/>
          <text x="95" y="53" text-anchor="middle" font-family="'DM Mono', monospace" font-size="11" font-weight="800" fill="#FFF">✓ RECOMENDADO</text>
          
          <text x="25" y="295" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="22" fill="#16130F">Biblioteca Central (Ed. 02)</text>
          <text x="25" y="325" font-family="'DM Mono', monospace" font-size="13" fill="#756F64">Hall de entrada frente a torniquetes</text>
          <text x="25" y="380" font-family="'DM Mono', monospace" font-size="13" fill="#1F3D36">🛡️ Vigilancia institucional 24/7</text>
          <text x="25" y="410" font-family="'DM Mono', monospace" font-size="13" fill="#1F3D36">📹 Cámaras de circuito cerrado</text>
          <rect x="25" y="490" width="400" height="50" rx="12" fill="#1F3D36"/>
          <text x="225" y="521" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="15" fill="#FFF">Seleccionar Punto</text>
        </g>

        <!-- Zone 2 -->
        <g transform="translate(495, 0)">
          <rect width="450" height="580" rx="20" fill="#FFFFFF" stroke="#E2DBD0"/>
          <rect x="20" y="20" width="410" height="240" rx="14" fill="#2D5A4F"/>
          <text x="225" y="145" text-anchor="middle" font-size="70">☕</text>
          <text x="25" y="295" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="22" fill="#16130F">Cafetería Arboleda (Ed. 67)</text>
          <text x="25" y="325" font-family="'DM Mono', monospace" font-size="13" fill="#756F64">Facultad de Ciencias Económicas</text>
          <text x="25" y="380" font-family="'DM Mono', monospace" font-size="13" fill="#1F3D36">🛡️ Vigilancia en zona de mesas</text>
          <text x="25" y="410" font-family="'DM Mono', monospace" font-size="13" fill="#1F3D36">🔌 Ideal para probar electrónicos</text>
          <rect x="25" y="490" width="400" height="50" rx="12" fill="#1F3D36"/>
          <text x="225" y="521" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="15" fill="#FFF">Seleccionar Punto</text>
        </g>

        <!-- Zone 3 -->
        <g transform="translate(990, 0)">
          <rect width="450" height="580" rx="20" fill="#FFFFFF" stroke="#E2DBD0"/>
          <rect x="20" y="20" width="410" height="240" rx="14" fill="#172721"/>
          <text x="225" y="145" text-anchor="middle" font-size="70">🌳</text>
          <text x="25" y="295" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="22" fill="#16130F">Plazoleta Giraldo (Ed. 40)</text>
          <text x="25" y="325" font-family="'DM Mono', monospace" font-size="13" fill="#756F64">Facultad de Derecho</text>
          <text x="25" y="380" font-family="'DM Mono', monospace" font-size="13" fill="#1F3D36">🛡️ Visibilidad total al aire libre</text>
          <text x="25" y="410" font-family="'DM Mono', monospace" font-size="13" fill="#1F3D36">👥 Cercano a cafetería central</text>
          <rect x="25" y="490" width="400" height="50" rx="12" fill="#1F3D36"/>
          <text x="225" y="521" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="15" fill="#FFF">Seleccionar Punto</text>
        </g>
      </g>
    `
  },

  // 6. Store
  {
    name: "mockup_06_store.svg",
    title: "06 · TIENDA DEL ESTUDIANTE",
    url: "src/test/html/store.html",
    svg: `
      <rect width="1600" height="74" fill="#FFFFFF" stroke="#E2DBD0"/>
      <text x="80" y="48" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="28" fill="#1F3D36">unimercs</text>

      <g transform="translate(80, 110)">
        <rect width="1440" height="740" rx="24" fill="#FFFFFF" stroke="#E2DBD0"/>
        <!-- Banner -->
        <rect width="1440" height="180" rx="24 24 0 0" fill="#1F3D36"/>
        <text x="50" y="90" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="36" fill="#C8A96A">HUSTLE JAVERIANO</text>
        <text x="50" y="125" font-family="'DM Mono', monospace" font-size="15" fill="#FFF">Tienda oficial de apuntes y snacks</text>

        <!-- Avatar -->
        <circle cx="90" cy="180" r="50" fill="#FFFFFF"/>
        <circle cx="90" cy="180" r="44" fill="#C8A96A"/>
        <text x="90" y="192" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="34" fill="#1F3D36">HJ</text>

        <text x="160" y="225" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="22" fill="#16130F">Emprendimiento Javeriano Oficial</text>
        <text x="160" y="250" font-family="'DM Mono', monospace" font-size="13" fill="#756F64">42 ventas · ★★★★★ (4.95)</text>

        <!-- 3 Items -->
        <g transform="translate(50, 300)">
          <rect width="410" height="380" rx="16" fill="#FFF" stroke="#E2DBD0"/>
          <rect x="15" y="15" width="380" height="180" rx="12" fill="#E8EFE8"/>
          <text x="205" y="115" text-anchor="middle" font-size="60">📒</text>
          <text x="25" y="235" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="18" fill="#16130F">Resumen Cálculo III</text>
          <text x="25" y="300" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="26" fill="#1F3D36">$15.000 COP</text>
          <rect x="25" y="320" width="360" height="42" rx="10" fill="#1F3D36"/>
          <text x="205" y="347" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="14" fill="#FFF">Comprar</text>

          <g transform="translate(440, 0)">
            <rect width="410" height="380" rx="16" fill="#FFF" stroke="#E2DBD0"/>
            <rect x="15" y="15" width="380" height="180" rx="12" fill="#E8EFE8"/>
            <text x="205" y="115" text-anchor="middle" font-size="60">🔌</text>
            <text x="25" y="235" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="18" fill="#16130F">Adaptador USB-C a HDMI</text>
            <text x="25" y="300" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="26" fill="#1F3D36">$35.000 COP</text>
            <rect x="25" y="320" width="360" height="42" rx="10" fill="#1F3D36"/>
            <text x="205" y="347" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="14" fill="#FFF">Comprar</text>
          </g>

          <g transform="translate(880, 0)">
            <rect width="410" height="380" rx="16" fill="#FFF" stroke="#E2DBD0"/>
            <rect x="15" y="15" width="380" height="180" rx="12" fill="#E8EFE8"/>
            <text x="205" y="115" text-anchor="middle" font-size="60">🍪</text>
            <text x="25" y="235" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="18" fill="#16130F">Cookies Artesanales x3</text>
            <text x="25" y="300" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="26" fill="#1F3D36">$10.000 COP</text>
            <rect x="25" y="320" width="360" height="42" rx="10" fill="#1F3D36"/>
            <text x="205" y="347" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="14" fill="#FFF">Comprar</text>
          </g>
        </g>
      </g>
    `
  },

  // 7. Profile (My Account)
  {
    name: "mockup_07_profile.svg",
    title: "07 · MI PERFIL & PANEL DE USUARIO",
    url: "src/test/html/profile.html",
    svg: `
      <rect width="1600" height="74" fill="#FFFFFF" stroke="#E2DBD0"/>
      <text x="80" y="48" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="28" fill="#1F3D36">unimercs</text>

      <g transform="translate(80, 110)">
        <!-- Left Sidebar User Card -->
        <g transform="translate(0, 0)">
          <rect width="420" height="740" rx="20" fill="#FFFFFF" stroke="#E2DBD0"/>
          <circle cx="210" cy="100" r="50" fill="#C8A96A"/>
          <text x="210" y="115" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="38" fill="#1F3D36">JS</text>
          <text x="210" y="180" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="22" fill="#16130F">Juan Pablo Sánchez</text>
          <text x="210" y="205" text-anchor="middle" font-family="'DM Mono', monospace" font-size="13" fill="#756F64">sanchez.jp@javeriana.edu.co</text>
          
          <rect x="80" y="225" width="260" height="32" rx="16" fill="#E8EFE8"/>
          <text x="210" y="246" text-anchor="middle" font-family="'DM Mono', monospace" font-size="12" font-weight="700" fill="#1F3D36">🛡️ Carné Javeriano Validado</text>

          <g transform="translate(30, 300)">
            <rect width="360" height="46" rx="10" fill="#1F3D36"/>
            <text x="20" y="28" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="14" fill="#FFF">📦 Mis Publicaciones (3)</text>
            <rect y="60" width="360" height="46" rx="10" fill="#F8F6F1"/>
            <text x="20" y="88" font-family="'Space Grotesk', sans-serif" font-size="14" fill="#555">💬 Mensajes de Compradores</text>
            <rect y="120" width="360" height="46" rx="10" fill="#F8F6F1"/>
            <text x="20" y="148" font-family="'Space Grotesk', sans-serif" font-size="14" fill="#555">⭐ Mis Calificaciones (4.9)</text>
          </g>
        </g>

        <!-- Right Active Listings -->
        <g transform="translate(460, 0)">
          <rect width="980" height="740" rx="20" fill="#FFFFFF" stroke="#E2DBD0"/>
          <text x="40" y="55" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="26" fill="#16130F">Mis Artículos en Venta</text>

          <g transform="translate(40, 90)">
            <!-- Item Row 1 -->
            <rect width="900" height="110" rx="14" fill="#F8F6F1" stroke="#E2DBD0"/>
            <rect x="15" y="15" width="80" height="80" rx="10" fill="#1F3D36"/>
            <text x="55" y="65" text-anchor="middle" font-size="34">📘</text>
            <text x="120" y="50" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="18" fill="#16130F">Cálculo Stewart 8va Edición</text>
            <text x="120" y="75" font-family="'DM Mono', monospace" font-size="13" fill="#756F64">Activo · 14 vistas hoy</text>
            <text x="680" y="62" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="22" fill="#1F3D36">$45.000 COP</text>
            <rect x="800" y="38" width="80" height="34" rx="8" fill="#1F3D36"/>
            <text x="840" y="59" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="12" fill="#FFF">Editar</text>

            <!-- Item Row 2 -->
            <g transform="translate(0, 130)">
              <rect width="900" height="110" rx="14" fill="#F8F6F1" stroke="#E2DBD0"/>
              <rect x="15" y="15" width="80" height="80" rx="10" fill="#202A26"/>
              <text x="55" y="65" text-anchor="middle" font-size="34">📟</text>
              <text x="120" y="50" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="18" fill="#16130F">Calculadora TI-84 Plus CE</text>
              <text x="120" y="75" font-family="'DM Mono', monospace" font-size="13" fill="#756F64">Activo · 28 vistas</text>
              <text x="680" y="62" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="22" fill="#1F3D36">$120.000 COP</text>
              <rect x="800" y="38" width="80" height="34" rx="8" fill="#1F3D36"/>
              <text x="840" y="59" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="12" fill="#FFF">Editar</text>
            </g>
          </g>
        </g>
      </g>
    `
  },

  // 8. Public Profile
  {
    name: "mockup_08_public_profile.svg",
    title: "08 · PERFIL PÚBLICO DEL ESTUDIANTE",
    url: "src/test/html/public-profile.html",
    svg: `
      <rect width="1600" height="74" fill="#FFFFFF" stroke="#E2DBD0"/>
      <text x="80" y="48" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="28" fill="#1F3D36">unimercs</text>

      <g transform="translate(80, 110)">
        <rect width="1440" height="740" rx="24" fill="#FFFFFF" stroke="#E2DBD0"/>
        <g transform="translate(60, 60)">
          <circle cx="60" cy="60" r="50" fill="#C8A96A"/>
          <text x="60" y="72" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="34" fill="#1F3D36">GR</text>
          <text x="140" y="50" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="28" fill="#16130F">Germán Rodríguez</text>
          <text x="140" y="80" font-family="'DM Mono', monospace" font-size="14" fill="#756F64">Facultad de Ingeniería · Miembro desde 2026</text>
          <rect x="140" y="95" width="220" height="28" rx="14" fill="#E8EFE8"/>
          <text x="250" y="114" text-anchor="middle" font-family="'DM Mono', monospace" font-size="11" font-weight="700" fill="#1F3D36">🛡️ Vendedor Javeriano Verificado</text>

          <g transform="translate(900, 20)">
            <rect width="360" height="100" rx="16" fill="#F8F6F1" stroke="#E2DBD0"/>
            <text x="180" y="45" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="28" fill="#C8A96A">★★★★★ 5.0</text>
            <text x="180" y="75" text-anchor="middle" font-family="'DM Mono', monospace" font-size="13" fill="#756F64">22 transacciones completadas</text>
          </g>
        </g>

        <!-- Seller Products -->
        <g transform="translate(60, 240)">
          <text x="0" y="30" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="22" fill="#16130F">Artículos Disponibles de Germán (3)</text>
          <g transform="translate(0, 50)">
            <rect width="420" height="380" rx="16" fill="#FFFFFF" stroke="#E2DBD0"/>
            <rect x="15" y="15" width="390" height="220" rx="12" fill="#2D5A4F"/>
            <text x="210" y="140" text-anchor="middle" font-size="70">📐</text>
            <text x="25" y="270" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="18" fill="#16130F">Kit de Dibujo & Escalímetro</text>
            <text x="25" y="325" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="26" fill="#1F3D36">$30.000 COP</text>

            <g transform="translate(450, 0)">
              <rect width="420" height="380" rx="16" fill="#FFFFFF" stroke="#E2DBD0"/>
              <rect x="15" y="15" width="390" height="220" rx="12" fill="#202A26"/>
              <text x="210" y="140" text-anchor="middle" font-size="70">💻</text>
              <text x="25" y="270" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="18" fill="#16130F">Mouse Inalámbrico Logitech</text>
              <text x="25" y="325" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="26" fill="#1F3D36">$40.000 COP</text>
            </g>

            <g transform="translate(900, 0)">
              <rect width="420" height="380" rx="16" fill="#FFFFFF" stroke="#E2DBD0"/>
              <rect x="15" y="15" width="390" height="220" rx="12" fill="#1F3D36"/>
              <text x="210" y="140" text-anchor="middle" font-size="70">📘</text>
              <text x="25" y="270" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="18" fill="#16130F">Física para Ingeniería Tomo 1</text>
              <text x="25" y="325" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="26" fill="#1F3D36">$35.000 COP</text>
            </g>
          </g>
        </g>
      </g>
    `
  },

  // 9. Login
  {
    name: "mockup_09_login.svg",
    title: "09 · INICIAR SESIÓN (AUTH JAVERIANA)",
    url: "src/test/html/login.html",
    svg: `
      <!-- Split Auth Layout -->
      <!-- Left Panel -->
      <rect width="700" height="880" fill="#1F3D36"/>
      <g transform="translate(80, 160)">
        <text x="0" y="50" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="44" fill="#FFFFFF">unimercs</text>
        <text x="0" y="110" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="34" fill="#C8A96A">Tu campus hustle,<br/>organizado.</text>
        <text x="0" y="210" font-family="'Space Grotesk', sans-serif" font-size="18" fill="#E8EFE8">Accede a la plataforma de marketplace universitario con tu correo institucional @javeriana.edu.co</text>
        <rect y="320" width="220" height="40" rx="20" fill="#2D5A4F"/>
        <text x="110" y="345" text-anchor="middle" font-family="'DM Mono', monospace" font-size="12" font-weight="700" fill="#FFE4A0">100% COMUNIDAD PUJ</text>
      </g>

      <!-- Right Form -->
      <g transform="translate(780, 140)">
        <text x="0" y="50" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="36" fill="#16130F">Iniciar Sesión</text>
        <text x="0" y="85" font-family="'DM Mono', monospace" font-size="14" fill="#756F64">Ingresa tus credenciales javerianas</text>

        <g transform="translate(0, 140)">
          <text x="0" y="0" font-family="'DM Mono', monospace" font-size="12" font-weight="700" fill="#756F64">CORREO INSTITUCIONAL</text>
          <rect y="12" width="650" height="52" rx="12" fill="#FFFFFF" stroke="#1F3D36"/>
          <text x="20" y="44" font-family="'Space Grotesk', sans-serif" font-size="16" fill="#16130F">estudiante@javeriana.edu.co</text>

          <g transform="translate(0, 100)">
            <text x="0" y="0" font-family="'DM Mono', monospace" font-size="12" font-weight="700" fill="#756F64">CONTRASEÑA</text>
            <rect y="12" width="650" height="52" rx="12" fill="#FFFFFF" stroke="#E2DBD0"/>
            <text x="20" y="44" font-family="'Space Grotesk', sans-serif" font-size="16" fill="#756F64">••••••••••••••</text>
          </g>

          <g transform="translate(0, 220)">
            <rect width="650" height="60" rx="16" fill="#1F3D36"/>
            <text x="325" y="37" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="18" fill="#FFF">Entrar a UniMercs</text>
          </g>

          <text x="325" y="340" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="14" fill="#756F64">¿No tienes cuenta? <tspan fill="#1F3D36" font-weight="700">Crear cuenta gratis</tspan></text>
        </g>
      </g>
    `
  },

  // 10. Register
  {
    name: "mockup_10_register.svg",
    title: "10 · CREAR CUENTA (REGISTRO ESTUDIANTE)",
    url: "src/test/html/register.html",
    svg: `
      <!-- Left Panel -->
      <rect width="660" height="880" fill="#1F3D36"/>
      <g transform="translate(70, 140)">
        <text x="0" y="50" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="44" fill="#FFFFFF">unimercs</text>
        <text x="0" y="110" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="34" fill="#C8A96A">Únete a tu comunidad universitaria.</text>
        <text x="0" y="200" font-family="'Space Grotesk', sans-serif" font-size="16" fill="#E8EFE8">Compra y vende entre compañeros con total seguridad dentro del campus.</text>
      </g>

      <!-- Right Register Form -->
      <g transform="translate(740, 80)">
        <text x="0" y="45" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="34" fill="#16130F">Crear Cuenta</text>
        <text x="0" y="75" font-family="'DM Mono', monospace" font-size="13" fill="#756F64">Solo para estudiantes de la Pontificia Universidad Javeriana</text>

        <g transform="translate(0, 110)">
          <!-- Name -->
          <text x="0" y="0" font-family="'DM Mono', monospace" font-size="11" font-weight="700" fill="#756F64">NOMBRE COMPLETO</text>
          <rect y="10" width="700" height="46" rx="10" fill="#FFFFFF" stroke="#E2DBD0"/>
          <text x="16" y="38" font-family="'Space Grotesk', sans-serif" font-size="15" fill="#16130F">Valentina Gómez</text>

          <!-- Email -->
          <g transform="translate(0, 75)">
            <text x="0" y="0" font-family="'DM Mono', monospace" font-size="11" font-weight="700" fill="#756F64">CORREO INSTITUCIONAL (@javeriana.edu.co)</text>
            <rect y="10" width="700" height="46" rx="10" fill="#FFFFFF" stroke="#1F3D36"/>
            <text x="16" y="38" font-family="'Space Grotesk', sans-serif" font-size="15" fill="#16130F">gomez.valentina@javeriana.edu.co</text>
          </g>

          <!-- Faculty -->
          <g transform="translate(0, 150)">
            <text x="0" y="0" font-family="'DM Mono', monospace" font-size="11" font-weight="700" fill="#756F64">FACULTAD / CARRERA</text>
            <rect y="10" width="700" height="46" rx="10" fill="#FFFFFF" stroke="#E2DBD0"/>
            <text x="16" y="38" font-family="'Space Grotesk', sans-serif" font-size="15" fill="#16130F">Facultad de Artes y Diseño ▼</text>
          </g>

          <!-- Phone -->
          <g transform="translate(0, 225)">
            <text x="0" y="0" font-family="'DM Mono', monospace" font-size="11" font-weight="700" fill="#756F64">WHATSAPP DE CONTACTO (COLOMBIA +57)</text>
            <rect y="10" width="700" height="46" rx="10" fill="#FFFFFF" stroke="#E2DBD0"/>
            <text x="16" y="38" font-family="'Space Grotesk', sans-serif" font-size="15" fill="#16130F">+57 310 456 7890</text>
          </g>

          <!-- Submit -->
          <g transform="translate(0, 320)">
            <rect width="700" height="56" rx="16" fill="#1F3D36"/>
            <text x="350" y="35" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="17" fill="#FFF">Registrarse en UniMercs</text>
          </g>
        </g>
      </g>
    `
  },

  // 11. How It Works
  {
    name: "mockup_11_how_it_works.svg",
    title: "11 · CÓMO FUNCIONA UNIMERCS",
    url: "src/test/html/how-it-works.html",
    svg: `
      <rect width="1600" height="74" fill="#FFFFFF" stroke="#E2DBD0"/>
      <text x="80" y="48" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="28" fill="#1F3D36">unimercs</text>

      <g transform="translate(80, 110)">
        <rect width="1440" height="130" rx="20" fill="#1F3D36"/>
        <text x="50" y="60" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="34" fill="#FFFFFF">¿Cómo Funciona UniMercs?</text>
        <text x="50" y="95" font-family="'Space Grotesk', sans-serif" font-size="16" fill="#E8EFE8">Guía paso a paso para comprar y vender seguro dentro de la Javeriana</text>
      </g>

      <!-- 4 Steps Flow -->
      <g transform="translate(80, 280)">
        <!-- Step 1 -->
        <g transform="translate(0, 0)">
          <rect width="330" height="520" rx="18" fill="#FFFFFF" stroke="#E2DBD0"/>
          <circle cx="60" cy="60" r="30" fill="#1F3D36"/>
          <text x="60" y="69" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="24" fill="#C8A96A">1</text>
          <text x="30" y="140" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="20" fill="#16130F">Publica o Busca</text>
          <text x="30" y="180" font-family="'Space Grotesk', sans-serif" font-size="14" fill="#756F64" width="270">Toma fotos de lo que no usas o explora el catálogo con filtros por facultad.</text>
          <text x="165" y="360" text-anchor="middle" font-size="70">📸</text>
        </g>

        <!-- Step 2 -->
        <g transform="translate(370, 0)">
          <rect width="330" height="520" rx="18" fill="#FFFFFF" stroke="#E2DBD0"/>
          <circle cx="60" cy="60" r="30" fill="#1F3D36"/>
          <text x="60" y="69" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="24" fill="#C8A96A">2</text>
          <text x="30" y="140" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="20" fill="#16130F">Habla por WhatsApp</text>
          <text x="30" y="180" font-family="'Space Grotesk', sans-serif" font-size="14" fill="#756F64">Coordina directo con tu compañero de universidad sin intermediarios ni comisiones.</text>
          <text x="165" y="360" text-anchor="middle" font-size="70">💬</text>
        </g>

        <!-- Step 3 -->
        <g transform="translate(740, 0)">
          <rect width="330" height="520" rx="18" fill="#FFFFFF" stroke="#1F3D36" stroke-width="2"/>
          <circle cx="60" cy="60" r="30" fill="#C8A96A"/>
          <text x="60" y="69" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="24" fill="#1F3D36">3</text>
          <text x="30" y="140" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="20" fill="#16130F">Encuentro SafeZone</text>
          <text x="30" y="180" font-family="'Space Grotesk', sans-serif" font-size="14" fill="#756F64">Intercambia en Biblioteca o Cafeterías vigiladas dentro del campus PUJ.</text>
          <text x="165" y="360" text-anchor="middle" font-size="70">🛡️</text>
        </g>

        <!-- Step 4 -->
        <g transform="translate(1110, 0)">
          <rect width="330" height="520" rx="18" fill="#FFFFFF" stroke="#E2DBD0"/>
          <circle cx="60" cy="60" r="30" fill="#1F3D36"/>
          <text x="60" y="69" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="24" fill="#C8A96A">4</text>
          <text x="30" y="140" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="20" fill="#16130F">Califica y Ahorra</text>
          <text x="30" y="180" font-family="'Space Grotesk', sans-serif" font-size="14" fill="#756F64">Valida la reputación de tu vendedor y fomenta una comunidad transparente.</text>
          <text x="165" y="360" text-anchor="middle" font-size="70">⭐</text>
        </g>
      </g>
    `
  },

  // 12. Admin Dashboard
  {
    name: "mockup_12_admin_dashboard.svg",
    title: "12 · PANEL DE ADMINISTRACIÓN & MODERACIÓN",
    url: "src/test/html/admin.html",
    svg: `
      <!-- Dark Theme Admin Dashboard -->
      <rect width="1600" height="880" fill="#0E0A24"/>
      
      <!-- Top Bar -->
      <rect width="1600" height="64" fill="#161138" stroke="#2D245A"/>
      <text x="40" y="42" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="22" fill="#FFE4A0">UniMercs Admin Portal</text>
      <text x="1400" y="40" font-family="'DM Mono', monospace" font-size="13" fill="#9E9BBF">Rol: Administrador PUJ</text>

      <!-- Stat Cards -->
      <g transform="translate(40, 90)">
        <rect width="360" height="120" rx="16" fill="#161138" stroke="#2D245A"/>
        <text x="25" y="45" font-family="'DM Mono', monospace" font-size="13" fill="#9E9BBF">USUARIOS ACTIVOS</text>
        <text x="25" y="90" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="36" fill="#FFF">1,248</text>

        <g transform="translate(385, 0)">
          <rect width="360" height="120" rx="16" fill="#161138" stroke="#2D245A"/>
          <text x="25" y="45" font-family="'DM Mono', monospace" font-size="13" fill="#9E9BBF">PUBLICACIONES EN CAMPUS</text>
          <text x="25" y="90" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="36" fill="#C8A96A">624</text>
        </g>

        <g transform="translate(770, 0)">
          <rect width="360" height="120" rx="16" fill="#161138" stroke="#2D245A"/>
          <text x="25" y="45" font-family="'DM Mono', monospace" font-size="13" fill="#9E9BBF">TRANSACCIONES SAFEZONE</text>
          <text x="25" y="90" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="36" fill="#10B981">892</text>
        </g>

        <g transform="translate(1155, 0)">
          <rect width="360" height="120" rx="16" fill="#161138" stroke="#2D245A"/>
          <text x="25" y="45" font-family="'DM Mono', monospace" font-size="13" fill="#9E9BBF">REPORTES PENDIENTES</text>
          <text x="25" y="90" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="36" fill="#EF4444">0</text>
        </g>
      </g>

      <!-- Table Section -->
      <g transform="translate(40, 240)">
        <rect width="1520" height="580" rx="18" fill="#161138" stroke="#2D245A"/>
        <text x="30" y="45" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="20" fill="#FFF">Moderación Reciente de Publicaciones</text>

        <!-- Rows -->
        <g transform="translate(30, 80)">
          <rect width="1460" height="60" rx="10" fill="#1C1547"/>
          <text x="30" y="36" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="15" fill="#FFF">Cálculo Stewart 8va Edición</text>
          <text x="450" y="36" font-family="'DM Mono', monospace" font-size="14" fill="#C8A96A">$45.000 COP</text>
          <text x="750" y="36" font-family="'DM Mono', monospace" font-size="13" fill="#9E9BBF">Mateo Sánchez (PUJ Verificado)</text>
          <rect x="1280" y="14" width="140" height="32" rx="16" fill="#10B981"/>
          <text x="1350" y="35" text-anchor="middle" font-family="'DM Mono', monospace" font-size="11" font-weight="700" fill="#000">APROBADO ✓</text>

          <g transform="translate(0, 80)">
            <rect width="1460" height="60" rx="10" fill="#1C1547"/>
            <text x="30" y="36" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="15" fill="#FFF">Calculadora TI-84 Plus CE</text>
            <text x="450" y="36" font-family="'DM Mono', monospace" font-size="14" fill="#C8A96A">$120.000 COP</text>
            <text x="750" y="36" font-family="'DM Mono', monospace" font-size="13" fill="#9E9BBF">Germán Rodríguez</text>
            <rect x="1280" y="14" width="140" height="32" rx="16" fill="#10B981"/>
            <text x="1350" y="35" text-anchor="middle" font-family="'DM Mono', monospace" font-size="11" font-weight="700" fill="#000">APROBADO ✓</text>
          </g>
        </g>
      </g>
    `
  },

  // 13. Help Center
  {
    name: "mockup_13_help_center.svg",
    title: "13 · CENTRO DE AYUDA & SOPORTE",
    url: "src/test/html/help.html",
    svg: `
      <rect width="1600" height="74" fill="#FFFFFF" stroke="#E2DBD0"/>
      <text x="80" y="48" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="28" fill="#1F3D36">unimercs</text>

      <g transform="translate(80, 110)">
        <rect width="1440" height="150" rx="20" fill="#1F3D36"/>
        <text x="50" y="65" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="34" fill="#FFFFFF">Centro de Ayuda y Preguntas Frecuentes</text>
        <text x="50" y="105" font-family="'Space Grotesk', sans-serif" font-size="16" fill="#E8EFE8">Todo lo que necesitas saber sobre entregas, pagos y seguridad en UniMercs</text>
      </g>

      <!-- FAQ Accordions -->
      <g transform="translate(80, 290)">
        <rect width="1440" height="90" rx="16" fill="#FFFFFF" stroke="#E2DBD0"/>
        <text x="40" y="52" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="20" fill="#16130F">¿Cómo coordino la entrega y el pago?</text>
        <text x="1380" y="52" font-size="20">▼</text>

        <g transform="translate(0, 110)">
          <rect width="1440" height="90" rx="16" fill="#FFFFFF" stroke="#E2DBD0"/>
          <text x="40" y="52" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="20" fill="#16130F">¿Qué hago si un artículo no corresponde con las fotos?</text>
          <text x="1380" y="52" font-size="20">▼</text>
        </g>

        <g transform="translate(0, 220)">
          <rect width="1440" height="90" rx="16" fill="#FFFFFF" stroke="#E2DBD0"/>
          <text x="40" y="52" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="20" fill="#16130F">¿UniMercs cobra alguna comisión por venta?</text>
          <text x="1380" y="52" font-size="20">▼</text>
        </g>
      </g>
    `
  },

  // 14. About Us
  {
    name: "mockup_14_about_us.svg",
    title: "14 · ACERCA DEL PROYECTO & EQUIPO",
    url: "src/test/html/about.html",
    svg: `
      <rect width="1600" height="74" fill="#FFFFFF" stroke="#E2DBD0"/>
      <text x="80" y="48" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="28" fill="#1F3D36">unimercs</text>

      <g transform="translate(80, 110)">
        <rect width="1440" height="150" rx="20" fill="#1F3D36"/>
        <text x="50" y="65" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="34" fill="#FFFFFF">Acerca de UniMercs Javeriana</text>
        <text x="50" y="105" font-family="'Space Grotesk', sans-serif" font-size="16" fill="#E8EFE8">Proyecto de Fundamentos de Ingeniería de Software · Pontificia Universidad Javeriana</text>
      </g>

      <!-- Creators Cards -->
      <g transform="translate(80, 300)">
        <!-- Juan Pablo -->
        <g transform="translate(0, 0)">
          <rect width="700" height="340" rx="20" fill="#FFFFFF" stroke="#E2DBD0"/>
          <circle cx="100" cy="100" r="45" fill="#C8A96A"/>
          <text x="100" y="112" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="32" fill="#1F3D36">JP</text>
          <text x="180" y="85" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="24" fill="#16130F">Juan Pablo Sánchez</text>
          <text x="180" y="115" font-family="'DM Mono', monospace" font-size="14" fill="#756F64">Scrum Master · Product Owner</text>
          <text x="50" y="200" font-family="'Space Grotesk', sans-serif" font-size="16" fill="#444">Estudiante de Ingeniería de Sistemas en la Pontificia Universidad Javeriana, Bogotá.</text>
        </g>

        <!-- Germán -->
        <g transform="translate(740, 0)">
          <rect width="700" height="340" rx="20" fill="#FFFFFF" stroke="#E2DBD0"/>
          <circle cx="100" cy="100" r="45" fill="#C8A96A"/>
          <text x="100" y="112" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="32" fill="#1F3D36">GR</text>
          <text x="180" y="85" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="24" fill="#16130F">Germán Rodríguez</text>
          <text x="180" y="115" font-family="'DM Mono', monospace" font-size="14" fill="#756F64">Developer · QA Lead</text>
          <text x="50" y="200" font-family="'Space Grotesk', sans-serif" font-size="16" fill="#444">Estudiante de Ingeniería de Sistemas en la Pontificia Universidad Javeriana, Bogotá.</text>
        </g>
      </g>
    `
  }
];

mockups.forEach((m) => {
  const fileContent = wrapInDevice(m.title, m.url, 1600, 880, m.svg);
  const destPath = path.join(mockupsDir, m.name);
  fs.writeFileSync(destPath, fileContent, 'utf8');
  console.log(`Generated mockup: ${m.name}`);
});

console.log('All 14 page mockups successfully generated!');
