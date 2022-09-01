/* eslint-disable import/no-cycle */
/* SETTINGS */
export const CHANGE_LOCALE = 'CHANGE_LOCALE';

/* AUTH */
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';
export const LOGOUT_USER = 'LOGOUT_USER';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';
export const LOGIN_TIENDA_SUCCESS = 'LOGIN_TIENDA_SUCCESS';

/* MENU */
export const MENU_SET_CLASSNAMES = 'MENU_SET_CLASSNAMES';
export const MENU_CONTAINER_ADD_CLASSNAME = 'MENU_CONTAINER_ADD_CLASSNAME';
export const MENU_CLICK_MOBILE_MENU = 'MENU_CLICK_MOBILE_MENU';
export const MENU_CHANGE_DEFAULT_CLASSES = 'MENU_CHANGE_DEFAULT_CLASSES';
export const MENU_CHANGE_HAS_SUB_ITEM_STATUS =
  'MENU_CHANGE_HAS_SUB_ITEM_STATUS';

/* TODOAPP */
export const TODO_GET_LIST = 'TODO_GET_LIST';
export const TODO_GET_LIST_SUCCESS = 'TODO_GET_LIST_SUCCESS';
export const TODO_GET_LIST_ERROR = 'TODO_GET_LIST_ERROR';
export const TODO_GET_LIST_WITH_FILTER = 'TODO_GET_LIST_WITH_FILTER';
export const TODO_GET_LIST_WITH_ORDER = 'TODO_GET_LIST_WITH_ORDER';
export const TODO_GET_LIST_SEARCH = 'TODO_GET_LIST_SEARCH';
export const TODO_ADD_ITEM = 'TODO_ADD_ITEM';
export const TODO_ADD_ITEM_SUCCESS = 'TODO_ADD_ITEM_SUCCESS';
export const TODO_ADD_ITEM_ERROR = 'TODO_ADD_ITEM_ERROR';
export const TODO_SELECTED_ITEMS_CHANGE = 'TODO_SELECTED_ITEMS_CHANGE';

/* CHAT APP */
export const CHAT_GET_CONTACTS = 'CHAT_GET_CONTACTS';
export const CHAT_GET_CONTACTS_SUCCESS = 'CHAT_GET_CONTACTS_SUCCESS';
export const CHAT_GET_CONTACTS_ERROR = 'CHAT_GET_CONTACTS_ERROR';
export const CHAT_GET_CONVERSATIONS = 'CHAT_GET_CONVERSATIONS';
export const CHAT_GET_CONVERSATIONS_SUCCESS = 'CHAT_GET_CONVERSATIONS_SUCCESS';
export const CHAT_GET_CONVERSATIONS_ERROR = 'CHAT_GET_CONVERSATIONS_ERROR';
export const CHAT_ADD_MESSAGE_TO_CONVERSATION =
  'CHAT_ADD_MESSAGE_TO_CONVERSATION';
export const CHAT_CREATE_CONVERSATION = 'CHAT_CREATE_CONVERSATION';
export const CHAT_SEARCH_CONTACT = 'CHAT_SEARCH_CONTACT';
export const CHAT_CHANGE_CONVERSATION = 'CHAT_CHANGE_CONVERSATION';

/* SURVEY LIST APP */
export const SURVEY_LIST_GET_LIST = 'SURVEY_LIST_GET_LIST';
export const SURVEY_LIST_GET_LIST_SUCCESS = 'SURVEY_LIST_GET_LIST_SUCCESS';
export const SURVEY_LIST_GET_LIST_ERROR = 'SURVEY_LIST_GET_LIST_ERROR';
export const SURVEY_LIST_GET_LIST_WITH_FILTER =
  'SURVEY_LIST_GET_LIST_WITH_FILTER';
export const SURVEY_LIST_GET_LIST_WITH_ORDER =
  'SURVEY_LIST_GET_LIST_WITH_ORDER';
