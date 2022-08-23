/* eslint-disable no-unused-vars */
import { all, call, fork, takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { apiRestUrl } from '../../constants/defaultValues';
import { NotificationManager } from '../../components/common/react-notifications';

import {
  TIENDA_IS_LOADED,
  TIENDA_IS_EXIST,
  TIENDA_SET_IDTIENDA,
  TIENDA_SET_CATEGORIAS,
  TIENDA_SET_CATEGORIA_SELECCIONADA,
  TIENDA_SET_PRODUCTOS,
  TIENDA_SET_PRODUCTO_SELECCIONADO,
  //
  TIENDA_CARGAR_TIENDA,
  TIENDA_SET_TIENDA,
  TIENDA_CARGAR_PRODUCTOS_CATEGORIA,
} from '../actions';

/** NOTIFICACIONES  */
const notificacionError = (titulo, subtitulo) => {
  NotificationManager.error(titulo, subtitulo, 4000, null, null, 'filled');
};
const notificacionSuccess = (titulo, subtitulo) => {
  NotificationManager.success(titulo, subtitulo, 4000, null, null, 'filled');
};

//* * LLAMADAS AXIOS POST, DELETE, PUT, GET */

// DELETE para eliminar un producto de una categoria
const deleteProductoAsync = async (idProducto) =>
  axios.delete(`${apiRestUrl}/productoCategorias/${idProducto}/`);
// PUT para editar una categoria
const putProductoAsync = async (idProducto, producto) =>
  axios.put(`${apiRestUrl}/productoCategorias/${idProducto}/`, producto);

// GET para obtener una tienda en base al link
const getOrdenAsync = async (link) => {
  return axios
    .get(`${apiRestUrl}/localComercials/?link=${link}`)
    .then((res) => {
      return res.data;
    });
};
// GET para obtener una tienda en base al link
const getCategoriasAsync = async (refLocalComercial) => {
  return axios
    .get(`${apiRestUrl}/categorias/?refLocalComercial=${refLocalComercial}`)
    .then((res) => {
      return res.data;
    });
};

// GET para obtener los productos de una categoria
const getProductosAsync = async (refCategoria) => {
  return axios
    .get(`${apiRestUrl}/productoCategorias/?refCategoria=${refCategoria}`)
    .then((res) => {
      return res.data;
    });
};

//* * FUNCIONES */
// Funcion para actualizar los items que se muestran
// Funcion para CARGAR LA TIENDA
function* cargarTienda({ payload }) {
  const linkTienda = payload;
  try {
    const data = yield call(getOrdenAsync, linkTienda);
    const { results } = data;
    // NO EXISTE LA TIENDA
    if (results.length === 0) {
      yield put({
        type: TIENDA_IS_EXIST,
        payload: false,
      });
      yield put({
        type: TIENDA_IS_LOADED,
        payload: true,
      });
    } else {
      const tienda = results[0];
      const dataCategorias = yield call(getCategoriasAsync, tienda.id);
      yield put({
        type: TIENDA_SET_TIENDA,
        payload: {
          nombre: tienda.nombre,
          direccion: tienda.direccion,
          estado: tienda.estado,
          horarioAtencion: tienda.horarioAtencion,
          tieneDelivery: tienda.tieneDelivery,
          tieneMercadopago: tienda.tieneMercadopago,
          isLoaded: true,
          exist: true,
          categorias: dataCategorias.results,
          idTienda: tienda.id,
        },
      });
    }
  } catch (error) {
    console.log(error);
    notificacionError('Error', 'Al cargar la tienda');
  }
}
// Funcion para CARGAR PRODUCTOS
function* cargarProductos({ payload }) {
  const refCategoria = payload;
  try {
    const data = yield call(getProductosAsync, refCategoria);
    const productosCategoria = data.results;
    yield put({
      type: TIENDA_SET_PRODUCTOS,
      payload: productosCategoria,
    });
  } catch (error) {
    console.log(error);
    notificacionError('Error', 'Al cargar productos de la categoria');
  }
}

export function* watchCargarTienda() {
  yield takeEvery(TIENDA_CARGAR_TIENDA, cargarTienda);
}
export function* watchCargarProductosCategoria() {
  yield takeEvery(TIENDA_CARGAR_PRODUCTOS_CATEGORIA, cargarProductos);
}
export default function* rootSaga() {
  yield all([fork(watchCargarTienda), fork(watchCargarProductosCategoria)]);
}
