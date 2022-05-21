import {
  LOCALCOMERCIAL_ADD,
  LOCALCOMERCIALS_CHANGEPAGE,
  LOCALCOMERCIALS_CHANGEPAGESIZE,
  LOCALCOMERCIALS_ISLOADED,
  LOCALCOMERCIAL_UPDATE,
  LOCALCOMERCIALS_SETADMINSDISPONIBLES,
  LOCALCOMERCIALS_UPDATE_ITEMS,
  LOCALCOMERCIALS_SET_TOTAL_ITEMS,
  LOCALCOMERCIAL_SET_TOTAL_PAGINAS,
  LOCALCOMERCIALS_SET_ITEMS,
  LOCALCOMERCIAL_SET_START_ITEM,
  LOCALCOMERCIAL_SET_END_ITEM,
  LOCALCOMERCIAL_BEFORE_UPDATE,
  LOCALCOMERCIAL_AFTER_UPDATE,
  LOCALCOMERCIAL_RESET_ITEMS,
  LOCALCOMERCIALS_SET_ADMIN_ASIGNAR,
  LOCALCOMERCIALS_SET_PRIMERA_CARGA_ADMIN,
} from '../actions';

const INIT_STATE = {
  isLoaded: true,
  primeraCarga: true,
  totalItems: 0,
  items: [],
  paginas: 0,
  paginaActual: 1,
  itemsPorPagina: 4,
  startItem: 0,
  endItem: 0,
  primeraCargaAdmins: true,
  admins: [],
  refAdministradorAsignar: 0,
  nombresAsignar: 'reducer',
  apellidosAsignar: 'reducerApelldio',
  telefonoAsignar: 'reducerTelefono',
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
      };
    case LOCALCOMERCIALS_CHANGEPAGESIZE:
      return {
        ...state,
        itemsPorPagina: action.payload,
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
    case LOCALCOMERCIALS_SETADMINSDISPONIBLES:
      return {
        ...state,
        admins: action.payload,
      };
    case LOCALCOMERCIALS_UPDATE_ITEMS:
      return {
        ...state,
        itemsPorPagina: action.payload.itemsPorPagina,
        paginaActual: action.payload.paginaActual,
        primeraCarga: action.payload.primeraCarga,
      };
    case LOCALCOMERCIALS_SET_TOTAL_ITEMS:
      return {
        ...state,
        totalItems: action.payload,
      };
    case LOCALCOMERCIAL_SET_TOTAL_PAGINAS:
      return {
        ...state,
        paginas: action.payload,
      };
    case LOCALCOMERCIALS_SET_ITEMS:
      return {
        ...state,
        items: action.payload,
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
    case LOCALCOMERCIAL_BEFORE_UPDATE:
      return {
        ...state,
        isLoaded: action.payload,
      };
    case LOCALCOMERCIAL_AFTER_UPDATE:
      return {
        ...state,
        isLoaded: action.payload,
      };
    case LOCALCOMERCIAL_RESET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case LOCALCOMERCIALS_SET_ADMIN_ASIGNAR:
      return {
        ...state,
        refAdministradorAsignar: action.payload.refAdministradorAsignar,
        nombresAsignar: action.payload.nombresAsignar,
        apellidosAsignar: action.payload.apellidosAsignar,
        telefonoAsignar: action.payload.telefonoAsignar,
      };
    case LOCALCOMERCIALS_SET_PRIMERA_CARGA_ADMIN:
      return {
        ...state,
        primeraCargaAdmins: action.payload,
      };
    default:
      return { ...state };
  }
};
