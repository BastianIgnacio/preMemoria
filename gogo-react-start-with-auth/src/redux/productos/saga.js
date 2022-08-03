import { all, call, fork, takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { apiRestUrl } from '../../constants/defaultValues';
import { NotificationManager } from '../../components/common/react-notifications';

import {
  PRODUCTO_ADD,
  PRODUCTO_IS_LOADED,
  PRODUCTO_SET_ITEMS,
  PRODUCTO_SET_TOTAL_ITEMS,
  PRODUCTO_SET_START_ITEM,
  PRODUCTO_SET_END_ITEM,
  PRODUCTO_SET_PAGINA_ACTUAL,
  PRODUCTO_SET_ITEMS_POR_PAGINA,
  PRODUCTO_SET_PAGINAS,
  PRODUCTO_DETELE,
  PRODUCTO_UPDATE,
  PRODUCTO_UPDATE_ITEMS,
  PRODUCTO_CARGAR_CATEGORIAS,
  PRODUCTO_SET_SELECTED_CATEGORIA,
  PRODUCTO_SET_CATEGORIAS,
  PRODUCTO_CHANGE_PAGE_SIZE,
  PRODUCTO_CHANGE_CATEGORIA,
  PRODUCTO_CHANGE_PAGE,
} from '../actions';

const notificacionError = (titulo, subtitulo) => {
  NotificationManager.error(titulo, subtitulo, 4000, null, null, 'filled');
};

const notificacionSuccess = (titulo, subtitulo) => {
  NotificationManager.success(titulo, subtitulo, 4000, null, null, 'filled');
};

// Post para agregar un producto a una categoria
const addProductoAsync = async (producto) =>
  axios.post(`${apiRestUrl}/productoCategorias/`, producto);

// DELETE para eliminar un producto de una categoria
const deleteProductoAsync = async (idProducto) =>
  axios.delete(`${apiRestUrl}/productoCategorias/${idProducto}`);

// PUT para editar una categoria
const putProductoAsync = async (idProducto, producto) =>
  axios.put(`${apiRestUrl}/productoCategorias/${idProducto}/`, producto);

// GET para obtener los productos de una categoria Async
const getProductosLimitAsync = async (refCategoria, limit) => {
  return axios
    .get(
      `${apiRestUrl}/productoCategorias/?limit=${limit}&refCategoria=${refCategoria}`
    )
    .then((res) => {
      return res.data;
    });
};
// GET para obtener las categorias con limit y offset
const getProductosLimitOffsetAsync = async (refCategoria, limit, offset) => {
  return axios
    .get(
      `${apiRestUrl}/productoCategorias/?limit=${limit}&offset=${offset}&refCategoria=${refCategoria}`
    )
    .then((res) => {
      return res.data;
    });
};

// GET para obtener las categorias de un Local Comercial
const getCategoriasAsync = async (refLocalComercial) => {
  return axios
    .get(`${apiRestUrl}/categorias/?refLocalComercial=${refLocalComercial}`)
    .then((res) => {
      return res.data;
    });
};

function* cargarCategorias({ payload }) {
  const refLocalComercial = payload;
  try {
    // eslint-disable-next-line no-unused-vars
    const llamada = yield call(getCategoriasAsync, refLocalComercial);
    const categorias = llamada.results;

    yield put({ type: PRODUCTO_SET_CATEGORIAS, payload: categorias });
    yield put({
      type: PRODUCTO_SET_SELECTED_CATEGORIA,
      payload: categorias[0],
    });
    const refCategoria = categorias[0].id;
    yield put({
      type: PRODUCTO_UPDATE_ITEMS,
      payload: {
        paginaActual: 1,
        itemsPorPagina: 4,
        refCategoria,
      },
    });
  } catch (error) {
    notificacionError('Problema al cargar las categorias', 'Error');
  }
}
// Funcion para agregar un producto
function* addProducto({ payload }) {
  const producto = payload;
  try {
    // eslint-disable-next-line no-unused-vars
    yield call(addProductoAsync, producto);

    // Aca se deberia llamar a la notificacion
    notificacionSuccess('Producto', 'Añadido Correctamente');
  } catch (error) {
    notificacionError('No es posible añadir el producto', 'Error');
  }
}

function* updateItems(payload) {
  const { paginaActual } = payload.payload;
  const { itemsPorPagina } = payload.payload;
  const { refCategoria } = payload.payload;
  try {
    if (paginaActual === 1) {
      // Obtenemos el limit (cuantos vamos a mostar)
      const limit = itemsPorPagina;
      const data = yield call(getProductosLimitAsync, refCategoria, limit);
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
          type: PRODUCTO_SET_START_ITEM,
          payload: startItem,
        });
        // Despachar accion de endItem
        const endItem = limit;
        yield put({ type: PRODUCTO_SET_END_ITEM, payload: endItem });
        // Despachar la accion de setPaginaActual = 1
        yield put({ type: PRODUCTO_SET_PAGINA_ACTUAL, payload: 1 });
        // Despachar el total de paginas = 1
        yield put({ type: PRODUCTO_SET_PAGINAS, payload: 1 });
      } else {
        // Es necesario mostar mas de 1 pagina para mostarlos todos
        const resto = valor % 1;
        let valorTruc = -1;
        if (resto === 0) {
          // Se necesita una cantidad de pagina cerrada
          valorTruc = Math.trunc(valor);
        } else {
          // El resto es distinto de cero, se necesita mas de una pagina
          console.log('akii');
          valorTruc = Math.trunc(valor) + 1;
          console.log(valorTruc);
        }

        // Despachar las acciones
        // Despachar accion de startItem
        const startItem = 1;
        yield put({
          type: PRODUCTO_SET_START_ITEM,
          payload: startItem,
        });
        // Despachar accion de endItem
        const endItem = limit;
        yield put({ type: PRODUCTO_SET_END_ITEM, payload: endItem });
        // Despachar la accion de setPaginaActual = 1
        yield put({ type: PRODUCTO_SET_PAGINA_ACTUAL, payload: 1 });
        // Debemos despachar la cantidad de paginas
        yield put({
          type: PRODUCTO_SET_PAGINAS,
          payload: valorTruc,
        });
      }
      // Aca desppachamos una accion con los items(ADMINISTRADORES LOCALES COMERCIALES)
      const items = data.results;
      console.log(data);
      // DESPACHAMOS LA ACCION DE LOS ITEMS
      yield put({ type: PRODUCTO_SET_ITEMS, payload: items });
      // DESPACHAMOS LA ACCION PARA LA CANTIDAD DE LOS ITEMS
      yield put({
        type: PRODUCTO_SET_TOTAL_ITEMS,
        payload: totalItems,
      });
    } else {
      // Cuando la pagina actual NO ES LA PRIMERA
      const limit = itemsPorPagina;
      const offset = itemsPorPagina * paginaActual - itemsPorPagina;
      const data = yield call(
        getProductosLimitOffsetAsync,
        refCategoria,
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
          type: PRODUCTO_SET_START_ITEM,
          payload: startItem,
        });
        // Despachar accion de endItem
        const endItem = limit;
        yield put({ type: PRODUCTO_SET_END_ITEM, payload: endItem });
        // Despachar la accion de setPaginaActual = 1
        yield put({ type: PRODUCTO_SET_PAGINA_ACTUAL, payload: 1 });
        // Debemos despachar la cantidad de paginas
        yield put({ type: PRODUCTO_SET_PAGINAS, payload: 1 });
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
        yield put({ type: PRODUCTO_SET_PAGINAS, payload: paginas });

        // Debemos despachar la accion para mostar la pagina actual
        yield put({
          type: PRODUCTO_SET_PAGINA_ACTUAL,
          payload: paginaActual,
        });

        const valorInicio = paginaActual - 1;
        const valorFinal = paginaActual;
        const startItem = valorInicio * itemsPorPagina + 1;
        // Aca debemos despachar el startItem
        yield put({
          type: PRODUCTO_SET_START_ITEM,
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
        yield put({ type: PRODUCTO_SET_END_ITEM, payload: endItem });
      }
      // Aca desppachamos una accion con los items(ADMINISTRADORES LOCALES COMERCIALES)
      const items = data.results;
      // DESPACHAMOS LA ACCION DE LOS ITEMS
      yield put({ type: PRODUCTO_SET_ITEMS, payload: items });
      // DESPACHAMOS LA ACCION PARA LA CANTIDAD DE LOS ITEMS
      yield put({
        type: PRODUCTO_SET_TOTAL_ITEMS,
        payload: totalItems,
      });
    }
    yield put({
      type: PRODUCTO_SET_ITEMS_POR_PAGINA,
      payload: itemsPorPagina,
    });
    // Despachamos el loaded
    yield put({ type: PRODUCTO_IS_LOADED, payload: true });
  } catch (error) {
    console.log(error);
  }
}
function* updateProducto({ payload }) {
  const { idProducto } = payload;
  const { producto } = payload;
  try {
    yield call(putProductoAsync, idProducto, producto);
    // SIDE EFECTS
    notificacionSuccess('Producto', 'Editada correctamente');
  } catch (error) {
    console.log(error);
    notificacionError('Producto', 'Error al editar');
  }
}

