import { CARRITO_ADD_NEW_PRODUCT } from '../actions';

const INIT_STATE = {
  carrito: [],
  fecha: 'hoy',
  tipoEntrega: 'Retiro en local',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CARRITO_ADD_NEW_PRODUCT:
      // eslint-disable-next-line no-debugger
      return {
        ...state,
        carrito: [...state.carrito, action.payload],
      };
    default:
      return { ...state };
  }
};
