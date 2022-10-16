/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row, Card, CardBody, Badge, Button, Modal, ModalBody, CardImg,
  CardText,
  ButtonGroup,
  CardTitle,
} from 'reactstrap';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import {
  AvForm,
  AvGroup,
  AvInput,
} from 'availity-reactstrap-validation';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import BreadcrumbTienda from '../../../containers/navs/BreadcrumbTienda';
import {
  TIENDA_CARGAR_PRODUCTOS_CATEGORIA,
  TIENDA_CARGAR_TIENDA,
  TIENDA_SET_PRODUCTO_SELECCIONADO,
  TIENDA_CERRAR_MODAL_PRODUCTO,
  CARRITO_INIT,
  TIENDA_DETALLE_MODAL,

} from '../../../redux/actions';

import { NotificationManager } from '../../../components/common/react-notifications';
import { apiMediaUrl } from '../../../constants/defaultValues';
import GlideComponent from '../../../components/carousel/GlideComponent';

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const CategoriasTienda = (props) => {
  const { link } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const isLoaded = useSelector((state) => state.tienda.isLoaded);
  const existeTienda = useSelector((state) => state.tienda.exist);
  const abierto = useSelector((state) => state.tienda.abierto);

  const tiendaCargada = useSelector((state) => state.tienda.tiendaCargada);
  const categorias = useSelector((state) => state.tienda.categorias);
  const nombreTienda = useSelector((state) => state.tienda.nombre);

  const productoSeleccionado = useSelector((state) => state.tienda.productoSeleccionado);
  const idTienda = useSelector((state) => state.tienda.idTienda);
  const contadorProducto = useSelector((state) => state.tienda.contadorProducto);
  const total = useSelector((state) => state.tienda.total);
  const modalProducto = useSelector((state) => state.tienda.modalProducto);
  const mejoresProductosItems = useSelector((state) => state.tienda.mejoresProductos);

  useEffect(() => {
    if (!tiendaCargada) {
      dispatch({
        type: TIENDA_CARGAR_TIENDA,
        payload: link,
      });
    }
  });

  const sumarProducto = () => {
    const disContador = contadorProducto + 1;
    const disTotal = disContador * productoSeleccionado.precio;
    dispatch({
      type: TIENDA_DETALLE_MODAL,
      payload: {
        contadorProducto: disContador,
        total: disTotal,
      }
    });
  }

  const restarProducto = () => {
    if (contadorProducto > 1) {
      const disContador = contadorProducto - 1;
      const disTotal = disContador * productoSeleccionado.precio;
      dispatch({
        type: TIENDA_DETALLE_MODAL,
        payload: {
          contadorProducto: disContador,
          total: disTotal,
        }
      });
    }
  }



  const verCarrito = () => {
    dispatch({
      type: CARRITO_INIT,
      payload: link,
    });
    history.push(`/carrito/${link}`);
  }

  const notificacionProductoAgregado = () => {
    NotificationManager.success(
      'Ver carrito',
      'Añadido',
      2000,

      () => verCarrito(),
      null,
      'filled'
    );
  }

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

  const abrirModal = (producto) => {
    dispatch(
      {
        type: TIENDA_SET_PRODUCTO_SELECCIONADO,
        payload: {
          producto,
          total: producto.precio,
        }
      }
    );
  };
  const cerrarModal = () => {
    dispatch(
      {
        type: TIENDA_CERRAR_MODAL_PRODUCTO,
      }
    );
  };
  const reformatString = (oracion) => {
    if (oracion === undefined) {
      return '';
    }
    const oracionLower = oracion.toLowerCase();
    return oracionLower[0].toUpperCase() + oracionLower.substring(1);
  };

  const BasicCarouselItem = (mejorProductoItem) => {
    return (
      <div className="glide-item">
        <Card className="flex-row listing-card-container w-100">
          <NavLink
            to={`/tienda/${link}`}
            className="d-flex flex-row w-100"
            onClick={() => abrirModal(mejorProductoItem)}
          >
            <div className="d-flex justify-content-between w-100" >
              <img
                className="card-img-left"
                src={apiMediaUrl + mejorProductoItem.imagen}
                alt="Card cap"
              />
              <Badge
                color="primary"
                pill
                className="position-absolute badge-top-left"
              >
                PROMOCIÓN
              </Badge>
              <div className="d-flex justify-content-between w-100">
                <div className="d-flex flex-column">
                  <ResponsiveEllipsis
                    className="m-2 card-text font-weight-bold "
                    text={reformatString(mejorProductoItem.nombre)}
                    maxLine="2"
                    trimRight
                    basedOn="words"
                    component="p"
                  />
                  <h5 className=" mb-2 ml-4 card-text mt-auto font-weight-bold "> ${mejorProductoItem.precio} </h5>
                </div>
                <div className="card-icon d-flex align-items-center">
                  <div className="iconsminds-add ml-auto" />
                </div>
              </div>
            </div>
          </NavLink>
        </Card>
      </div>
    );
  };

  const onSubmit = (event, errors, values) => {
    const notaEspecial = values.details;

    // EL SAGA DEBE ENCARGARSE DEL LOCAL STORAGE 
    let arr = JSON.parse(localStorage.getItem('carritoLocalStorage'));
    if (arr === null) {
      arr = [];
    }

    let keyCarritoProducto = JSON.parse(localStorage.getItem('keyCarritoProducto'));
    if (keyCarritoProducto === null) {
      keyCarritoProducto = 1;
    }

    const productoToAdd = {
      keyCarritoProducto,
      idProducto: productoSeleccionado.id,
      idLocalComercial: idTienda,
      nombre: productoSeleccionado.nombre,
      descripcion: productoSeleccionado.descripcion,
      imagen: productoSeleccionado.imagen,
      notaEspecial,
      precio: productoSeleccionado.precio,
      cantidad: contadorProducto,
      total,
    }
    // AGREGARMOS EL PRODUCTO AL ARRAY carritoLocalStorage
    arr.push(productoToAdd);
    keyCarritoProducto += 1;
    localStorage.setItem('carritoLocalStorage', JSON.stringify(arr));
    localStorage.setItem('keyCarritoProducto', JSON.stringify(keyCarritoProducto));
    notificacionProductoAgregado();
    cerrarModal();
  };

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <div className="d-flex justify-content-center">
      {existeTienda ? (
        <>
          {abierto ? (
            <Row className="background-tienda  d-flex justify-content-center">
              <div className="mb-4 background-tienda-contents w-100">
                <Row>
                  {mejoresProductosItems.length !== 0 && (
                    <>
                      <Colxx className="ml-3 mr-3 mt-3 mb-2">
                        <Button
                          color="primary"
                          size="lg"
                          block
                          className="d-flex justify-content-left default default rounded-top rounded-bottom"
                        >
                          <div> Más vendidos </div>
                        </Button>{' '}
                      </Colxx>
                      <Colxx lg="12" className="mb-3">
                        <GlideComponent
                          settings={{
                            gap: 5,
                            perView: 2,
                            type: 'carousel',
                            breakpoints: {
                              500: { perView: 1 },
                              1000: { perView: 2 },
                            },
                            hideNav: true,
                          }}
                        >
                          {mejoresProductosItems.map((mp, index) => {
                            console.log(mp);
                            return (
                              <div key={mp.id}>
                                <BasicCarouselItem {...mp} />
                              </div>
                            );
                          })}
                        </GlideComponent>
                      </Colxx>
                    </>
                  )
                  }
                  <Colxx lg="12" className="mb-2">
                    <Button
                      color="primary"
                      size="lg"
                      block
                      className="d-flex justify-content-left default rounded-top rounded-bottom"
                    >
                      <div>{`CATEGORIAS ${reformatStringUpperCase(nombreTienda)}`}</div>
                    </Button>{' '}
                  </Colxx>

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
              <BreadcrumbTienda heading="TIENDA CERRADA" />
            </Colxx>
          )}
        </>
      ) : (
        <Colxx xxs="12">
          <BreadcrumbTienda heading="NO EXISTE TIENDA" />
        </Colxx>
      )}

      <Modal
        isOpen={modalProducto}
        toggle={() => cerrarModal()}
      >
        <ModalBody className="d-flex justify-content-center">
          <Row>
            <AvForm
              className="av-tooltip tooltip-label-right"
              onSubmit={(event, errors, values) => onSubmit(event, errors, values)}
            >
              <Colxx xxs="12" xs="12" lg="12">
                <Card className="mb-1">
                  <CardBody>
                    <Row className="d-flex justify-content-center ">
                      <Colxx xxs="12" xs="12" lg="12" className="mb-2" >
                        <CardText className="text-muted text-center text-medium mb-1 font-weight-bold">
                          {reformatString(productoSeleccionado.nombre)}
                        </CardText>
                        <Separator className="mb-2" />
                      </Colxx>
                      <Colxx xxs="12" xs="12" lg="12" className="mb-2" >
                        <CardText className="text-muted text-center text-medium mb-1 ">
                          {reformatString(productoSeleccionado.descripcion)}
                        </CardText>
                      </Colxx>

                      <Colxx xxs="12" xs="12" lg="12" className="mb-3 text-center" >
                        <div >
                          <img
                            src={apiMediaUrl + productoSeleccionado.imagen}
                            alt="product"
                            className="w-100 rounded-top rounded-bottom"
                          />
                        </div>
                      </Colxx>
                      <Colxx xxs="12" xs="12" lg="12" className="text-center mb-4">
                        <div className="d-flex justify-content-around">
                          <Button color="primary" block className="font-weight-bold btn-lg default rounded-top rounded-bottom ml-1 " outline onClick={() => restarProducto()}>
                            -
                          </Button>
                          <Button color="primary" className=" default rounded-top rounded-bottom ml-1 mr-1" disabled >
                            {contadorProducto}
                          </Button>
                          <Button color="primary" block className="border-5 font-weight-bold  text-medium  btn-lg default rounded-top rounded-bottom mr-1" outline onClick={() => sumarProducto()}>
                            +
                          </Button>
                        </div>
                      </Colxx>
                      <Colxx xxs="12" xs="12" lg="12" className="text-center " >
                        <CardText className="text-muted text-start text-large font-weight-bold">
                          $ {total}
                        </CardText>
                      </Colxx>
                    </Row>
                  </CardBody>
                </Card>
              </Colxx>
              <Colxx xxs="12" xs="12" lg="12">
                <Card className="mb-2">
                  <CardBody>
                    <AvGroup>
                      <CardText className="text-muted text-center text-medium mb-2 font-weight-bold">
                        AÑADE UNA NOTA ESPECIAL
                      </CardText>
                      <AvInput type="textarea" placeholder="Aca puedes incluir una nota" name="details" id="details" rows="4" />
                    </AvGroup>
                    <Button color="primary" className='iconsminds-add-cart' block >Agregar al carrito</Button>
                    <Button color="secondary" block onClick={() => cerrarModal()} >Volver</Button>
                  </CardBody>
                </Card>
              </Colxx>
            </AvForm>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CategoriasTienda;
