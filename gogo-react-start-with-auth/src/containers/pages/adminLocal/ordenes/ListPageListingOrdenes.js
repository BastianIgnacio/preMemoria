import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import Pagination from '../../Pagination';
import ThumbListViewOrdenes from './ThumbListViewOrdenes';
import ThumbListViewEmpty from '../../ListPageListing/ThumbListViewEmpty';
// eslint-disable-next-line no-unused-vars
import { ORDEN_CHANGE_PAGE } from '../../../../redux/actions';

const ListPageListingOrdenes = () => {
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  const paginas = useSelector((state) => state.ordenes.paginas);
  const paginaActual = useSelector((state) => state.ordenes.paginaActual);
  const items = useSelector((state) => state.ordenes.items);
  // eslint-disable-next-line no-unused-vars
  const itemsPorPagina = useSelector((state) => state.ordenes.itemsPorPagina);
  // eslint-disable-next-line no-unused-vars
  const idTienda = useSelector((state) => state.authUser.tienda.id);
  const estadoOrden = useSelector((state) => state.ordenes.estado);

  const onChangePage = (nuevaPagActual) => {
    dispatch({
      type: ORDEN_CHANGE_PAGE,
      payload: {
        itemsPorPagina,
        paginaActual: nuevaPagActual,
        refLocalComercial: idTienda,
        estado: estadoOrden,
      },
    });
  };

  return (
    <div>
      {items.length === 0 ? (
        <Row>
          <ThumbListViewEmpty />
        </Row>
      ) : (
        <Row>
          {items.map((ord) => {
            return <ThumbListViewOrdenes key={ord.id} orden={ord} />;
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

export default React.memo(ListPageListingOrdenes);
