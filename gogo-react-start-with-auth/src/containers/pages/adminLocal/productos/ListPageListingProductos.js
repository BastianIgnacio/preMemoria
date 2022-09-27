import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import Pagination from '../../Pagination';
import ThumbListViewProductos from './ThumbListViewProductos';
import ThumbListViewEmpty from '../../ListPageListing/ThumbListViewEmpty';
import { PRODUCTO_CHANGE_PAGE } from '../../../../redux/actions';

function collect(props) {
  return { data: props.data };
}

const ListPageListingProductos = () => {
  const dispatch = useDispatch();
  const paginas = useSelector((state) => state.productos.paginas);
  const paginaActual = useSelector((state) => state.productos.paginaActual);
  const items = useSelector((state) => state.productos.items);
  const idTienda = useSelector((state) => state.authUser.tienda.id);
  const itemsPorPagina = useSelector((state) => state.productos.itemsPorPagina);
  const categoriaSeleccionada = useSelector(
    (state) => state.productos.categoriaSeleccionada
  );

  const onChangePage = (nuevaPagActual) => {
    dispatch({
      type: PRODUCTO_CHANGE_PAGE,
      payload: {
        paginaActual: nuevaPagActual,
        itemsPorPagina,
        refCategoria: categoriaSeleccionada.id,
      },
    });
  };

  return (
    <div>
      {items.length === 0 ? (
        <Row>
          <ThumbListViewEmpty categoriaSeleccionada={categoriaSeleccionada} />
        </Row>
      ) : (
        <Row>
          {items.map((product) => {
            return (
              <ThumbListViewProductos
                key={product.id}
                productoCategoria={product}
                collect={collect}
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

export default React.memo(ListPageListingProductos);
