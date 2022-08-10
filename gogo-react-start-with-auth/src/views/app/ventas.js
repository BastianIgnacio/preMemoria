import React from 'react';
import { useSelector } from 'react-redux';
import ListPageHeadingVentas from '../../containers/pages/adminLocal/ventas/ListPageHeadingVentas';
import ListPageListingVentas from '../../containers/pages/adminLocal/ventas/ListPageListingVentas';

const pageSizes = [4, 8, 12, 20];

const Ventas = () => {
  const isLoaded = useSelector((state) => state.ventas.isLoaded);
  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        <ListPageHeadingVentas pageSizes={pageSizes} />
        <ListPageListingVentas />
      </div>
    </>
  );
};

export default Ventas;
