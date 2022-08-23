import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import todoSagas from './todo/saga';
import chatSagas from './chat/saga';
import surveyListSagas from './surveyList/saga';
import surveyDetailSagas from './surveyDetail/saga';
import localComercialSagas from './localComercial/saga';
import adminLocalComercialSagas from './adminLocalComercial/saga';
import categoriasSaga from './categorias/saga';
import productosSaga from './productos/saga';
import ventasSaga from './ventas/saga';
import ordenesSaga from './ordenes/saga';
import tiendaSaga from './tienda/saga';
import carritoSaga from './carrito/saga';

export default function* rootSaga() {
  yield all([
    authSagas(),
    todoSagas(),
    chatSagas(),
    surveyListSagas(),
    surveyDetailSagas(),
    localComercialSagas(),
    adminLocalComercialSagas(),
    categoriasSaga(),
    productosSaga(),
    ventasSaga(),
    ordenesSaga(),
    tiendaSaga(),
    carritoSaga(),
  ]);
}
