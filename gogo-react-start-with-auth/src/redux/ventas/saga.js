/* eslint-disable no-unused-vars */
import { all, call, fork, takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { apiRestUrl } from '../../constants/defaultValues';
import { NotificationManager } from '../../components/common/react-notifications';

import {
  VENTA_IS_LOADED,
  VENTA_SET_ITEMS,
  VENTA_SET_TOTAL_ITEMS,
  VENTA_SET_START_ITEM,
  VENTA_SET_END_ITEM,
  VENTA_SET_PAGINA_ACTUAL,
  VENTA_SET_ITEMS_POR_PAGINA,
  VENTA_SET_PAGINAS,
  //
  VENTA_UPDATE_ITEMS,
  //
  VENTA_CHANGE_DATE,
  VENTA_CHANGE_PAGE,
  VENTA_CHANGE_PAGE_SIZE,
  VENTA_SET_DATE,
  VENTA_GET_PRODUCTOS_VENTA,
  VENTA_SET_PRODUCTOS_VENTA,
  VENTA_GET_ORDEN,
  VENTA_SET_ORDEN,
  VENTA_SET_PRODUCTOS_ORDEN,
} from '../actions';

/** NOTIFICACIONES  */
const notificacionError = (titulo, subtitulo) => {
  NotificationManager.error(titulo, subtitulo, 4000, null, null, 'filled');
};
//* * LLAMADAS AXIOS POST, DELETE, PUT, GET */
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
// GET para obtener los productos de una venta
const getProductosVentaAsync = async (refVenta) => {
  return axios
    .get(`${apiRestUrl}/productoVentas/?refVenta=${refVenta}`)
    .then((res) => {
      return res.data;
    });
};

// GET para obtener la orden de una venta
const geOrdenAsync = async (refVenta) => {
  return axios.get(`${apiRestUrl}/ordens/?refVenta=${refVenta}`).then((res) => {
    return res.data;
  });
};

// GET para obtener la orden de una venta
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
  const { fecha } = payload.payload;

  try {
    if (paginaActual === 1) {
      // Obtenemos el limit (cuantos vamos a mostar)
      const limit = itemsPorPagina;
      const data = yield call(
        getVentasLimitAsync,
        refLocalComercial,
        fecha,
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
          type: VENTA_SET_START_ITEM,
          payload: startItem,
        });
        // Despachar accion de endItem
        const endItem = limit;
        yield put({ type: VENTA_SET_END_ITEM, payload: endItem });
        // Despachar la accion de setPaginaActual = 1
        yield put({ type: VENTA_SET_PAGINA_ACTUAL, payload: 1 });
        // Despachar el total de paginas = 1
        yield put({ type: VENTA_SET_PAGINAS, payload: 1 });
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
          type: VENTA_SET_START_ITEM,
          payload: startItem,
        });
        // Despachar accion de endItem
        const endItem = limit;
        yield put({ type: VENTA_SET_END_ITEM, payload: endItem });
        // Despachar la accion de setPaginaActual = 1
        yield put({ type: VENTA_SET_PAGINA_ACTUAL, payload: 1 });
        // Debemos despachar la cantidad de paginas
        yield put({
          type: VENTA_SET_PAGINAS,
          payload: valorTruc,
        });
      }
      // Aca desppachamos una accion con los items(ADMINISTRADORES LOCALES COMERCIALES)
      const items = data.results;
      // DESPACHAMOS LA ACCION DE LOS ITEMS
      yield put({ type: VENTA_SET_ITEMS, payload: items });
      // DESPACHAMOS LA ACCION PARA LA CANTIDAD DE LOS ITEMS
      yield put({
        type: VENTA_SET_TOTAL_ITEMS,
        payload: totalItems,
      });
    } else {
      // Cuando la pagina actual NO ES LA PRIMERA
      const limit = itemsPorPagina;
      const offset = itemsPorPagina * paginaActual - itemsPorPagina;
      const data = yield call(
        getVentasLimitOffsetAsync,
        refLocalComercial,
        fecha,
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
          type: VENTA_SET_START_ITEM,
          payload: startItem,
        });
        // Despachar accion de endItem
        const endItem = limit;
        yield put({ type: VENTA_SET_END_ITEM, payload: endItem });
        // Despachar la accion de setPaginaActual = 1
        yield put({ type: VENTA_SET_PAGINA_ACTUAL, payload: 1 });
        // Debemos despachar la cantidad de paginas
        yield put({ type: VENTA_SET_PAGINAS, payload: 1 });
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
        yield put({ type: VENTA_SET_PAGINAS, payload: paginas });

        // Debemos despachar la accion para mostar la pagina actual
        yield put({
          type: VENTA_SET_PAGINA_ACTUAL,
          payload: paginaActual,
        });

        const valorInicio = paginaActual - 1;
        const valorFinal = paginaActual;
        const startItem = valorInicio * itemsPorPagina + 1;
        // Aca debemos despachar el startItem
        yield put({
          type: VENTA_SET_START_ITEM,
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
        yield put({ type: VENTA_SET_END_ITEM, payload: endItem });
      }
      // Aca desppachamos una accion con los items(ADMINISTRADORES LOCALES COMERCIALES)
      const items = data.results;
      // DESPACHAMOS LA ACCION DE LOS ITEMS
      yield put({ type: VENTA_SET_ITEMS, payload: items });
      // DESPACHAMOS LA ACCION PARA LA CANTIDAD DE LOS ITEMS
      yield put({
        type: VENTA_SET_TOTAL_ITEMS,
        payload: totalItems,
      });
    }
    yield put({
      type: VENTA_SET_ITEMS_POR_PAGINA,
      payload: itemsPorPagina,
    });
    // Despachamos el loaded
    yield put({ type: VENTA_IS_LOADED, payload: true });
  } catch (error) {
    console.log(error);
  }
}

