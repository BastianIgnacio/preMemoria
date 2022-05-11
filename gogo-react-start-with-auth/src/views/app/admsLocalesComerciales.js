import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { apiRestUrl } from '../../constants/defaultValues';
import AddNewModalAdministradorLocalComercial from '../../containers/pages/AddNewModalAdministradorLocalComercial';

import ListPageHeadingAdministradorLocalComercial from '../../containers/pages/ListPageHeadingAdministradorLocalComercial';
import ListPageListingAdminLocalComercial from '../../containers/pages/ListPageListing/ListPageListingAdminLocalComercial';

import {
  ADMINLOCALCOMERCIAL_CHANGEPAGE,
  ADMINLOCALCOMERCIAL_CHANGEPAGESIZE,
  //  ADMINLOCALCOMERCIAL_ISLOADED,
} from '../../redux/actions';

const pageSizes = [4, 8, 12, 20];

const AdmsLocalesComerciales = ({ match }) => {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [isLoaded, setIsLoaded] = useState(true);
  const [displayMode, setDisplayMode] = useState('thumblist');
  const paginaActual = useSelector(
    (state) => state.administradorLocalComercial.paginaActual
  );
  const itemsPorPagina = useSelector(
    (state) => state.administradorLocalComercial.itemsPorPagina
  );

  const [paginas, setPaginas] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [items, setItems] = useState([]);

  const [startItem, setStartItem] = useState(0);
  const [endItem, setEndItem] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (paginaActual === 1) {
      axios
        .get(`${apiRestUrl}/listAdministradores/?limit=${itemsPorPagina}`)
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          setTotalItems(data.count);
          // Aca validamos si es necesaria solo 1 pagina para mostrarlo
          const valor = data.count / itemsPorPagina;
          if (valor <= 1) {
            setPaginas(1);
            setStartItem(1);
            setEndItem(data.count);
          } else {
            // Es necesario mostrar mas de 2 paginas
            const resto = valor % 1;
            let valorTruc = -1;
            // El resto es cero, por ende son la cantidad justa que cabe en la ultima pagina
            if (resto === 0) {
              valorTruc = Math.trunc(valor);
            }
            // El resto es disitnto de cero, por ende se necesita una pagina mas
            else {
              valorTruc = Math.trunc(valor) + 1;
            }
            setPaginas(valorTruc);
            setStartItem(1);
            setEndItem(itemsPorPagina);
          }
          setItems(data.results);
          // dispatch({ type: LOCALCOMERCIALS_ISLOADED, payload: true });
        });
    } else {
      const offset = itemsPorPagina * paginaActual - itemsPorPagina;
      axios
        .get(
          `${apiRestUrl}/listAdministradores/?limit=${itemsPorPagina}&offset=${offset}`
        )
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          setTotalItems(data.count);
          const valor = data.count / itemsPorPagina;
          // Es necesario mostrar solo 1 pagina
          if (valor <= 1) {
            setPaginas(1);
            setStartItem(1);
            setEndItem(data.count);
          } else {
            // Es necesario mostrar mas de 2 paginas
            const resto = valor % 1;
            let valorTruc = -1;
            // El resto es cero, por ende son la cantidad justa que cabe en la ultima pagina
            if (resto === 0) {
              valorTruc = Math.trunc(valor);
            }
            // El resto es disitnto de cero, por ende se necesita una pagina mas
            else {
              valorTruc = Math.trunc(valor) + 1;
            }
            // Seteamos las paginas encesarias
            setPaginas(valorTruc);
            const valorInicio = paginaActual - 1;
            const valorFinal = paginaActual;
            const maxItemPagination = paginaActual * itemsPorPagina;

            setStartItem(valorInicio * itemsPorPagina + 1);

            if (maxItemPagination > data.count) {
              setEndItem(data.count);
            } else {
              setEndItem(valorFinal * itemsPorPagina);
            }
          }
          setItems(data.results);
          // dispatch({ type: LOCALCOMERCIALS_ISLOADED, payload: true });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginaActual, itemsPorPagina]);
  const setPaginaActual = (pag) => {
    // Aca debemos disparar la accion de cambiar la pag actual
    dispatch({ type: ADMINLOCALCOMERCIAL_CHANGEPAGE, payload: pag });
  };

  const setItemsPorPagina = (nuevosItemsPorPagina) => {
    dispatch({
      type: ADMINLOCALCOMERCIAL_CHANGEPAGESIZE,
      payload: nuevosItemsPorPagina,
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
