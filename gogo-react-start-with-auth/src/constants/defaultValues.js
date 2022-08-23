/* eslint-disable prettier/prettier */
export const UserRole = {
  Admin: 0,
  SuperAdmin: 1,
  AdminLocalComercial: 2,
  Comprador: 3,
};
/*
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = 'menu-default';

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = 'es';
export const localeOptions = [
  { id: 'en', name: 'English - LTR', direction: 'ltr' },
  { id: 'es', name: 'Español', direction: 'ltr' },
  { id: 'enrtl', name: 'English - RTL', direction: 'rtl' },
];
export const tiposEntrega = [
  { key: 0, id: 'RETIRO_LOCAL', label: 'RETIRO EN LOCAL' },
  { key: 1, id: 'DELIVERY', label: 'DELIVERY' },
];
export const tiposPago = [
  { key: 0, id: 'EFECTIVO', label: 'EFECTIVO' },
  { key: 1, id: 'DEBITO_CREDITO_POS', label: 'DEBITO O CREDITO POS' },
  { key: 2, id: 'DEBITO_CREDITO_MERCADOPAGO', label: 'MERCADOPAGO ONLINE' },
];
export const estadosPago = [
  { key: 0, id: 'EN_ESPERA_PAGO', label: 'NO PAGADA' },
  { key: 1, id: 'PAGADO', label: 'PAGADA' },
  { key: 2, id: 'CANCELADO', label: 'CANCELADA' },
];
export const estadosVenta = [
  { key: 0, id: 'EN_PROCESO', label: 'FINALIZADA, PERO NO PAGADA' },
  { key: 1, id: 'FINALIZADO', label: 'FINALIZADA Y PAGADA' },
  { key: 2, id: 'CANCELADO', label: 'CANCELADA' },
];
export const estadosOrdenVisualizador = [
  { key: 0, id: 'EN_COLA', label: 'EN COLA' },
  { key: 1, id: 'EN_PREPARACION', label: 'EN PREPARACIÓN ' },
  { key: 2, id: 'EN_REPARTO', label: 'EN REPARTO (DELIVERY)' },
  { key: 3, id: 'EN_ESPERA_RETIRO', label: 'EN ESPERA DE RETIRO' },
];
export const estadosOrden = [
  { key: 0, id: 'EN_COLA', label: 'EN COLA' },
  { key: 1, id: 'EN_PREPARACION', label: 'EN PREPARACIÓN ' },
  { key: 2, id: 'EN_REPARTO', label: 'EN REPARTO (DELIVERY)' },
  { key: 3, id: 'EN_ESPERA_RETIRO', label: 'EN ESPERA DE RETIRO' },
  { key: 4, id: 'CANCELADO', label: 'ORDEN CANCELADA' },
];

export const firebaseConfig = {
  apiKey: 'AIzaSyBBksq-Asxq2M4Ot-75X19IyrEYJqNBPcg',
  authDomain: 'gogo-react-login.firebaseapp.com',
  databaseURL: 'https://gogo-react-login.firebaseio.com',
  projectId: 'gogo-react-login',
  storageBucket: 'gogo-react-login.appspot.com',
  messagingSenderId: '216495999563',
};

export const apiRestUrl = 'http://127.0.0.1:8000/api';
export const apiMediaUrl = 'http://127.0.0.1:8000';

export const adminRoot = '/app';
export const superAdminRoot = '/app/localesComerciales';
export const adminLocalComercialRoot = '/app/categorias';
export const errorRoot = '/error';
export const loginRoot = '/user/login';
export const carritoRoot = '/carrito';
export const tiendaRoot = '/tienda';
export const buyUrl = 'https://1.envato.market/k4z0';
export const searchPath = `${adminRoot}/#`;
export const servicePath = 'https://api.coloredstrategies.com';
/*
export const currentUser = {
  id: 1,
  title: 'Saraasaah Korfgftney',
  img: '/assets/img/profiles/l-1.jpg',
  date: 'Last seen today 15:24',
  role: UserRole.SuperAdmin,
};
*/
export const themeColorStorageKey = '__theme_selected_color';
export const isMultiColorActive = true;
export const defaultColor = 'light.purplemonster';
export const isDarkSwitchActive = false;
export const defaultDirection = 'ltr';
export const themeRadiusStorageKey = '__theme_radius';
export const isAuthGuardActive = true;
export const colors = [
  'bluenavy',
  'blueyale',
  'blueolympic',
  'greenmoss',
  'greenlime',
  'purplemonster',
  'orangecarrot',
  'redruby',
  'yellowgranola',
  'greysteel',
];

