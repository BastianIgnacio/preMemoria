import {
  CATEGORIA_ADD,
  CATEGORIA_IS_LOADED,
  CATEGORIA_SET_ITEMS,
  CATEGORIA_SET_TOTAL_ITEMS,
  CATEGORIA_SET_START_ITEM,
  CATEGORIA_SET_END_ITEM,
  CATEGORIA_SET_PAGINA_ACTUAL,
  CATEGORIA_SET_ITEMS_POR_PAGINA,
  CATEGORIA_SET_PRIMERA_CARGA,
  CATEGORIA_SET_PAGINAS,
  CATEGORIA_RESET,
} from '../actions';

const INIT_STATE = {
  isLoaded: false,
  primeraCarga: true,
  paginaActual: 1,
  itemsPorPagina: 4,
  items: [],
  paginas: 1,
  startItem: 0,
  endItem: 0,
  totalItems: 0,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CATEGORIA_ADD:
      return {
        ...state,
      };
    case CATEGORIA_IS_LOADED:
      return {
        ...state,
        isLoaded: action.payload,
      };
    case CATEGORIA_SET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case CATEGORIA_SET_TOTAL_ITEMS:
      return {
        ...state,
        totalItems: action.payload,
      };
    case CATEGORIA_SET_START_ITEM:
      return {
        ...state,
        startItem: action.payload,
      };
    case CATEGORIA_SET_END_ITEM:
      return {
        ...state,
        endItem: action.payload,
      };
    case CATEGORIA_SET_PAGINA_ACTUAL:
      return {
        ...state,
        paginaActual: action.payload,
      };
    case CATEGORIA_SET_ITEMS_POR_PAGINA:
      return {
        ...state,
        itemsPorPagina: action.payload,
      };
    case CATEGORIA_SET_PRIMERA_CARGA:
      return {
        ...state,
        primeraCarga: action.payload,
      };
    case CATEGORIA_SET_PAGINAS:
      return {
        ...state,
        paginas: action.payload,
      };
    case CATEGORIA_RESET:
      return {
        ...state,
        paginas: 1,
        itemsPorPagina: 1,
        items: [],
        totalItems: 0,
        startItem: 1,
        endItem: 1,
        isLoaded: false,
      };
    default:
      return { ...state };
  }
};