export const SURVEY_LIST_GET_LIST_SEARCH = 'SURVEY_LIST_GET_LIST_SEARCH';
export const SURVEY_LIST_ADD_ITEM = 'SURVEY_LIST_ADD_ITEM';
export const SURVEY_LIST_ADD_ITEM_SUCCESS = 'SURVEY_LIST_ADD_ITEM_SUCCESS';
export const SURVEY_LIST_ADD_ITEM_ERROR = 'SURVEY_LIST_ADD_ITEM_ERROR';
export const SURVEY_LIST_SELECTED_ITEMS_CHANGE =
  'SURVEY_LIST_SELECTED_ITEMS_CHANGE';

/* SURVEY DETAIL APP */
export const SURVEY_GET_DETAILS = 'SURVEY_GET_DETAILS';
export const SURVEY_GET_DETAILS_SUCCESS = 'SURVEY_GET_DETAILS_SUCCESS';
export const SURVEY_GET_DETAILS_ERROR = 'SURVEY_GET_DETAILS_ERROR';
export const SURVEY_DELETE_QUESTION = 'SURVEY_DELETE_QUESTION';
export const SURVEY_SAVE = 'SURVEY_SAVE';

/* ACTION DE Tienda */
export const TIENDA_LIST_GET_PRODUCTS = 'TIENDA_LIST_GET_PRODUCTS';
export const TIENDA_LIST_GET_PRODUCTS_SUCCESS =
  'TIENDA_LIST_GET_PRODUCTS_SUCCESS';

export const CARRITO_ADD_NEW_PRODUCT = 'CARRITO_ADD_NEW_PRODUCT';
export const CARRITO_DELETE_PRODUCT = 'CARRITO_DELETE_PRODUCT';
export const CARRITO_ADD_PRODUCT = 'CARRITO_ADD_PRODUCT';
export const CARRITO_SUBTRACT_PRODUCT = 'CARRITO_SUBTRACT_PRODUCT';

/* ACTION DE LocalComercial */
// ACTIONS PARA LA LISTA DE LOCALES COMERCIALES
export const LOCALCOMERCIAL_IS_LOADED = 'LOCALCOMERCIAL_IS_LOADED';
export const LOCALCOMERCIAL_SET_START_ITEM = 'LOCALCOMERCIAL_SET_START_ITEM';
export const LOCALCOMERCIAL_SET_END_ITEM = 'LOCALCOMERCIAL_SET_END_ITEM';
export const LOCALCOMERCIAL_SET_PAGINA_ACTUAL =
  'LOCALCOMERCIAL_SET_PAGINA_ACTUAL';
export const LOCALCOMERCIAL_SET_PAGINAS = 'LOCALCOMERCIAL_SET_PAGINAS';
export const LOCALCOMERCIAL_SET_ITEMS = 'LOCALCOMERCIAL_SET_ITEMS';
export const LOCALCOMERCIAL_SET_TOTAL_ITEMS = 'LOCALCOMERCIAL_SET_TOTAL_ITEMS';
export const LOCALCOMERCIAL_SET_ITEMS_POR_PAGINA =
  'LOCALCOMERCIAL_SET_ITEMS_POR_PAGINA';
export const LOCALCOMERCIAL_ADMINISTRADOR = 'LOCALCOMERCIAL_ADMINISTRADOR';
//
export const LOCALCOMERCIAL_CARGAR_LOCALES = 'LOCALCOMERCIAL_CARGAR_LOCALES';
export const LOCALCOMERCIAL_UPDATE_ITEMS = 'LOCALCOMERCIAL_UPDATE_ITEMS';
export const LOCALCOMERCIAL_CARGAR_ADMINISTRADOR =
  'LOCALCOMERCIAL_CARGAR_ADMINISTRADOR';
export const LOCALCOMERCIAL_MODIFICAR_CREDENCIALES =
  'LOCALCOMERCIAL_MODIFICAR_CREDENCIALES';
