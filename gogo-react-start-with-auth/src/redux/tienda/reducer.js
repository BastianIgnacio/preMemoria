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
} from '../actions';

const INIT_STATE = {
  isLoaded: false,
  tiendaCargada: false,
  //
  idTienda: null,
  exist: false,
  nombre: '',
  direccion: '',
  estado: 'CERRADO',
  horarioAtencion: '',
  tieneDelivery: false,
  tieneMercadopago: false,
  //
  mostrarBotonAtras: false,
  mostrarProductos: false,
  //
  categorias: [],
  categoriaSeleccionada: null,
  productos: [],
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
        productos: action.payload,
        mostrarBotonAtras: true,
        mostrarProductos: true,
      };
    case TIENDA_SET_PRODUCTO_SELECCIONADO:
      return {
        ...state,
        productoSeleccionado: action.payload.producto,
        contadorProducto: 1,
        total: action.payload.total,
      };
    case TIENDA_VOLVER_A_CATEGORIAS:
      return {
        ...state,
        productos: [],
        mostrarBotonAtras: false,
        mostrarProductos: false,
      };
    case TIENDA_DETALLE_MODAL:
      return {
        ...state,
        contadorProducto: action.payload.contadorProducto,
        total: action.payload.total,
      };
    default:
      return { ...state };
  }
};
