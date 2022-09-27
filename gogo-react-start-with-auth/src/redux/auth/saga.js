/* eslint-disable no-unused-vars */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import axios from 'axios';
import { auth } from '../../helpers/Firebase';
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  CLICK_CARGAR_DATOS_TIENDA,
  CARGAR_DATOS_TIENDA,
  TIENDA_UPDATE,
  CONFIGURACION_LOADING,
} from '../actions';

import {
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
  loginTiendaSuccess,
} from './actions';

import {
  adminRoot,
  adminLocalComercialRoot,
  superAdminRoot,
  errorRoot,
  loginRoot,
  apiRestUrl,
  themeColorStorageKey,
  UserRole,
} from '../../constants/defaultValues';

import { NotificationManager } from '../../components/common/react-notifications';
// ACA SE GUARDA EL EN LOCALSTORAGE
// eslint-disable-next-line no-unused-vars
import { setCurrentUser, setCurrentTienda } from '../../helpers/Utils';

const notificacionSuccess = (titulo, subtitulo) => {
  NotificationManager.success(titulo, subtitulo, 4000, null, null, 'filled');
};
const notificacionError = (titulo, subtitulo) => {
  NotificationManager.error(titulo, subtitulo, 4000, null, null, 'filled');
};

export function* watchLoginUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

//* Llamada post para hacer el login de usuario  */
const loginWithEmailPasswordAsync = async (user) =>
  // eslint-disable-next-line no-return-await
  await axios.post(`${apiRestUrl}/auth/login`, user);

const getTiendaAsync = async (idTienda) => {
  return axios.get(`${apiRestUrl}/localComercials/${idTienda}/`).then((res) => {
    return res.data;
  });
};

function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  let user = {
    email,
    password,
  };
  try {
    const data = yield call(loginWithEmailPasswordAsync, user); // Aca debemos llamar a la api nuestra
    console.log('Imprimiendo data');
    console.log(data);
    const { message, refresh, access } = data.data; // Sabemos los datos del JWT
    user = data.data.user; // Sabemos los datos del usuario
    const { rol, refTienda } = data.data.user; // Sabemos el rol y la tienda

    // Si EL USUARIO NO TIENE TIENDA NO ES POSIBLE MOSTRAR UNA TIENDA
    /*
    if (refTienda === -1) {
      const error = 'Email o contraseña incorrectos';
      history.push(loginRoot);
      yield put(loginUserError(error));
      return;
    }
    */
    if (rol === 'SuperAdmin') {
      console.log('Es super admin');
      user = {
        role: UserRole.SuperAdmin,
        id: data.data.user.id,
        nombre: data.data.user.nombre,
        apellido: data.data.user.apellido,
        telefono: data.data.user.telefono,
        access: data.data.access,
        refresh: data.data.refresh,
        superAdmin: true,
        img: '/assets/img/profiles/l-1.jpg',
        date: 'Last seen today 15:24',
      };
      console.log(user);
      setCurrentUser(user);
      yield put(loginUserSuccess(user));
      history.push(superAdminRoot);
    }
    if (rol === 'adminLocal') {
      user = {
        role: UserRole.AdminLocalComercial,
        id: data.data.user.id,
        nombre: data.data.user.nombre,
        apellido: data.data.user.apellido,
        telefono: data.data.user.telefono,
        access: data.data.access,
        refresh: data.data.refresh,
        superAdmin: false,
        img: '/assets/img/profiles/l-1.jpg',
        date: 'Last seen today 15:24',
      };
      setCurrentUser(user); // Guardamos el usuario en la memoria LOCAL STORAGE
      const tienda = yield call(getTiendaAsync, refTienda); // Obtenemos los datos de la tienda
      setCurrentTienda(tienda);
      yield put(loginUserSuccess(user));
      yield put(loginTiendaSuccess(tienda));
      history.push(adminLocalComercialRoot);
    }
  } catch (error) {
    const message = 'Email o contraseña incorrectos';
    history.push(loginRoot);
    console.log(error);
    yield put(loginUserError(message));
  }
}

export function* watchLogoutUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async (history) => {
  history.push(adminRoot);
};

function* logout({ payload }) {
  const { history } = payload;
  setCurrentUser(); // Eliminamos el usuario del localStorage
  setCurrentTienda(); // Eliminamos la tienda del localStorage
  yield call(logoutAsync, history);
}

export function* watchForgotPassword() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

const forgotPasswordAsync = async (email) => {
  // eslint-disable-next-line no-return-await
  return await auth
    .sendPasswordResetEmail(email)
    .then((user) => user)
    .catch((error) => error);
};

function* forgotPassword({ payload }) {
  const { email } = payload.forgotUserMail;
  try {
    const forgotPasswordStatus = yield call(forgotPasswordAsync, email);
    if (!forgotPasswordStatus) {
      yield put(forgotPasswordSuccess('success'));
    } else {
      yield put(forgotPasswordError(forgotPasswordStatus.message));
    }
  } catch (error) {
    yield put(forgotPasswordError(error));
  }
}

export function* watchResetPassword() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async (resetPasswordCode, newPassword) => {
  // eslint-disable-next-line no-return-await
  return await auth
    .confirmPasswordReset(resetPasswordCode, newPassword)
    .then((user) => user)
    .catch((error) => error);
};

function* resetPassword({ payload }) {
  const { newPassword, resetPasswordCode } = payload;
  try {
    const resetPasswordStatus = yield call(
      resetPasswordAsync,
      resetPasswordCode,
      newPassword
    );
    if (!resetPasswordStatus) {
      yield put(resetPasswordSuccess('success'));
    } else {
      yield put(resetPasswordError(resetPasswordStatus.message));
    }
  } catch (error) {
    yield put(resetPasswordError(error));
  }
}

function* cargarTienda({ payload }) {
  const refTienda = payload;
  try {
    yield put({ type: CONFIGURACION_LOADING });
    const tienda = yield call(getTiendaAsync, refTienda);
    setCurrentTienda(tienda);
    yield put({
      type: CARGAR_DATOS_TIENDA,
      payload: tienda,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* watchCargarDatosTienda() {
  yield takeEvery(CLICK_CARGAR_DATOS_TIENDA, cargarTienda);
}

// PUT para actualizar un local comercial
const putLocalComercialAsync = async (localComercial, refLocalComercial) =>
  axios.put(
    `${apiRestUrl}/localComercials/${refLocalComercial}/`,
    localComercial
  );

function* actualizarTienda({ payload }) {
  const { localComercial, refLocalComercial } = payload;
  try {
    const result = yield call(
      putLocalComercialAsync,
      localComercial,
      refLocalComercial
    );
    setCurrentTienda(result.data);
    yield put({
      type: CARGAR_DATOS_TIENDA,
      payload: result.data,
    });
    notificacionSuccess('Configuracion', 'Actualizada correctamente');
  } catch (error) {
    notificacionError('Configuracion', 'Error al actualizar');
  }
}

export function* watchTiendaUpdate() {
  yield takeEvery(TIENDA_UPDATE, actualizarTienda);
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    // fork(watchRegisterUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
    fork(watchCargarDatosTienda),
    fork(watchTiendaUpdate),
  ]);
}
