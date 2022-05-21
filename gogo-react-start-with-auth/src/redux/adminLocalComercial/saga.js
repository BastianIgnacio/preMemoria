import { all, call, fork, takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { apiRestUrl } from '../../constants/defaultValues';
import { NotificationManager } from '../../components/common/react-notifications';

import {
  ADMINLOCALCOMERCIAL_ADD,
  ADMINLOCALCOMERCIAL_REMOVE,
  ADMINLOCALCOMERCIAL_UPDATE,
  ADMINLOCALCOMERCIAL_UPDATE_CREDENTIAL,
  ADMINLOCALCOMERCIAL_UPDATE_ITEMS,
  ADMINLOCALCOMERCIAL_SET_START_ITEM,
  ADMINLOCALCOMERCIAL_SET_END_ITEM,
  ADMINLOCALCOMERCIAL_SET_ITEMS,
  ADMINLOCALCOMERCIAL_SET_TOTAL_ITEMS,
  ADMINLOCALCOMERCIAL_SET_PAGINA_ACTUAL,
  ADMINLOCALCOMERCIAL_SET_PAGINAS,
  ADMINLOCALCOMERCIAL_SET_PRIMERA_CARGA,
  ADMINLOCALCOMERCIAL_ISLOADED,
  ADMINLOCALCOMERCIAL_SET_ITEM_POR_PAGINA,
} from '../actions';

const notificacionError = (titulo, subtitulo) => {
  NotificationManager.error(titulo, subtitulo, 4000, null, null, 'filled');
};

const notificacionSuccess = (titulo, subtitulo) => {
  NotificationManager.success(titulo, subtitulo, 4000, null, null, 'filled');
};

// Post para agregar un local comercial
const addAdministradorLocalComercialAsync = async (adminLocalComercial) =>
  axios.post(`${apiRestUrl}/auth/register`, adminLocalComercial);

// DELETE para eliminar un administrador
const removeAdministradorLocalComercialAsync = async (idAdminLocalComercial) =>
  axios.delete(`${apiRestUrl}/auth/administradores/${idAdminLocalComercial}`);

// PUT para editar un administrador
const updateAdministradorLocalComercialAsync = async (
  idAdminLocalComercial,
  adminLocalComercial
) =>
  axios.put(
    `${apiRestUrl}/auth/administradores/${idAdminLocalComercial}`,
    adminLocalComercial
  );

const updateCredentialsAsync = async (
  idAdminLocalComercial,
  adminLocalComercial
) =>
  axios.put(
    `${apiRestUrl}/auth/administradoresResetPassword/${idAdminLocalComercial}`,
    adminLocalComercial
  );

const getAdministradoresLimitAsync = async (limit) => {
  return axios
    .get(`${apiRestUrl}/listAdministradores/?limit=${limit}`)
    .then((res) => {
      return res.data;
    });
};

const getAdministradoresLimitOffsetAsync = async (limit, offset) => {
  return axios
    .get(`${apiRestUrl}/listAdministradores/?limit=${limit}&offset=${offset}`)
    .then((res) => {
      return res.data;
    });
};

function* addAdministradorLocalComercial({ payload }) {
  try {
    // eslint-disable-next-line no-unused-vars
    yield call(addAdministradorLocalComercialAsync, payload);
    // Aca se deberia llamar a la notificacion
    notificacionSuccess(
      'Administrador de local comercial',
      'Añadido Correctamente'
    );
  } catch (error) {
    notificacionError('No es posible añadir el Administrador', 'Error');
  }
}

function* removeAdministradorLocalComercial({ payload }) {
  try {
    // eslint-disable-next-line no-unused-vars
    const response = yield call(
      removeAdministradorLocalComercialAsync,
      payload
    );
    notificacionSuccess(
      'Administrador de local comercial',
      'Eliminado Correctamente'
    );
    // Aca se deberia llamar a la notificacion
  } catch (error) {
    notificacionError('No es posible eliminar el Administrador', 'Error');
  }
}

function* updateAdministradorLocalComercial(payload) {
  // console.log(payload);
  const { idAdminLocalComercial } = payload.payload;
  const { adminLocalComercial } = payload.payload;
  try {
    yield call(
      updateAdministradorLocalComercialAsync,
      idAdminLocalComercial,
      adminLocalComercial
    );
    notificacionSuccess(
      'Administrador de local comercial',
      'Modificado Correctamente'
    );
  } catch (error) {
    console.log(error);
    notificacionError('No es posible modificar el Administrador', 'Error');
  }
}

function* updateCredentials(payload) {
  // console.log(payload);
  const { idAdminLocalComercial } = payload.payload;
  const { adminLocalComercial } = payload.payload;
  try {
    yield call(
      updateCredentialsAsync,
      idAdminLocalComercial,
      adminLocalComercial
    );
    notificacionSuccess(
      'Administrador de local comercial',
      'Credenciales moficiadas correctamente'
    );
  } catch (error) {
    console.log(error);
    notificacionError('No es posible modificar las credenciales', 'Error');
  }
}

function* updateItems(payload) {
  const { primeraCarga } = payload.payload;
  const { paginaActual } = payload.payload;
  const { itemsPorPagina } = payload.payload;
  try {
    if (paginaActual === 1) {
      // Obtenemos el limit (cuantos vamos a mostar)
      const limit = itemsPorPagina;
      const data = yield call(getAdministradoresLimitAsync, limit);
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
          type: ADMINLOCALCOMERCIAL_SET_START_ITEM,
          payload: startItem,
        });
        // Despachar accion de endItem
        const endItem = limit;
        yield put({ type: ADMINLOCALCOMERCIAL_SET_END_ITEM, payload: endItem });
        // Despachar la accion de setPaginaActual = 1
        yield put({ type: ADMINLOCALCOMERCIAL_SET_PAGINA_ACTUAL, payload: 1 });
        // Despachar el total de paginas = 1
        yield put({ type: ADMINLOCALCOMERCIAL_SET_PAGINAS, payload: 1 });
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
          type: ADMINLOCALCOMERCIAL_SET_START_ITEM,
          payload: startItem,
        });
        // Despachar accion de endItem
        const endItem = limit;
        yield put({ type: ADMINLOCALCOMERCIAL_SET_END_ITEM, payload: endItem });
        // Despachar la accion de setPaginaActual = 1
        yield put({ type: ADMINLOCALCOMERCIAL_SET_PAGINA_ACTUAL, payload: 1 });
        // Debemos despachar la cantidad de paginas
        yield put({
          type: ADMINLOCALCOMERCIAL_SET_PAGINAS,
          payload: valorTruc,
        });
      }
      // Aca desppachamos una accion con los items(ADMINISTRADORES LOCALES COMERCIALES)
      const items = data.results;
      console.log(data);
      // DESPACHAMOS LA ACCION DE LOS ITEMS
      yield put({ type: ADMINLOCALCOMERCIAL_SET_ITEMS, payload: items });
      // DESPACHAMOS LA ACCION PARA LA CANTIDAD DE LOS ITEMS
      yield put({
        type: ADMINLOCALCOMERCIAL_SET_TOTAL_ITEMS,
        payload: totalItems,
      });
    } else {
      // Cuando la pagina actual NO ES LA PRIMERA
      const limit = itemsPorPagina;
      const offset = itemsPorPagina * paginaActual - itemsPorPagina;
      const data = yield call(
        getAdministradoresLimitOffsetAsync,
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
          type: ADMINLOCALCOMERCIAL_SET_START_ITEM,
          payload: startItem,
        });
        // Despachar accion de endItem
        const endItem = limit;
        yield put({ type: ADMINLOCALCOMERCIAL_SET_END_ITEM, payload: endItem });
        // Despachar la accion de setPaginaActual = 1
        yield put({ type: ADMINLOCALCOMERCIAL_SET_PAGINA_ACTUAL, payload: 1 });
        // Debemos despachar la cantidad de paginas
        yield put({ type: ADMINLOCALCOMERCIAL_SET_PAGINAS, payload: 1 });
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
        yield put({ type: ADMINLOCALCOMERCIAL_SET_PAGINAS, payload: paginas });

        // Debemos despachar la accion para mostar la pagina actual
        yield put({
          type: ADMINLOCALCOMERCIAL_SET_PAGINA_ACTUAL,
          payload: paginaActual,
        });

        const valorInicio = paginaActual - 1;
        const valorFinal = paginaActual;
        const startItem = valorInicio * itemsPorPagina + 1;
        // Aca debemos despachar el startItem
        yield put({
          type: ADMINLOCALCOMERCIAL_SET_START_ITEM,
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
        yield put({ type: ADMINLOCALCOMERCIAL_SET_END_ITEM, payload: endItem });
      }
      // Aca desppachamos una accion con los items(ADMINISTRADORES LOCALES COMERCIALES)
      const items = data.results;
      // DESPACHAMOS LA ACCION DE LOS ITEMS
      yield put({ type: ADMINLOCALCOMERCIAL_SET_ITEMS, payload: items });
      // DESPACHAMOS LA ACCION PARA LA CANTIDAD DE LOS ITEMS
      yield put({
        type: ADMINLOCALCOMERCIAL_SET_TOTAL_ITEMS,
        payload: totalItems,
      });
    }
    // Despachamos la primera carga
    yield put({
      type: ADMINLOCALCOMERCIAL_SET_PRIMERA_CARGA,
      payload: primeraCarga,
    });
    yield put({
      type: ADMINLOCALCOMERCIAL_SET_ITEM_POR_PAGINA,
      payload: itemsPorPagina,
    });
    // Despachamos el loaded
    yield put({ type: ADMINLOCALCOMERCIAL_ISLOADED, payload: true });
  } catch (error) {
    console.log(error);
  }
}

export function* watchRemoveAdministradorLocalComercial() {
  yield takeEvery(
    ADMINLOCALCOMERCIAL_REMOVE,
    removeAdministradorLocalComercial
  );
}
export function* watchAddAdministradorLocalComercial() {
  yield takeEvery(ADMINLOCALCOMERCIAL_ADD, addAdministradorLocalComercial);
}
export function* watchUpdateAdministradorLocalComercial() {
  yield takeEvery(
    ADMINLOCALCOMERCIAL_UPDATE,
    updateAdministradorLocalComercial
  );
}
export function* watchUpdateCredentials() {
  yield takeEvery(ADMINLOCALCOMERCIAL_UPDATE_CREDENTIAL, updateCredentials);
}

export function* watchUpdateItems() {
  yield takeEvery(ADMINLOCALCOMERCIAL_UPDATE_ITEMS, updateItems);
}

export default function* rootSaga() {
  yield all([
    fork(watchAddAdministradorLocalComercial),
    fork(watchRemoveAdministradorLocalComercial),
    fork(watchUpdateAdministradorLocalComercial),
    fork(watchUpdateCredentials),
    fork(watchUpdateItems),
  ]);
}
