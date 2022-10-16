import {
  TIENDA_IS_LOADED,
  TIENDA_IS_EXIST,
  TIENDA_SET_TIENDA,
  TIENDA_SET_CATEGORIAS,
  TIENDA_SET_CATEGORIA_SELECCIONADA,
  TIENDA_SET_PRODUCTOS,
  TIENDA_SET_PRODUCTO_SELECCIONADO,
  TIENDA_VOLVER_A_CATEGORIAS,
  TIENDA_DETALLE_MODAL,
  TIENDA_CERRAR_MODAL_PRODUCTO,
  TIENDA_CARGAR_PRODUCTOS_CATEGORIA,
} from '../actions';

const INIT_STATE = {
  isLoaded: false,
  tiendaCargada: false,
  productosCargado: false,
  hayProductosVisibles: true,
  //
  modalProducto: false,
  //
  idTienda: null,
  link: '',
  exist: false,
  nombre: '',
  direccion: '',
  telefono: '',
  estado: 'CERRADO',
  abierto: false,
  horarioAtencion: '',
  tieneDelivery: false,
  tieneMercadopago: false,
  //
  categorias: [],
  categoriaSeleccionada: [],
  productos: [],
  mejoresProductos: [],
  //
  productoSeleccionado: [],
  contadorProducto: 0,
  total: 0,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TIENDA_IS_LOADED:
      return {
        ...state,
        isLoaded: action.payload,
      };
    case TIENDA_IS_EXIST:
      return {
        ...state,
        exist: action.payload,
      };
    case TIENDA_SET_TIENDA:
      return {
        ...state,
        nombre: action.payload.nombre,
        direccion: action.payload.direccion,
        estado: action.payload.estado,
        horarioAtencion: action.payload.horarioAtencion,
        tieneDelivery: action.payload.tieneDelivery,
        tieneMercadopago: action.payload.tieneMercadopago,
        isLoaded: action.payload.isLoaded,
        exist: action.payload.exist,
        tiendaCargada: true,
        categorias: action.payload.categorias,
        idTienda: action.payload.idTienda,
        link: action.payload.link,
        telefono: action.payload.telefono,
        mejoresProductos: action.payload.mejoresProductos,
        abierto: action.payload.abierto,
      };
    case TIENDA_SET_CATEGORIAS:
      return {
        ...state,
        categorias: action.payload,
      };
    case TIENDA_SET_CATEGORIA_SELECCIONADA:
      return {
        ...state,
        categoriaSeleccionada: action.payload,
      };
    case TIENDA_SET_PRODUCTOS:
      return {
        ...state,
        productos: action.payload.productos,
        hayProductosVisibles: action.payload.hayProductosVisibles,
        productosCargado: true,
        isLoaded: true,
      };
    case TIENDA_SET_PRODUCTO_SELECCIONADO:
      return {
        ...state,
        productoSeleccionado: action.payload.producto,
        contadorProducto: 1,
        total: action.payload.total,
        modalProducto: true,
      };
    case TIENDA_VOLVER_A_CATEGORIAS:
      return {
        ...state,
        productos: [],
      };
    case TIENDA_DETALLE_MODAL:
      return {
        ...state,
        contadorProducto: action.payload.contadorProducto,
        total: action.payload.total,
      };
    case TIENDA_CERRAR_MODAL_PRODUCTO:
      return {
        ...state,
        modalProducto: false,
      };
    case TIENDA_CARGAR_PRODUCTOS_CATEGORIA:
      return {
        ...state,
        isLoaded: false,
      };

    default:
      return { ...state };
  }
};
