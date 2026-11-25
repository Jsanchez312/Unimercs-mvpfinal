/**
 * Puntos de Encuentro Seguros recomendados dentro del campus de la Pontificia Universidad Javeriana Bogotá.
 * HU-12 (RF-12)
 */
const SAFE_ZONES = [
  {
    id: 'arboleda',
    name: 'Cafetería Edificio Rafael Arboleda (Ed. 67)',
    building: 'Edificio 67 - Rafael Arboleda',
    location: 'Facultad de Ciencias Económicas y Administrativas - Piso 1',
    schedule: 'Lunes a Viernes 7:00 AM - 8:00 PM, Sábados 8:00 AM - 1:00 PM',
    lat: 4.63055,
    lng: -74.06355,
    features: ['Cámaras de seguridad activas', 'Alto flujo de estudiantes y docentes', 'Mesas iluminadas y vigilancia institucional'],
    description: 'Punto central y concurrido, ideal para probar artículos electrónicos y validar transacciones en persona.',
    recommended: true,
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'biblioteca_central',
    name: 'Biblioteca Central Jorge Palacios Preciado (Ed. 02)',
    building: 'Edificio 02 - Jorge Palacios Preciado',
    location: 'Edificio 02 - Hall de Entrada frente a torniquetes',
    schedule: 'Lunes a Viernes 6:00 AM - 10:00 PM, Sábados 8:00 AM - 6:00 PM',
    lat: 4.62822,
    lng: -74.06510,
    features: ['Vigilancia permanente 24/7', 'Control biométrico de acceso', 'Cámaras de circuito cerrado'],
    description: 'Excelente para entrega de libros, apuntes, calculadoras y laptops con máxima tranquilidad.',
    recommended: true,
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'giraldo',
    name: 'Plazoleta Edificio Gabriel Giraldo (Ed. 40)',
    building: 'Edificio 40 - Gabriel Giraldo',
    location: 'Facultad de Ciencias Jurídicas / Derecho - Zona de bancos',
    schedule: 'Lunes a Viernes 7:00 AM - 9:00 PM',
    lat: 4.62738,
    lng: -74.06370,
    features: ['Punto visible al aire libre dentro del campus', 'Cerca a cafetería y personal de apoyo'],
    description: 'Zona abierta con visibilidad total para encuentros rápidos de entrega de productos.',
    recommended: false,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'maldonado',
    name: 'Edificio José Gabriel Maldonado (Ed. 21)',
    building: 'Edificio 21 - José Gabriel Maldonado',
    location: 'Lobby Principal / Terraza de Ingeniería',
    schedule: 'Lunes a Viernes 7:00 AM - 9:00 PM',
    lat: 4.62948,
    lng: -74.06255,
    features: ['Vigilancia de entrada', 'Espacios de trabajo colaborativo', 'Enchufes para probar equipos'],
    description: 'Zona predilecta para estudiantes de ingeniería; cuenta con tomas eléctricas para verificar dispositivos.',
    recommended: false,
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'atico',
    name: 'Centro Ático (Ed. 44 - Lobby)',
    building: 'Edificio 44 - Centro Ático',
    location: 'Entrada principal sobre la Calle 40',
    schedule: 'Lunes a Viernes 8:00 AM - 8:00 PM',
    lat: 4.627026,
    lng: -74.065042,
    features: ['Recepción vigilada', 'Espacio cubierto y moderno', 'Ambiente académico seguro'],
    description: 'Espacio óptimo para intercambio de equipos audiovisuales, cámaras o tecnología especializada.',
    recommended: false,
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'tienda_javeriana',
    name: 'Tienda Javeriana / Cafetería Central (Ed. 22)',
    building: 'Edificio 22 - Emilio Arango',
    location: 'Planta baja cerca al Parque Nacional',
    schedule: 'Lunes a Viernes 7:30 AM - 7:00 PM',
    lat: 4.62872,
    lng: -74.06528,
    features: ['Punto de referencia institucional', 'Vigilancia continua', 'Cerca a accesos peatonales'],
    description: 'Ubicación clásica de fácil acceso para toda la comunidad universitaria.',
    recommended: true,
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cac',
    name: 'Centro de Atención a la Comunidad - CAC (Ed. 63)',
    building: 'Edificio 63 - CAC',
    location: 'Lobby de atención institucional',
    schedule: 'Lunes a Viernes 8:00 AM - 6:00 PM',
    lat: 4.63035,
    lng: -74.06520,
    features: ['Personal de seguridad institucional', 'Oficinas de servicio al estudiante'],
    description: 'Punto seguro con alta presencia de personal universitario y facilidad de acceso sobre la Carrera 7ma.',
    recommended: false,
    imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80'
  }
];

function getAllSafeZones() {
  return SAFE_ZONES;
}

function getSafeZoneById(id) {
  return SAFE_ZONES.find(z => z.id === id) || null;
}

function getRecommendedSafeZones() {
  return SAFE_ZONES.filter(z => z.recommended);
}

module.exports = {
  SAFE_ZONES,
  getAllSafeZones,
  getSafeZoneById,
  getRecommendedSafeZones
};
