/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Card, CardBody, Badge, Button, Modal } from 'reactstrap';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import BreadcrumbTienda from '../../../containers/navs/BreadcrumbTienda';
import {
  TIENDA_CARGAR_PRODUCTOS_CATEGORIA,
  TIENDA_CARGAR_TIENDA,
} from '../../../redux/actions';
import { apiMediaUrl } from '../../../constants/defaultValues';

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const CategoriasTienda = (props) => {
  const { link } = useParams();
  const dispatch = useDispatch();

  const isLoaded = useSelector((state) => state.tienda.isLoaded);
  const existeTienda = useSelector((state) => state.tienda.exist);

  const tiendaCargada = useSelector((state) => state.tienda.tiendaCargada);
  const categorias = useSelector((state) => state.tienda.categorias);
  const nombreTienda = useSelector((state) => state.tienda.nombre);
  useEffect(() => {
    if (!tiendaCargada) {
      dispatch({
        type: TIENDA_CARGAR_TIENDA,
        payload: link,
      });
    }
  });

  const verProductosCategoria = (idCategoria) => {
    dispatch({
      type: TIENDA_CARGAR_PRODUCTOS_CATEGORIA,
      payload: idCategoria,
    });
  };

  const reformatStringUpperCase = (oracion) => {
    if (oracion === undefined) {
      return '';
    }
    return oracion.toUpperCase();
  };

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <div className="d-flex justify-content-center">
      {existeTienda ? (
        <Row className="background-tienda  d-flex justify-content-center">
          <div className="mb-4 background-tienda-contents w-96">
            <Button
              color="primary"
              size="lg"
              block
              className="mb-2 d-flex justify-content-center rounded-0 "
            >
              <div>{reformatStringUpperCase(nombreTienda)}</div>
            </Button>{' '}
            <Row>
              {categorias.map((categoria, index) => {
                if (categoria.esVisible) {
                  return (
                    <Colxx
                      xs="12"
                      sm="6"
                      lg="4"
                      className="mb-2"
                      // eslint-disable-next-line react/no-array-index-key
                      key={`producto_${index}`}
                    >
                      <Card className="flex-row listing-card-container">
                        <NavLink
                          to={`/tienda/${link}/${categoria.id}`}
                          onClick={() => verProductosCategoria(categoria.id)}
                          className="d-flex flex-row w-100"
                        >
                          <img
                            className="card-img-left"
                            src={apiMediaUrl + categoria.imagen}
                            alt="Card cap"
                          />
                          {categoria.esNuevo && (
                            <Badge
                              color="primary"
                              pill
                              className="position-absolute badge-top-left"
                            >
                              NUEVO
                            </Badge>
                          )}
                          <div className="d-flex justify-content-between w-100">
                            <ResponsiveEllipsis
                              className="m-2 card-text font-weight-bold "
                              text={categoria.nombre.toUpperCase()}
                              maxLine="2"
                              trimRight
                              basedOn="words"
                              component="p"
                            />
                            <div className="card-icon d-flex align-items-center">
                              <div className="iconsminds-next-2 ml-auto" />
                            </div>
                          </div>
                        </NavLink>
                      </Card>
                    </Colxx>
                  );
                }
                // eslint-disable-next-line react/no-array-index-key
                return <div key={`categoria_${index}`} />;
              })}
            </Row>
          </div>
        </Row>
      ) : (
        <Colxx xxs="12">
          <BreadcrumbTienda heading="NO EXISTE TIENDA" />
        </Colxx>
      )}
    </div>
  );
};

export default CategoriasTienda;
