/* eslint-disable no-unused-vars */
import {
  all,
  call,
  fork,
  takeEvery,
  takeLatest,
  put,
} from 'redux-saga/effects';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { apiRestUrl } from '../../constants/defaultValues';
import { NotificationManager } from '../../components/common/react-notifications';

import {
  TIENDA_IS_LOADED,
  TIENDA_IS_EXIST,
  TIENDA_SET_IDTIENDA,
  TIENDA_SET_CATEGORIAS,
  TIENDA_SET_CATEGORIA_SELECCIONADA,
  TIENDA_SET_PRODUCTOS,
  TIENDA_SET_PRODUCTO_SELECCIONADO,
  //
  TIENDA_CARGAR_TIENDA,
  TIENDA_SET_TIENDA,
  TIENDA_CARGAR_PRODUCTOS_CATEGORIA,
  CARRITO_CARGAR_CARRITO,
  CARRITO_INIT,
  CARRITO_SUM_PRODUCTO,
  CARRITO_RES_PRODUCTO,
  CARRITO_ELIMINAR_PRODUCTO,
  CARRITO_CARGAR_METODOS_PAGO,
  CARRITO_CARGAR_METODOS_ENTREGA,
  CARRITO_PROCESAR,
  CARRITO_SUCCESS,
  CARRITO_CARGAR_CARRITO_SUM_RES,
  CARRITO_PROCESAR_MERCADOPAGO,
  CARRITO_RESPONSE_MERCADOPAGO,
  VENTA_CHANGE_DATE,
} from '../actions';

/** NOTIFICACIONES  */
const notificacionError = (titulo, subtitulo) => {
  NotificationManager.error(titulo, subtitulo, 4000, null, null, 'filled');
};
const notificacionSuccess = (titulo, subtitulo) => {
  NotificationManager.success(titulo, subtitulo, 4000, null, null, 'filled');
};

const formatDateFecha = (date) => {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();
  const tab = '\u00A0';
  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;
  return (
    // eslint-disable-next-line prefer-template
    [year, month, day].join('-')
  );
};

const formatDateHora = (date) => {
  const d = new Date(date);
  let hora = d.getHours();
  let minute = d.getMinutes();
  let segundo = d.getSeconds();
  const tab = '\u00A0';
  if (hora < 10) hora = `0${hora}`;
  if (minute < 10) minute = `0${minute}`;
  if (segundo < 10) segundo = `0${segundo}`;
  return (
    // eslint-disable-next-line prefer-template
    '[' + [hora, minute, segundo].join(':') + ']'
  );
};

//* * LLAMADAS AXIOS POST, DELETE, PUT, GET */

// GET para obtener una tienda en base al link
const getTiendaAsync = async (link) => {
  return axios
    .get(`${apiRestUrl}/localComercials/?link=${link}`)
    .then((res) => {
      return res.data;
    });
};

// GET para obtener la informacion de un payment
const getPaymentInfoAsync = async (payment, accessToken) => {
  return axios
    .get(
      `https://api.mercadopago.com/v1/payments/${payment}/?access_token=${accessToken}`
    )
    .then((res) => {
      return res.data;
    });
};

// Post para agregar una venta a un local Comercial
const postAddVentaAsync = async (venta) =>
  axios.post(`${apiRestUrl}/ventas/`, venta);

const putVentaAsync = async (idVenta, venta) =>
  axios.put(`${apiRestUrl}/ventas/${idVenta}/`, venta);

// Post para agregar un productoVenta a una venta
const postAddProductoVentaAsync = async (productoVenta) =>
  axios.post(`${apiRestUrl}/productoVentas/`, productoVenta);

// Post para agregar una orden a un local Comercial
const postAddOrdenAsync = async (orden) =>
  axios.post(`${apiRestUrl}/ordens/`, orden);
// Post para agregar un productoOrden a una orden
const postAddProductoOrdenAsync = async (productoOrden) =>
  axios.post(`${apiRestUrl}/productoOrdens/`, productoOrden);

// Post para crear una preferencia en MercadoPago Desde nuestra API
const postCreatePreference = async (productos) =>
  axios.post(`${apiRestUrl}/mercadoPago/`, productos);

