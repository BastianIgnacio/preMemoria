import {
  all,
  call,
  fork,
  takeEvery,
  // eslint-disable-next-line no-unused-vars
  put,
} from 'redux-saga/effects';
import axios from 'axios';
import { apiRestUrl } from '../../constants/defaultValues';
import { NotificationManager } from '../../components/common/react-notifications';

import {
  LOCALCOMERCIAL_IS_LOADED,
  LOCALCOMERCIAL_SET_START_ITEM,
  LOCALCOMERCIAL_SET_END_ITEM,
  LOCALCOMERCIAL_SET_PAGINA_ACTUAL,
  LOCALCOMERCIAL_SET_PAGINAS,
  LOCALCOMERCIAL_SET_ITEMS,
  LOCALCOMERCIAL_SET_TOTAL_ITEMS,
  LOCALCOMERCIAL_CARGAR_LOCALES,
  LOCALCOMERCIAL_UPDATE_ITEMS,
  LOCALCOMERCIAL_CARGAR_ADMINISTRADOR,
  LOCALCOMERCIAL_ADMINISTRADOR,
  LOCALCOMERCIAL_MODIFICAR_CREDENCIALES,
  LOCALCOMERCIAL_EDITAR,
  LOCALCOMERCIAL_CHANGE_PAGE,
  LOCALCOMERCIAL_CHANGE_PAGE_SIZE,
  LOCALCOMERCIAL_ELIMINAR,
} from '../actions';

const notificacionSuccess = (titulo, subtitulo) => {
  NotificationManager.success(titulo, subtitulo, 4000, null, null, 'filled');
};

const notificacionError = (titulo, subtitulo) => {
  NotificationManager.error(titulo, subtitulo, 4000, null, null, 'filled');
};
// Post para agregar un local comercial
const addLocalComercialAsync = async (localComercial) =>
  axios.post(`${apiRestUrl}/localComercials/`, localComercial);

// PUT para actualizar un local comercial
const putLocalComercialAsync = async (localComercial, refLocalComercial) =>
  axios.put(
    `${apiRestUrl}/localComercials/${refLocalComercial}/`,
    localComercial
  );

// GET PARA OBTENER LOS ADMINISTRADORES
// eslint-disable-next-line no-unused-vars
const getAdminsitradorAsync = async (refLocalComercial) => {
  return axios
    .get(`${apiRestUrl}/auth/users/?refLocalComercial=${refLocalComercial}`)
    .then((res) => {
      return res.data;
    });
};

// DELETE para ELIMINAR UN LOCAL COMERCIAL
// eslint-disable-next-line no-unused-vars
const deleteLocalComercialAsync = async (refLocalComercial) =>
  axios.delete(`${apiRestUrl}/localComercials/${refLocalComercial}/`);

// eslint-disable-next-line no-unused-vars
const getLocalesLimit = async (limit) => {
  return axios
    .get(`${apiRestUrl}/localComercials/?limit=${limit}`)
    .then((res) => {
      return res.data;
    });
};

// eslint-disable-next-line no-unused-vars
const getLocalesLimitOffset = async (limit, offset) => {
  return axios
    .get(`${apiRestUrl}/localComercials/?limit=${limit}&offset=${offset}`)
    .then((res) => {
      return res.data;
    });
};

// eslint-disable-next-line no-unused-vars
const putAdministrador = async (user, refTienda) => {
  return axios
    .put(`${apiRestUrl}/auth/users/${refTienda}/`, user)
    .then((res) => {
      return res.data;
    });
};

//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------

// eslint-disable-next-line no-unused-vars
function* addLocalComercial({ payload }) {
  try {
    yield call(addLocalComercialAsync, payload);
    // eslint-disable-next-line no-unused-vars
    // Aca se deberia llamar a la notificacion
    notificacionSuccess('Local Comercial', 'Añadido correctamente');
  } catch (error) {
    notificacionError('Error', 'Error al añadir Administrador');
  }
}

function* cargarLocales() {
  try {
    yield put({
      type: LOCALCOMERCIAL_UPDATE_ITEMS,
      payload: {
        paginaActual: 1,
        itemsPorPagina: 4,
      },
    });
  } catch (error) {
    notificacionError('Error', 'Error al eliminar Administrador');
  }
}

function* cargarAdministrador({ payload }) {
  const { refLocalComercial, modal } = payload;
  try {
    const administrador = yield call(getAdminsitradorAsync, refLocalComercial);
    if (administrador.count === 0) {
      notificacionError('Error', 'Error al cargar administrador ');
      return;
    }
    yield put({
      type: LOCALCOMERCIAL_ADMINISTRADOR,
      payload: administrador.results[0],
    });
    modal(true);
  } catch (error) {
    notificacionError('Error', 'Error al cargar administrador ');
  }
}

