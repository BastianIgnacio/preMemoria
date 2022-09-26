import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import localComercial from './localComercial/reducer';
import categorias from './categorias/reducer';
import productos from './productos/reducer';
import ventas from './ventas/reducer';
import ordenes from './ordenes/reducer';
import tienda from './tienda/reducer';
import carrito from './carrito/reducer';

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  localComercial,
  categorias,
  productos,
  ventas,
  ordenes,
  tienda,
  carrito,
});

export default reducers;
