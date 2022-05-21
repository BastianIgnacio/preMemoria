import { all, call, fork, takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { apiRestUrl } from '../../constants/defaultValues';
import { NotificationManager } from '../../components/common/react-notifications';

import {
  CATEGORIA_ADD,
  CATEGORIA_SET_END_ITEM,
  CATEGORIA_SET_ITEMS,
  CATEGORIA_SET_PAGINAS,
  CATEGORIA_SET_PAGINA_ACTUAL,
  CATEGORIA_SET_START_ITEM,
  CATEGORIA_SET_TOTAL_ITEMS,
  CATEGORIA_UPDATE_ITEMS,
  CATEGORIA_SET_PRIMERA_CARGA,
  CATEGORIA_SET_ITEMS_POR_PAGINA,
  CATEGORIA_IS_LOADED,
  CATEGORIA_UPDATE,
  CATEGORIA_DETELE,
} from '../actions';

const notificacionError = (titulo, subtitulo) => {
  NotificationManager.error(titulo, subtitulo, 4000, null, null, 'filled');
};

const notificacionSuccess = (titulo, subtitulo) => {
  NotificationManager.success(titulo, subtitulo, 4000, null, null, 'filled');
};

// Post para agregar una categoria a un local Comercial
const addCategoriaAsync = async (categoria) =>
  axios.post(`${apiRestUrl}/categorias/`, categoria);

// DELETE para eliminar una categoria de un local comercial
const deleteCategoriaAsync = async (idLocalComercial) =>
  axios.delete(`${apiRestUrl}/categorias/${idLocalComercial}`);

// PUT para editar una categoria
const putCategoriaAsync = async (idCategoria, categoria) =>
  axios.put(`${apiRestUrl}/categorias/${idCategoria}/`, categoria);

// GET para obtener las categorias con limit
const getCategoriasLimitAsync = async (refLocalComercial, limit) => {
  return axios
    .get(
      `${apiRestUrl}/listCategoria/?limit=${limit}&refLocalComercial=${refLocalComercial}`
    )
    .then((res) => {
      return res.data;
    });
};
// GET para obtener las categorias con limit y offset
const getCategoriasLimitOffsetAsync = async (
  refLocalComercial,
  limit,
  offset
) => {
  return axios
    .get(
      `${apiRestUrl}/listCategoria/?limit=${limit}&offset=${offset}&refLocalComercial=${refLocalComercial}`
    )
    .then((res) => {
      return res.data;
    });
};

// Funcion para agregar una categoria
function* addCategoria({ payload }) {
  const categoria = payload;
  try {
    // eslint-disable-next-line no-unused-vars
    yield call(addCategoriaAsync, categoria);
    yield put({
      type: CATEGORIA_UPDATE_ITEMS,
      payload: {
        primeraCarga: false,
        paginaActual: 1,
        itemsPorPagina: 4,
        refLocalComercial: payload.refLocalComercial,
      },
    });
    // Aca se deberia llamar a la notificacion
    notificacionSuccess('Categoria', 'Añadida Correctamente');
  } catch (error) {
    notificacionError('No es posible añadir la Categoria', 'Error');
  }
}

function* updateItems(payload) {
  const { primeraCarga } = payload.payload;
  const { paginaActual } = payload.payload;
  const { itemsPorPagina } = payload.payload;
  const { refLocalComercial } = payload.payload;
  try {
    if (paginaActual === 1) {
      // Obtenemos el limit (cuantos vamos a mostar)
      const limit = itemsPorPagina;
      const data = yield call(
        getCategoriasLimitAsync,
        refLocalComercial,
        limit
      );
      console.log(data);
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
          type: CATEGORIA_SET_START_ITEM,
          payload: startItem,
        });
        // Despachar accion de endItem
        const endItem = limit;
        yield put({ type: CATEGORIA_SET_END_ITEM, payload: endItem });
        // Despachar la accion de setPaginaActual = 1
        yield put({ type: CATEGORIA_SET_PAGINA_ACTUAL, payload: 1 });
        // Despachar el total de paginas = 1
        yield put({ type: CATEGORIA_SET_PAGINAS, payload: 1 });
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
          type: CATEGORIA_SET_START_ITEM,
          payload: startItem,
        });
        // Despachar accion de endItem
        const endItem = limit;
        yield put({ type: CATEGORIA_SET_END_ITEM, payload: endItem });
        // Despachar la accion de setPaginaActual = 1
        yield put({ type: CATEGORIA_SET_PAGINA_ACTUAL, payload: 1 });
        // Debemos despachar la cantidad de paginas
        yield put({
          type: CATEGORIA_SET_PAGINAS,
          payload: valorTruc,
        });
      }
      // Aca desppachamos una accion con los items(ADMINISTRADORES LOCALES COMERCIALES)
      const items = data.results;
      console.log(data);
      // DESPACHAMOS LA ACCION DE LOS ITEMS
      yield put({ type: CATEGORIA_SET_ITEMS, payload: items });
      // DESPACHAMOS LA ACCION PARA LA CANTIDAD DE LOS ITEMS
      yield put({
        type: CATEGORIA_SET_TOTAL_ITEMS,
        payload: totalItems,
      });
    } else {
      // Cuando la pagina actual NO ES LA PRIMERA
      const limit = itemsPorPagina;
      const offset = itemsPorPagina * paginaActual - itemsPorPagina;
      console.log('imprimimos localc comercial');
      console.log(refLocalComercial);
      const data = yield call(
        getCategoriasLimitOffsetAsync,
        refLocalComercial,
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
          type: CATEGORIA_SET_START_ITEM,
          payload: startItem,
        });
        // Despachar accion de endItem
        const endItem = limit;
        yield put({ type: CATEGORIA_SET_END_ITEM, payload: endItem });
        // Despachar la accion de setPaginaActual = 1
        yield put({ type: CATEGORIA_SET_PAGINA_ACTUAL, payload: 1 });
        // Debemos despachar la cantidad de paginas
        yield put({ type: CATEGORIA_SET_PAGINAS, payload: 1 });
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
        yield put({ type: CATEGORIA_SET_PAGINAS, payload: paginas });

        // Debemos despachar la accion para mostar la pagina actual
        yield put({
          type: CATEGORIA_SET_PAGINA_ACTUAL,
          payload: paginaActual,
        });

        const valorInicio = paginaActual - 1;
        const valorFinal = paginaActual;
        const startItem = valorInicio * itemsPorPagina + 1;
        // Aca debemos despachar el startItem
        yield put({
          type: CATEGORIA_SET_START_ITEM,
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
        yield put({ type: CATEGORIA_SET_END_ITEM, payload: endItem });
      }
      // Aca desppachamos una accion con los items(ADMINISTRADORES LOCALES COMERCIALES)
      const items = data.results;
      // DESPACHAMOS LA ACCION DE LOS ITEMS
      yield put({ type: CATEGORIA_SET_ITEMS, payload: items });
      // DESPACHAMOS LA ACCION PARA LA CANTIDAD DE LOS ITEMS
      yield put({
        type: CATEGORIA_SET_TOTAL_ITEMS,
        payload: totalItems,
      });
    }
    // Despachamos la primera carga
    yield put({
      type: CATEGORIA_SET_PRIMERA_CARGA,
      payload: primeraCarga,
    });
    yield put({
      type: CATEGORIA_SET_ITEMS_POR_PAGINA,
      payload: itemsPorPagina,
    });
    // Despachamos el loaded
    yield put({ type: CATEGORIA_IS_LOADED, payload: true });
  } catch (error) {
    console.log(error);
  }
}
function* updateCategoria({ payload }) {
  const { idCategoria } = payload;
  const { categoria } = payload;
  console.log('payload');
  console.log(idCategoria);
  console.log(categoria);
  try {
    yield call(putCategoriaAsync, idCategoria, categoria);
    // SIDE EFECTS
    yield put({
      type: CATEGORIA_UPDATE_ITEMS,
      payload: {
        primeraCarga: false,
        paginaActual: 1,
        itemsPorPagina: 4,
        refLocalComercial: payload.categoria.refLocalComercial,
      },
    });
    notificacionSuccess('Categoria', 'Editada correctamente');
  } catch (error) {
    console.log(error);
    notificacionError('Categoria', 'Error al editar');
  }
}

function* deleteCategoria({ payload }) {
  try {
    yield call(deleteCategoriaAsync, payload.categoria);
    yield put({
      type: CATEGORIA_UPDATE_ITEMS,
      payload: {
        primeraCarga: false,
        paginaActual: 1,
        itemsPorPagina: 4,
        refLocalComercial: payload.refLocalComercial,
      },
    });
    notificacionSuccess('Categoria', 'Elimada correctamente');
  } catch (error) {
    console.log(error);
    notificacionError('Categoria', 'Error al eliminar');
  }
}

export function* watchAddCategoria() {
  yield takeEvery(CATEGORIA_ADD, addCategoria);
}
export function* watchUpdateItems() {
  yield takeEvery(CATEGORIA_UPDATE_ITEMS, updateItems);
}
export function* watchUpdateCategoria() {
  yield takeEvery(CATEGORIA_UPDATE, updateCategoria);
}
export function* watchDeleteCategoria() {
  yield takeEvery(CATEGORIA_DETELE, deleteCategoria);
}
export default function* rootSaga() {
  yield all([
    fork(watchAddCategoria),
    fork(watchUpdateItems),
    fork(watchUpdateCategoria),
    fork(watchDeleteCategoria),
  ]);
}
