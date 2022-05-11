import { all, call, fork, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { apiRestUrl } from '../../constants/defaultValues';
import { NotificationManager } from '../../components/common/react-notifications';

import {
  ADMINLOCALCOMERCIAL_ADD,
  ADMINLOCALCOMERCIAL_REMOVE,
  ADMINLOCALCOMERCIAL_UPDATE,
  ADMINLOCALCOMERCIAL_UPDATE_CREDENTIAL,
} from '../actions';

const notificacionAddAdminLocalComercial = () => {
  NotificationManager.success(
    'ADMINISTRADOR',
    'AGREGADO CORRECTAMENTE',
    4000,
    null,
    null,
    'filled'
  );
};
const notificacionErrorAddAminLocalComercial = () => {
  NotificationManager.error(
    'ADMINISTRADOR',
    'NO ES POSIBLE AGREGAR',
    4000,
    null,
    null,
    'filled'
  );
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

function* addAdministradorLocalComercial({ payload }) {
  try {
    // eslint-disable-next-line no-unused-vars
    yield call(addAdministradorLocalComercialAsync, payload);
    // Aca se deberia llamar a la notificacion
    notificacionAddAdminLocalComercial();
  } catch (error) {
    notificacionErrorAddAminLocalComercial();
  }
}

function* removeAdministradorLocalComercial({ payload }) {
  try {
    // eslint-disable-next-line no-unused-vars
    const response = yield call(
      removeAdministradorLocalComercialAsync,
      payload
    );
    // Aca se deberia llamar a la notificacion
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
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

export default function* rootSaga() {
  yield all([
    fork(watchAddAdministradorLocalComercial),
    fork(watchRemoveAdministradorLocalComercial),
    fork(watchUpdateAdministradorLocalComercial),
    fork(watchUpdateCredentials),
  ]);
}
