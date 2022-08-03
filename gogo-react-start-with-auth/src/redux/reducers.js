import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import todoApp from './todo/reducer';
import chatApp from './chat/reducer';
import surveyListApp from './surveyList/reducer';
import surveyDetailApp from './surveyDetail/reducer';
import tiendaApp from './tienda/reducer';
import carroApp from './carrito/reducer';
import localComercial from './localComercial/reducer';
import administradorLocalComercial from './adminLocalComercial/reducer';
import categorias from './categorias/reducer';
import productos from './productos/reducer';

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  todoApp,
  chatApp,
  surveyListApp,
  surveyDetailApp,
  tiendaApp,
  carroApp,
  localComercial,
  administradorLocalComercial,
  categorias,
  productos,
});

export default reducers;
