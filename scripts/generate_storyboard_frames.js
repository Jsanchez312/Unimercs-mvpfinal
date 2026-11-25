const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'docs', 'storyboard');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 8 Cinematic Scenes
const scenes = [
  {
    num: "01",
    id: "scene_01_the_problem",
    title: "EL PROBLEMA — El Escritorio Saturado",
    subtitle: "00:00 - 00:07 · Gancho Emocional & Caos Universitario",
    script: "¿Tienes cosas que ya no usas? Libros carísimos, calculadoras del semestre pasado... acumulando polvo mientras alguien en el campus las necesita hoy.",
    svg: `
      <defs>
        <linearGradient id="s1_bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1A1815"/>
          <stop offset="50%" stop-color="#2D241C"/>
          <stop offset="100%" stop-color="#12100E"/>
        </linearGradient>
        <linearGradient id="s1_sun" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#FFE4A0" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="#C8A96A" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="s1_book" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#2D5A47"/>
          <stop offset="100%" stop-color="#142A21"/>
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000000" flood-opacity="0.6"/>
        </filter>
      </defs>

      <!-- Background Room -->
      <rect width="1920" height="1080" fill="url(#s1_bg)"/>

      <!-- Window light beam streaming in -->
      <polygon points="300,-50 1800,-50 1500,1080 0,1080" fill="url(#s1_sun)"/>

      <!-- Wooden Desk -->
      <rect y="480" width="1920" height="600" fill="#3A281E"/>
      <rect y="480" width="1920" height="16" fill="#52392B"/>
      
      <!-- Open Laptop on Left -->
      <g transform="translate(180, 360)">
        <!-- Screen -->
        <rect width="360" height="240" rx="8" fill="#202020" stroke="#444" stroke-width="4"/>
        <rect x="14" y="14" width="332" height="212" fill="#0D1117"/>
        <text x="30" y="50" font-family="'DM Mono', monospace" font-size="14" fill="#C8A96A">> blackboard.javeriana.edu.co</text>
        <rect x="30" y="70" width="220" height="8" rx="4" fill="#30363D"/>
        <rect x="30" y="90" width="180" height="8" rx="4" fill="#30363D"/>
        <rect x="30" y="110" width="260" height="8" rx="4" fill="#238636"/>
        <text x="30" y="150" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="20" fill="#FFF">CÁLCULO VECTORIAL: 4.8</text>
        <text x="30" y="175" font-family="'DM Mono', monospace" font-size="12" fill="#8B949E">Estado: MATERIA APROBADA</text>
        <!-- Keyboard base -->
        <polygon points="-30,240 390,240 370,290 -10,290" fill="#484F58"/>
      </g>

      <!-- Giant Calculus Textbook Center Stage (Being Pushed Away) -->
      <g transform="translate(760, 420) rotate(-6)" filter="url(#shadow)">
        <rect width="400" height="520" rx="14" fill="url(#s1_book)" stroke="#C8A96A" stroke-width="4"/>
        <rect x="0" y="0" width="45" height="520" rx="8" fill="#0E1D17"/>
        <!-- Gold foil lettering on book -->
        <rect x="80" y="70" width="260" height="4" fill="#C8A96A"/>
        <text x="80" y="115" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="34" fill="#F4EFE6" letter-spacing="1">CÁLCULO</text>
        <text x="80" y="145" font-family="'DM Mono', monospace" font-size="18" fill="#C8A96A">TRASCENDENTES TEMPRANAS</text>
        <text x="80" y="180" font-family="'Space Grotesk', sans-serif" font-size="15" fill="#A4B5AC">8va Edición · James Stewart</text>
        <!-- Math formula graphics on book -->
        <path d="M 80,260 Q 150,210 220,290 T 340,240" fill="none" stroke="#C8A96A" stroke-width="3" stroke-dasharray="6 4"/>
        <text x="80" y="340" font-family="'DM Mono', monospace" font-size="36" fill="#C8A96A" opacity="0.6">∫ f(x) dx = F(x)</text>
        
        <!-- Red sticky note: "YA LO PASÉ" -->
        <g transform="translate(220, 360) rotate(8)">
          <rect width="140" height="110" fill="#FF5E62" rx="4" filter="url(#shadow)"/>
          <text x="18" y="45" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#FFF">¡YA APROBÉ!</text>
          <text x="18" y="75" font-family="'DM Mono', monospace" font-size="13" fill="#FFF">¿Y ahora qué</text>
          <text x="18" y="93" font-family="'DM Mono', monospace" font-size="13" fill="#FFF">hago con esto?</text>
        </g>
      </g>

      <!-- TI-84 Scientific Calculator -->
      <g transform="translate(1260, 520) rotate(14)" filter="url(#shadow)">
        <rect width="160" height="260" rx="16" fill="#20252B" stroke="#3D444D" stroke-width="3"/>
        <rect x="20" y="25" width="120" height="70" rx="4" fill="#8C9A86"/>
        <text x="30" y="65" font-family="'DM Mono', monospace" font-size="16" fill="#1B221A">DONE 100%</text>
        <!-- Calculator buttons grid -->
        <g fill="#4B535D">
          <circle cx="40" cy="120" r="10"/><circle cx="80" cy="120" r="10"/><circle cx="120" cy="120" r="10"/>
          <circle cx="40" cy="155" r="10"/><circle cx="80" cy="155" r="10"/><circle cx="120" cy="155" r="10"/>
          <circle cx="40" cy="190" r="10"/><circle cx="80" cy="190" r="10"/><circle cx="120" cy="190" r="10"/>
          <circle cx="40" cy="225" r="10"/><circle cx="80" cy="225" r="10"/><circle cx="120" cy="225" r="10"/>
        </g>
      </g>

      <!-- Coffee Mug -->
      <g transform="translate(620, 680)">
        <ellipse cx="40" cy="60" rx="45" ry="12" fill="#000" opacity="0.4"/>
        <path d="M 10 10 L 20 60 Q 40 70 60 60 L 70 10 Z" fill="#F4EFE6"/>
        <ellipse cx="40" cy="12" rx="30" ry="8" fill="#4B2D17"/>
        <text x="40" y="42" text-anchor="middle" font-family="'DM Mono', monospace" font-size="11" font-weight="700" fill="#1F3D36">PUJ</text>
      </g>

      <!-- Cinematic Text Overlay -->
      <g transform="translate(100, 160)">
        <rect width="780" height="150" rx="18" fill="#16130FE6" stroke="#C8A96A" stroke-width="2"/>
        <text x="40" y="55" font-family="'DM Mono', monospace" font-size="18" font-weight="500" fill="#C8A96A" letter-spacing="4">ESCENA 01 · 00:00 - 00:07</text>
        <text x="40" y="105" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="38" fill="#F4EFE6">¿Tienes cosas que ya no usas?</text>
        <text x="40" y="133" font-family="'DM Mono', monospace" font-size="16" fill="#A49E93">Cámara: Cenital push-in · Beat: 116 BPM · Subtítulos sincronizados</text>
      </g>
    `
  },
  {
    num: "02",
    id: "scene_02_the_solution",
    title: "LA SOLUCIÓN — Revelación UniMercs",
    subtitle: "00:07 - 00:14 · El Marketplace Javeriano",
    script: "Llegó UniMercs: el marketplace creado por y para la comunidad Javeriana. Donde lo que ya no usas se convierte en plata para tu almuerzo.",
    svg: `
      <defs>
        <radialGradient id="s2_bg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#1F3D36"/>
          <stop offset="60%" stop-color="#132622"/>
          <stop offset="100%" stop-color="#0B1513"/>
        </radialGradient>
        <linearGradient id="gold_grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FFEBB8"/>
          <stop offset="50%" stop-color="#C8A96A"/>
          <stop offset="100%" stop-color="#9C7E41"/>
        </linearGradient>
      </defs>

      <rect width="1920" height="1080" fill="url(#s2_bg)"/>

      <!-- Ambient Golden Rings & Grid -->
      <circle cx="960" cy="540" r="480" fill="none" stroke="#C8A96A" stroke-width="1.5" stroke-dasharray="8 8" opacity="0.3"/>
      <circle cx="960" cy="540" r="320" fill="none" stroke="#C8A96A" stroke-width="2" opacity="0.4"/>

      <!-- Central Floating Smartphone Mockup (Front Facing 3D) -->
      <g transform="translate(770, 100)" filter="url(#shadow)">
        <!-- Phone Outer Frame -->
        <rect width="380" height="780" rx="50" fill="#0D0F0E" stroke="url(#gold_grad)" stroke-width="6"/>
        <!-- Screen Glass -->
        <rect x="14" y="14" width="352" height="752" rx="40" fill="#F4EFE6"/>
        
        <!-- Dynamic Island / Speaker -->
        <rect x="130" y="24" width="120" height="26" rx="13" fill="#000"/>
        
        <!-- App Top Bar -->
        <rect x="14" y="60" width="352" height="70" fill="#1F3D36"/>
        <text x="36" y="105" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#F4EFE6">unimercs</text>
        <rect x="280" y="82" width="60" height="28" rx="14" fill="#C8A96A"/>
        <text x="310" y="101" text-anchor="middle" font-family="'DM Mono', monospace" font-size="11" font-weight="700" fill="#16130F">PUJ</text>

        <!-- Hero Card in App -->
        <g transform="translate(32, 150)">
          <rect width="316" height="150" rx="18" fill="#1F3D36"/>
          <text x="20" y="45" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="22" fill="#C8A96A">SELL THE TEXTBOOK.</text>
          <text x="20" y="75" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="18" fill="#FFF">KEEP THE RAMEN MONEY.</text>
          <rect x="20" y="95" width="160" height="34" rx="17" fill="url(#gold_grad)"/>
          <text x="100" y="117" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="13" fill="#16130F">EMPEZAR A VENDER</text>
        </g>

        <!-- Category Grid in App -->
        <g transform="translate(32, 320)">
          <text x="0" y="20" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#16130F">Categorías en Campus</text>
          <!-- 4 Mini Cards -->
          <rect x="0" y="35" width="150" height="65" rx="12" fill="#E8EFE8" stroke="#D0DFD0"/>
          <text x="14" y="65" font-family="'Space Grotesk', sans-serif" font-weight="600" font-size="14" fill="#1F3D36">📚 Libros PUJ</text>
          <text x="14" y="82" font-family="'DM Mono', monospace" font-size="10" fill="#607267">240+ activos</text>

          <rect x="166" y="35" width="150" height="65" rx="12" fill="#E8EFE8" stroke="#D0DFD0"/>
          <text x="180" y="65" font-family="'Space Grotesk', sans-serif" font-weight="600" font-size="14" fill="#1F3D36">⚡ Tecnología</text>
          <text x="180" y="82" font-family="'DM Mono', monospace" font-size="10" fill="#607267">115+ activos</text>

          <rect x="0" y="112" width="150" height="65" rx="12" fill="#E8EFE8" stroke="#D0DFD0"/>
          <text x="14" y="142" font-family="'Space Grotesk', sans-serif" font-weight="600" font-size="14" fill="#1F3D36">📐 Arquitectura</text>
          <text x="14" y="159" font-family="'DM Mono', monospace" font-size="10" fill="#607267">85+ activos</text>

          <rect x="166" y="112" width="150" height="65" rx="12" fill="#E8EFE8" stroke="#D0DFD0"/>
          <text x="180" y="142" font-family="'Space Grotesk', sans-serif" font-weight="600" font-size="14" fill="#1F3D36">🍪 Emprendimientos</text>
          <text x="180" y="159" font-family="'DM Mono', monospace" font-size="10" fill="#607267">92+ del campus</text>
        </g>

        <!-- Product Preview in App -->
        <g transform="translate(32, 530)">
          <rect width="316" height="100" rx="14" fill="#FFF" stroke="#E2DBD0"/>
          <rect x="12" y="12" width="76" height="76" rx="10" fill="#1F3D36"/>
          <text x="50" y="55" text-anchor="middle" font-size="28">📘</text>
          <text x="102" y="36" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="15" fill="#16130F">Cálculo Stewart 8va</text>
          <text x="102" y="58" font-family="'DM Mono', monospace" font-size="14" font-weight="700" fill="#1F3D36">$45.000 COP</text>
          <text x="102" y="78" font-family="'DM Mono', monospace" font-size="11" fill="#756F64">Facultad de Ingeniería</text>
        </g>

        <!-- App Bottom Navigation -->
        <g transform="translate(14, 690)">
          <rect width="352" height="76" fill="#FFF" stroke="#E2DBD0"/>
          <text x="44" y="44" font-size="18">🏠</text>
          <text x="132" y="44" font-size="18">🔍</text>
          <circle cx="176" cy="38" r="24" fill="#C8A96A"/>
          <text x="176" y="46" text-anchor="middle" font-size="22" fill="#16130F" font-weight="bold">+</text>
          <text x="220" y="44" font-size="18">🛡️</text>
          <text x="308" y="44" font-size="18">👤</text>
        </g>
      </g>

      <!-- Floating Callout Badges Left & Right -->
      <g transform="translate(140, 420)" filter="url(#shadow)">
        <rect width="320" height="90" rx="18" fill="#16130FEE" stroke="#C8A96A" stroke-width="2"/>
        <text x="25" y="40" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="18" fill="#F4EFE6">100% COMUNIDAD PUJ</text>
        <text x="25" y="68" font-family="'DM Mono', monospace" font-size="14" fill="#C8A96A">Correo javeriano validado</text>
      </g>

      <g transform="translate(1460, 420)" filter="url(#shadow)">
        <rect width="320" height="90" rx="18" fill="#16130FEE" stroke="#25D366" stroke-width="2"/>
        <text x="25" y="40" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="18" fill="#F4EFE6">CERO COMISIONES</text>
        <text x="25" y="68" font-family="'DM Mono', monospace" font-size="14" fill="#25D366">Trato directo entre estudiantes</text>
      </g>

      <!-- Scene Header -->
      <g transform="translate(100, 100)">
        <text x="0" y="0" font-family="'DM Mono', monospace" font-size="18" font-weight="500" fill="#C8A96A" letter-spacing="4">ESCENA 02 · 00:07 - 00:14</text>
        <text x="0" y="45" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="44" fill="#F4EFE6">UniMercs: El Marketplace Javeriano</text>
      </g>
    `
  },
  {
    num: "03",
    id: "scene_03_instant_publishing",
    title: "LA PUBLICACIÓN — Sube en 60 Segundos",
    subtitle: "00:14 - 00:22 · POV Cámara & Autocompletado",
    script: "Publicar toma menos de un minuto: fotos desde tu celular, precio justo, descripción y al aire. Sin formularios eternos.",
    svg: `
      <defs>
        <linearGradient id="s3_bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#2D2821"/>
          <stop offset="100%" stop-color="#14120F"/>
        </linearGradient>
      </defs>

      <rect width="1920" height="1080" fill="url(#s3_bg)"/>

      <!-- Camera Viewfinder Overlay -->
      <g transform="translate(240, 140)">
        <!-- Phone Camera Frame -->
        <rect width="800" height="800" rx="36" fill="#1C1A17" stroke="#383229" stroke-width="4"/>
        <rect x="20" y="20" width="760" height="760" rx="24" fill="#0D0C0A"/>
        
        <!-- Live Book in Viewfinder -->
        <g transform="translate(200, 180) rotate(-4)">
          <rect width="360" height="460" rx="12" fill="#1F3D36" stroke="#C8A96A" stroke-width="3"/>
          <text x="50" y="100" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="30" fill="#FFF">CÁLCULO</text>
          <text x="50" y="130" font-family="'DM Mono', monospace" font-size="16" fill="#C8A96A">STEWART 8va ED</text>
        </g>

        <!-- Viewfinder Reticle / Brackets -->
        <path d="M 80 120 L 80 80 L 120 80" fill="none" stroke="#C8A96A" stroke-width="5"/>
        <path d="M 680 120 L 680 80 L 640 80" fill="none" stroke="#C8A96A" stroke-width="5"/>
        <path d="M 80 640 L 80 680 L 120 680" fill="none" stroke="#C8A96A" stroke-width="5"/>
        <path d="M 680 640 L 680 680 L 640 680" fill="none" stroke="#C8A96A" stroke-width="5"/>

        <!-- Camera Focus Circle -->
        <circle cx="380" cy="400" r="45" fill="none" stroke="#FFE4A0" stroke-width="2" stroke-dasharray="8 6"/>

        <!-- Photo thumbnails bar -->
        <g transform="translate(60, 660)">
          <rect width="80" height="80" rx="10" fill="#254B3E" stroke="#C8A96A" stroke-width="2"/>
          <text x="40" y="45" text-anchor="middle" fill="#FFF" font-size="12">Foto 1 ✓</text>
          <rect x="100" y="0" width="80" height="80" rx="10" fill="#254B3E" stroke="#C8A96A" stroke-width="2"/>
          <text x="140" y="45" text-anchor="middle" fill="#FFF" font-size="12">Foto 2 ✓</text>
          <rect x="200" y="0" width="80" height="80" rx="10" fill="#254B3E" stroke="#C8A96A" stroke-width="2"/>
          <text x="240" y="45" text-anchor="middle" fill="#FFF" font-size="12">Foto 3 ✓</text>
          <!-- Shutter Button -->
          <circle cx="580" cy="40" r="32" fill="#FFF"/>
          <circle cx="580" cy="40" r="26" fill="#FFF" stroke="#000" stroke-width="3"/>
        </g>
      </g>

      <!-- Smart Form Card on Right (Publish in Seconds) -->
      <g transform="translate(1120, 180)" filter="url(#shadow)">
        <rect width="640" height="720" rx="24" fill="#F4EFE6" stroke="#E2DBD0" stroke-width="2"/>
        <text x="50" y="60" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="28" fill="#16130F">Detalles de la Publicación</text>

        <!-- Title Field -->
        <text x="50" y="115" font-family="'DM Mono', monospace" font-size="13" font-weight="700" fill="#756F64">TÍTULO DEL ARTÍCULO</text>
        <rect x="50" y="130" width="540" height="52" rx="12" fill="#FFF" stroke="#1F3D36" stroke-width="2"/>
        <text x="70" y="163" font-family="'Space Grotesk', sans-serif" font-size="18" fill="#16130F">Cálculo Trascendentes Tempranas - Stewart</text>

        <!-- Condition Pill Selector -->
        <text x="50" y="225" font-family="'DM Mono', monospace" font-size="13" font-weight="700" fill="#756F64">ESTADO DEL PRODUCTO</text>
        <g transform="translate(50, 240)">
          <rect width="110" height="40" rx="20" fill="#1F3D36"/>
          <text x="55" y="25" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="600" font-size="14" fill="#FFF">Como nuevo</text>
          <rect x="125" y="0" width="90" height="40" rx="20" fill="#FFF" stroke="#DDD"/>
          <text x="170" y="25" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="14" fill="#555">Buen uso</text>
          <rect x="230" y="0" width="90" height="40" rx="20" fill="#FFF" stroke="#DDD"/>
          <text x="275" y="25" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="14" fill="#555">Aceptable</text>
        </g>

        <!-- Price Counter -->
        <text x="50" y="335" font-family="'DM Mono', monospace" font-size="13" font-weight="700" fill="#756F64">PRECIO FIJADO</text>
        <rect x="50" y="350" width="540" height="70" rx="14" fill="#FFF" stroke="#C8A96A" stroke-width="3"/>
        <text x="75" y="398" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="36" fill="#1F3D36">$45.000 COP</text>
        <rect x="420" y="365" width="150" height="40" rx="10" fill="#E8EFE8"/>
        <text x="495" y="390" text-anchor="middle" font-family="'DM Mono', monospace" font-size="13" font-weight="700" fill="#1F3D36">75% AHORRO</text>

        <!-- Big CTA Button -->
        <g transform="translate(50, 560)">
          <rect width="540" height="74" rx="20" fill="#1F3D36" stroke="#C8A96A" stroke-width="3"/>
          <text x="270" y="47" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="22" fill="#F4EFE6">🚀 PUBLICAR EN EL CAMPUS</text>
        </g>
      </g>

      <!-- Header -->
      <g transform="translate(100, 70)">
        <text x="0" y="0" font-family="'DM Mono', monospace" font-size="18" font-weight="500" fill="#C8A96A" letter-spacing="4">ESCENA 03 · 00:14 - 00:22</text>
        <text x="0" y="40" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="36" fill="#F4EFE6">Publica en 60 Segundos: Fotos, Precio y Listo</text>
      </g>
    `
  },
  {
    num: "04",
    id: "scene_04_campus_discovery",
    title: "LA BÚSQUEDA — Busca Menos, Encuentra Mejor",
    subtitle: "00:22 - 00:30 · Exploración Dinámica en la Javeriana",
    script: "¿Buscas algo para el semestre? Explora por carrera, filtra por precio y encuentra productos reales de estudiantes a pasos de ti.",
    svg: `
      <defs>
        <linearGradient id="s4_bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#192E27"/>
          <stop offset="100%" stop-color="#121D1A"/>
        </linearGradient>
      </defs>

      <rect width="1920" height="1080" fill="url(#s4_bg)"/>

      <!-- Search Bar Center-Top -->
      <g transform="translate(360, 140)" filter="url(#shadow)">
        <rect width="1200" height="80" rx="40" fill="#F4EFE6" stroke="#C8A96A" stroke-width="3"/>
        <text x="45" y="48" font-size="24">🔍</text>
        <text x="90" y="50" font-family="'Space Grotesk', sans-serif" font-weight="600" font-size="26" fill="#16130F">Cálculo Stewart|</text>
        <rect x="990" y="16" width="180" height="48" rx="24" fill="#1F3D36"/>
        <text x="1080" y="46" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#FFF">BUSCAR</text>
      </g>

      <!-- Active Filter Chips -->
      <g transform="translate(360, 250)">
        <rect width="140" height="40" rx="20" fill="#C8A96A"/>
        <text x="70" y="25" text-anchor="middle" font-family="'DM Mono', monospace" font-size="13" font-weight="700" fill="#16130F">✓ En Campus</text>
        
        <rect x="155" y="0" width="160" height="40" rx="20" fill="#1F3D36" stroke="#C8A96A"/>
        <text x="235" y="25" text-anchor="middle" font-family="'DM Mono', monospace" font-size="13" fill="#FFF">&lt; $50.000 COP</text>
        
        <rect x="330" y="0" width="170" height="40" rx="20" fill="#1F3D36" stroke="#C8A96A"/>
        <text x="415" y="25" text-anchor="middle" font-family="'DM Mono', monospace" font-size="13" fill="#FFF">Ingeniería (Ed. 21)</text>

        <rect x="515" y="0" width="140" height="40" rx="20" fill="#1F3D36" stroke="#555"/>
        <text x="585" y="25" text-anchor="middle" font-family="'DM Mono', monospace" font-size="13" fill="#AAA">+ Más filtros</text>
      </g>

      <!-- Grid of 3 Product Result Cards -->
      <g transform="translate(240, 330)">
        <!-- Card 1 (The Stewart Calculus Book) -->
        <g transform="translate(0, 0)" filter="url(#shadow)">
          <rect width="440" height="580" rx="20" fill="#F4EFE6"/>
          <!-- Product image box -->
          <rect x="16" y="16" width="408" height="300" rx="16" fill="#1F3D36"/>
          <text x="220" y="165" text-anchor="middle" font-size="80">📚</text>
          <rect x="32" y="32" width="100" height="30" rx="8" fill="#C8A96A"/>
          <text x="82" y="52" text-anchor="middle" font-family="'DM Mono', monospace" font-size="11" font-weight="700" fill="#16130F">TOP MATCH</text>

          <!-- Card Content -->
          <text x="24" y="355" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="22" fill="#16130F">Cálculo Stewart 8va Ed.</text>
          <text x="24" y="385" font-family="'DM Mono', monospace" font-size="14" fill="#756F64">Facultad de Ingeniería · Ed. 21</text>
          
          <text x="24" y="445" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="32" fill="#1F3D36">$45.000 COP</text>
          <text x="24" y="475" font-family="'DM Mono', monospace" font-size="13" fill="#25D366">★★★★★ (18 reviews)</text>
          
          <rect x="24" y="505" width="392" height="50" rx="14" fill="#1F3D36"/>
          <text x="220" y="537" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#FFF">Ver Producto & Vendedor</text>
        </g>

        <!-- Card 2 (TI Calculator) -->
        <g transform="translate(480, 0)" filter="url(#shadow)">
          <rect width="440" height="580" rx="20" fill="#F4EFE6"/>
          <rect x="16" y="16" width="408" height="300" rx="16" fill="#2B343D"/>
          <text x="220" y="165" text-anchor="middle" font-size="80">📟</text>

          <text x="24" y="355" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="22" fill="#16130F">Calculadora TI-84 Plus CE</text>
          <text x="24" y="385" font-family="'DM Mono', monospace" font-size="14" fill="#756F64">Ciencias Económicas · Ed. 67</text>
          
          <text x="24" y="445" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="32" fill="#1F3D36">$120.000 COP</text>
          <text x="24" y="475" font-family="'DM Mono', monospace" font-size="13" fill="#25D366">★★★★★ (9 reviews)</text>
          
          <rect x="24" y="505" width="392" height="50" rx="14" fill="#1F3D36"/>
          <text x="220" y="537" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#FFF">Ver Producto & Vendedor</text>
        </g>

        <!-- Card 3 (Architecture Kit) -->
        <g transform="translate(960, 0)" filter="url(#shadow)">
          <rect width="440" height="580" rx="20" fill="#F4EFE6"/>
          <rect x="16" y="16" width="408" height="300" rx="16" fill="#4A3B32"/>
          <text x="220" y="165" text-anchor="middle" font-size="80">📐</text>

          <text x="24" y="355" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="22" fill="#16130F">Kit Regla T + Escalímetro</text>
          <text x="24" y="385" font-family="'DM Mono', monospace" font-size="14" fill="#756F64">Arquitectura & Diseño · Ed. 44</text>
          
          <text x="24" y="445" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="32" fill="#1F3D36">$30.000 COP</text>
          <text x="24" y="475" font-family="'DM Mono', monospace" font-size="13" fill="#25D366">★★★★★ (24 reviews)</text>
          
          <rect x="24" y="505" width="392" height="50" rx="14" fill="#1F3D36"/>
          <text x="220" y="537" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#FFF">Ver Producto & Vendedor</text>
        </g>
      </g>

      <!-- Header -->
      <g transform="translate(100, 60)">
        <text x="0" y="0" font-family="'DM Mono', monospace" font-size="18" font-weight="500" fill="#C8A96A" letter-spacing="4">ESCENA 04 · 00:22 - 00:30</text>
        <text x="0" y="38" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="36" fill="#F4EFE6">Busca Menos. Encuentra Mejor en el Campus.</text>
      </g>
    `
  },
  {
    num: "05",
    id: "scene_05_trust_and_whatsapp",
    title: "CONFIANZA & CONTACTO — Trato Directo Javeriano",
    subtitle: "00:30 - 00:38 · Perfiles Verificados & WhatsApp",
    script: "Revisa fotos reales, valida la reputación del vendedor y coordina directo por WhatsApp. Sin comisiones sorpresa.",
    svg: `
      <defs>
        <linearGradient id="s5_bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#141E1B"/>
          <stop offset="100%" stop-color="#0E1412"/>
        </linearGradient>
      </defs>

      <rect width="1920" height="1080" fill="url(#s5_bg)"/>

      <!-- Central Detailed Product Sheet -->
      <g transform="translate(300, 120)" filter="url(#shadow)">
        <rect width="1320" height="840" rx="30" fill="#F4EFE6"/>

        <!-- Left Half: Photo Gallery & Badges -->
        <g transform="translate(50, 50)">
          <!-- Main Hero Image -->
          <rect width="560" height="520" rx="20" fill="#1F3D36"/>
          <text x="280" y="280" text-anchor="middle" font-size="140">📘</text>
          <!-- Badge on photo -->
          <rect x="24" y="24" width="220" height="38" rx="19" fill="#16130FEE"/>
          <text x="134" y="48" text-anchor="middle" font-family="'DM Mono', monospace" font-size="12" font-weight="700" fill="#C8A96A">✓ FOTO REAL SIN FILTROS</text>
          
          <!-- Thumbnail strip below -->
          <g transform="translate(0, 550)">
            <rect width="120" height="100" rx="14" fill="#295244" stroke="#C8A96A" stroke-width="3"/>
            <rect x="145" y="0" width="120" height="100" rx="14" fill="#295244"/>
            <rect x="290" y="0" width="120" height="100" rx="14" fill="#295244"/>
            <rect x="435" y="0" width="120" height="100" rx="14" fill="#295244"/>
          </g>
        </g>

        <!-- Right Half: Title, Price, Seller Profile, and WhatsApp CTA -->
        <g transform="translate(670, 60)">
          <text x="0" y="40" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="34" fill="#16130F">Cálculo Trascendentes Tempranas</text>
          <text x="0" y="75" font-family="'DM Mono', monospace" font-size="16" fill="#756F64">Stewart 8va Edición · Facultad de Ingeniería</text>

          <text x="0" y="145" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="48" fill="#1F3D36">$45.000 COP</text>
          <text x="320" y="140" font-family="'DM Mono', monospace" font-size="18" text-decoration="line-through" fill="#888">$180.000 COP</text>

          <!-- Verified Seller Card -->
          <g transform="translate(0, 200)">
            <rect width="580" height="180" rx="20" fill="#FFF" stroke="#E2DBD0" stroke-width="2"/>
            <!-- Avatar -->
            <circle cx="65" cy="65" r="38" fill="#C8A96A"/>
            <text x="65" y="76" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="32" fill="#1F3D36">M</text>
            
            <text x="125" y="55" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="20" fill="#16130F">Mateo Sánchez</text>
            <text x="125" y="80" font-family="'DM Mono', monospace" font-size="13" fill="#756F64">Ingeniería de Sistemas · 6to Semestre</text>
            
            <!-- Javeriana Verified Badge -->
            <rect x="125" y="98" width="220" height="28" rx="14" fill="#E8EFE8"/>
            <text x="235" y="117" text-anchor="middle" font-family="'DM Mono', monospace" font-size="11" font-weight="700" fill="#1F3D36">🛡️ Estudiante Verificado PUJ</text>

            <!-- Stars & stats -->
            <g transform="translate(25, 145)">
              <text x="0" y="0" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#C8A96A">★★★★★ 4.9</text>
              <text x="120" y="0" font-family="'DM Mono', monospace" font-size="13" fill="#666">18 transacciones en campus · 100% recomendación</text>
            </g>
          </g>

          <!-- SafeZone badge -->
          <g transform="translate(0, 420)">
            <rect width="580" height="70" rx="14" fill="#E8EFE8" stroke="#1F3D36"/>
            <text x="25" y="42" font-size="24">📍</text>
            <text x="65" y="35" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="15" fill="#1F3D36">Punto de entrega sugerido:</text>
            <text x="65" y="55" font-family="'DM Mono', monospace" font-size="13" fill="#333">Biblioteca Central (Ed. 02) o Cafetería Arboleda</text>
          </g>

          <!-- Green WhatsApp CTA Button -->
          <g transform="translate(0, 520)" filter="url(#shadow)">
            <rect width="580" height="84" rx="24" fill="#25D366"/>
            <text x="120" y="54" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#FFF">💬 Contactar por WhatsApp</text>
            <text x="440" y="52" font-family="'DM Mono', monospace" font-size="13" fill="#E8FCEF">Sin comisiones</text>
          </g>

          <!-- Pre-filled message teaser -->
          <text x="10" y="640" font-family="'DM Mono', monospace" font-size="13" fill="#756F64">Mensaje automático: "¡Hola Mateo! Vi tu libro en UniMercs, ¿podemos vernos en la Biblioteca?"</text>
        </g>
      </g>

      <!-- Header -->
      <g transform="translate(100, 60)">
        <text x="0" y="0" font-family="'DM Mono', monospace" font-size="18" font-weight="500" fill="#C8A96A" letter-spacing="4">ESCENA 05 · 00:30 - 00:38</text>
        <text x="0" y="38" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="36" fill="#F4EFE6">Comunidad Confiable: Calificaciones y Trato Directo</text>
      </g>
    `
  },
  {
    num: "06",
    id: "scene_06_safezones_delivery",
    title: "SAFEZONES — Encuentros Seguros en Campus",
    subtitle: "00:38 - 00:46 · Puntos Oficiales Vigilados PUJ",
    script: "¿El encuentro? Cero estrés. Usa las SafeZones oficiales en el campus: Biblioteca Central, cafeterías y plazas con vigilancia para intercambiar seguros.",
    svg: `
      <defs>
        <linearGradient id="s6_bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#182C24"/>
          <stop offset="100%" stop-color="#0E1714"/>
        </linearGradient>
      </defs>

      <rect width="1920" height="1080" fill="url(#s6_bg)"/>

      <!-- Map Graphic / Isometric Campus Base -->
      <g transform="translate(160, 160)">
        <!-- Stylized Map Canvas -->
        <rect width="900" height="780" rx="30" fill="#243E34" stroke="#375D4E" stroke-width="4"/>
        
        <!-- Campus Pathways / Streets -->
        <path d="M 0 320 Q 400 280 900 340" fill="none" stroke="#3D6857" stroke-width="36"/>
        <path d="M 450 0 L 450 780" fill="none" stroke="#3D6857" stroke-width="44"/>
        <path d="M 180 0 L 750 780" fill="none" stroke="#335849" stroke-width="20"/>

        <!-- Buildings Blocks (Isometric 3D stylized) -->
        <rect x="80" y="100" width="180" height="140" rx="14" fill="#172721" stroke="#487562" stroke-width="2"/>
        <text x="170" y="175" text-anchor="middle" font-family="'DM Mono', monospace" font-size="12" fill="#8BB3A0">Ed. 21 Maldonado</text>

        <rect x="580" y="120" width="220" height="160" rx="14" fill="#172721" stroke="#487562" stroke-width="2"/>
        <text x="690" y="205" text-anchor="middle" font-family="'DM Mono', monospace" font-size="12" fill="#8BB3A0">Ed. 67 Arboleda</text>

        <rect x="140" y="440" width="220" height="200" rx="14" fill="#172721" stroke="#487562" stroke-width="2"/>
        <text x="250" y="545" text-anchor="middle" font-family="'DM Mono', monospace" font-size="12" fill="#8BB3A0">Ed. 40 Giraldo</text>

        <!-- Big Highlight: Ed. 02 Biblioteca Central with Glowing Radar -->
        <g transform="translate(560, 480)">
          <!-- Glowing Pulsing Circles -->
          <circle cx="80" cy="80" r="140" fill="#C8A96A" opacity="0.1"/>
          <circle cx="80" cy="80" r="90" fill="#25D366" opacity="0.2"/>
          <circle cx="80" cy="80" r="50" fill="#25D366" opacity="0.4"/>
          
          <rect width="180" height="140" rx="16" fill="#1F3D36" stroke="#C8A96A" stroke-width="4"/>
          <text x="90" y="65" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#FFF">EDIFICIO 02</text>
          <text x="90" y="90" text-anchor="middle" font-family="'DM Mono', monospace" font-size="12" fill="#C8A96A">Biblioteca Central</text>

          <!-- Animated Map Pin -->
          <g transform="translate(60, -30)" filter="url(#shadow)">
            <path d="M 20 0 C 8 0 0 10 0 20 C 0 35 20 55 20 55 C 20 55 40 35 40 20 C 40 10 32 0 20 0 Z" fill="#25D366"/>
            <circle cx="20" cy="18" r="8" fill="#FFF"/>
          </g>
        </g>
      </g>

      <!-- Right Column: Real Student Handover Photo Mockup -->
      <g transform="translate(1120, 160)" filter="url(#shadow)">
        <rect width="640" height="780" rx="30" fill="#F4EFE6"/>
        
        <!-- Live Scene Image Simulation -->
        <g transform="translate(30, 30)">
          <rect width="580" height="440" rx="20" fill="#1F3D36"/>
          <!-- Two students silhouette meeting -->
          <circle cx="200" cy="180" r="50" fill="#C8A96A"/>
          <path d="M 130 320 C 130 250 270 250 270 320 Z" fill="#3D6857"/>

          <circle cx="380" cy="180" r="50" fill="#FFEBB8"/>
          <path d="M 310 320 C 310 250 450 250 450 320 Z" fill="#3D6857"/>

          <!-- Book in Hand Exchange -->
          <rect x="250" y="240" width="80" height="100" rx="6" fill="#C8A96A" stroke="#FFF" stroke-width="3"/>
          <text x="290" y="295" text-anchor="middle" font-size="12" font-weight="bold">📚 PUJ</text>

          <!-- Augmented Reality Badge -->
          <rect x="150" y="380" width="280" height="38" rx="19" fill="#16130FEE" stroke="#25D366" stroke-width="2"/>
          <text x="290" y="404" text-anchor="middle" font-family="'DM Mono', monospace" font-size="12" font-weight="700" fill="#25D366">🛡️ SafeZone Verificada 24/7</text>
        </g>

        <!-- SafeZone Detail Card -->
        <g transform="translate(40, 500)">
          <text x="0" y="30" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#16130F">Biblioteca Central Jorge Palacios</text>
          <text x="0" y="60" font-family="'DM Mono', monospace" font-size="14" fill="#756F64">Hall de entrada frente a torniquetes · Ed. 02</text>
          
          <g transform="translate(0, 85)">
            <rect width="560" height="42" rx="10" fill="#E8EFE8"/>
            <text x="20" y="26" font-family="'DM Mono', monospace" font-size="13" fill="#1F3D36">✓ Cámaras de seguridad y vigilancia institucional</text>
          </g>
          <g transform="translate(0, 135)">
            <rect width="560" height="42" rx="10" fill="#E8EFE8"/>
            <text x="20" y="26" font-family="'DM Mono', monospace" font-size="13" fill="#1F3D36">✓ Alto flujo de estudiantes · Punto 100% confiable</text>
          </g>

          <text x="0" y="225" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="18" fill="#1F3D36">¡Entrega exitosa en menos de 2 minutos!</text>
        </g>
      </g>

      <!-- Header -->
      <g transform="translate(100, 60)">
        <text x="0" y="0" font-family="'DM Mono', monospace" font-size="18" font-weight="500" fill="#C8A96A" letter-spacing="4">ESCENA 06 · 00:38 - 00:46</text>
        <text x="0" y="38" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="36" fill="#F4EFE6">SafeZones: Encuentros Seguros y Confiables en Campus</text>
      </g>
    `
  },
  {
    num: "07",
    id: "scene_07_student_storefront",
    title: "TIENDAS & EMPRENDIMIENTO — Tu Vitrina Estudiantil",
    subtitle: "00:46 - 00:53 · Del Libro Usado al Emprendimiento",
    script: "Vendas un solo artículo o muevas tu propio emprendimiento en la U, este es tu espacio: personaliza tu perfil, comparte tu vitrina y crece.",
    svg: `
      <defs>
        <linearGradient id="s7_bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#241E17"/>
          <stop offset="100%" stop-color="#120F0C"/>
        </linearGradient>
      </defs>

      <rect width="1920" height="1080" fill="url(#s7_bg)"/>

      <!-- Center Store Profile Device / Screen -->
      <g transform="translate(360, 120)" filter="url(#shadow)">
        <rect width="1200" height="840" rx="28" fill="#F4EFE6"/>

        <!-- Store Cover Banner -->
        <rect width="1200" height="220" rx="28 28 0 0" fill="#1F3D36"/>
        <text x="60" y="110" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="40" fill="#C8A96A">HUSTLE JAVERIANO</text>
        <text x="60" y="150" font-family="'DM Mono', monospace" font-size="18" fill="#F4EFE6">Tienda oficial de apuntes, tecnología y snacks</text>

        <!-- Profile Avatar Overlapping Banner -->
        <g transform="translate(80, 160)">
          <circle cx="60" cy="60" r="60" fill="#F4EFE6"/>
          <circle cx="60" cy="60" r="52" fill="#C8A96A"/>
          <text x="60" y="75" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="44" fill="#1F3D36">HJ</text>
        </g>

        <!-- Store Info & Stats -->
        <g transform="translate(230, 240)">
          <text x="0" y="25" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#16130F">Emprendimiento Javeriano</text>
          <text x="0" y="50" font-family="'DM Mono', monospace" font-size="14" fill="#756F64">unimercs.app/u/hustle-puj · 42 ventas · ★★★★★ (4.95)</text>
          
          <!-- Share URL Button -->
          <rect x="680" y="-10" width="220" height="44" rx="22" fill="#1F3D36"/>
          <text x="790" y="18" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="14" fill="#FFF">Compartir Tienda 🔗</text>
        </g>

        <!-- Store Catalog Grid (4 items) -->
        <g transform="translate(60, 340)">
          <!-- Item 1 -->
          <g transform="translate(0, 0)">
            <rect width="250" height="380" rx="16" fill="#FFF" stroke="#E2DBD0" stroke-width="2"/>
            <rect x="12" y="12" width="226" height="180" rx="12" fill="#E8EFE8"/>
            <text x="125" y="110" text-anchor="middle" font-size="50">📒</text>
            <text x="20" y="225" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#16130F">Resumen Cálculo III</text>
            <text x="20" y="250" font-family="'DM Mono', monospace" font-size="12" fill="#756F64">PDF impreso y anillado</text>
            <text x="20" y="295" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="22" fill="#1F3D36">$15.000 COP</text>
            <rect x="20" y="320" width="210" height="40" rx="10" fill="#1F3D36"/>
            <text x="125" y="345" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="600" font-size="13" fill="#FFF">Comprar</text>
          </g>

          <!-- Item 2 -->
          <g transform="translate(275, 0)">
            <rect width="250" height="380" rx="16" fill="#FFF" stroke="#E2DBD0" stroke-width="2"/>
            <rect x="12" y="12" width="226" height="180" rx="12" fill="#E8EFE8"/>
            <text x="125" y="110" text-anchor="middle" font-size="50">🔌</text>
            <text x="20" y="225" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#16130F">Adaptador USB-C a HDMI</text>
            <text x="20" y="250" font-family="'DM Mono', monospace" font-size="12" fill="#756F64">Nuevo en caja 4K</text>
            <text x="20" y="295" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="22" fill="#1F3D36">$35.000 COP</text>
            <rect x="20" y="320" width="210" height="40" rx="10" fill="#1F3D36"/>
            <text x="125" y="345" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="600" font-size="13" fill="#FFF">Comprar</text>
          </g>

          <!-- Item 3 -->
          <g transform="translate(550, 0)">
            <rect width="250" height="380" rx="16" fill="#FFF" stroke="#E2DBD0" stroke-width="2"/>
            <rect x="12" y="12" width="226" height="180" rx="12" fill="#E8EFE8"/>
            <text x="125" y="110" text-anchor="middle" font-size="50">🍪</text>
            <text x="20" y="225" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#16130F">Cookies Artesanales x3</text>
            <text x="20" y="250" font-family="'DM Mono', monospace" font-size="12" fill="#756F64">Chispas de chocolate</text>
            <text x="20" y="295" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="22" fill="#1F3D36">$10.000 COP</text>
            <rect x="20" y="320" width="210" height="40" rx="10" fill="#1F3D36"/>
            <text x="125" y="345" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="600" font-size="13" fill="#FFF">Comprar</text>
          </g>

          <!-- Item 4 -->
          <g transform="translate(825, 0)">
            <rect width="250" height="380" rx="16" fill="#FFF" stroke="#E2DBD0" stroke-width="2"/>
            <rect x="12" y="12" width="226" height="180" rx="12" fill="#E8EFE8"/>
            <text x="125" y="110" text-anchor="middle" font-size="50">🎨</text>
            <text x="20" y="225" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#16130F">Stickers Javerianos Pack</text>
            <text x="20" y="250" font-family="'DM Mono', monospace" font-size="12" fill="#756F64">Vinilo impermeable x5</text>
            <text x="20" y="295" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="22" fill="#1F3D36">$12.000 COP</text>
            <rect x="20" y="320" width="210" height="40" rx="10" fill="#1F3D36"/>
            <text x="125" y="345" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="600" font-size="13" fill="#FFF">Comprar</text>
          </g>
        </g>
      </g>

      <!-- Header -->
      <g transform="translate(100, 60)">
        <text x="0" y="0" font-family="'DM Mono', monospace" font-size="18" font-weight="500" fill="#C8A96A" letter-spacing="4">ESCENA 07 · 00:46 - 00:53</text>
        <text x="0" y="38" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="36" fill="#F4EFE6">Tu Perfil. Tu Vitrina. Tu Comunidad Emprendedora.</text>
      </g>
    `
  },
  {
    num: "08",
    id: "scene_08_brand_anthem_cta",
    title: "EL CIERRE — Campus Hustle, Handled",
    subtitle: "00:53 - 01:00 · Call to Action & Marca UniMercs",
    script: "Haz espacio. Ahorra. Conecta. UniMercs: Campus hustle, handled. ¡Entra hoy con tu correo javeriano!",
    svg: `
      <defs>
        <radialGradient id="s8_bg" cx="50%" cy="50%" r="75%">
          <stop offset="0%" stop-color="#1F3D36"/>
          <stop offset="60%" stop-color="#142823"/>
          <stop offset="100%" stop-color="#0A1310"/>
        </radialGradient>
        <linearGradient id="s8_gold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#FFE4A0"/>
          <stop offset="50%" stop-color="#C8A96A"/>
          <stop offset="100%" stop-color="#9E7F40"/>
        </linearGradient>
      </defs>

      <rect width="1920" height="1080" fill="url(#s8_bg)"/>

      <!-- Ambient Glow and Rays -->
      <circle cx="960" cy="460" r="400" fill="#C8A96A" opacity="0.08"/>

      <!-- Big UniMercs Emblem -->
      <g transform="translate(960, 320)" filter="url(#shadow)">
        <!-- Outer Gold Ring -->
        <circle cx="0" cy="0" r="120" fill="#142823" stroke="url(#s8_gold)" stroke-width="8"/>
        <!-- Stylized 'U' and Shield -->
        <path d="M -45 -50 L -45 10 C -45 42 45 42 45 10 L 45 -50" fill="none" stroke="url(#s8_gold)" stroke-width="16" stroke-linecap="round"/>
        <circle cx="0" cy="-25" r="10" fill="#C8A96A"/>
      </g>

      <!-- Brand Typography -->
      <g transform="translate(960, 520)">
        <text x="0" y="0" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="78" fill="#F4EFE6" letter-spacing="-2">unimercs</text>
        <text x="0" y="45" text-anchor="middle" font-family="'DM Mono', monospace" font-size="22" font-weight="500" fill="#C8A96A" letter-spacing="8">CAMPUS HUSTLE, HANDLED.</text>
        <text x="0" y="90" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="24" fill="#E8EFE8">El Marketplace Oficial de la Pontificia Universidad Javeriana</text>
      </g>

      <!-- Interactive Call to Action Bar & QR Box -->
      <g transform="translate(960, 720)">
        <!-- Big Gold Button -->
        <g transform="translate(-280, 0)" filter="url(#shadow)">
          <rect width="360" height="80" rx="40" fill="url(#s8_gold)"/>
          <text x="180" y="48" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="22" fill="#16130F">EMPEZAR AHORA</text>
        </g>

        <!-- Domain Badge -->
        <g transform="translate(110, 0)">
          <rect width="250" height="80" rx="40" fill="#16130F" stroke="#C8A96A" stroke-width="2"/>
          <text x="125" y="48" text-anchor="middle" font-family="'DM Mono', monospace" font-size="20" font-weight="700" fill="#F4EFE6">unimercs.app</text>
        </g>

        <!-- Subtext: PUJ email requirement -->
        <text x="0" y="130" text-anchor="middle" font-family="'DM Mono', monospace" font-size="15" fill="#A4B5AC">Inicia sesión con tu correo @javeriana.edu.co · Sin comisiones</text>
      </g>

      <!-- Scene Meta Header -->
      <g transform="translate(100, 60)">
        <text x="0" y="0" font-family="'DM Mono', monospace" font-size="18" font-weight="500" fill="#C8A96A" letter-spacing="4">ESCENA 08 · 00:53 - 01:00</text>
        <text x="0" y="38" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="36" fill="#F4EFE6">Cierre & Call to Action: Tu Próximo Semestre Empieza Aquí</text>
      </g>
    `
  }
];

// Write individual SVG files
scenes.forEach((scene) => {
  const fullSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
${scene.svg}
</svg>`;
  const filePath = path.join(outputDir, `${scene.id}.svg`);
  fs.writeFileSync(filePath, fullSvg, 'utf8');
  console.log(`Generated: ${scene.id}.svg`);
});

console.log('All 8 storyboard frames generated successfully!');
