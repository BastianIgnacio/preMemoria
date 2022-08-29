import {
  CARRITO_CARGAR_CARRITO,
  CARRITO_IS_LOADED,
  CARRITO_CARGAR_METODOS_PAGO,
  CARRITO_CARGAR_METODOS_ENTREGA,
  CARRITO_SUCCESS,
  CARRITO_CARGAR_CARRITO_SUM_RES,
  CARRITO_PRODUCTO_ELIMINAR,
} from '../actions';

const INIT_STATE = {
  success: false,
  ordenSuccess: [],
  arrayOrdenSuccess: [],
  fechaSuccess: '',
  horaSuccess: '',
  //
  isLoaded: false,
  //
  carritoCargado: false,
  exist: false,
  //
  idTienda: null,
  link: '',
  arrayCarrito: [],
  productoParaEliminar: [],
  //
  contadorProducto: 0,
  total: 0,

  // METODOS DE ENTREGA
  tieneDelivery: false,
  tieneRetiroLocal: false,

  // METODOS DE PAGO QUE ACEPTA EL LOCAL COMERCIAL
  pagoRetiroLocalEfectivo: false,
  pagoRetiroLocalPos: false,
  pagoRetiroLocalMercadopago: false,
  pagoDeliveryEfectivo: false,
  pagoDeliveryPos: false,
  pagoDeliveryMercadopago: false,

  // CONSTANTES
  // Variables para el select del tiempo para opcion retiro el local
  dataRetiroEnLocal: [
    { label: 'Lo antes posible', value: 0, key: 0 },
    { label: 'En 15 a 30 minutos', value: 1, key: 1 },
    { label: 'En 30 a 40 minutos', value: 2, key: 2 },
    { label: 'En 40 a 50 minutos', value: 3, key: 3 },
    { label: 'En 50 a 60 minutos', value: 4, key: 4 },
    { label: 'En 60 a 90 minutos', value: 5, key: 5 },
    { label: 'En 90 a 120 minutos', value: 6, key: 6 },
  ],
  dataDelivery: [
    { label: 'Lo antes posible', value: 0, key: 0 },
    { label: 'En 30 a 60 minutos', value: 1, key: 1 },
    { label: 'En 60 a 90 minutos', value: 2, key: 2 },
    { label: 'En 90 a 120 minutos', value: 3, key: 3 },
    { label: 'En 120 a 150 minutos', value: 4, key: 4 },
  ],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CARRITO_IS_LOADED:
      return {
        ...state,
        isLoaded: action.payload,
      };
    case CARRITO_CARGAR_CARRITO:
      return {
        ...state,
        idTienda: action.payload.idTienda,
        arrayCarrito: action.payload.arrayCarrito,
        total: action.payload.total,
        link: action.payload.link,
        isLoaded: true,
        carritoCargado: true,
        exist: true,
      };
    case CARRITO_CARGAR_METODOS_PAGO:
      return {
        ...state,
        pagoRetiroLocalEfectivo: action.payload.pagoRetiroLocalEfectivo,
        pagoRetiroLocalPos: action.payload.pagoRetiroLocalPos,
        pagoRetiroLocalMercadopago: action.payload.pagoRetiroLocalMercadopago,
        pagoDeliveryEfectivo: action.payload.pagoDeliveryEfectivo,
        pagoDeliveryPos: action.payload.pagoDeliveryPos,
        pagoDeliveryMercadopago: action.payload.pagoDeliveryMercadopago,
      };
    case CARRITO_CARGAR_METODOS_ENTREGA:
      return {
        ...state,
        tieneDelivery: action.payload.tieneDelivery,
        tieneRetiroLocal: action.payload.tieneRetiroLocal,
      };
    case CARRITO_CARGAR_CARRITO_SUM_RES:
      return {
        ...state,
        arrayCarrito: action.payload.arrayCarrito,
        total: action.payload.total,
        isLoaded: true,
        carritoCargado: true,
        exist: true,
      };
    case CARRITO_SUCCESS:
      return {
        ...state,
        success: true,
        ordenSuccess: action.payload.ordenSuccess,
        arrayOrdenSuccess: action.payload.arrayOrdenSuccess,
        fechaSuccess: action.payload.fechaSuccess,
        horaSuccess: action.payload.horaSuccess,
        arrayCarrito: [],
        isLoaded: true,
        carritoCargado: true,
        exist: true,
        tieneDelivery: false,
        tieneRetiroLocal: false,
        pagoRetiroLocalEfectivo: false,
        pagoRetiroLocalPos: false,
        pagoRetiroLocalMercadopago: false,
        pagoDeliveryEfectivo: false,
        pagoDeliveryPos: false,
        pagoDeliveryMercadopago: false,
        contadorProducto: 0,
        total: 0,
      };
    case CARRITO_PRODUCTO_ELIMINAR:
      return {
        ...state,
        productoParaEliminar: action.payload,
      };

    default:
      return { ...state };
  }
};
