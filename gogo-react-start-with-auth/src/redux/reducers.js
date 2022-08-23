import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import todoApp from './todo/reducer';
import chatApp from './chat/reducer';
import surveyListApp from './surveyList/reducer';
import surveyDetailApp from './surveyDetail/reducer';
import localComercial from './localComercial/reducer';
import administradorLocalComercial from './adminLocalComercial/reducer';
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
  todoApp,
  chatApp,
  surveyListApp,
  surveyDetailApp,
  localComercial,
  administradorLocalComercial,
  categorias,
  productos,
  ventas,
  ordenes,
  tienda,
  carrito,
});

export default reducers;
