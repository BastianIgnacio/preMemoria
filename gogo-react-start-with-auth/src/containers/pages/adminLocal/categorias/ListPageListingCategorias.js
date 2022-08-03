import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import Pagination from '../../Pagination';
import ThumbListViewCategorias from './ThumbListViewCategorias';
import { CATEGORIA_CHANGE_PAGE } from '../../../../redux/actions';

function collect(props) {
  return { data: props.data };
}

const ListPageListingCategorias = () => {
  const dispatch = useDispatch();
  const tienda = useSelector((state) => state.authUser.tienda);
  const refLocalComercial = tienda.id;
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
        <Row>No hay CATEGORIAS PARA MOSTRAR</Row>
      ) : (
        <Row>
          {items.map((product) => {
            return (
              <ThumbListViewCategorias
                key={product.id}
                categoria={product}
                collect={collect}
                refLocalComercial={refLocalComercial}
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
