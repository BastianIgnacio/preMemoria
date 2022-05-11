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
} from '../actions';

const notificacionAddLocalComercial = () => {
  NotificationManager.success(
    'LOCAL COMERCIAL',
    'AGREGADO CORRECTAMENTE',
    4000,
    null,
    null,
    'filled'
  );
};
const notificacionErrorAddLocalComercial = () => {
  NotificationManager.error(
    'LOCAL COMERCIAL',
    'NO ES POSIBLE AGREGAR',
    4000,
    null,
    null,
    'filled'
  );
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
    notificacionAddLocalComercial();
  } catch (error) {
    notificacionErrorAddLocalComercial();
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
    notificacionAddLocalComercial();
  } catch (error) {
    notificacionErrorAddLocalComercial();
  }
}

function* getAdministradoresDisponibles() {
  try {
    // eslint-disable-next-line no-unused-vars
    const adminsDisponibles = yield call(
      getAdministradoresLocalesComercialesDisponiblesAsync
    );
    yield put({
      type: LOCALCOMERCIALS_SETADMINSDISPONIBLES,
      payload: adminsDisponibles.results,
    });
  } catch (error) {
    console.log('Error al cargar los admins');
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
    }
  } catch (error) {
    console.log('Error');
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
  } catch (error) {
    console.log('Error');
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
  } catch (error) {
    console.log('Error');
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
  ]);
}
