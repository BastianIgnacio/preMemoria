import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListPageHeadingCategorias from '../../containers/pages/adminLocal/categorias/ListPageHeadingCategorias';
import AddNewModalCategoria from '../../containers/pages/adminLocal/categorias/AddNewModalCategoria';
import ListPageListingCategorias from '../../containers/pages/adminLocal/categorias/ListPageListingCategorias';
import { CATEGORIA_CARGAR_CATEGORIAS } from '../../redux/actions';

const pageSizes = [4, 8, 12, 20];

const Categorias = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const isLoaded = useSelector((state) => state.categorias.isLoaded);
  const idTienda = useSelector((state) => state.authUser.tienda.id);

  useEffect(() => {
    console.log('useEffect');
    dispatch({
      type: CATEGORIA_CARGAR_CATEGORIAS,
      payload: idTienda,
    });
  });

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        <ListPageHeadingCategorias
          heading="Categorias"
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
        />
        <AddNewModalCategoria
          modalOpen={modalOpen}
          toggleModal={() => setModalOpen(!modalOpen)}
        />
        <ListPageListingCategorias />
      </div>
    </>
  );
};

export default Categorias;
