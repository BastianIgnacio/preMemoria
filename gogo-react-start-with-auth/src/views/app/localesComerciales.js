import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddNewModalLocalComercial from '../../containers/pages/AddNewModalLocalComercial';
import ListPageListingLocalesComerciales from '../../containers/pages/ListPageListing/ListPageListingLocalesComerciales';
import ListPageHeadingLocalesComerciales from '../../containers/pages/ListPageHeadingLocalesComerciales';

import {
  // LOCALCOMERCIALS_ISLOADED,
  LOCALCOMERCIALS_UPDATE_ITEMS,
  LOCALCOMERCIAL_BEFORE_UPDATE,
  LOCALCOMERCIAL_RESET_ITEMS,
} from '../../redux/actions';

const pageSizes = [4, 8, 12, 20];

const LocalesComerciales = ({ match }) => {
  const dispatch = useDispatch();
  const [displayMode, setDisplayMode] = useState('thumblist');

  const [modalOpen, setModalOpen] = useState(false);

  const paginaActual = useSelector(
    (state) => state.localComercial.paginaActual
  );
  const paginas = useSelector((state) => state.localComercial.paginas);
  const isLoaded = useSelector((state) => state.localComercial.isLoaded);
  const items = useSelector((state) => state.localComercial.items);
  console.log('items redux');
  console.log(items);
  const totalItems = useSelector((state) => state.localComercial.totalItems);
  const itemsPorPagina = useSelector(
    (state) => state.localComercial.itemsPorPagina
  );
  const primeraCarga = useSelector(
    (state) => state.localComercial.primeraCarga
  );
  const endItem = useSelector((state) => state.localComercial.endItem);
  const startItem = useSelector((state) => state.localComercial.startItem);
  // const stateLocal = useSelector((state) => state.localComercial);

  if (primeraCarga) {
    // En el middleware se debe interceptar la accion
    // Accion de changepagesize o changepage
    // y llamar a get items en redux
    // Hay que hacer una accion de getItems Init
    dispatch({ type: LOCALCOMERCIAL_BEFORE_UPDATE, payload: false });
    dispatch({ type: LOCALCOMERCIAL_RESET_ITEMS, payload: [] });
    dispatch({
      type: LOCALCOMERCIALS_UPDATE_ITEMS,
      payload: {
        paginaActual: 1,
        itemsPorPagina: 4,
        primeraCarga: false,
      },
    });
  }

  const setPaginaActual = (pag) => {
    dispatch({ type: LOCALCOMERCIAL_BEFORE_UPDATE, payload: false });
    dispatch({ type: LOCALCOMERCIAL_RESET_ITEMS, payload: [] });
    setTimeout(() => {
      dispatch({
        type: LOCALCOMERCIALS_UPDATE_ITEMS,
        payload: {
          paginaActual: pag,
          itemsPorPagina,
          primeraCarga: false,
        },
      });
    }, 10);
  };

  const setItemsPorPagina = (newPageSize) => {
    // Aca debemos disparar la accion de items por pagina
    dispatch({ type: LOCALCOMERCIAL_BEFORE_UPDATE, payload: false });
    dispatch({ type: LOCALCOMERCIAL_RESET_ITEMS, payload: [] });
    setTimeout(() => {
      dispatch({
        type: LOCALCOMERCIALS_UPDATE_ITEMS,
        payload: {
          paginaActual: 1,
          itemsPorPagina: newPageSize,
          primeraCarga: false,
        },
      });
    }, 10);
  };

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        <ListPageHeadingLocalesComerciales
          heading="Locales Comerciales"
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
        <AddNewModalLocalComercial
          modalOpen={modalOpen}
          toggleModal={() => setModalOpen(!modalOpen)}
        />
        <ListPageListingLocalesComerciales
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

export default LocalesComerciales;