export const regionesChile = [
  {
    "region": "Arica y Parinacota",
    "numero": "XV",
    "comunas": [
      "Arica",
      "Camarones",
      "General Lagos",
      "Putre"
    ]
  },
  {
    "region": "Tarapacá",
    "numero": "I",
    "comunas": [
      "Alto Hospicio",
      "Camiña",
      "Colchane",
      "Huara",
      "Iquique",
      "Pica",
      "Pozo Almonte"
    ]
  },
  {
    "region": "Antofagasta",
    "numero": "II",
    "comunas": [
      "Antofagasta",
      "Calama",
      "María Elena",
      "Mejillones",
      "Ollagüe",
      "San Pedro de Atacama",
      "Sierra Gorda",
      "Taltal",
      "Tocopilla"
    ]
  },
  {
    "region": "Atacama",
    "numero": "III",
    "comunas": [
      "Alto del Carmen",
      "Caldera",
      "Chañaral",
      "Copiapó",
      "Diego de Almagro",
      "Freirina",
      "Huasco",
      "Tierra Amarilla",
      "Vallenar"
    ]
  },
  {
    "region": "Coquimbo",
    "numero": "IV",
    "comunas": [
      "Andacollo",
      "Canela",
      "Combarbalá",
      "Coquimbo",
      "Illapel",
      "La Higuera",
      "La Serena",
      "Los Vilos",
      "Monte Patria",
      "Ovalle",
      "Paiguano",
      "Punitaqui",
      "Río Hurtado",
      "Salamanca",
      "Vicuña"
    ]
  },
  {
    "region": "Valparaíso",
    "numero": "V",
    "comunas": [
      "Algarrobo",
      "Cabildo",
      "Calera",
      "Calle Larga",
      "Cartagena",
      "Casablanca",
      "Catemu",
      "Concón",
      "El Quisco",
      "El Tabo",
      "Hijuelas",
      "Isla de Pascua",
      "Juan Fernández",
      "La Cruz",
      "La Ligua",
      "Limache",
      "Llaillay",
      "Los Andes",
      "Nogales",
      "Olmué",
      "Panquehue",
      "Papudo",
      "Petorca",
      "Puchuncaví",
      "Putaendo",
      "Quillota",
      "Quilpué",
      "Quintero",
      "Rinconada",
      "San Antonio",
      "San Esteban",
      "San Felipe",
      "Santa María",
      "Santo Domingo",
      "Valparaíso",
      "Villa Alemana",
      "Viña del Mar",
      "Zapallar"
    ]
  },
  {
    "region": "Metropolitana de Santiago",
    "numero": "MET",
    "comunas": [
      "Alhué",
      "Buin",
      "Calera de Tango",
      "Cerrillos",
      "Cerro Navia",
      "Colina",
      "Conchalí",
      "Curacaví",
      "El Bosque",
      "El Monte",
      "Estación Central",
      "Huechuraba",
      "Independencia",
      "Isla de Maipo",
      "La Cisterna",
      "La Florida",
      "La Granja",
      "La Pintana",
      "La Reina",
      "Lampa",
      "Las Condes",
      "Lo Barnechea",
      "Lo Espejo",
      "Lo Prado",
      "Macul",
      "Maipú",
      "María Pinto",
      "Melipilla",
      "Ñuñoa",
      "Padre Hurtado",
      "Paine",
      "Pedro Aguirre Cerda",
      "Peñaflor",
      "Peñalolén",
      "Pirque",
      "Providencia",
      "Pudahuel",
      "Puente Alto",
      "Quilicura",
      "Quinta Normal",
      "Recoleta",
      "Renca",
      "San Bernardo",
      "San Joaquín",
      "San José de Maipo",
      "San Miguel",
      "San Pedro",
      "San Ramón",
      "Santiago",
      "Talagante",
      "Tiltil",
      "Vitacura"
    ]
  },
  {
    "region": "Libertador Gral. Bernardo O’Higgins",
    "numero": "VI",
    "comunas": [
      "Chimbarongo",
      "Chépica",
      "Codegua",
      "Coinco",
      "Coltauco",
      "Doñihue",
      "Graneros",
      "La Estrella",
      "Las Cabras",
      "Litueche",
      "Lolol",
      "Machalí",
      "Malloa",
      "Marchihue",
      "Nancagua",
      "Navidad",
      "Olivar",
      "Palmilla",
      "Paredones",
      "Peralillo",
      "Peumo",
      "Pichidegua",
      "Pichilemu",
      "Placilla",
      "Pumanque",
      "Quinta de Tilcoco",
      "Rancagua",
      "Rengo",
      "Requínoa",
      "San Fernando",
      "San Francisco de Mostazal",
      "San Vicente de Tagua Tagua",
      "Santa Cruz"
    ]
  },
  {
    "region": "Maule",
    "numero": "VII",
    "comunas": [
      "Cauquenes",
      "Chanco",
      "Colbún",
      "Constitución",
      "Curepto",
      "Curicó",
      "Empedrado",
      "Hualañé",
      "Licantén",
      "Linares",
      "Longaví",
      "Maule",
      "Molina",
      "Parral",
      "Pelarco",
      "Pelluhue",
      "Pencahue",
      "Rauco",
      "Retiro",
      "Romeral",
      "Río Claro",
      "Sagrada Familia",
      "San Clemente",
      "San Javier de Loncomilla",
      "San Rafael",
      "Talca",
      "Teno",
      "Vichuquén",
      "Villa Alegre",
      "Yerbas Buenas"
    ]
  },
  {
    "region": "Ñuble",
    "numero": "XVI",
    "comunas": [
      "Bulnes",
      "Chillán Viejo",
      "Chillán",
      "Cobquecura",
      "Coelemu",
      "Coihueco",
      "El Carmen",
      "Ninhue",
      "Ñiquén",
      "Pemuco",
      "Pinto",
      "Portezuelo",
      "Quillón",
      "Quirihue",
      "Ránquil",
      "San Carlos",
      "San Fabián",
      "San Ignacio",
      "San Nicolás",
      "Treguaco",
      "Yungay"
    ]
  },
  {
    "region": "Biobío",
    "numero": "VIII",
    "comunas": [
      "Alto Biobío",
      "Antuco",
      "Arauco",
      "Cabrero",
      "Cañete",
      "Chiguayante",
      "Concepción",
      "Contulmo",
      "Coronel",
      "Curanilahue",
      "Florida",
      "Hualpén",
      "Hualqui",
      "Laja",
      "Lebu",
      "Los Álamos",
      "Los Ángeles",
      "Lota",
      "Mulchén",
      "Nacimiento",
      "Negrete",
      "Penco",
      "Quilaco",
      "Quilleco",
      "San Pedro de la Paz",
      "San Rosendo",
      "Santa Bárbara",
      "Santa Juana",
      "Talcahuano",
      "Tirúa",
      "Tomé",
      "Tucapel",
      "Yumbel"
    ]
  },
  {
    "region": "Araucanía",
    "numero": "IX",
    "comunas": [
      "Angol",
      "Carahue",
      "Cholchol",
      "Collipulli",
      "Cunco",
      "Curacautín",
      "Curarrehue",
      "Ercilla",
      "Freire",
      "Galvarino",
      "Gorbea",
      "Lautaro",
      "Loncoche",
      "Lonquimay",
      "Los Sauces",
      "Lumaco",
      "Melipeuco",
      "Nueva Imperial",
      "Padre las Casas",
      "Perquenco",
      "Pitrufquén",
      "Pucón",
      "Purén",
      "Renaico",
      "Saavedra",
      "Temuco",
      "Teodoro Schmidt",
      "Toltén",
      "Traiguén",
      "Victoria",
      "Vilcún",
      "Villarrica"
    ]
  },
  {
    "region": "Los Ríos",
    "numero": "XIV",
    "comunas": [
      "Corral",
      "Futrono",
      "La Unión",
      "Lago Ranco",
      "Lanco",
      "Los Lagos",
      "Mariquina",
      "Máfil",
      "Paillaco",
      "Panguipulli",
      "Río Bueno",
      "Valdivia"
    ]
  },
  {
    "region": "Los Lagos",
    "numero": "X",
    "comunas": [
      "Ancud",
      "Calbuco",
      "Castro",
      "Chaitén",
      "Chonchi",
      "Cochamó",
      "Curaco de Vélez",
      "Dalcahue",
      "Fresia",
      "Frutillar",
      "Futaleufú",
      "Hualaihué",
      "Llanquihue",
      "Los Muermos",
      "Maullín",
      "Osorno",
      "Palena",
      "Puerto Montt",
      "Puerto Octay",
      "Puerto Varas",
      "Puqueldón",
      "Purranque",
      "Puyehue",
      "Queilén",
      "Quellón",
      "Quemchi",
      "Quinchao",
      "Río Negro",
      "San Juan de la Costa",
      "San Pablo"
    ]
  },
  {
    "region": "Aisén del Gral. Carlos Ibáñez del Campo",
    "numero": "XI",
    "comunas": [
      "Aisén",
      "Chile Chico",
      "Cisnes",
      "Cochrane",
      "Coihaique",
      "Guaitecas",
      "Lago Verde",
      "O’Higgins",
      "Río Ibáñez",
      "Tortel"
    ]
  },
  {
    "region": "Magallanes y de la Antártica Chilena",
    "numero": "XII",
    "comunas": [
      "Antártica",
      "Cabo de Hornos (Ex Navarino)",
      "Laguna Blanca",
      "Natales",
      "Porvenir",
      "Primavera",
      "Punta Arenas",
      "Río Verde",
      "San Gregorio",
      "Timaukel",
      "Torres del Paine"
    ]
  }
];
