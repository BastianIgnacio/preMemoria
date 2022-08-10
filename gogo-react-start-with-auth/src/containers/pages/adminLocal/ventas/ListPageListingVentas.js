import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import Pagination from '../../Pagination';
import ThumbListViewVentas from './ThumbListViewVentas';
import ThumbListViewEmpty from '../../ListPageListing/ThumbListViewEmpty';
import { VENTA_CHANGE_PAGE } from '../../../../redux/actions';

const ListPageListingVentas = () => {
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  const paginas = useSelector((state) => state.ventas.paginas);
  const paginaActual = useSelector((state) => state.ventas.paginaActual);
  const items = useSelector((state) => state.ventas.items);
  const itemsPorPagina = useSelector((state) => state.ventas.itemsPorPagina);
  const idTienda = useSelector((state) => state.authUser.tienda.id);
  const fecha = useSelector((state) => state.ventas.fecha);

  const formatDate = (date) => {
    const d = new Date(date);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();
    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return [year, month, day].join('-');
  };

  const onChangePage = (nuevaPagActual) => {
    const formattedDate = formatDate(fecha);
    dispatch({
      type: VENTA_CHANGE_PAGE,
      payload: {
        paginaActual: nuevaPagActual,
        itemsPorPagina,
        formattedDate,
        refLocalComercial: idTienda,
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
          {items.map((venta) => {
            return <ThumbListViewVentas key={venta.id} venta={venta} />;
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

export default React.memo(ListPageListingVentas);