// Funcion para cambiar la fecha de filtro
function* changeDate({ payload }) {
  const { fecha, refLocalComercial, formattedDate } = payload;
  try {
    yield put({
      type: VENTA_SET_DATE,
      payload: fecha,
    });
    yield put({
      type: VENTA_UPDATE_ITEMS,
      payload: {
        paginaActual: 1,
        itemsPorPagina: 4,
        refLocalComercial,
        fecha: formattedDate,
      },
    });
  } catch (error) {
    console.log(error);
    notificacionError('Error', 'Al cargar las ventas');
  }
}

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

// Funcion para OBTENER LOS PRODUCTOS DE UNA VENTA
function* getProductosVenta({ payload }) {
  const idVenta = payload;
  try {
    const data = yield call(getProductosVentaAsync, idVenta);
    const items = data.results;
    yield put({
      type: VENTA_SET_PRODUCTOS_VENTA,
      payload: items,
    });
  } catch (error) {
    notificacionError('Error', 'Al cargar productos de la categoria');
  }
}

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

export function* watchChangePage() {
  yield takeEvery(VENTA_CHANGE_PAGE, changePage);
}
export function* watchChangePageSize() {
  yield takeEvery(VENTA_CHANGE_PAGE_SIZE, changePageSize);
}
export function* watchChangeDate() {
  yield takeEvery(VENTA_CHANGE_DATE, changeDate);
}
export function* watchUpdateItems() {
  yield takeEvery(VENTA_UPDATE_ITEMS, updateItems);
}
export function* watchGetProductosVenta() {
  yield takeEvery(VENTA_GET_PRODUCTOS_VENTA, getProductosVenta);
}
export function* watchGetOrden() {
  yield takeEvery(VENTA_GET_ORDEN, getOrden);
}
export default function* rootSaga() {
  yield all([
    fork(watchChangeDate),
    fork(watchUpdateItems),
    fork(watchChangePageSize),
    fork(watchChangePage),
    fork(watchGetProductosVenta),
    fork(watchGetOrden),
  ]);
}
