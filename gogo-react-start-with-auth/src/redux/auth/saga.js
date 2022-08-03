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
// ACA SE GUARDA EL EN LOCALSTORAGE
// eslint-disable-next-line no-unused-vars
import { setCurrentUser, setCurrentTienda } from '../../helpers/Utils';

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
    if (refTienda === -1) {
      const error = 'Email o contraseña incorrectos';
      history.push(loginRoot);
      yield put(loginUserError(error));
      return;
    }
    /*
    if (rol === 'SuperAdmin') {
      console.log('Es super admin');
      user = {
        role: UserRole.SuperAdmin,
        id: data.data.user.id,
        first_name: data.data.user.first_name,
        last_name: data.data.user.last_name,
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
    */
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

const registerWithEmailPasswordAsync = async (email, password) =>
  // eslint-disable-next-line no-return-await
  await auth
    .createUserWithEmailAndPassword(email, password)
    .then((user) => user)
    .catch((error) => error);

/*   
function* registerWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const registerUser = yield call(
      registerWithEmailPasswordAsync,
      email,
      password
    );
    if (!registerUser.message) {
      const item = { uid: registerUser.user.uid, ...currentUser };
      setCurrentUser(item);
      yield put(registerUserSuccess(item));
      history.push(adminRoot);
    } else {
      yield put(registerUserError(registerUser.message));
    }
  } catch (error) {
    yield put(registerUserError(error));
  }
}
*/
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

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    // fork(watchRegisterUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
  ]);
}
