// eslint-disable-next-line import/no-cycle
import {
  LOCALCOMERCIALS_GET,
  LOCALCOMERCIAL_ADD,
  LOCALCOMERCIALS_CHANGEPAGE,
  LOCALCOMERCIALS_CHANGEPAGESIZE,
  LOCALCOMERCIALS_ISLOADED,
} from '../actions';

// eslint-disable-next-line import/prefer-default-export
export const addLocalComercial = (localComercial) => ({
  type: LOCALCOMERCIAL_ADD,
  payload: localComercial,
});

export const getLocalComercials = (itemsPorPagina, paginaActual) => ({
  type: LOCALCOMERCIALS_GET,
  payload: itemsPorPagina,
  paginaActual,
});

export const changePage = (paginaActual) => ({
  type: LOCALCOMERCIALS_CHANGEPAGE,
  payload: paginaActual,
});

export const changePageSize = (itemsPorPagina) => ({
  type: LOCALCOMERCIALS_CHANGEPAGESIZE,
  payload: itemsPorPagina,
});

export const isLoaded = (load) => ({
  type: LOCALCOMERCIALS_ISLOADED,
  payload: load,
});
