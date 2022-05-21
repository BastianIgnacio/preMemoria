import {
  all,
  call,
  fork,
  takeEvery,
  takeLatest,
  // eslint-disable-next-line no-unused-vars
  put,
} from 'redux-saga/effects';
import axios from 'axios';
import { apiRestUrl } from '../../constants/defaultValues';
import { NotificationManager } from '../../components/common/react-notifications';

import {
  LOCALCOMERCIAL_ADD,
  LOCALCOMERCIAL_UPDATE,
  LOCALCOMERCIALS_GETADMINSDISPONIBLES,
  // eslint-disable-next-line no-unused-vars
  LOCALCOMERCIALS_SETADMINSDISPONIBLES,
  LOCALCOMERCIAL_ASIGNAR_ADMIN,
  LOCALCOMERCIAL_REMOVE_ADMIN,
  LOCALCOMERCIAL_DELETE,
  ADMINLOCALCOMERCIAL_REMOVE,
  LOCALCOMERCIALS_UPDATE_ITEMS,
  LOCALCOMERCIALS_SET_ITEMS,
  LOCALCOMERCIAL_SET_TOTAL_PAGINAS,
  LOCALCOMERCIAL_SET_START_ITEM,
  LOCALCOMERCIAL_SET_END_ITEM,
  LOCALCOMERCIALS_SET_TOTAL_ITEMS,
  LOCALCOMERCIALS_CHANGEPAGE,
  LOCALCOMERCIAL_AFTER_UPDATE,
  LOCALCOMERCIALS_SET_ADMIN_ASIGNAR,
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
const updateLocalComercialAsync = async (localComercial, idLocalComercial) =>
  axios.put(
    `${apiRestUrl}/localComercials/${idLocalComercial}/`,
    localComercial
  );

// GET PARA OBTENER LOS ADMINISTRADORES
// eslint-disable-next-line no-unused-vars
const getAdministradoresLocalesComercialesAsync = async () => {
  return axios.get(`${apiRestUrl}/listAdministradores`).then((res) => {
    return res.data;
  });
};

// GET PARA OBTENER LOS ADMINISTRADORES DISPONIBLES
const getAdministradoresLocalesComercialesDisponiblesAsync = async () => {
  return axios
    .get(`${apiRestUrl}/listAdministradores/?disponible=True`)
    .then((res) => {
      return res.data;
    });
};

// GET PARA OBTENER UN ADMINISTRADOR
const getAdministradorAsync = async (idAdministrador) => {
  return axios
    .get(`${apiRestUrl}/listAdministradores/?id=${idAdministrador}`)
    .then((res) => {
      return res.data;
    });
};

// PUT para Editar una administrador
// eslint-disable-next-line no-unused-vars
const updateAdministradorLocalComercialAsync = async (
  idAdminLocalComercial,
  adminLocalComercial
) =>
  axios.put(
    `${apiRestUrl}/auth/administradores/${idAdminLocalComercial}`,
    adminLocalComercial
  );

// DELETE para ELIMINAR UN LOCAL COMERCIAL
// eslint-disable-next-line no-unused-vars
const deleteLocalComercialAsync = async (idLocalComercial) =>
  axios.delete(`${apiRestUrl}/localComercials/${idLocalComercial}/`);

// GET para obtener un local Comercial
const getLocalComercialPorAdministradorAsync = async (refAdministrador) => {
  return axios
    .get(
      `${apiRestUrl}/listLocalComercial/?refAdministrador=${refAdministrador}`
    )
    .then((res) => {
      return res.data;
    });
};

// eslint-disable-next-line no-unused-vars
const getLocalesLimit = async (limit) => {
  return axios
    .get(`${apiRestUrl}/listLocalComercial/?limit=${limit}`)
    .then((res) => {
      return res.data;
    });
};

// eslint-disable-next-line no-unused-vars
const getLocalesLimitOffset = async (limit, offset) => {
  return axios
    .get(`${apiRestUrl}/listLocalComercial/?limit=${limit}&offset=${offset}`)
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

function* updateLocalComercial({ payload }) {
  // eslint-disable-next-line prefer-destructuring
  const localComercialToUpdate = payload.localComercialToUpdate;
  // eslint-disable-next-line prefer-destructuring
  const idLocalComercialToUpdate = payload.idLocalComercialToUpdate;
  try {
    // eslint-disable-next-line no-unused-vars
    yield call(
      updateLocalComercialAsync,
      localComercialToUpdate,
      idLocalComercialToUpdate
    );
    // Aca se deberia llamar a la notificacion
    notificacionSuccess('Local Comercial', 'Actualizado correctamente');
  } catch (error) {
    notificacionError('Error', 'Error al editar un Local Comercial');
  }
}

function* getAdministradoresDisponibles() {
  try {
    // eslint-disable-next-line no-unused-vars
    const adminsDisponibles = yield call(
      getAdministradoresLocalesComercialesDisponiblesAsync
    );
    if (adminsDisponibles.count > 0) {
      yield put({
        type: LOCALCOMERCIALS_SETADMINSDISPONIBLES,
        payload: adminsDisponibles.results,
      });
      // Seteamos en redux el primer administrador
      yield put({
        type: LOCALCOMERCIALS_SET_ADMIN_ASIGNAR,
        payload: {
          refAdministradorAsignar: adminsDisponibles.results[0].id,
          nombresAsignar: adminsDisponibles.results[0].first_name,
          apellidosAsignar: adminsDisponibles.results[0].last_name,
          telefonoAsignar: adminsDisponibles.results[0].telefono,
        },
      });
    } else {
      yield put({
        type: LOCALCOMERCIALS_SETADMINSDISPONIBLES,
        payload: [],
      });
    }
  } catch (error) {
    console.log(error);
    notificacionError('Error', 'Error al cargar los administradores');
  }
}

function* localComercialAsignarAdmin({ payload }) {
  // eslint-disable-next-line prefer-destructuring
  const localComercialToUpdate = payload.localComercialToUpdate;
  // eslint-disable-next-line prefer-destructuring
  const idLocalComercialToUpdate = payload.idLocalComercialToUpdate;
  // eslint-disable-next-line prefer-destructuring
  const idAdministrador = payload.idAdministrador;
  // eslint-disable-next-line prefer-destructuring
  const idAntiguoAdministrador = payload.idAntiguoAdministrador;

  try {
    // SI ES -1 --> NO ERA ADMINISTRADOR DE OTRO LOCAL COMERCIAL
    if (idAntiguoAdministrador === -1) {
      // ACA YA VIENE SETEADO EL REF ADMINISTRADOR
      // ACTUALIZAMOS LA REFERENCIA EN EL LOCAL COMERCIAL
      // eslint-disable-next-line no-unused-vars
      yield call(
        updateLocalComercialAsync,
        localComercialToUpdate,
        idLocalComercialToUpdate
      );

      // AHORA SE BUSCA EL ADMINISTRADOR PARA POSTERIORMENTE ACTUALIZARLO
      // YA QUE SOLO TENEMOS EL ID DEL ADMINISTRADOR
      const adminLocalComercialGet = yield call(
        getAdministradorAsync,
        idAdministrador
      );
      // CREAMOS LOS DATOS QUE ENVIAREMOS A LA API
      const adminLocalComercial = {
        email: adminLocalComercialGet.results[0].email,
        disponible: false,
      };

      // ACTUALIZAMOS LA DISPONIBILIDAD (FALSE) EN EL USUARIO ADMINISTRADOR DE LOCAL COMERCIAL
      yield call(
        updateAdministradorLocalComercialAsync,
        idAdministrador,
        adminLocalComercial
      );
      notificacionSuccess('Local Comercial', 'Asignador correctamente');
    } else {
      // ACTUALIZAMOS LA REFERENCIA EN EL LOCAL COMERCIAL
      // eslint-disable-next-line no-unused-vars
      yield call(
        updateLocalComercialAsync,
        localComercialToUpdate,
        idLocalComercialToUpdate
      );
      // AHORA SE BUSCA EL ADMINISTRADOR PARA POSTERIORMENTE ACTUALIZARLO
      // YA QUE SOLO TENEMOS EL ID DEL ADMINISTRADOR
      const adminLocalComercialGet = yield call(
        getAdministradorAsync,
        idAdministrador
      );
      // CREAMOS LOS DATOS QUE ENVIAREMOS A LA API
      const adminLocalComercial = {
        email: adminLocalComercialGet.results[0].email,
        disponible: false,
      };

      // ACTUALIZAMOS LA DISPONIBILIDAD (FALSE) EN EL USUARIO ADMINISTRADOR DE LOCAL COMERCIAL
      yield call(
        updateAdministradorLocalComercialAsync,
        idAdministrador,
        adminLocalComercial
      );

      // AHORA SE BUSCA EL ADMINISTRADOR PARA POSTERIORMENTE ACTUALIZARLO
      // YA QUE SOLO TENEMOS EL ID DEL ADMINISTRADOR ANTIGUO
      const antiguiAdminLocalComercialGet = yield call(
        getAdministradorAsync,
        idAntiguoAdministrador
      );
      // CREAMOS LOS DATOS QUE ENVIAREMOS A LA API
      // PARA DEJAR DISPONIBLE EL USUARIO ADMIN LOCAL COMERCIAL
      const antiguoAdminLocalComercial = {
        email: antiguiAdminLocalComercialGet.results[0].email,
        disponible: true,
      };
      // ACTUALIZAMOS EL ADMINISTRADOR EN DISPONIBLE
      yield call(
        updateAdministradorLocalComercialAsync,
        idAntiguoAdministrador,
        antiguoAdminLocalComercial
      );
      notificacionSuccess('Local Comercial', 'Asignador correctamente');
    }
  } catch (error) {
    console.log(error);
    notificacionError('Error', 'Error al Asignar Administrador');
  }
}
function* deleteLocalComercial({ payload }) {
  // eslint-disable-next-line prefer-destructuring
  const idLocalComercial = payload.idEliminar;
  // eslint-disable-next-line prefer-destructuring
  const refAdministradorEliminar = payload.refAdministradorEliminar;
  console.log(idLocalComercial);
  console.log(refAdministradorEliminar);
  try {
    // No hay administrador, por ende no se elimina el usuario.
    if (refAdministradorEliminar === -1) {
      yield call(deleteLocalComercialAsync, idLocalComercial);
    } else {
      // Si hay administrador, por ende se deme eliminar
      // Eliminamos el local comercial
      yield call(deleteLocalComercialAsync, idLocalComercial);

      // Eliminamos el Administrador del local comercial
      yield put({
        type: ADMINLOCALCOMERCIAL_REMOVE,
        payload: refAdministradorEliminar,
      });
    }
    // yield call(deleteLocalComercialAsync, idLocalComercial);
    yield call(getAdministradoresLocalesComercialesDisponiblesAsync);
    notificacionSuccess('Local Comercial', 'Eliminado correctamente');
  } catch (error) {
    notificacionError('Error', 'Error al eliminar Local Comercial');
  }
}

function* localComercialRemoveAdmin({ payload }) {
  // eslint-disable-next-line prefer-destructuring
  const idAdministradorRemovido = payload;
  try {
    const localComercialToRemoveAdmin = yield call(
      getLocalComercialPorAdministradorAsync,
      idAdministradorRemovido
    );
    console.log('Local comercial a remover');
    console.log(localComercialToRemoveAdmin.results[0].id);

    const idLocalComercialToUpdate = localComercialToRemoveAdmin.results[0].id;
    const localComercialToUpdate = {
      nombre: localComercialToRemoveAdmin.results[0].nombre,
      direccion: localComercialToRemoveAdmin.results[0].direccion,
      link: localComercialToRemoveAdmin.results[0].link,
      horarioAtencion: localComercialToRemoveAdmin.results[0].horarioAtencion,
      estado: localComercialToRemoveAdmin.results[0].estado,
      privateKeyMercadopago:
        localComercialToRemoveAdmin.results[0].privateKeyMercadopago,
      publicKeyMercadopago:
        localComercialToRemoveAdmin.results[0].publicKeyMercadopago,
      tieneMercadopago: localComercialToRemoveAdmin.results[0].tieneMercadopago,
      refAdministrador: -1,
    };

    yield call(
      updateLocalComercialAsync,
      localComercialToUpdate,
      idLocalComercialToUpdate
    );
    notificacionSuccess('Local Comercial', 'Eliminado correctamente');
  } catch (error) {
    notificacionError('Error', 'Error al eliminar Administrador');
  }
}

function* updateItems({ payload }) {
  // eslint-disable-next-line prefer-destructuring
  const paginaActual = payload.paginaActual;
  console.log('pagina actual');
  console.log(paginaActual);
  // eslint-disable-next-line prefer-destructuring
  const itemsPorPagina = payload.itemsPorPagina;
  console.log('items x pagina');
  console.log(itemsPorPagina);
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
        yield put({ type: LOCALCOMERCIAL_SET_TOTAL_PAGINAS, payload: paginas });
        // Debemos despachar la accion para mostar la pagina actual == 1
        yield put({ type: LOCALCOMERCIALS_CHANGEPAGE, payload: paginaActual });

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
        yield put({ type: LOCALCOMERCIALS_CHANGEPAGE, payload: paginaActual });
        const paginas = valorTruc;
        // Debemos despachar la cantidad de paginas
        yield put({ type: LOCALCOMERCIAL_SET_TOTAL_PAGINAS, payload: paginas });

        // Aca debemos despachar que el startItem es 1
        const startItem = 1;
        yield put({ type: LOCALCOMERCIAL_SET_START_ITEM, payload: startItem });

        // Aca debemos despacha que el end item es items x pagina
        const endItem = itemsPorPagina;
        yield put({ type: LOCALCOMERCIAL_SET_END_ITEM, payload: endItem });
      }
      // Aca desppachamos una accion con los items(Locales comerciales)
      const items = data.results;
      yield put({ type: LOCALCOMERCIALS_SET_ITEMS, payload: items });
      yield put({ type: LOCALCOMERCIALS_SET_TOTAL_ITEMS, payload: totalItems });
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
        yield put({ type: LOCALCOMERCIAL_SET_TOTAL_PAGINAS, payload: paginas });
        // Debemos despachar la accion para mostar la pagina actual == 1
        yield put({ type: LOCALCOMERCIALS_CHANGEPAGE, payload: 1 });

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
        yield put({ type: LOCALCOMERCIAL_SET_TOTAL_PAGINAS, payload: paginas });

        // Debemos despachar la accion para mostar la pagina actual == 1
        yield put({ type: LOCALCOMERCIALS_CHANGEPAGE, payload: paginaActual });

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
      yield put({ type: LOCALCOMERCIALS_SET_ITEMS, payload: items });
      yield put({ type: LOCALCOMERCIALS_SET_TOTAL_ITEMS, payload: totalItems });
    }
    yield put({ type: LOCALCOMERCIAL_AFTER_UPDATE, payload: true });
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

export function* watchGetAdministradoresDisponibles() {
  yield takeLatest(
    LOCALCOMERCIALS_GETADMINSDISPONIBLES,
    getAdministradoresDisponibles
  );
}
export function* watchAddLocalComercial() {
  yield takeEvery(LOCALCOMERCIAL_ADD, addLocalComercial);
}
export function* watchUpdateLocalComercial() {
  yield takeEvery(LOCALCOMERCIAL_UPDATE, updateLocalComercial);
}
export function* watchAsignarAdministrador() {
  yield takeEvery(LOCALCOMERCIAL_ASIGNAR_ADMIN, localComercialAsignarAdmin);
}
export function* watchDeleteLocalComercial() {
  yield takeEvery(LOCALCOMERCIAL_DELETE, deleteLocalComercial);
}
export function* watchRemoveAdministrador() {
  yield takeEvery(LOCALCOMERCIAL_REMOVE_ADMIN, localComercialRemoveAdmin);
}
export function* watchUpdateItems() {
  yield takeEvery(LOCALCOMERCIALS_UPDATE_ITEMS, updateItems);
}
//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------
export default function* rootSaga() {
  yield all([
    fork(watchAddLocalComercial),
    fork(watchUpdateLocalComercial),
    fork(watchGetAdministradoresDisponibles),
    fork(watchAsignarAdministrador),
    fork(watchDeleteLocalComercial),
    fork(watchRemoveAdministrador),
    fork(watchUpdateItems),
  ]);
}