function* modificarCredenciales({ payload }) {
  // eslint-disable-next-line no-unused-vars
  const { refLocalComercial, modal, user } = payload;
  try {
    yield call(putAdministrador, user, refLocalComercial);
    modal(false);
    notificacionSuccess('Credenciales', 'Modificadas de forma exitosa!');
  } catch (error) {
    notificacionError('Error', 'El Email ya está en uso. ');
  }
}

function* editarLocalComercial({ payload }) {
  // eslint-disable-next-line no-unused-vars
  const {
    refLocalComercial,
    modal,
    localComercial,
    paginaActual,
    itemsPorPagina,
  } = payload;
  try {
    yield call(putLocalComercialAsync, localComercial, refLocalComercial);
    yield put({
      type: LOCALCOMERCIAL_UPDATE_ITEMS,
      payload: {
        paginaActual,
        itemsPorPagina,
      },
    });
    modal(false);
    notificacionSuccess('Local Comercial', 'Modificado de forma exitosa!');
  } catch (error) {
    notificacionError('Error', 'No fue posible editar ');
  }
}

function* changePage({ payload }) {
  // eslint-disable-next-line no-unused-vars
  const { paginaActual, itemsPorPagina } = payload;
  console.log('paso x aki');
  try {
    yield put({
      type: LOCALCOMERCIAL_UPDATE_ITEMS,
      payload: {
        paginaActual,
        itemsPorPagina,
      },
    });
  } catch (error) {
    notificacionError('Error', 'No fue cambiar la pagina ');
  }
}

function* eliminar({ payload }) {
  // eslint-disable-next-line no-unused-vars
  const refLocalComercial = payload;
  try {
    yield call(deleteLocalComercialAsync, refLocalComercial);
    // Ahora hay que eliminar el usuario que tiene referencia al local comercial
    yield put({
      type: LOCALCOMERCIAL_UPDATE_ITEMS,
      payload: {
        paginaActual: 1,
        itemsPorPagina: 4,
      },
    });

    notificacionSuccess('Local Comercial', 'Eliminado correctamente !');
  } catch (error) {
    notificacionError('Error', 'No fue posible eliminar');
  }
}