function* deleteProducto({ payload }) {
  const { idProducto } = payload;
  try {
    yield call(deleteProductoAsync, idProducto);
    yield put({
      type: PRODUCTO_UPDATE_ITEMS,
      payload: {
        primeraCarga: false,
        paginaActual: 1,
        itemsPorPagina: 4,
        refLocalComercial: payload.refLocalComercial,
      },
    });
    notificacionSuccess('Producto', 'Elimada correctamente');
  } catch (error) {
    console.log(error);
    notificacionError('Producto', 'Error al eliminar');
  }
}

function* changeCategoria({ payload }) {
  const categoria = payload;
  try {
    yield put({
      type: PRODUCTO_SET_SELECTED_CATEGORIA,
      payload: categoria,
    });
    yield put({
      type: PRODUCTO_UPDATE_ITEMS,
      payload: {
        paginaActual: 1,
        itemsPorPagina: 4,
        refCategoria: categoria.id,
      },
    });
  } catch (error) {
    console.log(error);
    notificacionError('Error', 'Al cargar productos de la categoria');
  }
}

function* changePageSize({ payload }) {
  const { itemsPorPagina } = payload;
  const { refCategoria } = payload;
  const { paginaActual } = payload;
  try {
    yield put({
      type: PRODUCTO_UPDATE_ITEMS,
      payload: {
        paginaActual,
        itemsPorPagina,
        refCategoria,
      },
    });
  } catch (error) {
    console.log(error);
    notificacionError('Error', 'Al cargar productos de la categoria');
  }
}