export const LOCALCOMERCIAL_EDITAR = 'LOCALCOMERCIAL_EDITAR';
export const LOCALCOMERCIAL_CHANGE_PAGE = 'LOCALCOMERCIAL_CHANGE_PAGE';
export const LOCALCOMERCIAL_CHANGE_PAGE_SIZE = 'LOCALCOMERCIAL_CHANGE_PAGE';
export const LOCALCOMERCIAL_ELIMINAR = 'LOCALCOMERCIAL_ELIMINAR';

/* ACTIONS de AdministradoreS LocalComercial */
export const ADMINLOCALCOMERCIAL_ADD = 'ADMINLOCALCOMERCIAL_ADD';
export const ADMINLOCALCOMERCIAL_REMOVE = 'ADMINLOCALCOMERCIAL_REMOVE';
export const ADMINLOCALCOMERCIAL_UPDATE = 'ADMINLOCALCOMERCIAL_UPDATE';
export const ADMINLOCALCOMERCIAL_UPDATE_CREDENTIAL =
  'ADMINLOCALCOMERCIAL_UPDATE_CREDENTIAL';
export const ADMINLOCALCOMERCIAL_UPDATE_ITEMS =
  'ADMINLOCALCOMERCIAL_UPDATE_ITEMS';
export const ADMINLOCALCOMERCIAL_SET_ITEMS = 'ADMINLOCALCOMERCIAL_SET_ITEMS';
export const ADMINLOCALCOMERCIAL_SET_TOTAL_ITEMS =
  'ADMINLOCALCOMERCIAL_SET_TOTAL_ITEMS';
export const ADMINLOCALCOMERCIAL_SET_START_ITEM =
  'ADMINLOCALCOMERCIAL_SET_START_ITEM';
export const ADMINLOCALCOMERCIAL_SET_END_ITEM =
  'ADMINLOCALCOMERCIAL_SET_END_ITEM';
export const ADMINLOCALCOMERCIAL_SET_PAGINA_ACTUAL =
  'ADMINLOCALCOMERCIAL_SET_PAGINA_ACTUAL';
export const ADMINLOCALCOMERCIAL_SET_PAGINAS =
  'ADMINLOCALCOMERCIAL_SET_PAGINAS';
export const ADMINLOCALCOMERCIAL_SET_ITEM_POR_PAGINA =
  'ADMINLOCALCOMERCIAL_SET_ITEM_POR_PAGINA';
export const ADMINLOCALCOMERCIAL_ISLOADED = 'ADMINLOCALCOMERCIAL_ISLOADED';
export const ADMINLOCALCOMERCIAL_SET_PRIMERA_CARGA =
  'ADMINLOCALCOMERCIAL_SET_PRIMERA_CARGA';
export const ADMINLOCALCOMERCIAL_RESET = 'ADMINLOCALCOMERCIAL_RESET';

/* ACTIONS de CATEGORIAS */
// ACTIONS LLAMADAS DESDE SAGA, NO TIENEN SIDE EFFECT ( TIENEN REDUCER )
export const CATEGORIA_SET_START_ITEM = 'CATEGORIA_SET_START_ITEM';
export const CATEGORIA_SET_END_ITEM = 'CATEGORIA_SET_END_ITEM';
export const CATEGORIA_SET_PAGINA_ACTUAL = 'CATEGORIA_SET_PAGINA_ACTUAL';
export const CATEGORIA_SET_PAGINAS = 'CATEGORIA_SET_PAGINAS';
export const CATEGORIA_SET_ITEMS = 'CATEGORIA_SET_ITEMS';
export const CATEGORIA_SET_TOTAL_ITEMS = 'CATEGORIA_SET_TOTAL_ITEMS';
export const CATEGORIA_IS_LOADED = 'CATEGORIA_IS_LOADED';
export const CATEGORIA_SET_ITEMS_POR_PAGINA = 'CATEGORIA_SET_ITEMS_POR_PAGINA';
// ACTION LLAMADA DESDE SAGA, TIENE SIDE EFFECT (NO TIENE REDUCER)
export const CATEGORIA_UPDATE_ITEMS = 'CATEGORIA_UPDATE_ITEMS';
/* ACTION LLAMADAS DESDE VIEWS, TIENEN SIDEEFFECTS (NO TIENE REDUCER) */
export const CATEGORIA_CARGAR_CATEGORIAS = 'CATEGORIA_CARGAR_CATEGORIAS';
export const CATEGORIA_ADD = 'CATEGORIA_ADD';
export const CATEGORIA_UPDATE = 'CATEGORIA_UPDATE';
export const CATEGORIA_DELETE = 'CATEGORIA_DELETE';
export const CATEGORIA_CHANGE_PAGE_SIZE = 'CATEGORIA_CHANGE_PAGE_SIZE';
export const CATEGORIA_CHANGE_PAGE = 'CATEGORIA_CHANGE_PAGE';

