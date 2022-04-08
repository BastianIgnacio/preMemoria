// eslint-disable-next-line import/no-cycle
import { CARRITO_ADD_NEW_PRODUCT } from '../actions';

// eslint-disable-next-line import/prefer-default-export
export const addNewProductCarrito = (product) => ({
  type: CARRITO_ADD_NEW_PRODUCT,
  payload: product,
});
