import {
  ADMINLOCALCOMERCIAL_ADD,
  ADMINLOCALCOMERCIAL_CHANGEPAGE,
  ADMINLOCALCOMERCIAL_CHANGEPAGESIZE,
  ADMINLOCALCOMERCIAL_ISLOADED,
  ADMINLOCALCOMERCIAL_REMOVE,
  ADMINLOCALCOMERCIAL_UPDATE,
} from '../actions';

const INIT_STATE = {
  isLoaded: true,
  paginaActual: 1,
  itemsPorPagina: 4,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADMINLOCALCOMERCIAL_ADD:
      // eslint-disable-next-line no-debugger
      return {
        ...state,
      };
    case ADMINLOCALCOMERCIAL_CHANGEPAGE:
      return {
        ...state,
        paginaActual: action.payload,
        isLoaded: true,
      };
    case ADMINLOCALCOMERCIAL_CHANGEPAGESIZE:
      return {
        ...state,
        itemsPorPagina: action.payload,
        isLoaded: true,
      };
    case ADMINLOCALCOMERCIAL_ISLOADED:
      return {
        ...state,
        isLoaded: action.payload,
      };
    case ADMINLOCALCOMERCIAL_REMOVE:
      return {
        ...state,
        isLoaded: action.payload,
      };
    case ADMINLOCALCOMERCIAL_UPDATE:
      return {
        ...state,
        isLoaded: action.payload,
      };
    default:
      return { ...state };
  }
};
