// eslint-disable-next-line import/no-cycle
import { ADMINLOCALCOMERCIAL_ADD } from '../actions';

// eslint-disable-next-line import/prefer-default-export
export const addAdminLocalComercial = (adminLocalComercial) => ({
  type: ADMINLOCALCOMERCIAL_ADD,
  payload: adminLocalComercial,
});
