import {
  PRODUCTO_ADD,
  PRODUCTO_IS_LOADED,
  PRODUCTO_SET_ITEMS,
  PRODUCTO_SET_TOTAL_ITEMS,
  PRODUCTO_SET_START_ITEM,
  PRODUCTO_SET_END_ITEM,
  PRODUCTO_SET_PAGINA_ACTUAL,
  PRODUCTO_SET_ITEMS_POR_PAGINA,
  PRODUCTO_SET_PAGINAS,
  PRODUCTO_SET_SELECTED_CATEGORIA,
  PRODUCTO_SET_CATEGORIAS,
  PRODUCTO_SET_CATEGORIA_ID,
  PRODUCTO_OPEN_MODAL,
  PRODUCTO_CLOSE_MODAL,
} from '../actions';

const INIT_STATE = {
  isLoaded: false,
  paginaActual: 1,
  itemsPorPagina: 4,
  items: [],
  categoriasTienda: [],
  existenCategorias: false,
  categoriaSeleccionada: [],
  paginas: 1,
  startItem: 0,
  endItem: 0,
  totalItems: 0,
  // Funcionamiento del modal
  modalOpen: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PRODUCTO_ADD:
      return {
        ...state,
      };
    case PRODUCTO_IS_LOADED:
      return {
        ...state,
        isLoaded: action.payload,
      };
    case PRODUCTO_SET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case PRODUCTO_SET_TOTAL_ITEMS:
      return {
        ...state,
        totalItems: action.payload,
      };
    case PRODUCTO_SET_START_ITEM:
      return {
        ...state,
        startItem: action.payload,
      };
    case PRODUCTO_SET_END_ITEM:
      return {
        ...state,
        endItem: action.payload,
      };
    case PRODUCTO_SET_PAGINA_ACTUAL:
      return {
        ...state,
        paginaActual: action.payload,
      };
    case PRODUCTO_SET_ITEMS_POR_PAGINA:
      return {
        ...state,
        itemsPorPagina: action.payload,
      };
    case PRODUCTO_SET_PAGINAS:
      return {
        ...state,
        paginas: action.payload,
      };
    case PRODUCTO_SET_SELECTED_CATEGORIA:
      return {
        ...state,
        categoriaSeleccionada: action.payload,
      };
    case PRODUCTO_SET_CATEGORIAS:
      return {
        ...state,
        categoriasTienda: action.payload.categoriasTienda,
        existenCategorias: action.payload.existenCategorias,
        isLoaded: true,
      };
    case PRODUCTO_SET_CATEGORIA_ID:
      return {
        ...state,
        categoriaSeleccionadaId: action.payload,
      };
    case PRODUCTO_OPEN_MODAL:
      return {
        ...state,
        modalOpen: true,
      };
    case PRODUCTO_CLOSE_MODAL:
      return {
        ...state,
        modalOpen: false,
      };
    default:
      return { ...state };
  }
};
