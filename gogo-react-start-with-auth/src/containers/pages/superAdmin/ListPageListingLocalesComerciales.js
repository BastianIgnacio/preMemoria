import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from 'reactstrap';
import Pagination from '../Pagination';
import ContextMenuContainer from '../ContextMenuContainer';
import ThumbListViewLocalesComerciales from './ThumbListViewLocalesComerciales';
import { LOCALCOMERCIAL_CHANGE_PAGE } from '../../../redux/actions';

function collect(props) {
  return { data: props.data };
}

const ListPageListingLocalesComerciales = () => {
  const dispatch = useDispatch();
  const paginaActual = useSelector(
    (state) => state.localComercial.paginaActual
  );
  const paginas = useSelector((state) => state.localComercial.paginas);
  // eslint-disable-next-line no-unused-vars
  const itemsPorPagina = useSelector(
    (state) => state.localComercial.itemsPorPagina
  );
  const items = useSelector((state) => state.localComercial.items);

  const onChangePage = (nuevaPag) => {
    dispatch({
      type: LOCALCOMERCIAL_CHANGE_PAGE,
      payload: {
        paginaActual: nuevaPag,
        itemsPorPagina,
      },
    });
  };

  return (
    <Row>
      {items.map((localComercial) => {
        return (
          <ThumbListViewLocalesComerciales
            key={localComercial.id}
            localComercial={localComercial}
            collect={collect}
          />
        );
      })}
      <Pagination
        currentPage={paginaActual}
        totalPage={paginas}
        onChangePage={(i) => onChangePage(i)}
      />
      <ContextMenuContainer />
    </Row>
  );
};

export default React.memo(ListPageListingLocalesComerciales);
