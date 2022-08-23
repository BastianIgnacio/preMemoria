import {
  ORDEN_IS_LOADED,
  ORDEN_SET_ITEMS,
  ORDEN_SET_TOTAL_ITEMS,
  ORDEN_SET_START_ITEM,
  ORDEN_SET_END_ITEM,
  ORDEN_SET_PAGINA_ACTUAL,
  ORDEN_SET_ITEMS_POR_PAGINA,
  ORDEN_SET_PAGINAS,
  ORDEN_SET_ESTADO,
  ORDEN_SET_PRODUCTOS_ORDEN,
  ORDEN_SET_VENTA,
} from '../actions';

const INIT_STATE = {
  isLoaded: false,
  paginaActual: 1,
  itemsPorPagina: 4,
  items: [],
  paginas: 1,
  startItem: 0,
  endItem: 0,
  totalItems: 0,
  estado: null,
  productosOrden: [],
  venta: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ORDEN_IS_LOADED:
      return {
        ...state,
        isLoaded: action.payload,
      };
    case ORDEN_SET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case ORDEN_SET_TOTAL_ITEMS:
      return {
        ...state,
        totalItems: action.payload,
      };
    case ORDEN_SET_START_ITEM:
      return {
        ...state,
        startItem: action.payload,
      };
    case ORDEN_SET_END_ITEM:
      return {
        ...state,
        endItem: action.payload,
      };
    case ORDEN_SET_PAGINA_ACTUAL:
      return {
        ...state,
        paginaActual: action.payload,
      };
    case ORDEN_SET_ITEMS_POR_PAGINA:
      return {
        ...state,
        itemsPorPagina: action.payload,
      };
    case ORDEN_SET_PAGINAS:
      return {
        ...state,
        paginas: action.payload,
      };
    case ORDEN_SET_ESTADO:
      return {
        ...state,
        estado: action.payload,
      };
    case ORDEN_SET_PRODUCTOS_ORDEN:
      return {
        ...state,
        productosOrden: action.payload,
      };
    case ORDEN_SET_VENTA:
      return {
        ...state,
        venta: action.payload,
      };
    default:
      return { ...state };
  }
};
