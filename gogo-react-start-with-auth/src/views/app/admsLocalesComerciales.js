import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddNewModalAdministradorLocalComercial from '../../containers/pages/AddNewModalAdministradorLocalComercial';

import ListPageHeadingAdministradorLocalComercial from '../../containers/pages/ListPageHeadingAdministradorLocalComercial';
import ListPageListingAdminLocalComercial from '../../containers/pages/ListPageListing/ListPageListingAdminLocalComercial';
import { ADMINLOCALCOMERCIAL_UPDATE_ITEMS } from '../../redux/actions';

const AdmsLocalesComerciales = ({ match }) => {
  const dispatch = useDispatch();
  console.log('asdasd');
  const pageSizes = [4, 8, 12, 20];
  const [modalOpen, setModalOpen] = useState(false);
  const [displayMode, setDisplayMode] = useState('thumblist');
  // eslint-disable-next-line no-unused-vars
  const isLoaded = useSelector(
    (state) => state.administradorLocalComercial.isLoaded
  );
  const paginaActual = useSelector(
    (state) => state.administradorLocalComercial.paginaActual
  );
  const itemsPorPagina = useSelector(
    (state) => state.administradorLocalComercial.itemsPorPagina
  );
  const paginas = useSelector(
    (state) => state.administradorLocalComercial.paginas
  );
  const items = useSelector((state) => state.administradorLocalComercial.items);
  const startItem = useSelector(
    (state) => state.administradorLocalComercial.startItem
  );
  const endItem = useSelector(
    (state) => state.administradorLocalComercial.endItem
  );
  const totalItems = useSelector(
    (state) => state.administradorLocalComercial.totalItems
  );
  const primeraCarga = useSelector(
    (state) => state.administradorLocalComercial.primeraCarga
  );
  console.log('xacac');
  // Debemos preguntar si es la primera carga
  if (primeraCarga) {
    // Despachamos la action para MOSTRAR LA PRIMERA PAGINA
    dispatch({
      type: ADMINLOCALCOMERCIAL_UPDATE_ITEMS,
      payload: {
        primeraCarga: false,
        paginaActual,
        itemsPorPagina,
      },
    });
  }

  const setPaginaActual = (pag) => {
    dispatch({
      type: ADMINLOCALCOMERCIAL_UPDATE_ITEMS,
      payload: {
        primeraCarga: false,
        paginaActual: pag,
        itemsPorPagina,
      },
    });
  };

  const setItemsPorPagina = (nuevosItemsPorPagina) => {
    dispatch({
      type: ADMINLOCALCOMERCIAL_UPDATE_ITEMS,
      payload: {
        primeraCarga: false,
        paginaActual: 1,
        itemsPorPagina: nuevosItemsPorPagina,
      },
    });
  };
  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        <ListPageHeadingAdministradorLocalComercial
          heading="Administradores de Locales Comerciales"
          displayMode={displayMode}
          changeDisplayMode={setDisplayMode}
          changePageSize={setItemsPorPagina}
          selectedPageSize={itemsPorPagina}
          totalItemCount={totalItems}
          match={match}
          startIndex={startItem}
          endIndex={endItem}
          itemsLength={items ? items.length : 0}
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
        />
        <AddNewModalAdministradorLocalComercial
          modalOpen={modalOpen}
          toggleModal={() => setModalOpen(!modalOpen)}
        />
        <ListPageListingAdminLocalComercial
          items={items}
          displayMode={displayMode}
          currentPage={paginaActual}
          totalPage={paginas}
          onChangePage={setPaginaActual}
        />
      </div>
    </>
  );
};

export default AdmsLocalesComerciales;
