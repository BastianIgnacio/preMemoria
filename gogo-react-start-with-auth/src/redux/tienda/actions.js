// eslint-disable-next-line import/no-cycle
import { TIENDA_LIST_GET_PRODUCTS } from '../actions';

// eslint-disable-next-line import/prefer-default-export
export const getTiendaList = () => ({
  type: TIENDA_LIST_GET_PRODUCTS,
});
