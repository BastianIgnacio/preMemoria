import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import localComercialSagas from './localComercial/saga';
import categoriasSaga from './categorias/saga';
import productosSaga from './productos/saga';
import ventasSaga from './ventas/saga';
import ordenesSaga from './ordenes/saga';
import tiendaSaga from './tienda/saga';
import carritoSaga from './carrito/saga';

export default function* rootSaga() {
  yield all([
    authSagas(),
    localComercialSagas(),
    categoriasSaga(),
    productosSaga(),
    ventasSaga(),
    ordenesSaga(),
    tiendaSaga(),
    carritoSaga(),
  ]);
}
