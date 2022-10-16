import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  LOGIN_TIENDA_SUCCESS,
  CARGAR_DATOS_TIENDA,
  TIENDA_UPDATE,
  CLICK_CARGAR_DATOS_TIENDA,
} from '../actions';
import { getCurrentUser, getCurrentTienda } from '../../helpers/Utils';

const INIT_STATE = {
  currentUser: getCurrentUser(),
  // Variables Redux para la configuracion de la tienda
  tienda: getCurrentTienda(),
  configuracionTiendaLoading: true,
  forgotUserMail: '',
  newPassword: '',
  resetPasswordCode: '',
  loading: false,
  error: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        error: '',
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        loading: false,
        currentUser: null,
        error: action.payload.message,
      };
    case FORGOT_PASSWORD:
      return { ...state, loading: true, error: '' };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        forgotUserMail: action.payload,
        error: '',
      };
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        forgotUserMail: '',
        error: action.payload.message,
      };
    case RESET_PASSWORD:
      return { ...state, loading: true, error: '' };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        newPassword: action.payload,
        resetPasswordCode: '',
        error: '',
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        newPassword: '',
        resetPasswordCode: '',
        error: action.payload.message,
      };
    case REGISTER_USER:
      return { ...state, loading: true, error: '' };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        error: '',
      };
    case REGISTER_USER_ERROR:
      return {
        ...state,
        loading: false,
        currentUser: null,
        error: action.payload.message,
      };
    case LOGOUT_USER:
      return { ...state, currentUser: null, error: '' };
    case LOGIN_TIENDA_SUCCESS:
      return {
        ...state,
        loading: false,
        tienda: action.payload,
        configuracionTiendaLoading: false,
        error: '',
      };
    case CARGAR_DATOS_TIENDA:
      return {
        ...state,
        tienda: action.payload,
        configuracionTiendaLoading: false,
        error: '',
      };
    case TIENDA_UPDATE:
      return {
        ...state,
        configuracionTiendaLoading: true,
      };
    case CLICK_CARGAR_DATOS_TIENDA:
      return {
        ...state,
        configuracionTiendaLoading: true,
      };
    default:
      return { ...state };
  }
};
