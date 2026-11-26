const UniMercs = {
  lang: localStorage.getItem('unimercs_lang') || 'es',
  translatedText: new WeakMap(),
  translatedAttributes: new WeakMap(),

  i18n: {
    es: {
      announcement: 'Sell the textbook. Keep the ramen money. Marketplace universitario, entregas en campus.',
      safe_meetpoints: 'Puntos de encuentro seguros →',
      explore: 'Explorar',
      safezones: 'Puntos seguros',
      how_it_works: 'Cómo funciona',
      about_us: 'Nosotros',
      search_placeholder: 'Buscar libros, tecnología, dorm, accesorios...',
      search: 'Buscar',
      sign_in: 'Iniciar sesión',
      sell: 'Vender',
      my_profile: 'Mi perfil',
      admin: 'Admin Dashboard',
      footer_tagline: 'SELL THE TEXTBOOK. KEEP THE RAMEN MONEY.',
      footer_about: 'El marketplace exclusivo para estudiantes de la Pontificia Universidad Javeriana Bogotá. Vende lo que ya no usas, ahorra en libros y coordina entregas en puntos seguros.',
      buy: 'Comprar',
      community: 'Comunidad',
      legal: 'Legal & Admin',
      privacy: 'Privacidad',
      terms: 'Términos de uso',
      catalog: 'Explorar catálogo',
      books: 'Libros y textos',
      dorm: 'Dorm y muebles',
      electronics: 'Electrónica',
      post_item: 'Publicar un artículo',
      create_account: 'Crear cuenta',
      seller_guide: 'Guía para vendedores',
      meet_points: 'Puntos de entrega',
      about_unimercs: 'Sobre UniMercs',
      map_safezones: 'Mapa SafeZones',
      help_center: 'Centro de ayuda',
      copyright: 'Diseñado para la comunidad Javeriana Bogotá · Campus hustle, handled.'
    },
    en: {
      announcement: 'Sell the textbook. Keep the ramen money. Campus marketplace, meetups at safe points.',
      safe_meetpoints: 'Safe meetup points →',
      explore: 'Explore',
      safezones: 'Safe Zones',
      how_it_works: 'How it works',
      about_us: 'About Us',
      search_placeholder: 'Search books, tech, dorm gear, accessories...',
      search: 'Search',
      sign_in: 'Sign In',
      sell: 'Sell',
      my_profile: 'My profile',
      admin: 'Admin Dashboard',
      footer_tagline: 'SELL THE TEXTBOOK. KEEP THE RAMEN MONEY.',
      footer_about: 'The marketplace designed exclusively for students at Pontificia Universidad Javeriana Bogotá. Sell what you do not use, save on books, and coordinate safe deliveries on campus.',
      buy: 'Buy',
      community: 'Community',
      legal: 'Legal & Admin',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      catalog: 'Browse catalog',
      books: 'Books & Textbooks',
      dorm: 'Dorm & Furniture',
      electronics: 'Electronics',
      post_item: 'Post an item',
      create_account: 'Create account',
      seller_guide: 'Seller guide',
      meet_points: 'Delivery points',
      about_unimercs: 'About UniMercs',
      map_safezones: 'SafeZones Map',
      help_center: 'Help Center',
      copyright: 'Designed for the Javeriana Bogotá community · Campus hustle, handled.'
    }
  },

  t(key) {
    const currentLang = this.lang === 'en' ? 'en' : 'es';
    return (this.i18n[currentLang] && this.i18n[currentLang][key]) || (this.i18n.es[key] || key);
  },

  setLanguage(lang) {
    this.lang = lang === 'en' ? 'en' : 'es';
    localStorage.setItem('unimercs_lang', this.lang);
    this.applyLanguage();
  },

  applyLanguage() {
    const isEn = this.lang === 'en';
    document.documentElement.lang = this.lang;

    // Update active state in toggle
    const esBtn = document.getElementById('lang-switch-es');
    const enBtn = document.getElementById('lang-switch-en');
    if (esBtn && enBtn) {
      if (isEn) {
        enBtn.classList.add('active');
        esBtn.classList.remove('active');
      } else {
        esBtn.classList.add('active');
        enBtn.classList.remove('active');
      }
    }

    // Translate all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.getAttribute('data-i18n');
      const text = this.t(k);
      if (text) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        } else {
          el.textContent = text;
        }
      }
    });

    // Each page keeps its Spanish source in the markup.  This makes the
    // language switch useful beyond the shared navigation/footer: headings,
    // buttons, filters and helper copy on every page are translated too.
    this.translatePage();
    this.translateDocumentMeta();

    // Notify custom listeners if any
    window.dispatchEvent(new CustomEvent('unimercs:langchange', { detail: { lang: this.lang } }));
  },

  translateDocumentMeta() {
    const sourceTitle = document.documentElement.dataset.unimercsTitleEs || document.title;
    document.documentElement.dataset.unimercsTitleEs = sourceTitle;
    if (this.lang !== 'en') {
      document.title = sourceTitle;
      return;
    }
    const titles = {
      'Explorar publicaciones | unimercs': 'Explore listings | unimercs',
      'Cómo Funciona | unimercs Javeriana': 'How it works | unimercs Javeriana',
      'Puntos de Encuentro Seguros | unimercs Javeriana': 'Safe meetup points | unimercs Javeriana',
      'Sobre nosotros | unimercs': 'About us | unimercs',
      'Ayuda y seguridad | UniMercs': 'Help and safety | UniMercs',
      'Iniciar sesión | unimercs': 'Sign in | unimercs',
      'Crear cuenta | unimercs': 'Create account | unimercs',
      'Publica tu artículo | unimercs': 'Post your item | unimercs',
      'Mi Perfil | unimercs Javeriana': 'My profile | unimercs Javeriana',
      'Detalle de publicación | unimercs': 'Listing details | unimercs',
      'Política de privacidad | UniMercs': 'Privacy policy | UniMercs',
      'Términos de uso | UniMercs': 'Terms of use | UniMercs'
    };
    document.title = titles[sourceTitle] || sourceTitle;
  },

  pageTranslations: {
    'Inicio': 'Home',
    'Explorar publicaciones': 'Explore listings',
    'Puntos seguros': 'Safe points',
    'Cómo funciona': 'How it works',
    'Nosotros': 'About us',
    'Buscar': 'Search',
    'Filtros': 'Filters',
    'Categorías': 'Categories',
    'Todas las categorías': 'All categories',
    'Precio': 'Price',
    'Precio mínimo': 'Minimum price',
    'Precio máximo': 'Maximum price',
    'Estado': 'Condition',
    'Todos': 'All',
    'Nuevo': 'New',
    'Como nuevo': 'Like new',
    'Muy bueno': 'Very good',
    'Buen estado': 'Good condition',
    'Usado': 'Used',
    'Aplicar filtros': 'Apply filters',
    'Limpiar filtros': 'Clear filters',
    'Ordenar por': 'Sort by',
    'Más recientes': 'Most recent',
    'Menor precio': 'Lowest price',
    'Mayor precio': 'Highest price',
    'Publicaciones': 'Listings',
    'publicaciones encontradas': 'listings found',
    'publicación encontrada': 'listing found',
    'Cargando publicaciones...': 'Loading listings...',
    'No se encontraron publicaciones con estos criterios.': 'No listings match these filters.',
    'Sin coincidencias': 'No matches found',
    'Ver siguiente foto': 'View next photo',
    'fotos': 'photos',
    'Stock': 'Stock',
    'Vender': 'Sell',
    'Ver en mapa': 'View on map',
    'Usar para vender': 'Use to sell',
    'Puntos de encuentro seguros': 'Safe meetup points',
    'Elige un punto seguro dentro del campus para encontrarte y hacer tus intercambios con tranquilidad.': 'Choose a safe point on campus to meet and exchange items with confidence.',
    'Punto Seleccionado:': 'Selected point:',
    'Recomendado': 'Recommended',
    'Todos los puntos': 'All points',
    'Cafeterías': 'Cafeterias',
    'Bibliotecas': 'Libraries',
    'Edificios': 'Buildings',
    'Mi perfil': 'My profile',
    'Editar perfil': 'Edit profile',
    'Publicar artículo': 'Post item',
    'Cerrar sesión': 'Sign out',
    'Guardar cambios': 'Save changes',
    'Cancelar': 'Cancel',
    'Volver al inicio': 'Go back home',
    'Ver publicaciones': 'View listings',
    'Iniciar sesión': 'Sign in',
    'Crear cuenta': 'Create account',
    'Registrarse': 'Sign up',
    'Correo institucional': 'Institutional email',
    'Contraseña': 'Password',
    'Confirmar contraseña': 'Confirm password',
    'Nombre completo': 'Full name',
    'Detalles del producto': 'Product details',
    'Descripción': 'Description',
    'Vendedor': 'Seller',
    'Contactar al vendedor': 'Contact seller',
    'Productos similares': 'More like this',
    'Términos de uso': 'Terms of use',
    'Política de privacidad': 'Privacy policy',
    'Políticas de privacidad': 'Privacy policy',
    'Ayuda y seguridad': 'Help and safety',
    'Acerca de UniMercs': 'About UniMercs',
    'Libros': 'Books',
    'Dorm y hogar': 'Dorm & home',
    'Electrónica': 'Electronics',
    'Moda': 'Fashion',
    'Bicis y movilidad': 'Bikes & mobility',
    'Tutorías y servicios': 'Tutoring & services',
    'Cosas gratis': 'Free items',
    'Mejores ofertas': 'Best deals',
    'Laptops y accesorios': 'Laptops & accessories',
    'Laptops & accesorios': 'Laptops & accessories',
    'Dorm y muebles': 'Dorm & furniture',
    'Perfil público': 'Public profile',
    'Publicaciones de este usuario': 'Listings from this user',
    'Cuenta de tienda': 'Store account',
    'Cuenta personal': 'Personal account',

    // Explore
    'Explorar': 'Explore',
    'Encuentra lo que otros estudiantes ya no usan dentro del campus.': 'Find what other students no longer use on campus.',
    'Todas': 'All',
    'Dormitorio & Hogar': 'Dorm & home',
    'Computadores': 'Computers',
    'Papelería': 'Stationery',
    'Moda & Ropa': 'Fashion & clothing',
    'Bicicletas': 'Bicycles',
    'Tutorías y gigs': 'Tutoring & gigs',
    'Otros artículos': 'Other items',
    'Precio (COP)': 'Price (COP)',
    'Aplicar': 'Apply',
    'Limpiar': 'Clear',
    'ORDENAR:': 'SORT:',
    'MÁS RECIENTES': 'MOST RECENT',
    'MENOR PRECIO': 'LOWEST PRICE',
    'MAYOR PRECIO': 'HIGHEST PRICE',
    'EXPLORAR / PUBLICACIÓN': 'EXPLORE / LISTING',
    'ESTUDIANTE VERIFICADO': 'VERIFIED STUDENT',
    'PUNTO SEGURO SUGERIDO': 'SUGGESTED SAFE POINT',
    'Contactar': 'Contact',
    'Contactar vendedor': 'Contact seller',
    'Mensaje': 'Message',
    '¿Sigue disponible?': 'Is it still available?',
    '¿Aceptas oferta?': 'Do you accept an offer?',
    '¿Dónde nos vemos?': 'Where should we meet?',
    'Punto seguro propuesto': 'Proposed safe point',
    'Enviar mensaje': 'Send message',
    'NUNCA COMPARTAS DATOS DE PAGO POR CHAT.': 'NEVER SHARE PAYMENT DETAILS IN CHAT.',

    // Safe points
    'Puntos de Encuentro Seguros en el Campus': 'Safe meetup points on campus',
    'Consulta los puntos recomendados en un mapa real de OpenStreetMap. Selecciona cualquier lugar de la lista para centrar el mapa directamente sobre ese edificio.': 'Browse recommended places on a real OpenStreetMap map. Select any location in the list to center the map directly on that building.',
    'Campus PUJ Bogotá · Carrera 7 / Calle 40–45': 'PUJ Bogotá campus · 7th Avenue / 40th–45th Streets',
    'OpenStreetMap · sin API key': 'OpenStreetMap · no API key',
    'Todos los puntos': 'All points',
    'Solo Recomendados': 'Recommended only',
    'Biblioteca': 'Library',
    'Edificios / Lobbies': 'Buildings / lobbies',
    'Cafetería Edificio Rafael Arboleda (Ed. 67)': 'Rafael Arboleda Building Cafeteria (Bldg. 67)',
    'Biblioteca Central Jorge Palacios Preciado (Ed. 02)': 'Jorge Palacios Preciado Central Library (Bldg. 02)',
    'Plazoleta Edificio Gabriel Giraldo (Ed. 40)': 'Gabriel Giraldo Building Plaza (Bldg. 40)',
    'Edificio José Gabriel Maldonado (Ed. 21)': 'José Gabriel Maldonado Building (Bldg. 21)',
    'Centro Ático (Ed. 44 - Lobby)': 'Ático Center (Bldg. 44 - Lobby)',
    'Tienda Javeriana / Cafetería Central (Ed. 22)': 'Javeriana Store / Central Cafeteria (Bldg. 22)',
    'Centro de Atención a la Comunidad - CAC (Ed. 63)': 'Community Service Center - CAC (Bldg. 63)',
    'Punto central y concurrido, ideal para probar artículos electrónicos y validar transacciones en persona.': 'A central, busy place ideal for testing electronics and completing transactions in person.',
    'Excelente para entrega de libros, apuntes, calculadoras y laptops con máxima tranquilidad.': 'Excellent for handing over books, notes, calculators, and laptops with maximum peace of mind.',
    'Zona abierta con visibilidad total para encuentros rápidos de entrega de productos.': 'An open area with complete visibility for quick product handovers.',
    'Zona predilecta para estudiantes de ingeniería; cuenta con tomas eléctricas para verificar dispositivos.': 'A favorite area for engineering students, with outlets to test devices.',
    'Espacio óptimo para intercambio de equipos audiovisuales, cámaras o tecnología especializada.': 'An ideal space for exchanging audiovisual equipment, cameras, or specialized technology.',
    'Ubicación clásica de fácil acceso para toda la comunidad universitaria.': 'A familiar, easily accessible location for the entire university community.',
    'Punto seguro con alta presencia de personal universitario y facilidad de acceso sobre la Carrera 7ma.': 'A safe point with a strong staff presence and easy access from 7th Avenue.',

    // How it works
    'Cómo Funciona unimercs': 'How unimercs works',
    'Una experiencia diseñada de principio a fin para la comunidad estudiantil de la Universidad Javeriana Bogotá.': 'An end-to-end experience designed for the student community at Universidad Javeriana Bogotá.',
    'Paso 01 · Verificación': 'Step 01 · Verification',
    'Registro con Correo Institucional': 'Register with your institutional email',
    'Crea tu cuenta usando tu correo @javeriana.edu.co. Elige tu rol de comprador, vendedor o tienda virtual para empezar a operar en un entorno seguro.': 'Create your account with your @javeriana.edu.co email. Choose buyer, seller, or online-store status to get started in a secure environment.',
    'Comunidad Javeriana': 'Javeriana community',
    'Sin SPAM': 'No spam',
    'Paso 02 · Publicación': 'Step 02 · Listing',
    'Publica tu Artículo en un Minuto': 'Post your item in a minute',
    'Sube fotos de tus libros, calculadoras o artículos de dorm. Define el precio en COP, stock disponible y condición estandarizada (Nuevo, Como nuevo, Bueno).': 'Upload photos of your books, calculators, or dorm items. Set the price in COP, available stock, and a standard condition (New, Like new, Good).',
    'Control de Stock': 'Stock control',
    'Paso 03 · Descubrimiento': 'Step 03 · Discovery',
    'Búsqueda y Filtros Inteligentes': 'Smart search and filters',
    'Encuentra exactamente lo que necesitas para tu semestre usando el buscador con autocompletado en tiempo real y filtrando por categoría, precio o estado.': 'Find exactly what you need for the semester with real-time autocomplete and filters for category, price, or condition.',
    'Buscador en Vivo': 'Live search',
    '7 Categorías': '7 categories',
    'Paso 04 · Negociación': 'Step 04 · Negotiation',
    'Contacto Directo por WhatsApp': 'Direct contact through WhatsApp',
    'Comunícate directamente con el compañero vendedor por WhatsApp con mensajes precargados para acordar horario y medio de pago sin intermediarios.': 'Message the seller directly on WhatsApp with pre-written prompts to agree on a time and payment method without intermediaries.',
    '0% Comisiones': '0% fees',
    'Chat Directo': 'Direct chat',
    'Paso 05 · Entrega Segura': 'Step 05 · Safe handover',
    'Entrega en Puntos Seguros (SafeZones)': 'Handover at safe points (SafeZones)',
    'Coordina la entrega en los puntos vigilados del campus: Biblioteca Central, Cafetería Arboleda o Centro Ático. Prueba el producto y califica al vendedor.': 'Arrange the handover at monitored campus points: Central Library, Arboleda Cafeteria, or Ático Center. Test the item and rate the seller.',
    'Vigilancia 24h': '24-hour security',
    '¿Listo para empezar en el campus?': 'Ready to get started on campus?',
    'Crear mi cuenta gratis': 'Create my free account',
    'Proceso en 5 Pasos': 'A 5-step process',
    'Estándar Amazon': 'Amazon standard',
    'OpenStreetMap': 'OpenStreetMap',
    'Piso 1': 'First floor',
    'Hall de Entrada frente a torniquetes': 'Entrance hall opposite the turnstiles',
    'Facultad de Ciencias Jurídicas / Derecho - Zona de bancos': 'Law School - seating area',
    'Lobby Principal / Terraza de Ingeniería': 'Main lobby / Engineering terrace',
    'Entrada principal sobre la Calle 40': 'Main entrance on 40th Street',
    'Planta baja cerca al Parque Nacional': 'Ground floor near Parque Nacional',
    'Lobby de atención institucional': 'Institutional service lobby',
    'Lunes a Viernes 7:00 AM - 8:00 PM, Sábados 8:00 AM - 1:00 PM': 'Monday–Friday 7:00 AM–8:00 PM, Saturday 8:00 AM–1:00 PM',
    'Lunes a Viernes 6:00 AM - 10:00 PM, Sábados 8:00 AM - 6:00 PM': 'Monday–Friday 6:00 AM–10:00 PM, Saturday 8:00 AM–6:00 PM',
    'Lunes a Viernes 7:00 AM - 9:00 PM': 'Monday–Friday 7:00 AM–9:00 PM',
    'Lunes a Viernes 8:00 AM - 8:00 PM': 'Monday–Friday 8:00 AM–8:00 PM',
    'Lunes a Viernes 7:30 AM - 7:00 PM': 'Monday–Friday 7:30 AM–7:00 PM',
    'Lunes a Viernes 8:00 AM - 6:00 PM': 'Monday–Friday 8:00 AM–6:00 PM',
    'Cámaras de seguridad activas': 'Active security cameras',
    'Alto flujo de estudiantes y docentes': 'High student and faculty traffic',
    'Mesas iluminadas y vigilancia': 'Well-lit tables and security',
    'Vigilancia permanente 24/7': '24/7 security',
    'Control biométrico de acceso': 'Biometric access control',
    'Cámaras de circuito cerrado': 'Closed-circuit cameras',
    'Punto visible al aire libre dentro del campus': 'Visible outdoor point on campus',
    'Cerca a cafetería y personal de apoyo': 'Near a cafeteria and support staff',
    'Vigilancia de entrada': 'Entry security',
    'Espacios de trabajo colaborativo': 'Collaborative workspaces',
    'Enchufes para probar equipos': 'Outlets for testing equipment',
    'Recepción vigilada': 'Monitored reception',
    'Espacio cubierto y moderno': 'Modern covered space',
    'Ambiente académico seguro': 'Safe academic environment',
    'Punto de referencia institucional': 'Institutional landmark',
    'Vigilancia continua': 'Continuous security',
    'Cerca a accesos peatonales': 'Near pedestrian access',
    'Personal de seguridad institucional': 'Institutional security staff',
    'Oficinas de servicio al estudiante': 'Student service offices',

    // Account, about, and safety pages
    'Hecho por estudiantes, para estudiantes': 'Made by students, for students',
    'unimercs es el marketplace de la comunidad universitaria. Creado en la Pontificia Universidad Javeriana Bogotá para que comprar libros, tecnología y artículos de semestre sea rápido, seguro y accesible.': 'unimercs is the marketplace for the university community. Created at Pontificia Universidad Javeriana Bogotá, it makes buying books, technology, and semester essentials fast, safe, and accessible.',
    'Seguridad primero': 'Safety first',
    'Todo se reutiliza': 'Everything gets reused',
    'El equipo': 'The team',
    'Ayuda y seguridad': 'Help and safety',
    'Todo lo que necesitas para comprar, vender y encontrarte con tranquilidad.': 'Everything you need to buy, sell, and meet with confidence.',
    '¿Cómo publico?': 'How do I post an item?',
    '¿Cómo contacto a alguien?': 'How do I contact someone?',
    '¿Dónde me encuentro?': 'Where should I meet?',
    '¿Qué hago ante una publicación sospechosa?': 'What should I do about a suspicious listing?',
    'Cuida tus pagos': 'Keep payments safe',
    'Datos y privacidad': 'Data and privacy',
    'Entra con tu correo universitario.': 'Sign in with your university email.',
    'Correo': 'Email',
    'Olvidé mi contraseña': 'Forgot password',
    '¿No tienes cuenta?': 'Do not have an account?',
    'Regístrate': 'Sign up',
    'Recuperar contraseña': 'Reset password',
    'Enviar código': 'Send code',
    'Nueva contraseña': 'New password',
    'Restablecer contraseña': 'Reset password',
    'Solo estudiantes verificados: usa tu correo institucional.': 'Verified students only: use your institutional email.',
    'Tipo de perfil': 'Profile type',
    'Comprador': 'Buyer',
    'Tienda': 'Store',
    'Universidad': 'University',
    'Teléfono / WhatsApp': 'Phone / WhatsApp',
    'Acepto los términos de uso y la política de privacidad.': 'I accept the terms of use and privacy policy.',
    '¿Ya tienes cuenta?': 'Already have an account?',
    'Tarda un minuto. Tus compañeros lo verán al instante en el catálogo del campus.': 'It takes a minute. Your classmates will see it right away in the campus catalog.',
    'Arrastra tus fotos aquí': 'Drag your photos here',
    'Quitar': 'Remove',
    'Título': 'Title',
    'Categoría': 'Category',
    'Selecciona categoría': 'Select a category',
    'Cantidad / Stock': 'Quantity / stock',
    'Descripción de tienda': 'Store description',
    'Teléfono de contacto / WhatsApp': 'Contact phone / WhatsApp',
    'VISTA PREVIA': 'PREVIEW',
    'Tu título aquí': 'Your title here',

    // Home page: hero, category navigation, promotions, and catalogue UI
    'Vende el libro.': 'Sell the textbook.',
    'Quédate con la': 'Keep the',
    'plata del semestre.': 'semester money.',
    'Empezar a vender': 'Start selling',
    'Desocupa el cuarto.': 'Clear out your room.',
    'Hazlo dinero.': 'Turn it into money.',
    'Publicar tus cosas': 'Post your items',
    'Explorar categorías populares': 'Explore popular categories',
    'VER TODAS →': 'VIEW ALL →',
    'Bicis & Rides': 'Bikes & rides',
    'Destacados de hoy': 'Today’s highlights',
    'HABITACIÓN & ESTUDIO': 'ROOM & STUDY',
    'Packs para el semestre': 'Semester bundles',
    'Ver dorm': 'View dorm items',
    'SEMANA DE CAMBIO': 'SWAP WEEK',
    'Intercambio de libros': 'Book exchange',
    'Buscar libros': 'Find books',
    'SERVICIOS & CLASES': 'SERVICES & CLASSES',
    'Gana en el campus: tutorías & gigs': 'Earn on campus: tutoring & gigs',
    'Ver servicios': 'View services',
    'Monitores': 'Monitors',
    'Audífonos': 'Headphones',
    'Cargadores': 'Chargers',
    'Mini neveras': 'Mini fridges',
    'Lámparas': 'Lamps',
    'Sillas': 'Chairs',
    'Organizadores': 'Organizers',
    'Cobijas': 'Blankets',
    'Solo estudiantes verificados': 'Verified students only',
    'Puntos de encuentro en el campus': 'Meetup points on campus',
    'Pagos directos y sin comisiones': 'Direct payments with no fees',
    'Ayuda y soporte cuando lo necesites': 'Help and support whenever you need it',
    'Detalle de la publicación': 'Listing details',
    'VERIFICADO': 'VERIFIED',
    'Punto de encuentro sugerido:': 'Suggested meetup point:',
    'Contactar por WhatsApp': 'Contact via WhatsApp',
    'Condición:': 'Condition:',
    'Stock:': 'Stock:',
    'un.': 'units',
    'calificaciones': 'ratings',
    'Inicia sesión para contactar': 'Sign in to contact',
    'Cargando publicaciones...': 'Loading listings...',
    'Error cargando publicaciones:': 'Error loading listings:',
    'No hay publicaciones disponibles en esta categoría actualmente.': 'There are no listings in this category right now.',
    'Categoría:': 'Category:',
    'Sin descripción provista por el vendedor.': 'No description was provided by the seller.',
    'Estudiante Javeriano': 'Javeriana student',
    'Aún no tienes publicaciones.': 'You do not have any listings yet.',
    '¡Publica tu primer artículo!': 'Post your first item!',
    'Aún no has explorado productos recientemente.': 'You have not viewed any products recently.',
    'Aún no tienes calificaciones de otros estudiantes.': 'You do not have ratings from other students yet.',
    'Error cargando opiniones': 'Error loading reviews',
    'Aún no hay publicaciones relacionadas disponibles.': 'There are no related listings available yet.',
    'Guardado': 'Saved',
    'Guardar': 'Save',

    // Profile and listing detail
    'Cargando...': 'Loading...',
    'Pontificia Universidad Javeriana · Estudiante': 'Pontificia Universidad Javeriana · Student',
    'Ver mi tienda pública': 'View my public store',
    'Compartir': 'Share',
    'Publicaciones Activas': 'Active listings',
    'Artículos Vendidos': 'Items sold',
    'Valoración Promedio': 'Average rating',
    'MI CUENTA': 'MY ACCOUNT',
    'Información personal': 'Personal information',
    'Verificación': 'Verification',
    'Puntos seguros favoritos': 'Favorite safe points',
    'Notificaciones': 'Notifications',
    'Privacidad': 'Privacy',
    'Mis publicaciones': 'My listings',
    'Vistos recientemente': 'Recently viewed',
    'Reseñas': 'Reviews',
    'Calificaciones y opiniones recibidas': 'Ratings and feedback received',
    'Editar Perfil': 'Edit profile',
    'Cambiar foto': 'Change photo',
    'WhatsApp / Teléfono': 'WhatsApp / phone',
    'Correo personal de respaldo': 'Personal backup email',
    'Nombre de tienda (Opcional)': 'Store name (optional)',
    'Imagen de banner de tienda (URL opcional)': 'Store banner image (optional URL)',
    'EXPLORAR / CATEGORÍA / CARGANDO...': 'EXPLORE / CATEGORY / LOADING...',
    'Descripción del vendedor: estado, edición y por qué lo vende.': 'Seller description: condition, edition, and why they are selling it.',
    '[Texto de la publicación]': '[Listing text]',
    '[Nombre del vendedor]': '[Seller name]',
    'Ver tienda →': 'View store →',
    'Guardar': 'Save',
    'Más como este': 'More like this',
    'VER TODO': 'VIEW ALL',
    'Mensaje para el vendedor': 'Message for the seller',
    'Punto de entrega sugerido': 'Suggested handover point',
    'Abrir en WhatsApp': 'Open in WhatsApp',
    'NUNCA COMPARTAS DATOS BANCARIOS NI PAGUES FUERA DEL CAMPUS.': 'NEVER SHARE BANK DETAILS OR PAY OUTSIDE CAMPUS.',

    // Legal pages
    'Política de privacidad': 'Privacy policy',
    'Cómo tratamos los datos personales necesarios para operar una comunidad de compraventa más segura.': 'How we handle the personal data needed to operate a safer buying and selling community.',
    'Última actualización: 19 de octubre de 2026': 'Last updated: October 19, 2026',
    '1. Responsable y alcance': '1. Controller and scope',
    '2. Datos que tratamos': '2. Data we process',
    '3. Finalidades': '3. Purposes',
    '4. Visibilidad y circulación': '4. Visibility and sharing',
    '5. Conservación y seguridad': '5. Retention and security',
    '6. Tus derechos': '6. Your rights',
    '7. Consultas y reclamos': '7. Requests and complaints',
    '8. Menores y cambios': '8. Minors and changes',
    'Esta política explica el tratamiento de datos personales en UniMercs. Está diseñada de acuerdo con los principios de finalidad, libertad, veracidad, transparencia, acceso y circulación restringida, seguridad y confidencialidad previstos en la normativa colombiana aplicable de protección de datos personales.': 'This policy explains how UniMercs processes personal data. It follows the principles of purpose limitation, consent, data quality, transparency, restricted access and sharing, security, and confidentiality established by applicable Colombian personal-data law.',
    'UniMercs es responsable del tratamiento de los datos recolectados mediante esta plataforma para administrar cuentas, publicaciones, funciones de seguridad y atención de solicitudes. Esta política aplica a los datos entregados al registrarte, actualizar tu perfil, publicar un artículo o usar las funciones del sitio.': 'UniMercs is responsible for processing data collected through this platform to manage accounts, listings, security features, and requests. This policy applies to data provided when registering, updating a profile, posting an item, or using site features.',
    'Podemos tratar nombre, correo institucional, universidad, número de teléfono, correo personal opcional, foto de perfil, tipo de cuenta, información de publicaciones, reseñas, actividad relacionada con productos guardados o vistos, y registros técnicos básicos necesarios para la seguridad y operación. No debes publicar datos sensibles o datos personales de terceros sin su autorización.': 'We may process your name, institutional email, university, phone number, optional personal email, profile picture, account type, listing information, reviews, activity involving saved or viewed items, and basic technical records necessary for security and operations. Do not publish sensitive data or other people’s personal data without authorization.',
    'Crear y administrar tu cuenta, autenticación y recuperación de acceso.': 'Create and manage your account, authentication, and account recovery.',
    'Mostrar publicaciones, perfiles públicos y vitrinas de tiendas de acuerdo con la configuración de la cuenta.': 'Show listings, public profiles, and store pages according to account settings.',
    'Facilitar el contacto entre usuarios autenticados y los puntos de encuentro seguros.': 'Facilitate contact among authenticated users and safe meetup points.',
    'Prevenir fraude, abuso, suplantación, incumplimientos y riesgos para la comunidad.': 'Prevent fraud, abuse, impersonation, violations, and community risk.',
    'Atender solicitudes, moderar contenido, generar estadísticas agregadas y mejorar el servicio.': 'Handle requests, moderate content, generate aggregate statistics, and improve the service.',
    'Términos de uso': 'Terms of use',
    'Reglas para comprar, vender e intercambiar de forma clara y segura dentro de la comunidad UniMercs.': 'Rules for buying, selling, and trading clearly and safely within the UniMercs community.',
    '1. Elegibilidad y cuenta': '1. Eligibility and account',
    '2. Rol de UniMercs': '2. UniMercs’ role',
    '3. Publicaciones y artículos permitidos': '3. Listings and permitted items',
    '4. Comunicación, pagos y encuentros': '4. Communication, payments, and meetups',
    '5. Tiendas y perfiles públicos': '5. Stores and public profiles',
    '6. Reseñas y contenido de la comunidad': '6. Reviews and community content',
    '7. Moderación y medidas': '7. Moderation and actions',
    '8. Propiedad intelectual': '8. Intellectual property',
    '9. Limitación de responsabilidad': '9. Limitation of liability',
    '10. Cambios, vigencia y contacto': '10. Changes, term, and contact',
    'Estos Términos de uso regulan el acceso y uso de UniMercs, una plataforma comunitaria de anuncios entre estudiantes. Al crear una cuenta, publicar, contactar a otro usuario o usar cualquier función de la plataforma, aceptas estos términos.': 'These Terms of Use govern access to and use of UniMercs, a community listing platform for students. By creating an account, posting, contacting another user, or using any platform feature, you accept these terms.',
    'Debes proporcionar información veraz, mantener la confidencialidad de tus credenciales y usar una cuenta personal. La cuenta institucional y los datos de contacto se utilizan para administrar el acceso, prevenir fraudes y facilitar la operación del servicio. Eres responsable de toda actividad realizada desde tu cuenta.': 'You must provide accurate information, keep your credentials confidential, and use a personal account. Institutional accounts and contact data are used to manage access, prevent fraud, and operate the service. You are responsible for all activity performed through your account.',
    'UniMercs facilita la publicación y el contacto entre usuarios, pero no compra, vende, inspecciona, transporta, garantiza ni participa en la transacción entre las partes. Cada comprador y vendedor decide libremente si continúa con una negociación y asume sus propios riesgos y obligaciones.': 'UniMercs facilitates listings and contact between users, but does not buy, sell, inspect, transport, guarantee, or participate in transactions between the parties. Each buyer and seller freely decides whether to continue a negotiation and assumes their own risks and obligations.'
    ,
    'No está permitido publicar, solicitar u ofrecer:': 'You may not post, request, or offer:',
    'Tu nombre, foto de perfil, universidad, calificación, publicaciones y, para cuentas tienda, los elementos de su vitrina pública pueden ser visibles en la plataforma. El número de contacto se restringe a usuarios autenticados cuando la funcionalidad lo requiere. No vendemos datos personales. Solo compartimos datos con proveedores que prestan servicios técnicos indispensables o cuando exista una obligación legal, aplicando medidas razonables de confidencialidad y seguridad.': 'Your name, profile photo, university, rating, listings, and, for store accounts, public-store elements may be visible on the platform. Contact numbers are restricted to authenticated users where a feature requires them. We do not sell personal data. We only share data with providers of essential technical services or when legally required, applying reasonable confidentiality and security measures.',
    'Conservamos los datos durante la vigencia de la cuenta y por el tiempo necesario para cumplir las finalidades descritas, obligaciones legales, atención de controversias o seguridad. Aplicamos medidas administrativas y técnicas razonables; sin embargo, ningún servicio digital puede garantizar seguridad absoluta. Te recomendamos utilizar una contraseña única y no compartir códigos de acceso.': 'We retain data while the account is active and for the time needed to fulfill the purposes described, legal duties, dispute handling, or security needs. We apply reasonable administrative and technical safeguards; however, no digital service can guarantee absolute security. Use a unique password and never share access codes.',
    'Como titular puedes conocer, actualizar, rectificar, solicitar prueba de la autorización, ser informado sobre el uso, presentar consultas o reclamos, solicitar la supresión cuando proceda y revocar la autorización, salvo que exista un deber legal o contractual de conservar la información. Puedes actualizar parte de tus datos desde tu perfil.': 'As a data subject, you may access, update, correct, request evidence of authorization, be informed about use, submit requests or complaints, request deletion where appropriate, and withdraw authorization unless a legal or contractual duty requires retention. You can update some of your data from your profile.',
    'Para ejercer tus derechos, utiliza los canales institucionales de soporte de UniMercs e indica tu nombre, medio de contacto, solicitud concreta y los documentos que permitan verificar tu identidad cuando sea necesario. Responderemos dentro de los plazos previstos por la normativa aplicable. Si una solicitud requiere información adicional, te indicaremos qué falta para gestionarla.': 'To exercise your rights, use UniMercs institutional support channels and provide your name, contact method, specific request, and documents needed to verify your identity when necessary. We will respond within deadlines set by applicable law. If a request needs additional information, we will tell you what is missing.',
    'La plataforma está dirigida a miembros habilitados de la comunidad universitaria. Si identificamos datos de un menor sin la autorización correspondiente, podremos restringir o eliminar la cuenta. Esta política puede actualizarse por cambios normativos, tecnológicos u operativos; la versión vigente estará disponible en esta página con su fecha de actualización.': 'The platform is intended for eligible members of the university community. If we identify data from a minor without appropriate authorization, we may restrict or remove the account. This policy may be updated for legal, technological, or operational changes; the current version will be available on this page with its update date.',
    'Solo puedes publicar artículos, servicios o intercambios lícitos que puedas ofrecer legítimamente. La descripción, fotografías, precio, condición, disponibilidad y demás información deben ser reales, suficientes y no engañosos. Las fotos deben ser propias o contar con autorización para usarlas. No está permitido publicar, solicitar u ofrecer:': 'You may only post lawful items, services, or trades that you can legitimately offer. Descriptions, photographs, price, condition, availability, and other information must be real, sufficient, and not misleading. Photos must be your own or authorized for use. You may not post, request, or offer:',
    'Artículos robados, falsificados, ilegales, peligrosos o sujetos a restricciones sin las autorizaciones correspondientes.': 'Stolen, counterfeit, illegal, dangerous, or restricted items without the required authorizations.',
    'Armas, drogas, alcohol, tabaco, medicamentos, contenido sexual, documentos oficiales, credenciales, datos personales de terceros o bienes que vulneren derechos de autor.': 'Weapons, drugs, alcohol, tobacco, medicines, sexual content, official documents, credentials, third-party personal data, or goods that infringe copyright.',
    'Contenido discriminatorio, acosador, amenazante, fraudulento, spam, enlaces maliciosos o solicitudes de pago anticipado engañosas.': 'Discriminatory, harassing, threatening, fraudulent, spam content, malicious links, or deceptive advance-payment requests.',
    'La comunicación debe ser respetuosa. Antes de pagar, verifica la identidad razonablemente, revisa el artículo y acuerda de forma explícita el precio, el método de pago y el punto de encuentro. Recomendamos realizar los encuentros en puntos seguros y concurridos del campus, no compartir contraseñas o códigos de seguridad, y suspender el contacto ante señales de fraude o presión indebida.': 'Communication must be respectful. Before paying, reasonably verify identity, inspect the item, and explicitly agree on the price, payment method, and meetup point. We recommend meeting in safe, busy campus locations, never sharing passwords or security codes, and ending contact if you notice fraud or undue pressure.',
    'Las cuentas registradas como tienda pueden configurar una vitrina pública con nombre comercial, descripción, banner y productos. El titular conserva responsabilidad total sobre la información y ofertas mostradas. Los perfiles personales no se presentan como tiendas ni deben aparentar una identidad comercial distinta a la registrada.': 'Accounts registered as stores can configure a public storefront with a business name, description, banner, and products. The owner remains fully responsible for displayed information and offers. Personal profiles are not presented as stores and must not appear to be a business identity different from the registered one.',
    'Las reseñas deben basarse en experiencias reales, ser pertinentes y respetuosas. No se permiten reseñas manipuladas, represalias, suplantaciones ni contenido que revele información privada. UniMercs puede retirar contenido que incumpla estas reglas sin que ello implique una obligación de monitoreo previo.': 'Reviews must reflect real experiences and be relevant and respectful. Manipulated reviews, retaliation, impersonation, and content revealing private information are not allowed. UniMercs may remove content that violates these rules without assuming a duty to monitor in advance.',
    'Podemos revisar, ocultar, retirar publicaciones, limitar funciones, suspender o cancelar cuentas cuando exista un incumplimiento, riesgo de seguridad, orden de autoridad competente o necesidad de proteger a la comunidad. Cuando sea razonable, se informará la medida y el canal para solicitar revisión.': 'We may review, hide, remove listings, limit features, suspend, or cancel accounts when there is a violation, security risk, order from a competent authority, or need to protect the community. When reasonable, we will explain the action and the channel to request review.',
    'Conservas la titularidad del contenido que publiques, pero nos otorgas una licencia no exclusiva, gratuita y limitada a alojar, adaptar técnicamente y mostrar ese contenido para operar y promocionar la plataforma mientras permanezca publicado. No debes cargar contenido que infrinja derechos de terceros.': 'You retain ownership of content you post, but grant us a non-exclusive, royalty-free, limited license to host, technically adapt, and display it to operate and promote the platform while it remains published. Do not upload content that infringes third-party rights.',
    'La plataforma se ofrece según disponibilidad. En la medida permitida por la ley aplicable, UniMercs no responde por acuerdos privados, calidad, seguridad, autenticidad, legalidad, entrega, pagos, pérdidas o daños derivados de una transacción entre usuarios. Nada en estos términos limita derechos que no puedan excluirse legalmente.': 'The platform is provided as available. To the extent allowed by applicable law, UniMercs is not liable for private agreements, quality, safety, authenticity, legality, delivery, payments, loss, or damage arising from a transaction between users. Nothing in these terms limits rights that cannot legally be excluded.',
    'Podemos actualizar estos términos para reflejar cambios operativos, de seguridad o normativos. Publicaremos la fecha de actualización y, cuando corresponda, avisaremos por medios razonables. Si continúas usando UniMercs después de la entrada en vigor, se entenderá aceptada la versión actualizada. Para consultas, utiliza los canales institucionales habilitados por UniMercs.': 'We may update these terms to reflect operational, security, or legal changes. We will publish the update date and, where appropriate, notify you through reasonable means. If you continue using UniMercs after the effective date, you accept the updated version. For questions, use UniMercs institutional channels.',
    'Estos términos se interpretan conforme a la normativa aplicable en Colombia. Si alguna disposición resulta inválida, las demás permanecerán vigentes.': 'These terms are interpreted under applicable Colombian law. If any provision is invalid, the remaining provisions remain in force.',
    'Inicia sesión, selecciona “Publicar”, agrega una descripción clara, precio, foto y punto de encuentro.': 'Sign in, select “Post,” and add a clear description, price, photo, and meetup point.',
    'Inicia sesión y usa el botón de WhatsApp de la publicación para coordinar directamente con el vendedor.': 'Sign in and use the listing’s WhatsApp button to coordinate directly with the seller.',
    'Elige un lugar iluminado y concurrido. Revisa los puntos recomendados antes de acordar una entrega.': 'Choose a well-lit, busy location. Review recommended points before arranging a handover.',
    'Usa la opción de reportar en el detalle de la publicación. El equipo revisará el caso.': 'Use the report option in the listing details. The team will review the case.',
    'No envíes anticipos a desconocidos. Verifica el producto en persona antes de completar el pago.': 'Do not send advance payments to strangers. Verify the item in person before completing payment.',
    'Tu número de contacto se muestra únicamente a miembros que han iniciado sesión.': 'Your contact number is shown only to signed-in members.'
  },

  translateText(value) {
    if (this.lang !== 'en' || !value) return value;
    const leading = value.match(/^\s*/)?.[0] || '';
    const trailing = value.match(/\s*$/)?.[0] || '';
    const body = value.trim();
    return `${leading}${this.pageTranslations[body] || body}${trailing}`;
  },

  translatePage(root = document.body) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || parent.closest('script, style, code, pre, [data-no-translate]')) return NodeFilter.FILTER_REJECT;
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (!this.translatedText.has(node)) this.translatedText.set(node, node.nodeValue);
      node.nodeValue = this.translateText(this.translatedText.get(node));
    });

    root.querySelectorAll?.('[placeholder], [title], img[alt]').forEach(el => {
      if (el.closest('[data-no-translate]')) return;
      let saved = this.translatedAttributes.get(el);
      if (!saved) {
        saved = {};
        ['placeholder', 'title', 'alt'].forEach(attr => {
          if (el.hasAttribute(attr)) saved[attr] = el.getAttribute(attr);
        });
        this.translatedAttributes.set(el, saved);
      }
      Object.entries(saved).forEach(([attr, value]) => el.setAttribute(attr, this.translateText(value)));
    });
  },

  observePageTranslations() {
    if (this.translationObserver || !document.body) return;
    this.translationObserver = new MutationObserver(records => {
      if (this.lang !== 'en') return;
      records.forEach(record => record.addedNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          if (!node.parentElement || node.parentElement.closest('script, style, code, pre, [data-no-translate]')) return;
          if (!this.translatedText.has(node)) this.translatedText.set(node, node.nodeValue);
          node.nodeValue = this.translateText(this.translatedText.get(node));
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          this.translatePage(node);
        }
      }));
    });
    this.translationObserver.observe(document.body, { childList: true, subtree: true });
  },

  logoSvg(size = 32, variant = 'emerald') {
    const bg = (variant === 'champagne' || variant === 'volt') ? '#C8A96A' : ((variant === 'obsidian' || variant === 'midnight') ? '#16130F' : '#1F3D36');
    const uColor = (variant === 'champagne' || variant === 'volt') ? '#16130F' : '#F4EFE6';
    const dotColor = (variant === 'champagne' || variant === 'volt') ? '#1F3D36' : '#C8A96A';
    return `<svg class="unimercs-logo-mark" viewBox="0 0 32 32" width="${size}" height="${size}" style="display:block;border-radius:28%;flex-shrink:0" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="9" fill="${bg}"/>
      <path d="M10 9.5v7a6 6 0 0 0 12 0v-7" stroke="${uColor}" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="22" cy="9.5" r="2.6" fill="${dotColor}"/>
    </svg>`;
  },

  nav(active) {
    const isEn = this.lang === 'en';
    const t = (k) => this.t(k);

    return `
      <!-- Top Announcement -->
      <div class="announcement">
        <span data-i18n="announcement">${t('announcement')}</span>
        <a href="safezones.html" data-i18n="safe_meetpoints">${t('safe_meetpoints')}</a>
      </div>

      <!-- Header -->
      <header class="site-header ${active === 'explore' ? 'site-header--explore' : ''}">
        <div class="container header-inner">
          
          <!-- Brand Logo -->
          <a class="brand" href="index.html">
            ${this.logoSvg(34, 'emerald')}
            <span style="font-weight:700;letter-spacing:-0.03em;color:#16130F;">unimercs</span>
          </a>

          <!-- Search Input with Autocomplete -->
          <div class="header-search-wrap">
            <div class="header-search-box">
              <input type="text" id="globalNavSearchInput" class="header-search-input" data-i18n="search_placeholder" placeholder="${t('search_placeholder')}" autocomplete="off" />
              <button class="header-search-btn" id="btnGlobalNavSearch" type="button">
                <span data-i18n="search">${t('search')}</span>
              </button>
            </div>
            <div class="search-autocomplete-dropdown" id="globalNavAutocomplete"></div>
          </div>

          <!-- Nav Links -->
          <nav class="nav">
            <a href="explore.html" ${active==='explore'?'aria-current="page"':''} data-i18n="explore">${t('explore')}</a>
            <a href="safezones.html" ${active==='safezones'?'aria-current="page"':''} data-i18n="safezones">${t('safezones')}</a>
            <a href="how-it-works.html" ${active==='how'?'aria-current="page"':''} data-i18n="how_it_works">${t('how_it_works')}</a>
          </nav>

          <!-- Actions: Language switch + User Avatar / Sign In + Sell Button -->
          <div class="header-actions">
            
            <!-- Language Slide Button Switch (ES / EN) -->
            <div class="lang-switch-wrap" role="group" aria-label="Cambiar idioma / Switch language" title="Cambiar idioma / Switch language">
              <button type="button" class="lang-switch-btn ${!isEn ? 'active' : ''}" id="lang-switch-es" onclick="UniMercs.setLanguage('es')">ES</button>
              <button type="button" class="lang-switch-btn ${isEn ? 'active' : ''}" id="lang-switch-en" onclick="UniMercs.setLanguage('en')">EN</button>
            </div>

            ${(() => {
              const raw = localStorage.getItem('unimercs_current_user');
              if (!raw) {
                return `<a class="btn" href="login.html" data-i18n="sign_in">${t('sign_in')}</a>
                        <a class="btn btn-primary" href="post.html" data-i18n="sell">${t('sell')}</a>`;
              }
              try {
                const user = JSON.parse(raw);
                const initials = encodeURIComponent((user.name || 'U').split(' ').map(x => x[0]).slice(0, 2).join(''));
                const pic = user.profilePicture
                  ? (user.profilePicture.startsWith('http') || user.profilePicture.startsWith('data:')
                      ? user.profilePicture
                      : `${user.profilePicture}`)
                  : `https://ui-avatars.com/api/?name=${initials}&background=1F3D36&color=C8A96A&bold=true`;
                return `
                  <a href="profile.html" title="Mi perfil" style="display:flex;align-items:center;text-decoration:none">
                    <img src="${pic}" alt="Mi perfil" style="width:38px;height:38px;border-radius:50%;object-fit:cover;border:2px solid #C8A96A;box-shadow:0 2px 8px rgba(31,61,54,0.18)">
                  </a>
                  <a class="btn btn-primary" href="post.html" data-i18n="sell">${t('sell')}</a>`;
              } catch {
                return `<a class="btn" href="login.html" data-i18n="sign_in">${t('sign_in')}</a>
                        <a class="btn btn-primary" href="post.html" data-i18n="sell">${t('sell')}</a>`;
              }
            })()}
          </div>

        </div>
      </header>
      <nav class="category-nav" aria-label="Categorías">
        <div class="container category-nav-inner">
          <a class="category-nav-link ${active === 'home' ? 'active' : ''}" href="explore.html">Todas las categorías</a>
          <a class="category-nav-link" href="explore.html?category=Libros">Libros</a>
          <a class="category-nav-link" href="explore.html?category=Dorm">Dorm y hogar</a>
          <a class="category-nav-link" href="explore.html?category=Electrónica">Electrónica</a>
          <a class="category-nav-link" href="explore.html?category=Moda">Moda</a>
          <a class="category-nav-link" href="explore.html?category=Bicis">Bicis y movilidad</a>
          <a class="category-nav-link" href="explore.html?category=Tutorías">Tutorías y servicios</a>
          <a class="category-nav-link" href="explore.html?category=Gratis">Cosas gratis</a>
          <a class="category-nav-deals" href="explore.html?sort=price-asc">Mejores ofertas</a>
        </div>
      </nav>`;
  },

  footer() {
    const t = (k) => this.t(k);
    return `<footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="footer-brand">
              ${this.logoSvg(32, 'champagne')}
              <span style="font-weight:700;letter-spacing:-0.03em;">unimercs</span>
            </div>
            <span class="footer-tagline" data-i18n="footer_tagline">${t('footer_tagline')}</span>
            <p class="footer-about" data-i18n="footer_about">
              ${t('footer_about')}
            </p>
          </div>
          <div>
            <div class="footer-heading" data-i18n="buy">${t('buy')}</div>
            <div class="footer-links">
              <a href="explore.html" data-i18n="catalog">${t('catalog')}</a>
              <a href="explore.html?category=Libros" data-i18n="books">${t('books')}</a>
              <a href="explore.html?category=Dorm" data-i18n="dorm">${t('dorm')}</a>
              <a href="explore.html?category=Electrónica" data-i18n="electronics">${t('electronics')}</a>
            </div>
          </div>
          <div>
            <div class="footer-heading" data-i18n="sell">${t('sell')}</div>
            <div class="footer-links">
              <a href="post.html" data-i18n="post_item">${t('post_item')}</a>
              <a href="register.html" data-i18n="create_account">${t('create_account')}</a>
              <a href="how-it-works.html" data-i18n="seller_guide">${t('seller_guide')}</a>
              <a href="safezones.html" data-i18n="meet_points">${t('meet_points')}</a>
            </div>
          </div>
          <div>
            <div class="footer-heading" data-i18n="community">${t('community')}</div>
            <div class="footer-links">
              <a href="about.html" data-i18n="about_unimercs">${t('about_unimercs')}</a>
              <a href="safezones.html" data-i18n="map_safezones">${t('map_safezones')}</a>
              <a href="how-it-works.html" data-i18n="how_it_works">${t('how_it_works')}</a>
              <a href="help.html" data-i18n="help_center">${t('help_center')}</a>
            </div>
          </div>
          <div>
            <div class="footer-heading" data-i18n="legal">${t('legal')}</div>
            <div class="footer-links">
              <a href="privacy.html" data-i18n="privacy">${t('privacy')}</a>
              <a href="terms.html" data-i18n="terms">${t('terms')}</a>
              <a href="admin.html" style="color:var(--volt);" data-i18n="admin">${t('admin')}</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} unimercs · <span data-i18n="copyright">${t('copyright')}</span></span>
          <span style="font-family:var(--font-mono);font-size:12px;color:var(--volt);">CAMPUS HUSTLE, HANDLED.</span>
        </div>
      </div>
    </footer>`;
  },

  initSearchAutocomplete() {
    const input = document.getElementById('globalNavSearchInput');
    const dropdown = document.getElementById('globalNavAutocomplete');
    const btn = document.getElementById('btnGlobalNavSearch');
    if (!input || !dropdown) return;

    const API_BASE = 'http://localhost:5000/api';

    const triggerSearch = () => {
      const q = input.value.trim();
      if (q) {
        window.location.href = `explore.html?search=${encodeURIComponent(q)}`;
      }
    };

    if (btn) btn.onclick = triggerSearch;
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        triggerSearch();
      }
    });

    input.addEventListener('input', async () => {
      const term = input.value.trim();
      if (term.length < 2) {
        dropdown.classList.remove('open');
        dropdown.innerHTML = '';
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/posts?search=${encodeURIComponent(term)}`);
        const items = await res.json();
        if (items && items.length) {
          dropdown.innerHTML = items.slice(0, 5).map(item => {
            const img = item.imageUrl ? (item.imageUrl.startsWith('http') ? item.imageUrl : `${item.imageUrl}`) : 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80';
            return `
              <div class="autocomplete-item" onclick="window.location.href='product-detail.html?id=${item._id}'">
                <img class="autocomplete-thumb" src="${img}" alt="${item.title}" />
                <div class="autocomplete-title">${item.title}</div>
                <div class="autocomplete-price">$ ${Number(item.price).toLocaleString('es-CO')}</div>
              </div>
            `;
          }).join('');
          dropdown.classList.add('open');
        } else {
          dropdown.innerHTML = '<div style="padding:14px; text-align:center; font-size:13px; color:var(--muted);">Sin coincidencias</div>';
          dropdown.classList.add('open');
        }
      } catch (e) {
        dropdown.classList.remove('open');
      }
    });

    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  },

  mount(active) {
    const nav = document.getElementById('site-nav');
    const footer = document.getElementById('site-footer');
    if (nav) nav.innerHTML = this.nav(active);
    if (footer) footer.innerHTML = this.footer();

    this.initSearchAutocomplete();
    this.applyLanguage();
    this.observePageTranslations();
  },

  escape(value = '') {
    const div = document.createElement('div');
    div.textContent = value;
    return div.innerHTML;
  }
};
