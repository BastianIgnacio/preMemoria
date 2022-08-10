/* eslint-disable no-unused-vars */
import { all, call, fork, takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { apiRestUrl } from '../../constants/defaultValues';
import { NotificationManager } from '../../components/common/react-notifications';

import {
  ORDEN_IS_LOADED,
  ORDEN_SET_ITEMS,
  ORDEN_SET_TOTAL_ITEMS,
  ORDEN_SET_START_ITEM,
  ORDEN_SET_END_ITEM,
  ORDEN_SET_PAGINA_ACTUAL,
  ORDEN_SET_ITEMS_POR_PAGINA,
  ORDEN_SET_PAGINAS,
  ORDEN_SET_ESTADO,
  //
  ORDEN_UPDATE_ITEMS,
  //
  ORDEN_CHANGE_ESTADO,
  ORDEN_GET_PRODUCTOS_ORDEN,
  ORDEN_SET_PRODUCTOS_ORDEN,
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
// GET para obtener las VENTAS DE UN LOCAL COMERCIAL Async
const getVentasLimitAsync = async (refLocalComercial, fecha, limit) => {
  return axios
    .get(
      `${apiRestUrl}/ventas/?limit=${limit}&refLocalComercial=${refLocalComercial}&fecha=${fecha}`
    )
    .then((res) => {
      return res.data;
    });
};
// GET para obtener las VENTAS DE UN LOCAL COMERCIAL con limit y offset
const getVentasLimitOffsetAsync = async (
  refLocalComercial,
  fecha,
  limit,
  offset
) => {
  return axios
    .get(
      `${apiRestUrl}/ventas/?limit=${limit}&offset=${offset}&refLocalComercial=${refLocalComercial}&fecha=${fecha}`
    )
    .then((res) => {
      return res.data;
    });
};
// GET para obtener las VENTAS DE UN LOCAL COMERCIAL con limit y offset
const getProductosVentaAsync = async (refVenta) => {
  return axios
    .get(`${apiRestUrl}/productoVentas/?refVenta=${refVenta}`)
    .then((res) => {
      return res.data;
    });
};

// GET para obtener las ordenes de un localComercial
const getOrdenesLimitAsync = async (refLocalComercial, estado, limit) => {
  return axios
    .get(
      `${apiRestUrl}/ordens/?refLocalComercial=${refLocalComercial}&estado=${estado}&limit=${limit}`
    )
    .then((res) => {
      return res.data;
    });
};
const getOrdenesLimitOffsetAsync = async (
  refLocalComercial,
  estado,
  limit,
  offset
) => {
  return axios
    .get(
      `${apiRestUrl}/ordens/?refLocalComercial=${refLocalComercial}&estado=${estado}&limit=${limit}&offset=${offset}`
    )
    .then((res) => {
      return res.data;
    });
};
// GET para obtener los Productos de una orden
const getProductosOrdenAsync = async (refOrden) => {
  return axios
    .get(`${apiRestUrl}/productoOrdens/?refOrden=${refOrden}`)
    .then((res) => {
      return res.data;
    });
};

//* * FUNCIONES */
// Funcion para actualizar los items que se muestran

function* updateItems(payload) {
  const { paginaActual } = payload.payload;
  const { itemsPorPagina } = payload.payload;
  const { refLocalComercial } = payload.payload;
  const { estado } = payload.payload;

  try {
    if (paginaActual === 1) {
      // Obtenemos el limit (cuantos vamos a mostar)
      const limit = itemsPorPagina;
      const data = yield call(
        getOrdenesLimitAsync,
        refLocalComercial,
        estado,
        limit
      );
      // tenemos el total de los items
      const totalItems = data.count;
      // Aca validamos si es necesaria solo 1 pagina para mostrarlo
      const valor = totalItems / limit;
      if (valor <= 1) {
        // Solo es necesario 1 pagina para mostarlos
        // Despachar acciones
        // Despachar accion de startItem
        const startItem = 1;
        yield put({
          type: ORDEN_SET_START_ITEM,
          payload: startItem,
        });
        // Despachar accion de endItem
        const endItem = limit;
        yield put({ type: ORDEN_SET_END_ITEM, payload: endItem });
        // Despachar la accion de setPaginaActual = 1
        yield put({ type: ORDEN_SET_PAGINA_ACTUAL, payload: 1 });
        // Despachar el total de paginas = 1
        yield put({ type: ORDEN_SET_PAGINAS, payload: 1 });
      } else {
        // Es necesario mostar mas de 1 pagina para mostarlos todos
        const resto = valor % 1;
        let valorTruc = -1;
        if (resto === 0) {
          // Se necesita una cantidad de pagina cerrada
          valorTruc = Math.trunc(valor);
        } else {
          // El resto es distinto de cero, se necesita mas de una pagina
          valorTruc = Math.trunc(valor) + 1;
        }

        // Despachar las acciones
        // Despachar accion de startItem
        const startItem = 1;
        yield put({
          type: ORDEN_SET_START_ITEM,
          payload: startItem,
        });
        // Despachar accion de endItem
        const endItem = limit;
        yield put({ type: ORDEN_SET_END_ITEM, payload: endItem });
        // Despachar la accion de setPaginaActual = 1
        yield put({ type: ORDEN_SET_PAGINA_ACTUAL, payload: 1 });
        // Debemos despachar la cantidad de paginas
        yield put({
          type: ORDEN_SET_PAGINAS,
          payload: valorTruc,
        });
      }
      // Aca desppachamos una accion con los items(ADMINISTRADORES LOCALES COMERCIALES)
      const items = data.results;
      console.log(items);
      // DESPACHAMOS LA ACCION DE LOS ITEMS
      yield put({ type: ORDEN_SET_ITEMS, payload: items });
      // DESPACHAMOS LA ACCION PARA LA CANTIDAD DE LOS ITEMS
      yield put({
        type: ORDEN_SET_TOTAL_ITEMS,
        payload: totalItems,
      });
    } else {
      // Cuando la pagina actual NO ES LA PRIMERA
      const limit = itemsPorPagina;
      const offset = itemsPorPagina * paginaActual - itemsPorPagina;
      const data = yield call(
        getOrdenesLimitOffsetAsync,
        refLocalComercial,
        estado,
        limit,
        offset
      );
      const totalItems = data.count;
      const valor = totalItems / limit;
      if (valor <= 1) {
        // Solo es necesario mostrar 1 pagina
        // Despachar accion de startItem
        const startItem = 1;
        yield put({
          type: ORDEN_SET_START_ITEM,
          payload: startItem,
        });
        // Despachar accion de endItem
        const endItem = limit;
        yield put({ type: ORDEN_SET_END_ITEM, payload: endItem });
        // Despachar la accion de setPaginaActual = 1
        yield put({ type: ORDEN_SET_PAGINA_ACTUAL, payload: 1 });
        // Debemos despachar la cantidad de paginas
        yield put({ type: ORDEN_SET_PAGINAS, payload: 1 });
      } else {
        // Es necesario mostar mas de 1 pagina para mostarlos todos
        const resto = valor % 1;
        let valorTruc = -1;
        // El resto es cero, por ende son la cantidad justa que cabe en la ultima pagina
        if (resto === 0) {
          valorTruc = Math.trunc(valor);
        }
        // El resto es disitnto de cero, por ende se necesita una pagina mas
        else {
          valorTruc = Math.trunc(valor) + 1;
        }
        // Debemos despachar la cantidad de paginas
        const paginas = valorTruc;
        yield put({ type: ORDEN_SET_PAGINAS, payload: paginas });

        // Debemos despachar la accion para mostar la pagina actual
        yield put({
          type: ORDEN_SET_PAGINA_ACTUAL,
          payload: paginaActual,
        });

        const valorInicio = paginaActual - 1;
        const valorFinal = paginaActual;
        const startItem = valorInicio * itemsPorPagina + 1;
        // Aca debemos despachar el startItem
        yield put({
          type: ORDEN_SET_START_ITEM,
          payload: startItem,
        });
        // Buscamos el endItem
        let endItem = -1;
        const maxItemPagination = paginaActual * itemsPorPagina;
        if (maxItemPagination > data.count) {
          endItem = data.count;
        } else {
          endItem = valorFinal * itemsPorPagina;
        }
        // Aca debemos despachar el endItem
        yield put({ type: ORDEN_SET_END_ITEM, payload: endItem });
      }
      // Aca desppachamos una accion con los items(ADMINISTRADORES LOCALES COMERCIALES)
      const items = data.results;
      console.log(items);
      // DESPACHAMOS LA ACCION DE LOS ITEMS
      yield put({ type: ORDEN_SET_ITEMS, payload: items });
      // DESPACHAMOS LA ACCION PARA LA CANTIDAD DE LOS ITEMS
      yield put({
        type: ORDEN_SET_TOTAL_ITEMS,
        payload: totalItems,
      });
    }
    yield put({
      type: ORDEN_SET_ITEMS_POR_PAGINA,
      payload: itemsPorPagina,
    });
    // Despachamos el loaded
    yield put({ type: ORDEN_IS_LOADED, payload: true });
  } catch (error) {
    console.log(error);
  }
}

/*
// Funcion para cambiar el tamaño de la pagina que se muestra
function* changePageSize({ payload }) {
  const {
    formattedDate,
    refLocalComercial,
    paginaActual,
    itemsPorPagina,
  } = payload;
  console.log(itemsPorPagina);
  try {
    yield put({
      type: VENTA_UPDATE_ITEMS,
      payload: {
        paginaActual,
        itemsPorPagina,
        refLocalComercial,
        fecha: formattedDate,
      },
    });
  } catch (error) {
    console.log(error);
    notificacionError('Error', 'Al cargar las ventas');
  }
}
*/

/*
// Funcion para cambiar el numero de pagina
function* changePage({ payload }) {
  const {
    formattedDate,
    refLocalComercial,
    paginaActual,
    itemsPorPagina,
  } = payload;
  try {
    yield put({
      type: VENTA_UPDATE_ITEMS,
      payload: {
        paginaActual,
        itemsPorPagina,
        refLocalComercial,
        fecha: formattedDate,
      },
    });
  } catch (error) {
    notificacionError('Error', 'Al cargar productos de la categoria');
  }
}
*/

/*
// Funcion para OBTENER LOS DETALLES DE LA ORDEN
function* getOrden({ payload }) {
  const refVenta = payload;
  try {
    let data = yield call(geOrdenAsync, refVenta);
    const orden = data.results;
    yield put({
      type: VENTA_SET_ORDEN,
      payload: orden[0],
    });

    const refOrden = orden[0].id;
    data = yield call(getProductosOrdenAsync, refOrden);
    const productosOrden = data.results;
    yield put({
      type: VENTA_SET_PRODUCTOS_ORDEN,
      payload: productosOrden,
    });
  } catch (error) {
    notificacionError('Error', 'Al cargar el detalle de la orden');
  }
}
*/
// Funcion para CAMBIAR EL ESTADO
function* changeEstado({ payload }) {
  const { refLocalComercial, estado } = payload;
  try {
    yield put({
      type: ORDEN_SET_ESTADO,
      payload: estado,
    });
    yield put({
      type: ORDEN_UPDATE_ITEMS,
      payload: {
        paginaActual: 1,
        itemsPorPagina: 4,
        refLocalComercial,
        estado: estado.estate,
      },
    });
  } catch (error) {
    notificacionError('Error', 'Al cambiar el estado');
  }
}

// Funcion para CAMBIAR EL ESTADO
function* getProductosOrden({ payload }) {
  const refOrden = payload;
  try {
    const data = yield call(getProductosOrdenAsync, refOrden);
    console.log('pasa x a kii');
    const productosOrden = data.results;
    yield put({
      type: ORDEN_SET_PRODUCTOS_ORDEN,
      payload: productosOrden,
    });
  } catch (error) {
    notificacionError('Error', 'Al cambiar el estado');
  }
}

export function* watchUpdateItems() {
  yield takeEvery(ORDEN_UPDATE_ITEMS, updateItems);
}
export function* watchChangeEstado() {
  yield takeEvery(ORDEN_CHANGE_ESTADO, changeEstado);
}
export function* watchGetProductosOrden() {
  yield takeEvery(ORDEN_GET_PRODUCTOS_ORDEN, getProductosOrden);
}
export default function* rootSaga() {
  yield all([
    fork(watchChangeEstado),
    fork(watchUpdateItems),
    fork(watchGetProductosOrden),
    // fork(watchChangePage),
    // fork(watchGetProductosVenta),
    // fork(watchGetOrden),
  ]);
}
