import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListPageListingLocalesComerciales from '../../containers/pages/superAdmin/ListPageListingLocalesComerciales';
import ListPageHeadingLocalesComerciales from '../../containers/pages/superAdmin/ListPageHeadingLocalesComerciales';

import { LOCALCOMERCIAL_CARGAR_LOCALES } from '../../redux/actions';

const LocalesComerciales = () => {
  const dispatch = useDispatch();
  const isLoaded = useSelector((state) => state.localComercial.isLoaded);

  useEffect(() => {
    dispatch({
      type: LOCALCOMERCIAL_CARGAR_LOCALES,
    });
  });

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        <ListPageHeadingLocalesComerciales />
        <ListPageListingLocalesComerciales />
      </div>
    </>
  );
};

export default LocalesComerciales;
