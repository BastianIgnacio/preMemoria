/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConfiguracionTiendaCard from './configuracionTiendaCard';
import { CLICK_CARGAR_DATOS_TIENDA } from '../../redux/actions';

const ConfiguracionTienda = () => {
  const dispatch = useDispatch();
  const configuracionTiendaLoading = useSelector(
    (state) => state.authUser.configuracionTiendaLoading
  );
  const refTienda = useSelector((state) => state.authUser.tienda.id);

  useEffect(() => {
    if (configuracionTiendaLoading) {
      dispatch({
        type: CLICK_CARGAR_DATOS_TIENDA,
        payload: refTienda,
      });
    }
  });

  return configuracionTiendaLoading ? (
    <div className="loading" />
  ) : (
    <ConfiguracionTiendaCard />
  );
};

export default ConfiguracionTienda;
