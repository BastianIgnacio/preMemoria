import {
  ADMINLOCALCOMERCIAL_ADD,
  ADMINLOCALCOMERCIAL_ISLOADED,
  ADMINLOCALCOMERCIAL_SET_ITEMS,
  ADMINLOCALCOMERCIAL_SET_TOTAL_ITEMS,
  ADMINLOCALCOMERCIAL_SET_START_ITEM,
  ADMINLOCALCOMERCIAL_SET_END_ITEM,
  ADMINLOCALCOMERCIAL_SET_PAGINA_ACTUAL,
  ADMINLOCALCOMERCIAL_SET_PAGINAS,
  ADMINLOCALCOMERCIAL_SET_ITEM_POR_PAGINA,
  ADMINLOCALCOMERCIAL_SET_PRIMERA_CARGA,
  ADMINLOCALCOMERCIAL_RESET,
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
    case ADMINLOCALCOMERCIAL_ADD:
      // eslint-disable-next-line no-debugger
      return {
        ...state,
      };
    case ADMINLOCALCOMERCIAL_ISLOADED:
      return {
        ...state,
        isLoaded: action.payload,
      };
    case ADMINLOCALCOMERCIAL_SET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case ADMINLOCALCOMERCIAL_SET_TOTAL_ITEMS:
      return {
        ...state,
        totalItems: action.payload,
      };
    case ADMINLOCALCOMERCIAL_SET_START_ITEM:
      return {
        ...state,
        startItem: action.payload,
      };
    case ADMINLOCALCOMERCIAL_SET_END_ITEM:
      return {
        ...state,
        endItem: action.payload,
      };
    case ADMINLOCALCOMERCIAL_SET_PAGINA_ACTUAL:
      return {
        ...state,
        paginaActual: action.payload,
      };
    case ADMINLOCALCOMERCIAL_SET_ITEM_POR_PAGINA:
      return {
        ...state,
        itemsPorPagina: action.payload,
      };
    case ADMINLOCALCOMERCIAL_SET_PRIMERA_CARGA:
      return {
        ...state,
        primeraCarga: action.payload,
      };
    case ADMINLOCALCOMERCIAL_SET_PAGINAS:
      return {
        ...state,
        paginas: action.payload,
      };
    case ADMINLOCALCOMERCIAL_RESET:
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
