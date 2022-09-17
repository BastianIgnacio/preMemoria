/* eslint-disable prettier/prettier */
/* eslint-disable react/no-array-index-key */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
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
import 'react-datepicker/dist/react-datepicker.css';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
// eslint-disable-next-line no-unused-vars
import { ORDEN_CHANGE_ESTADO, ORDEN_CHANGE_PAGE_SIZE, ORDEN_SET_ESTADO } from '../../../../redux/actions';
import { estadosOrdenVisualizador } from '../../../../constants/defaultValues';

const ListPageHeadingOrdenes = ({
  pageSizes,

}) => {

  const dispatch = useDispatch();
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const estado = useSelector((state) => state.ordenes.estado);

  const idTienda = useSelector((state) => state.authUser.tienda.id);

  const totalItems = useSelector((state) => state.ordenes.totalItems);
  const startItem = useSelector((state) => state.ordenes.startItem);
  const endItem = useSelector((state) => state.ordenes.endItem);
  const itemsPorPagina = useSelector(
    (state) => state.ordenes.itemsPorPagina
  );
  const estadoOrden = useSelector((state) => state.ordenes.estado);

  const changePageSize = (nuevosItemsPorPagina) => {
    console.log(nuevosItemsPorPagina);

    dispatch({
      type: ORDEN_CHANGE_PAGE_SIZE,
      payload: {
        itemsPorPagina: nuevosItemsPorPagina,
        paginaActual: 1,
        refLocalComercial: idTienda,
        estado: estadoOrden,
      },
    });
  }

  // eslint-disable-next-line no-unused-vars
  const changeEstado = (nuevoEstado) => {
    dispatch({
      type: ORDEN_CHANGE_ESTADO,
      payload: {
        estado: nuevoEstado,
        refLocalComercial: idTienda,
      }
    });
  }

  return (
    <Row>
      <Colxx xxs="12">
        <div className="mb-2">
          <h1>
            VISUALIZADOR DE ORDENES PENDIENTES
          </h1>
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
                  {estado.label}
                </DropdownToggle>
                <DropdownMenu>
                  {estadosOrdenVisualizador.map((opc, index) => {
                    return (
                      <DropdownItem
                        key={index}
                        onClick={() => {
                          console.log(opc.id);
                          changeEstado(opc);
                        }}
                      >
                        {opc.label}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            <div className="float-md-right pt-1">
              <span className="text-muted text-small mr-1">{`${startItem}-${endItem} de ${totalItems} `}</span>
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

export default injectIntl(ListPageHeadingOrdenes);