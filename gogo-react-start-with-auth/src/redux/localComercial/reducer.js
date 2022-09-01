import {
  LOCALCOMERCIAL_IS_LOADED,
  LOCALCOMERCIAL_SET_START_ITEM,
  LOCALCOMERCIAL_SET_END_ITEM,
  LOCALCOMERCIAL_SET_PAGINA_ACTUAL,
  LOCALCOMERCIAL_SET_PAGINAS,
  LOCALCOMERCIAL_SET_ITEMS,
  LOCALCOMERCIAL_SET_TOTAL_ITEMS,
  LOCALCOMERCIAL_SET_ITEMS_POR_PAGINA,
  LOCALCOMERCIAL_ADMINISTRADOR,
} from '../actions';

const INIT_STATE = {
  // VARIABLES PARA MOSTRAR LA LISTA
  isLoaded: false,
  paginaActual: 1,
  itemsPorPagina: 4,
  items: [],
  paginas: 1,
  startItem: 0,
  endItem: 0,
  totalItems: 0,
  //
  administrador: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOCALCOMERCIAL_IS_LOADED:
      return {
        ...state,
        isLoaded: action.payload,
      };
    case LOCALCOMERCIAL_SET_START_ITEM:
      return {
        ...state,
        startItem: action.payload,
      };
    case LOCALCOMERCIAL_SET_END_ITEM:
      return {
        ...state,
        endItem: action.payload,
      };
    case LOCALCOMERCIAL_SET_PAGINA_ACTUAL:
      return {
        ...state,
        paginaActual: action.payload,
      };
    case LOCALCOMERCIAL_SET_PAGINAS:
      return {
        ...state,
        paginas: action.payload,
      };
    case LOCALCOMERCIAL_SET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case LOCALCOMERCIAL_SET_TOTAL_ITEMS:
      return {
        ...state,
        totalItems: action.payload,
      };
    case LOCALCOMERCIAL_SET_ITEMS_POR_PAGINA:
      return {
        ...state,
        itemsPorPagina: action.payload,
      };
    case LOCALCOMERCIAL_ADMINISTRADOR:
      return {
        ...state,
        administrador: action.payload,
      };
    default:
      return { ...state };
  }
};