/* ACTIONS de PRODUCTOS */
// ACTIONS LLAMADAS DESDE SAGA, NO TIENEN SIDE EFFECT ( TIENEN REDUCER )
export const PRODUCTO_IS_LOADED = 'PRODUCTO_IS_LOADED';
export const PRODUCTO_SET_ITEMS = 'PRODUCTO_SET_ITEMS';
export const PRODUCTO_SET_TOTAL_ITEMS = 'PRODUCTO_SET_TOTAL_ITEMS';
export const PRODUCTO_SET_START_ITEM = 'PRODUCTO_SET_START_ITEM';
export const PRODUCTO_SET_END_ITEM = 'PRODUCTO_SET_END_ITEM';
export const PRODUCTO_SET_PAGINA_ACTUAL = 'PRODUCTO_SET_PAGINA_ACTUAL';
export const PRODUCTO_SET_ITEMS_POR_PAGINA = 'PRODUCTO_SET_ITEMS_POR_PAGINA';
export const PRODUCTO_SET_PAGINAS = 'PRODUCTO_SET_PAGINAS';
export const PRODUCTO_SET_SELECTED_CATEGORIA =
  'PRODUCTO_SET_SELECTED_CATEGORIA';
export const PRODUCTO_SET_CATEGORIAS = 'PRODUCTO_SET_CATEGORIAS';
export const PRODUCTO_SET_CATEGORIA_ID = 'PRODUCTO_SET_CATEGORIA_ID';
// ACTION LLAMADA DESDE SAGA, TIENE SIDE EFFECT (NO TIENE REDUCER)
export const PRODUCTO_UPDATE_ITEMS = 'PRODUCTO_UPDATE_ITEMS';
// ACTION LLAMADAS DESDE LAS VIEWS , TIENEN SIDE EFFECTS (NO TIENEN REDUCER)
export const PRODUCTO_ADD = 'PRODUCTO_ADD';
export const PRODUCTO_UPDATE = 'PRODUCTO_UPDATE';
export const PRODUCTO_DELETE = 'PRODUCTO_DELETE';
export const PRODUCTO_CARGAR_CATEGORIAS = 'PRODUCTO_CARGAR_CATEGORIAS';
export const PRODUCTO_CHANGE_CATEGORIA = 'PRODUCTO_CHANGE_CATEGORIA';
export const PRODUCTO_CHANGE_PAGE_SIZE = 'PRODUCTO_CHANGE_PAGE_SIZE';
export const PRODUCTO_CHANGE_PAGE = 'PRODUCTO_CHANGE_PAGE';

