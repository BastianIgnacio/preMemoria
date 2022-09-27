/* eslint-disable prettier/prettier */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Row,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Collapse,
} from 'reactstrap';
import { injectIntl } from 'react-intl';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import { PRODUCTO_CHANGE_PAGE_SIZE, PRODUCTO_CHANGE_CATEGORIA, PRODUCTO_OPEN_MODAL } from '../../../../redux/actions';


const ListPageHeadingProductos = ({
  heading,
  pageSizes,
}) => {
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.productos.items);
  const totalItems = useSelector((state) => state.productos.totalItems);
  const startItem = useSelector((state) => state.productos.startItem);
  const endItem = useSelector((state) => state.productos.endItem);
  const itemsPorPagina = useSelector(
    (state) => state.productos.itemsPorPagina
  );
  const categoriasTienda = useSelector(
    (state) => state.productos.categoriasTienda
  );
  const categoriaSeleccionada = useSelector(
    (state) => state.productos.categoriaSeleccionada
  );
  const changePageSize = (nuevosItemsPorPagina) => {
    dispatch({
      type: PRODUCTO_CHANGE_PAGE_SIZE,
      payload: {
        paginaActual: 1,
        itemsPorPagina: nuevosItemsPorPagina,
        refCategoria: categoriaSeleccionada.id,
      },
    });
  }

  const changeCategoria = (nuevaCategoria) => {
    dispatch({
      type: PRODUCTO_CHANGE_CATEGORIA,
      payload: nuevaCategoria,
    });
  }

  const openModal = () => {
    dispatch({ type: PRODUCTO_OPEN_MODAL });
  };


  return (
    <Row>
      <Colxx xxs="12">
        <div className="mb-2">
          <h1>
            {heading}
          </h1>

          <div className="text-zero top-right-button-container">
            <Button
              color="primary"
              size="lg"
              className="top-right-button"
              onClick={() => openModal()}
            > {items.length === 0 ? (
              <> Añadir primer producto a {categoriaSeleccionada.nombre}
              </>
            ) : (
              <>Nuevo Producto
              </>
            )}
            </Button>
            {'  '}
          </div>
        </div>

        <div className="mb-2">
          <Button
            color="empty"
            className="pt-0 pl-0 d-inline-block d-md-none"
            onClick={() => setDisplayOptionsIsOpen(!displayOptionsIsOpen)}
          >
            OPCIONES {' '}
            <i className="simple-icon-arrow-down align-middle" />
          </Button>
          <Collapse
            isOpen={displayOptionsIsOpen}
            className="d-md-block"
            id="displayOptions"
          >
            <div className="d-block d-md-inline-block pt-1">
              <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                <DropdownToggle caret color="outline-dark" size="xs">
                  Ordenar por {'  '}
                  {categoriaSeleccionada.nombre}
                </DropdownToggle>
                <DropdownMenu>
                  {categoriasTienda.map((order, index) => {
                    return (
                      <DropdownItem
                        key={index}
                        onClick={() => changeCategoria(order)}
                      >
                        {order.nombre}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            <div className="float-md-right pt-1">
              <span className="text-muted text-small mr-1">{`${startItem}-${endItem} of ${totalItems} `}</span>
              <UncontrolledDropdown className="d-inline-block">
                <DropdownToggle caret color="outline-dark" size="xs">
                  {itemsPorPagina}
                </DropdownToggle>
                <DropdownMenu right>
                  {pageSizes.map((size, index) => {
                    return (
                      <DropdownItem
                        key={index}
                        onClick={() => changePageSize(size)}
                      >
                        {size}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </Collapse>
        </div>
        <Separator className="mb-5" />
      </Colxx>
    </Row>
  );
};

export default injectIntl(ListPageHeadingProductos);
