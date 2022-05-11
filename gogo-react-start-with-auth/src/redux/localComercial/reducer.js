import {
  LOCALCOMERCIAL_ADD,
  LOCALCOMERCIALS_CHANGEPAGE,
  LOCALCOMERCIALS_CHANGEPAGESIZE,
  LOCALCOMERCIALS_ISLOADED,
  LOCALCOMERCIAL_UPDATE,
  LOCALCOMERCIALS_GETADMINSDISPONIBLES,
  LOCALCOMERCIALS_SETADMINSDISPONIBLES,
} from '../actions';

const INIT_STATE = {
  isLoaded: false,
  paginaActual: 1,
  itemsPorPagina: 4,
  admins: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOCALCOMERCIAL_ADD:
      // eslint-disable-next-line no-debugger
      return {
        ...state,
      };
    case LOCALCOMERCIALS_CHANGEPAGE:
      return {
        ...state,
        paginaActual: action.payload,
        isLoaded: true,
      };
    case LOCALCOMERCIALS_CHANGEPAGESIZE:
      return {
        ...state,
        itemsPorPagina: action.payload,
        isLoaded: true,
      };
    case LOCALCOMERCIALS_ISLOADED:
      return {
        ...state,
        isLoaded: action.payload,
      };
    case LOCALCOMERCIAL_UPDATE:
      return {
        ...state,
      };
    case LOCALCOMERCIALS_GETADMINSDISPONIBLES:
      return {
        ...state,
      };
    case LOCALCOMERCIALS_SETADMINSDISPONIBLES:
      return {
        ...state,
        admins: action.payload,
      };
    default:
      return { ...state };
  }
};