//* * FUNCIONES */
// Funcion para actualizar los items que se muestran
// Funcion para iniciar el carrito de compras
function* carritoInit({ payload }) {
  const linkTienda = payload;
  try {
    const data = yield call(getTiendaAsync, linkTienda);
    const { results } = data;
    // NO EXISTE LA TIENDA
    if (results.length === 0) {
      yield put({
        type: TIENDA_IS_EXIST,
        payload: false,
      });
      yield put({
        type: TIENDA_IS_LOADED,
        payload: true,
      });
    } else {
      // LA TIENDA SI EXISTE
      const tienda = results[0];
      const idTienda = tienda.id;
      // PREGUNTAMOS SI EL CARRITO DEL LOCALSTORAGE ES NULL
      if (JSON.parse(localStorage.getItem('carritoLocalStorage')) === null) {
        yield put({
          type: CARRITO_CARGAR_CARRITO,
          payload: {
            idTienda,
            arrayCarrito: [],
            total: 0,
            link: tienda.link,
          },
        });
      } else {
        // EL CARRITO DEL LOCALSTORAGE NO ES NULL, POR ENDE DEBEN HABER PRODUCTOS.
        const carritoLocal = JSON.parse(
          localStorage.getItem('carritoLocalStorage')
        );
        const carritoTienda = carritoLocal.filter(
          (producto) => producto.idLocalComercial === idTienda
        );
        const total = carritoTienda.reduce(
          (sum, el) => sum + el.precio * el.cantidad,
          0
        );
        yield put({
          type: CARRITO_CARGAR_CARRITO,
          payload: {
            idTienda,
            arrayCarrito: carritoTienda,
            total,
            link: tienda.link,
          },
        });
        yield put({
          type: CARRITO_CARGAR_METODOS_PAGO,
          payload: {
            pagoRetiroLocalEfectivo: tienda.pagoRetiroLocalEfectivo,
            pagoRetiroLocalPos: tienda.pagoRetiroLocalPos,
            pagoRetiroLocalMercadopago: tienda.pagoRetiroLocalMercadopago,
            pagoDeliveryEfectivo: tienda.pagoDeliveryEfectivo,
            pagoDeliveryPos: tienda.pagoDeliveryPos,
            pagoDeliveryMercadopago: tienda.pagoDeliveryMercadopago,
          },
        });
        yield put({
          type: CARRITO_CARGAR_METODOS_ENTREGA,
          payload: {
            tieneDelivery: tienda.tieneDelivery,
            tieneRetiroLocal: tienda.tieneRetiroLocal,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    notificacionError('Error', 'Al cargar el carrito');
  }
}

// Funcion para sumar producto en el carrito de compras
function* carritoSumProducto({ payload }) {
  const productoSum = payload;
  const { keyCarritoProducto, idLocalComercial } = productoSum;
  try {
    // OBTENEMOS EL CARRITO DE COMPRAS A NIVEL GLOBAL
    const carritoLocal = JSON.parse(
      localStorage.getItem('carritoLocalStorage')
    );
    const found = carritoLocal.find(
      (element) => element.keyCarritoProducto === keyCarritoProducto
    );
    if (found !== undefined) {
      // OBTENEMOS LA POSICION EN LA QUE ESTA EN EL CARRITO GLOBAL
      const index = carritoLocal.indexOf(found);
      let cantProducto = carritoLocal[index].cantidad;
      const precioProducto = carritoLocal[index].precio;
      let totalProducto = carritoLocal[index].total;
      cantProducto += 1;
      totalProducto = cantProducto * precioProducto;

      carritoLocal[index].cantidad = cantProducto;
      carritoLocal[index].total = totalProducto;
      const nuevoArray = [...carritoLocal];

      // Le enviamos el nuevo carrito editado al local storage
      localStorage.setItem('carritoLocalStorage', JSON.stringify(nuevoArray));
      const carritoTienda = nuevoArray.filter(
        (producto) => producto.idLocalComercial === idLocalComercial
      );
      const total = carritoTienda.reduce(
        (sum, el) => sum + el.precio * el.cantidad,
        0
      );
      yield put({
        type: CARRITO_CARGAR_CARRITO_SUM_RES,
        payload: {
          arrayCarrito: carritoTienda,
          total,
        },
      });
    }
  } catch (error) {
    console.log(error);
    notificacionError('Error', 'Al sumar el producto');
  }
}

// Funcion para restar producto en el carrito de compras
function* carritoResProducto({ payload }) {
  const productoRes = payload;
  const { keyCarritoProducto, idLocalComercial } = productoRes;
  try {
    // OBTENEMOS EL CARRITO DE COMPRAS A NIVEL GLOBAL
    const carritoLocal = JSON.parse(
      localStorage.getItem('carritoLocalStorage')
    );
    const found = carritoLocal.find(
      (element) => element.keyCarritoProducto === keyCarritoProducto
    );
    if (found !== undefined) {
      // OBTENEMOS LA POSICION EN LA QUE ESTA EN EL CARRITO GLOBAL
      const index = carritoLocal.indexOf(found);
      let cantProducto = carritoLocal[index].cantidad;
      const precioProducto = carritoLocal[index].precio;
      let totalProducto = carritoLocal[index].total;
      cantProducto -= 1;
      totalProducto = cantProducto * precioProducto;

      carritoLocal[index].cantidad = cantProducto;
      carritoLocal[index].total = totalProducto;

      // Si la cantidad de producto es igual a cero
      if (cantProducto === 0) {
        // preguntar si desean eliminar el producto
        return;
      }
      const nuevoArray = [...carritoLocal];
      // Le enviamos el nuevo carrito editado al local storage
      localStorage.setItem('carritoLocalStorage', JSON.stringify(nuevoArray));
      const carritoTienda = nuevoArray.filter(
        (producto) => producto.idLocalComercial === idLocalComercial
      );
      const total = carritoTienda.reduce(
        (sum, el) => sum + el.precio * el.cantidad,
        0
      );
      yield put({
        type: CARRITO_CARGAR_CARRITO_SUM_RES,
        payload: {
          arrayCarrito: carritoTienda,
          total,
        },
      });
    }
  } catch (error) {
    console.log(error);
    notificacionError('Error', 'Al restar el producto');
  }
}
// Funcion para eliminar producto en el carrito de compras
function* carritoEliminarProducto({ payload }) {
  console.log('ejecutando carrito eliminar en el saga');
  const { keyCarritoProducto, idLocalComercial } = payload;
  console.log(keyCarritoProducto);
  try {
    // OBTENEMOS EL CARRITO DE COMPRAS A NIVEL GLOBAL
    const carritoLocal = JSON.parse(
      localStorage.getItem('carritoLocalStorage')
    );
    const found = carritoLocal.find(
      (element) => element.keyCarritoProducto === keyCarritoProducto
    );
    if (found !== undefined) {
      // OBTENEMOS LA POSICION EN LA QUE ESTA EN EL CARRITO GLOBAL
      const index = carritoLocal.indexOf(found);
      carritoLocal.splice(index, 1);
      const nuevoArray = [...carritoLocal];
      // Le enviamos el nuevo carrito editado al local storage
      localStorage.setItem('carritoLocalStorage', JSON.stringify(nuevoArray));
      const carritoTienda = nuevoArray.filter(
        (producto) => producto.idLocalComercial === idLocalComercial
      );
      console.log('carrito Tienda');
      console.log(carritoTienda);
      const total = carritoTienda.reduce(
        (sum, el) => sum + el.precio * el.cantidad,
        0
      );
      yield put({
        type: CARRITO_CARGAR_CARRITO,
        payload: {
          idTienda: idLocalComercial,
          arrayCarrito: carritoTienda,
          total,
        },
      });
    }
  } catch (error) {
    console.log(error);
    notificacionError('Error', 'Al restar el producto');
  }
}

// Funcion para procesar un carrito de compra
function* carritoProcesar({ payload }) {
  const {
    venta,
    productosVenta,
    orden,
    productosOrden,
    history,
    link,
    localComercialData,
    ordenSuccess,
    mercadoPago,
    modalCard,
    modalMercadoPago,
    modalFinalizarCompra,
  } = payload;
  try {
    if (mercadoPago) {
      // Bajamos los modals
      modalFinalizarCompra(false);
      modalCard(false);

      // ENVIAMOS LA VENTA
      const dataPost = yield call(postAddVentaAsync, venta);
      // TENEMOS LA REFERENCIA DE LA VENTA
      const refVenta = dataPost.data.id;

      // CREAMOS LA PREFERENCIA DE MERCADOLIBRE
      const items = [];
      productosVenta.map((producto) => {
        return items.push({
          tittle: producto.nombreProducto,
          quantity: producto.cantidad,
          unit_price: producto.precioUnitario,
        });
      });

      // eslint-disable-next-line camelcase
      const back_urls = {
        success: 'http://192.168.3.4:3000/mercadopago/success',
        pending: 'http://192.168.3.4:3000/mercadopago/pending',
        failure: 'http://192.168.3.4:3000/mercadopago/failure',
      };

      // eslint-disable-next-line camelcase
      const notification_url = 'https://eobcigwtc8r9uo9.m.pipedream.net';
      // PREFERENCIA CREADA
      const preference = {
        external_reference: refVenta,
        items,
        back_urls,
        notification_url,
        auto_return: 'approved',
      };

      // ENVIAMOS LA PREFERENCIA A NUESTRA API
      const response = yield call(postCreatePreference, preference);

      // Tenemos los datos de la preferencia
      const dataPreference = response.data;

      yield put({
        type: CARRITO_RESPONSE_MERCADOPAGO,
        payload: dataPreference,
      });

      // DEBEMOS MODIFICAR PARA ENVIAR LAS CREDENCIALES DE MERCADOPAGO
      const ventaMercadoPago = {
        ...venta,
        pagadoViaMercadopago: true,
        mercadopago_external_reference: refVenta,
        mercadopago_preference_id: dataPreference.id,
        mercadopago_status: '-',
        mercadopago_payment_id: '-',
        mercadopago_collection_id: '-',
        mercadopago_collection_status: '-',
        mercadopago_merchant_order_id: '-',
      };

      // DEBEMOS ENVIAR EL PUT DE LA VENTA
      const responsePutVenta = yield call(
        putVentaAsync,
        refVenta,
        ventaMercadoPago
      );
      // TENEMOS EL ARRAY DE PRODUCTOS DE LA VENTA
      const pvArray = productosVenta.map((productoVenta) => {
        const pvSend = {
          cantidad: productoVenta.cantidad,
          descripcionProducto: productoVenta.descripcionProducto,
          nombreProducto: productoVenta.nombreProducto,
          precioUnitario: productoVenta.precioUnitario,
          total: productoVenta.total,
          refVenta,
        };
        return pvSend;
      });

      // ENVIAMOS LOS PRODUCTOS DE LA VENTA
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < pvArray.length; i++) {
        yield call(postAddProductoVentaAsync, pvArray[i]);
      }

      // HACEMOS LA ORDEN
      const ordenSend = { ...orden, refVenta };
      // ENVIAMOS LA ORDEN
      console.log(ordenSend);
      const dataPostOrden = yield call(postAddOrdenAsync, ordenSend);
      // TENEMOS LA REFERENCIA DE LA ORDEN
      const refOrden = dataPostOrden.data.id;
      // TENEMOS EL ARRAY DE PRODUCTOS DE LA ORDEN CON NOTAS ESPECIALES
      const poArray = productosOrden.map((productoOrden) => {
        return { ...productoOrden, refOrden };
      });
      // ENVIAMOS LOS PRODUCTOS DE LA ORDEN
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < poArray.length; i++) {
        yield call(postAddProductoOrdenAsync, poArray[i]);
      }

      // LIMPIAMOS EL ARRAY DEL LOCALSTORAGE
      const nuevoArray = [];
      // Le enviamos el nuevo carrito editado al local storage
      localStorage.setItem('carritoLocalStorage', JSON.stringify(nuevoArray));
      console.log('eliminado items del carrito');
      // AHORA SE DEBE REDIRECCIONAR DESDE EL SDK DE MERCADOPAGO
      // ABRIMOS EL MODAL DONDE SE HARA LA TRANSACCION DE MERCADOPAGO
      modalMercadoPago(true);
    } else {
      // ENVIAMOS LA VENTA
      const dataPost = yield call(postAddVentaAsync, venta);
      // TENEMOS LA REFERENCIA DE LA VENTA
      const refVenta = dataPost.data.id;
      // TENEMOS EL ARRAY DE PRODUCTOS DE LA VENTA
      const pvArray = productosVenta.map((productoVenta) => {
        const pvSend = {
          cantidad: productoVenta.cantidad,
          descripcionProducto: productoVenta.descripcionProducto,
          nombreProducto: productoVenta.nombreProducto,
          precioUnitario: productoVenta.precioUnitario,
          total: productoVenta.total,
          refVenta,
        };
        return pvSend;
      });

      // ENVIAMOS LOS PRODUCTOS DE LA VENTA
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < pvArray.length; i++) {
        yield call(postAddProductoVentaAsync, pvArray[i]);
      }

      // HACEMOS LA ORDEN
      const ordenSend = { ...orden, refVenta };
      // ENVIAMOS LA ORDEN
      console.log(ordenSend);
      const dataPostOrden = yield call(postAddOrdenAsync, ordenSend);
      // TENEMOS LA REFERENCIA DE LA ORDEN
      const refOrden = dataPostOrden.data.id;
      // TENEMOS EL ARRAY DE PRODUCTOS DE LA ORDEN CON NOTAS ESPECIALES
      const poArray = productosOrden.map((productoOrden) => {
        return { ...productoOrden, refOrden };
      });
      // ENVIAMOS LOS PRODUCTOS DE LA ORDEN
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < poArray.length; i++) {
        yield call(postAddProductoOrdenAsync, poArray[i]);
      }

      // LIMPIAMOS EL ARRAY DEL LOCALSTORAGE
      const nuevoArray = [];
      // Le enviamos el nuevo carrito editado al local storage
      localStorage.setItem('carritoLocalStorage', JSON.stringify(nuevoArray));
      console.log('eliminado items del carrito');

      // AHORA DEBEMOS ENVIAR UN SUCESS DE LA COMPRA
      // PROCESAMOS LA FECHA PARA SETEARLA EN EL REDUCER
      const fechaSuccess = formatDateFecha(dataPostOrden.data.fecha);
      const horaSuccess = formatDateHora(dataPostOrden.data.fecha);
      yield put({
        type: CARRITO_SUCCESS,
        payload: {
          ordenSuccess: dataPostOrden.data,
          arrayOrdenSuccess: poArray,
          localComercialData,
          fechaSuccess,
          horaSuccess,
        },
      });
      ordenSuccess();
    }
  } catch (error) {
    console.log(error);
    notificacionError('Error', 'Error al enviar la orden');
  }
}

// Funcion para procesar un pago en modo sandBox de mercadopago
function* procesarMercadoPago({ payload }) {
  const {
    refVenta,
    productosVenta,
    modalCard,
    modalMercadoPago,
    modalFinalizarCompra,
  } = payload;
  modalFinalizarCompra(false);
  modalCard(false);
  const items = [];
  productosVenta.map((producto) => {
    return items.push({
      tittle: producto.nombreProducto,
      quantity: producto.cantidad,
      unit_price: producto.precioUnitario,
    });
  });

  // eslint-disable-next-line camelcase
  const back_urls = {
    success: 'http://192.168.3.4:3000/mercadopago/success',
    pending: 'http://192.168.3.4:3000/mercadopago/pending',
    failure: 'http://192.168.3.4:3000/mercadopago/failure',
  };

  // eslint-disable-next-line camelcase
  const notification_url = 'https://eobcigwtc8r9uo9.m.pipedream.net';

  const preference = {
    external_reference: refVenta,
    items,
    back_urls,
    notification_url,
    auto_return: 'approved',
  };
  try {
    const response = yield call(postCreatePreference, preference);

    // Tenemos los datos de la preferencia
    const dataPreference = response.data;
    console.log(dataPreference);
    yield put({ type: CARRITO_RESPONSE_MERCADOPAGO, payload: dataPreference });

    // Debemos buscar la venta correspondiente
    // Debemos modificar la venta (con las variables de mercadopago)
    // Debemos hacer un put de la venta

    // Debemos buscar la orden y especificar que no ha sido pagada
    // Debemos hacer un put de la orden y poner como no pagada
    modalMercadoPago(true);
  } catch (error) {
    console.log(error);
    notificacionError('Error', 'Error con mercadopago');
  }
}
export function* watchCarritoInit() {
  yield takeEvery(CARRITO_INIT, carritoInit);
}
export function* watchCarritoSumProducto() {
  yield takeLatest(CARRITO_SUM_PRODUCTO, carritoSumProducto);
}
export function* watchCarritoResProducto() {
  yield takeLatest(CARRITO_RES_PRODUCTO, carritoResProducto);
}
export function* watchCarritoEliminarProducto() {
  yield takeEvery(CARRITO_ELIMINAR_PRODUCTO, carritoEliminarProducto);
}
export function* watchCarritoProcesar() {
  yield takeEvery(CARRITO_PROCESAR, carritoProcesar);
}
export function* watchProcesarMercadoPago() {
  yield takeEvery(CARRITO_PROCESAR_MERCADOPAGO, procesarMercadoPago);
}

export default function* rootSaga() {
  yield all([
    fork(watchCarritoInit),
    fork(watchCarritoSumProducto),
    fork(watchCarritoResProducto),
    fork(watchCarritoEliminarProducto),
    fork(watchCarritoProcesar),
    fork(watchProcesarMercadoPago),
  ]);
}
