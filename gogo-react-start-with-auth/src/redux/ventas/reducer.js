import {
  VENTA_IS_LOADED,
  VENTA_SET_ITEMS,
  VENTA_SET_TOTAL_ITEMS,
  VENTA_SET_START_ITEM,
  VENTA_SET_END_ITEM,
  VENTA_SET_PAGINA_ACTUAL,
  VENTA_SET_ITEMS_POR_PAGINA,
  VENTA_SET_PAGINAS,
  VENTA_SET_DATE,
  VENTA_SET_PRODUCTOS_VENTA,
  VENTA_SET_ORDEN,
  VENTA_SET_PRODUCTOS_ORDEN,
} from '../actions';

const INIT_STATE = {
  isLoaded: true,
  paginaActual: 1,
  itemsPorPagina: 4,
  items: [],
  fecha: null,
  paginas: 1,
  startItem: 0,
  endItem: 0,
  totalItems: 0,
  productosVenta: [],
  orden: [],
  productosOrden: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case VENTA_IS_LOADED:
      return {
        ...state,
        isLoaded: action.payload,
      };
    case VENTA_SET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case VENTA_SET_TOTAL_ITEMS:
      return {
        ...state,
        totalItems: action.payload,
      };
    case VENTA_SET_START_ITEM:
      return {
        ...state,
        startItem: action.payload,
      };
    case VENTA_SET_END_ITEM:
      return {
        ...state,
        endItem: action.payload,
      };
    case VENTA_SET_PAGINA_ACTUAL:
      return {
        ...state,
        paginaActual: action.payload,
      };
    case VENTA_SET_ITEMS_POR_PAGINA:
      return {
        ...state,
        itemsPorPagina: action.payload,
      };
    case VENTA_SET_PAGINAS:
      return {
        ...state,
        paginas: action.payload,
      };
    case VENTA_SET_DATE:
      return {
        ...state,
        fecha: action.payload,
      };
    case VENTA_SET_PRODUCTOS_VENTA:
      return {
        ...state,
        productosVenta: action.payload,
      };
    case VENTA_SET_ORDEN:
      return {
        ...state,
        orden: action.payload,
      };
    case VENTA_SET_PRODUCTOS_ORDEN:
      return {
        ...state,
        productosOrden: action.payload,
      };
    default:
      return { ...state };
  }
};