function* changePage({ payload }) {
  const { itemsPorPagina } = payload;
  const { refCategoria } = payload;
  const { paginaActual } = payload;
  try {
    yield put({
      type: PRODUCTO_UPDATE_ITEMS,
      payload: {
        paginaActual,
        itemsPorPagina,
        refCategoria,
      },
    });
  } catch (error) {
    notificacionError('Error', 'Al cargar productos de la categoria');
  }
}

export function* watchAddProducto() {
  yield takeEvery(PRODUCTO_ADD, addProducto);
}
export function* watchUpdateProducto() {
  yield takeEvery(PRODUCTO_UPDATE, updateProducto);
}
export function* watchDeleteProducto() {
  yield takeEvery(PRODUCTO_DETELE, deleteProducto);
}
export function* watchProductoCargarCategorias() {
  yield takeEvery(PRODUCTO_CARGAR_CATEGORIAS, cargarCategorias);
}
export function* watchChangeCategoria() {
  yield takeEvery(PRODUCTO_CHANGE_CATEGORIA, changeCategoria);
}
export function* watchChangePageSize() {
  yield takeEvery(PRODUCTO_CHANGE_PAGE_SIZE, changePageSize);
}
export function* watchChangePage() {
  yield takeEvery(PRODUCTO_CHANGE_PAGE, changePage);
}
export function* watchUpdateItemsProductos() {
  yield takeEvery(PRODUCTO_UPDATE_ITEMS, updateItems);
}
export default function* rootSaga() {
  yield all([
    fork(watchAddProducto),
    fork(watchUpdateProducto),
    fork(watchDeleteProducto),
    fork(watchProductoCargarCategorias),
    fork(watchChangeCategoria),
    fork(watchChangePageSize),
    fork(watchChangePage),
    fork(watchUpdateItemsProductos),
  ]);
}
