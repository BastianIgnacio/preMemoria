import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from 'reactstrap';
import ListPageHeadingProductos from '../../containers/pages/adminLocal/productos/ListPageHeadingProductos';
import { Colxx } from '../../components/common/CustomBootstrap';
import AddNewModalProducto from '../../containers/pages/adminLocal/productos/AddNewModalProducto';
import ListPageListingProductos from '../../containers/pages/adminLocal/productos/ListPageListingProductos';
import {
  // eslint-disable-next-line no-unused-vars
  PRODUCTO_CARGAR_CATEGORIAS,
} from '../../redux/actions';

const pageSizes = [4, 8, 12, 20];

const Productos = () => {
  const dispatch = useDispatch();
  const isLoaded = useSelector((state) => state.productos.isLoaded);
  const idTienda = useSelector((state) => state.authUser.tienda.id);
  const mensaje =
    'NO HAY PRODUCTOS PARA MOSTRAR, PRIMERO DEBES AÑADIR UNA CATEGORIA!';

  const existenCategorias = useSelector(
    (state) => state.productos.existenCategorias
  );

  useEffect(() => {
    console.log('Cargando productos x aki');
    dispatch({
      type: PRODUCTO_CARGAR_CATEGORIAS,
      payload: {
        refLocalComercial: idTienda,
      },
    });
  });
  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      {existenCategorias && (
        <div className="disable-text-selection">
          <ListPageHeadingProductos heading="Productos" pageSizes={pageSizes} />
          <AddNewModalProducto />
          <ListPageListingProductos />
        </div>
      )}
      {!existenCategorias && (
        <Row>
          <Colxx xxs="12" xs="12" lg="12">
            <div className="d-flex justify-content-center w-100">
              <div className=" m-2 card-icon w-80">{mensaje}</div>
            </div>
          </Colxx>
        </Row>
      )}
    </>
  );
};

export default Productos;
