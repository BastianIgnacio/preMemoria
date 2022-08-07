import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListPageHeadingProductos from '../../containers/pages/adminLocal/productos/ListPageHeadingProductos';

import AddNewModalProducto from '../../containers/pages/adminLocal/productos/AddNewModalProducto';
import ListPageListingProductos from '../../containers/pages/adminLocal/productos/ListPageListingProductos';
import {
  // eslint-disable-next-line no-unused-vars
  PRODUCTO_CARGAR_CATEGORIAS,
} from '../../redux/actions';

const pageSizes = [4, 8, 12, 20];

const Productos = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const isLoaded = useSelector((state) => state.productos.isLoaded);
  const categoriaSeleccionada = useSelector(
    (state) => state.productos.categoriaSeleccionada
  );
  const idTienda = useSelector((state) => state.authUser.tienda.id);

  useEffect(() => {
    if (categoriaSeleccionada === null) {
      console.log('Categoria null');
      dispatch({
        type: PRODUCTO_CARGAR_CATEGORIAS,
        payload: {
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
        <ListPageHeadingProductos
          heading="Productos"
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
        />
        <AddNewModalProducto
          modalOpen={modalOpen}
          toggleModal={() => setModalOpen(!modalOpen)}
        />
        <ListPageListingProductos />
      </div>
    </>
  );
};

export default Productos;
