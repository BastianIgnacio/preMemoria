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
import { CATEGORIA_CHANGE_PAGE_SIZE } from '../../../../redux/actions';

const ListPageHeadingCategorias = ({
  pageSizes,
  toggleModal,
  heading,
}) => {
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const dispatch = useDispatch();
  const totalItems = useSelector((state) => state.categorias.totalItems);
  const startItem = useSelector((state) => state.categorias.startItem);
  const endItem = useSelector((state) => state.categorias.endItem);
  const itemsPorPagina = useSelector(
    (state) => state.categorias.itemsPorPagina
  );
  const idTienda = useSelector((state) => state.authUser.tienda.id);
  const items = useSelector((state) => state.categorias.items);

  const changePageSize = (nuevosItemsPorPagina) => {
    dispatch({
      type: CATEGORIA_CHANGE_PAGE_SIZE,
      payload: {
        paginaActual: 1,
        itemsPorPagina: nuevosItemsPorPagina,
        refLocalComercial: idTienda,
      },
    });
  }

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
              onClick={() => toggleModal()}
            >
              {items.length === 0 ? (
                <>Añade tu Primera Categoria </>

              ) : (<> Nueva Categoria</>)}
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

export default injectIntl(ListPageHeadingCategorias);
