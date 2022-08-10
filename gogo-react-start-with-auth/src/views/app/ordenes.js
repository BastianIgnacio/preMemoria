import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ListPageHeadingOrdenes from '../../containers/pages/adminLocal/ordenes/ListPageHeadingOrdenes';
import ListPageListingOrdenes from '../../containers/pages/adminLocal/ordenes/ListPageListingOrdenes';
import { ORDEN_CHANGE_ESTADO } from '../../redux/actions';

const pageSizes = [4, 8, 12, 20];

const Ordenes = () => {
  const dispatch = useDispatch();
  const isLoaded = useSelector((state) => state.ordenes.isLoaded);
  const estado = useSelector((state) => state.ordenes.estado);
  const idTienda = useSelector((state) => state.authUser.tienda.id);
  const primerEstado = { key: 0, label: 'EN COLA', estate: 'EN_COLA' };

  useEffect(() => {
    if (estado === null) {
      dispatch({
        type: ORDEN_CHANGE_ESTADO,
        payload: {
          estado: primerEstado,
          refLocalComercial: idTienda,
        },
      });
    }
  });
  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        <ListPageHeadingOrdenes pageSizes={pageSizes} />
        <ListPageListingOrdenes />
      </div>
    </>
  );
};

export default Ordenes;
