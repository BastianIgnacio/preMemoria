/* eslint-disable prettier/prettier */
/* eslint-disable react/no-array-index-key */
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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import { VENTA_CHANGE_DATE, VENTA_CHANGE_PAGE_SIZE } from '../../../../redux/actions';

const ListPageHeadingVentas = ({
  intl,
  pageSizes,
}) => {
  const dispatch = useDispatch();
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const { messages } = intl;
  const fecha = useSelector((state) => state.ventas.fecha);
  const idTienda = useSelector((state) => state.authUser.tienda.id);

  const totalItems = useSelector((state) => state.ventas.totalItems);
  const startItem = useSelector((state) => state.ventas.startItem);
  const endItem = useSelector((state) => state.ventas.endItem);
  const itemsPorPagina = useSelector(
    (state) => state.ventas.itemsPorPagina
  );

  const formatDate = (date) => {
    const d = new Date(date);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();
    if (month.length < 2)
      month = `0${month}`;
    if (day.length < 2)
      day = `0${day}`;

    return [year, month, day].join('-');
  }

  useEffect(() => {
    if (fecha === null) {
      const fechaActual = new Date();
      const formattedDate = formatDate(fechaActual);
      dispatch({
        type: VENTA_CHANGE_DATE,
        payload: {
          fecha: fechaActual,
          formattedDate,
          refLocalComercial: idTienda,
        }
      });
    }
  });

  const changeDate = (nuevaFecha) => {
    const formattedDate = formatDate(nuevaFecha);
    dispatch({
      type: VENTA_CHANGE_DATE,
      payload: {
        fecha: nuevaFecha,
        formattedDate,
        refLocalComercial: idTienda,
      }
    });
  }

  const changePageSize = (nuevosItemsPorPagina) => {
    const formattedDate = formatDate(fecha);
    dispatch({
      type: VENTA_CHANGE_PAGE_SIZE,
      payload: {
        paginaActual: 1,
        itemsPorPagina: nuevosItemsPorPagina,
        formattedDate,
        refLocalComercial: idTienda,
      },
    });
  }

  return (
    <Row>
      <Colxx xxs="12">
        <div className="mb-2">
          <h1>
            VENTAS
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
              <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                <DatePicker
                  selected={fecha}
                  onChange={(event) => {
                    console.log(event);
                    changeDate(event);
                  }}
                  placeholderText={messages['forms.date']}
                />
              </div>
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

export default injectIntl(ListPageHeadingVentas);