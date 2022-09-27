import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import Pagination from '../../Pagination';
import ThumbListViewCategorias from './ThumbListViewCategorias';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import { CATEGORIA_CHANGE_PAGE } from '../../../../redux/actions';

const ListPageListingCategorias = () => {
  const dispatch = useDispatch();
  const paginas = useSelector((state) => state.categorias.paginas);
  const paginaActual = useSelector((state) => state.categorias.paginaActual);
  const items = useSelector((state) => state.categorias.items);
  const itemsPorPagina = useSelector(
    (state) => state.categorias.itemsPorPagina
  );
  const idTienda = useSelector((state) => state.authUser.tienda.id);

  const onChangePage = (nuevaPagActual) => {
    dispatch({
      type: CATEGORIA_CHANGE_PAGE,
      payload: {
        paginaActual: nuevaPagActual,
        itemsPorPagina,
        refLocalComercial: idTienda,
      },
    });
  };

  return (
    <div>
      {items.length === 0 ? (
        <Row>
          <Colxx xxs="12" xs="12" lg="12">
            <div className="d-flex justify-content-center w-100">
              <div className=" m-2 card-icon w-80">
                NO HAY CATEGORIAS PARA MOSTRAR
              </div>
            </div>
          </Colxx>
        </Row>
      ) : (
        <Row>
          {items.map((product) => {
            return (
              <ThumbListViewCategorias
                key={product.id}
                categoria={product}
                refLocalComercial={idTienda}
              />
            );
          })}
          <Pagination
            currentPage={paginaActual}
            totalPage={paginas}
            onChangePage={(i) => onChangePage(i)}
          />
        </Row>
      )}
    </div>
  );
};

export default React.memo(ListPageListingCategorias);