/* ACTIONS DE VENTAS */
// ACTIONS LLAMADAS DESDE SAGA, NO TIENEN SIDE EFFECT ( TIENEN REDUCER )
export const VENTA_IS_LOADED = 'VENTA_IS_LOADED';
export const VENTA_SET_ITEMS = 'VENTA_SET_ITEMS';
export const VENTA_SET_TOTAL_ITEMS = 'VENTA_SET_TOTAL_ITEMS';
export const VENTA_SET_START_ITEM = 'VENTA_SET_START_ITEM';
export const VENTA_SET_END_ITEM = 'VENTA_SET_END_ITEM';
export const VENTA_SET_PAGINA_ACTUAL = 'VENTA_SET_PAGINA_ACTUAL';
export const VENTA_SET_ITEMS_POR_PAGINA = 'VENTA_SET_ITEMS_POR_PAGINA';
export const VENTA_SET_PAGINAS = 'VENTA_SET_PAGINAS';
export const VENTA_SET_DATE = 'VENTA_SET_DATE';
export const VENTA_SET_PRODUCTOS_VENTA = 'VENTA_SET_PRODUCTOS_VENTA';
export const VENTA_SET_ORDEN = 'VENTA_SET_ORDEN';
export const VENTA_SET_PRODUCTOS_ORDEN = 'VENTA_SET_PRODUCTOS_ORDEN';
// ACTION LLAMADA DESDE SAGA, TIENE SIDE EFFECT (NO TIENE REDUCER)
export const VENTA_UPDATE_ITEMS = 'VENTA_UPDATE_ITEMS';
// ACTION LLAMADAS DESDE VIEW, TIENEN SIDE EFFECTS (NO TIENEN REDUCER)
export const VENTA_CHANGE_DATE = 'VENTA_CHANGE_DATE';
export const VENTA_CHANGE_PAGE = 'VENTA_CHANGE_PAGE';
export const VENTA_CHANGE_PAGE_SIZE = 'VENTA_CHANGE_PAGE_SIZE';
export const VENTA_GET_PRODUCTOS_VENTA = 'VENTA_GET_PRODUCTOS_VENTA';
export const VENTA_GET_ORDEN = 'VENTA_GET_ORDEN';

/* ACTIONS DE ORDENES */
// ACTIONS LLAMADAS DESDE SAGA, NO TIENEN SIDE EFFECT ( TIENEN REDUCER )
export const ORDEN_IS_LOADED = 'ORDEN_IS_LOADED';
export const ORDEN_SET_ITEMS = 'ORDEN_SET_ITEMS';
export const ORDEN_SET_TOTAL_ITEMS = 'ORDEN_SET_TOTAL_ITEMS';
export const ORDEN_SET_START_ITEM = 'ORDEN_SET_START_ITEM';
export const ORDEN_SET_END_ITEM = 'ORDEN_SET_END_ITEM';
export const ORDEN_SET_PAGINA_ACTUAL = 'ORDEN_SET_PAGINA_ACTUAL';
export const ORDEN_SET_ITEMS_POR_PAGINA = 'ORDEN_SET_ITEMS_POR_PAGINA';
export const ORDEN_SET_PAGINAS = 'ORDEN_SET_PAGINAS';
export const ORDEN_SET_ESTADO = 'ORDEN_SET_ESTADO';
export const ORDEN_SET_PRODUCTOS_ORDEN = 'ORDEN_SET_PRODUCTOS_ORDEN';
export const ORDEN_SET_VENTA = 'ORDEN_SET_VENTA';
// ACTION LLAMADA DESDE SAGA, TIENE SIDE EFFECT (NO TIENE REDUCER)
export const ORDEN_UPDATE_ITEMS = 'ORDEN_UPDATE_ITEMS';
// ACTION LLAMADAS DESDE VIEW, TIENEN SIDE EFFECTS (NO TIENEN REDUCER)
export const ORDEN_CHANGE_ESTADO = 'ORDEN_CHANGE_ESTADO';
export const ORDEN_CHANGE_PAGE = 'ORDEN_CHANGE_PAGE';
export const ORDEN_CHANGE_PAGE_SIZE = 'ORDEN_CHANGE_PAGE_SIZE';
export const ORDEN_GET_PRODUCTOS_ORDEN = 'ORDEN_GET_PRODUCTOS_ORDEN';
export const ORDEN_CANCELAR_ORDEN = 'ORDEN_CANCELAR_ORDEN';
export const ORDEN_ENVIAR_A_PREPARACION = 'ORDEN_ENVIAR_A_PREPARACION';
export const ORDEN_ENVIAR_A_RETIRO = 'ORDEN_ENVIAR_A_RETIRO';
export const ORDEN_ENVIAR_A_REPARTO = 'ORDEN_ENVIAR_A_REPARTO';
export const ORDEN_GET_VENTA = 'ORDEN_GET_VENTA';

