import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListPageHeadingCategorias from '../../containers/pages/ListPageHeadingCategorias';
import AddNewModalCategoria from '../../containers/pages/AddNewModalCategoria';

import ListPageListingCategorias from '../../containers/pages/ListPageListing/ListPageListingCategorias';
import { CATEGORIA_UPDATE_ITEMS } from '../../redux/actions';

const pageSizes = [4, 8, 12, 20];

const Categorias = ({ match }) => {
  const dispatch = useDispatch();
  const tienda = useSelector((state) => state.authUser.tienda);
  const refLocalComercial = tienda.id;
  const primeraCarga = useSelector((state) => state.categorias.primeraCarga);
  const isLoaded = useSelector((state) => state.categorias.isLoaded);
  const displayMode = 'thumblist';
  const paginaActual = useSelector((state) => state.categorias.paginaActual);
  const itemsPorPagina = useSelector(
    (state) => state.categorias.itemsPorPagina
  );
  const paginas = useSelector((state) => state.categorias.paginas);
  const items = useSelector((state) => state.categorias.items);
  const totalItems = useSelector((state) => state.categorias.totalItems);
  const startItem = useSelector((state) => state.categorias.startItem);
  const endItem = useSelector((state) => state.categorias.endItem);

  const [modalOpen, setModalOpen] = useState(false);

  // Debemos preguntar si es la primera carga
  if (primeraCarga) {
    console.log('primeracarga');
    // Despachamos la action para MOSTRAR LA PRIMERA PAGINA
    dispatch({
      type: CATEGORIA_UPDATE_ITEMS,
      payload: {
        primeraCarga: false,
        paginaActual,
        itemsPorPagina,
        refLocalComercial,
      },
    });
  }

  const setPaginaActual = (pag) => {
    dispatch({
      type: CATEGORIA_UPDATE_ITEMS,
      payload: {
        primeraCarga: false,
        paginaActual: pag,
        itemsPorPagina,
        refLocalComercial,
      },
    });
  };

  const setItemsPorPagina = (nuevosItemsPorPagina) => {
    dispatch({
      type: CATEGORIA_UPDATE_ITEMS,
      payload: {
        primeraCarga: false,
        paginaActual: 1,
        itemsPorPagina: nuevosItemsPorPagina,
        refLocalComercial,
      },
    });
  };
  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        <ListPageHeadingCategorias
          heading="Categorias"
          displayMode={displayMode}
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
        <AddNewModalCategoria
          modalOpen={modalOpen}
          toggleModal={() => setModalOpen(!modalOpen)}
          idTienda={tienda.id}
        />
        <ListPageListingCategorias
          items={items}
          displayMode={displayMode}
          currentPage={paginaActual}
          totalPage={paginas}
          onChangePage={setPaginaActual}
          refLocalComercial={refLocalComercial}
        />
      </div>
    </>
  );
};

export default Categorias;