function* updateItems({ payload }) {
  // eslint-disable-next-line prefer-destructuring
  const paginaActual = payload.paginaActual;
  // eslint-disable-next-line prefer-destructuring
  const itemsPorPagina = payload.itemsPorPagina;
  try {
    if (paginaActual === 1) {
      const limit = itemsPorPagina;
      const data = yield call(getLocalesLimit, limit);
      // Ya tenemos los items a mostar
      const totalItems = data.count;
      // Aca validamos si es necesaria solo 1 pagina para mostrarlo
      const valor = data.count / limit;
      if (valor <= 1) {
        // Es necesario solo mostrar 1 pagina
        const paginas = 1;
        yield put({ type: LOCALCOMERCIAL_SET_PAGINAS, payload: paginas });
        // Debemos despachar la accion para mostar la pagina actual == 1
        yield put({
          type: LOCALCOMERCIAL_SET_PAGINA_ACTUAL,
          payload: paginaActual,
        });

        // Aca debemos despachar que el startItem es 1
        const startItem = 1;
        yield put({ type: LOCALCOMERCIAL_SET_START_ITEM, payload: startItem });

        // Aca debemos despacha que el end item es data.count
        const endItem = data.count;
        yield put({ type: LOCALCOMERCIAL_SET_END_ITEM, payload: endItem });
      } else {
        // Es necesario mostrar mas de 2 paginas
        const resto = valor % 1;
        let valorTruc = -1;
        if (resto === 0) {
          // Se necesita una cantidad de pagina cerrada
          valorTruc = Math.trunc(valor);
        } else {
          // El resto es distinto de cero, se necesita mas de una pagina
          valorTruc = Math.trunc(valor) + 1;
        }
        // Debemos despachar la accion para mostar la pagina actual == 1
        yield put({
          type: LOCALCOMERCIAL_SET_PAGINA_ACTUAL,
          payload: paginaActual,
        });
        const paginas = valorTruc;
        // Debemos despachar la cantidad de paginas
        yield put({ type: LOCALCOMERCIAL_SET_PAGINAS, payload: paginas });

        // Aca debemos despachar que el startItem es 1
        const startItem = 1;
        yield put({ type: LOCALCOMERCIAL_SET_START_ITEM, payload: startItem });

        // Aca debemos despacha que el end item es items x pagina
        const endItem = itemsPorPagina;
        yield put({ type: LOCALCOMERCIAL_SET_END_ITEM, payload: endItem });
      }
      // Aca desppachamos una accion con los items(Locales comerciales)
      const items = data.results;
      yield put({ type: LOCALCOMERCIAL_SET_ITEMS, payload: items });
      yield put({ type: LOCALCOMERCIAL_SET_TOTAL_ITEMS, payload: totalItems });
    } else {
      // Cuando la pagina actual NO ES LA PRIMERA
      const limit = itemsPorPagina;
      const offset = itemsPorPagina * paginaActual - itemsPorPagina;
      const data = yield call(getLocalesLimitOffset, limit, offset);
      // Ya tenemos los items a mostrar
      const totalItems = data.count;
      console.log(totalItems);
      const valor = data.count / limit;
      if (valor <= 1) {
        // Es necesario solo mostrar 1 pagina
        const paginas = 1;
        yield put({ type: LOCALCOMERCIAL_SET_PAGINAS, payload: paginas });
        // Debemos despachar la accion para mostar la pagina actual == 1
        yield put({ type: LOCALCOMERCIAL_SET_PAGINA_ACTUAL, payload: 1 });

        // Aca debemos despachar que el startItem es 1
        const startItem = 1;
        yield put({ type: LOCALCOMERCIAL_SET_START_ITEM, payload: startItem });

        // Aca debemos despacha que el end item es data.count
        const endItem = data.count;
        yield put({ type: LOCALCOMERCIAL_SET_END_ITEM, payload: endItem });
      } else {
        // Es necesario mostrar mas de 2 paginas
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
        yield put({ type: LOCALCOMERCIAL_SET_PAGINAS, payload: paginas });

        // Debemos despachar la accion para mostar la pagina actual == 1
        yield put({
          type: LOCALCOMERCIAL_SET_PAGINA_ACTUAL,
          payload: paginaActual,
        });

        const valorInicio = paginaActual - 1;
        const valorFinal = paginaActual;
        const startItem = valorInicio * itemsPorPagina + 1;
        // Aca debemos despachar el startItem
        yield put({ type: LOCALCOMERCIAL_SET_START_ITEM, payload: startItem });

        let endItem = -1;
        const maxItemPagination = paginaActual * itemsPorPagina;
        if (maxItemPagination > data.count) {
          endItem = data.count;
        } else {
          endItem = valorFinal * itemsPorPagina;
        }
        // Aca debemos despachar el endItem
        yield put({ type: LOCALCOMERCIAL_SET_END_ITEM, payload: endItem });
      }
      // Aca desppachamos una accion con los items(Locales comerciales)
      const items = data.results;
      yield put({ type: LOCALCOMERCIAL_SET_ITEMS, payload: items });
      yield put({ type: LOCALCOMERCIAL_SET_TOTAL_ITEMS, payload: totalItems });
    }
    yield put({ type: LOCALCOMERCIAL_IS_LOADED, payload: true });
  } catch (error) {
    console.log('error');
    // Notificaion de error
    // Poner a cargar
  }
}

//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------

export function* watchCargarLocales() {
  yield takeEvery(LOCALCOMERCIAL_CARGAR_LOCALES, cargarLocales);
}
export function* watchUpdateLocalesComerciales() {
  yield takeEvery(LOCALCOMERCIAL_UPDATE_ITEMS, updateItems);
}
export function* watchCargarAdministrador() {
  yield takeEvery(LOCALCOMERCIAL_CARGAR_ADMINISTRADOR, cargarAdministrador);
}
export function* watchModificarCredenciales() {
  yield takeEvery(LOCALCOMERCIAL_MODIFICAR_CREDENCIALES, modificarCredenciales);
}
export function* watchEditarLocalComercial() {
  yield takeEvery(LOCALCOMERCIAL_EDITAR, editarLocalComercial);
}
export function* watchChangePage() {
  yield takeEvery(LOCALCOMERCIAL_CHANGE_PAGE, changePage);
}
export function* watchChangePageSize() {
  yield takeEvery(LOCALCOMERCIAL_CHANGE_PAGE_SIZE, changePage);
}
export function* watchEliminarLocalComercial() {
  yield takeEvery(LOCALCOMERCIAL_ELIMINAR, eliminar);
}

//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------
export default function* rootSaga() {
  yield all([
    fork(watchCargarLocales),
    fork(watchUpdateLocalesComerciales),
    fork(watchCargarAdministrador),
    fork(watchModificarCredenciales),
    fork(watchEditarLocalComercial),
    fork(watchChangePage),
    fork(watchChangePageSize),
    fork(watchEliminarLocalComercial),
  ]);
}