/* ACTION DE TIENDA */
// ACTION LLAMADOS SOLO EN LA SAGA
export const TIENDA_IS_LOADED = 'TIENDA_IS_LOADED';
export const TIENDA_IS_EXIST = 'TIENDA_IS_EXIST';
export const TIENDA_SET_TIENDA = 'TIENDA_SET_TIENDA';
export const TIENDA_SET_CATEGORIAS = 'TIENDA_SET_CATEGORIAS';
export const TIENDA_SET_CATEGORIA_SELECCIONADA =
  'TIENDA_SET_CATEGORIA_SELECCIONADA';
export const TIENDA_SET_PRODUCTOS = 'TIENDA_SET_PRODUCTOS';
export const TIENDA_SET_PRODUCTO_SELECCIONADO =
  'TIENDA_SET_PRODUCTO_SELECCIONADO';
export const TIENDA_SET_NOMBRE_TIENDA = 'TIENDA_SET_NOMBRE_TIENDA';
export const TIENDA_VOLVER_A_CATEGORIAS = 'TIENDA_VOLVER_A_CATEGORIAS';
export const TIENDA_DETALLE_MODAL = 'TIENDA_DETALLE_MODAL';
export const TIENDA_CERRAR_MODAL_PRODUCTO = 'TIENDA_CERRAR_MODAL_PRODUCTO';

// ACTIONS DESDE VIEW, TIENEN SIDE EFFECTS (NO TIENEN REDUCER)
export const TIENDA_CARGAR_TIENDA = 'TIENDA_CARGAR_TIENDA';
export const TIENDA_CARGAR_PRODUCTOS_CATEGORIA =
  'TIENDA_CARGAR_PRODUCTOS_CATEGORIA';

/* ACTION DE CARRITO */
export const CARRITO_IS_LOADED = 'CARRITO_IS_LOADED';

export const CARRITO_CARGAR_CARRITO = 'CARRITO_CARGAR_CARRITO';
export const CARRITO_INIT = 'CARRITO_INIT';
export const CARRITO_SUM_PRODUCTO = 'CARRITO_SUM_PRODUCTO';
export const CARRITO_RES_PRODUCTO = 'CARRITO_RES_PRODUCTO';
export const CARRITO_ELIMINAR_PRODUCTO = 'CARRITO_ELIMINAR_PRODUCTO';
export const CARRITO_CARGAR_METODOS_PAGO = 'CARRITO_CARGAR_METODOS_PAGO';
export const CARRITO_CARGAR_METODOS_ENTREGA = 'CARRITO_CARGAR_METODOS_ENTREGA';
export const CARRITO_PROCESAR = 'CARRITO_PROCESAR';
export const CARRITO_PROCESAR_MERCADOPAGO = 'CARRITO_PROCESAR_MERCADOPAGO';
export const CARRITO_ENVIAR_ORDEN = 'CARRITO_ENVIAR_ORDEN';
export const CARRITO_ENVIAR_VENTA = 'CARRITO_ENVIAR_VENTA';
export const CARRITO_SUCCESS = 'CARRITO_SUCCESS';
export const CARRITO_CARGAR_CARRITO_SUM_RES = 'CARRITO_CARGAR_CARRITO_SUM_RES';
export const CARRITO_PRODUCTO_ELIMINAR = 'CARRITO_PRODUCTO_ELIMINAR';

export * from './menu/actions';
export * from './settings/actions';
export * from './auth/actions';
export * from './todo/actions';
export * from './chat/actions';
export * from './surveyList/actions';
export * from './surveyDetail/actions';
export * from './tienda/actions';
export * from './carrito/actions';
export * from './localComercial/actions';
export * from './categorias/actions';
export * from './productos/actions';
