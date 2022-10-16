/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row, Card, CardBody, Badge, Button, Modal,
  ModalHeader,
  ModalBody,
  ButtonGroup,
  Label,
  CardSubtitle,
  CardImg,
  CardText,
} from 'reactstrap';
import {
  AvForm,
  AvGroup,
  AvInput,
} from 'availity-reactstrap-validation';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import BreadcrumbTienda from '../../../containers/navs/BreadcrumbTienda';
import { NotificationManager } from '../../../components/common/react-notifications';
import { TIENDA_CERRAR_MODAL_PRODUCTO, TIENDA_SET_PRODUCTO_SELECCIONADO, TIENDA_DETALLE_MODAL, TIENDA_VOLVER_A_CATEGORIAS, CARRITO_INIT } from '../../../redux/actions';
import { apiMediaUrl } from '../../../constants/defaultValues';

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const ProductosCategoria = (props) => {
  const { link, refCategoria } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();


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

  const isLoaded = useSelector((state) => state.tienda.isLoaded);
  const existeTienda = useSelector((state) => state.tienda.exist);

  const idTienda = useSelector((state) => state.tienda.idTienda);
  const nombreTienda = useSelector((state) => state.tienda.nombre);
  const productosCargado = useSelector((state) => state.tienda.productosCargado);
  const productos = useSelector((state) => state.tienda.productos);

  const productoSeleccionado = useSelector((state) => state.tienda.productoSeleccionado);
  const categoriaSeleccionada = useSelector((state) => state.tienda.categoriaSeleccionada);
  const contadorProducto = useSelector((state) => state.tienda.contadorProducto);
  const total = useSelector((state) => state.tienda.total);
  const modalProducto = useSelector((state) => state.tienda.modalProducto);
  const hayProductosVisibles = useSelector((state) => state.tienda.hayProductosVisibles);

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

  const volverCategorias = () => {
    dispatch(
      {
        type: TIENDA_VOLVER_A_CATEGORIAS,
      }
    );
    history.push(`/tienda/${link}`);
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

  const reformatString = (oracion) => {
    if (oracion === undefined) {
      return '';
    }
    const oracionLower = oracion.toLowerCase();
    return oracionLower[0].toUpperCase() + oracionLower.substring(1);
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
      {existeTienda && (
        <Row className="background-tienda d-flex justify-content-center">
          <div className="mb-4  background-tienda-contents w-96">
            <Button color="primary" size="lg" block className="mb-2 d-flex justify-content-between rounded-top rounded-bottom " onClick={volverCategorias}>
              <div className=" mr-auto iconsminds-arrow-left-2" >
                {reformatStringUpperCase(categoriaSeleccionada.nombre)}
              </div>
            </Button>{' '}
            {hayProductosVisibles ? (
              <Row className="">
                {productos.map((producto, index) => {
                  if (producto.precio < 100) {
                    return (
                      // eslint-disable-next-line react/no-array-index-key
                      <div key={`producto_${index}`} />
                    )
                  }
                  return (
                    <Colxx
                      xs="12"
                      sm="6"
                      lg="4"
                      className="mb-2"
                      // eslint-disable-next-line react/no-array-index-key
                      key={`producto_${index}`}
                    >
                      <Card className="flex-row listing-card-container w-100">
                        <NavLink
                          to={`/tienda/${link}/${producto.refCategoria}`}
                          className="d-flex flex-row w-100"
                          onClick={() => abrirModal(producto)}
                        >

                          <div className="d-flex justify-content-between w-100" >
                            <img
                              className="card-img-left"
                              src={apiMediaUrl + producto.imagen}
                              alt="Card cap"
                            />
                            {producto.esNuevo && (
                              <Badge
                                color="primary"
                                pill
                                className="position-absolute badge-top-left"
                              >
                                NUEVO
                              </Badge>
                            )}
                            <div className="d-flex justify-content-between w-100">
                              <div className="d-flex flex-column">
                                <ResponsiveEllipsis
                                  className="m-2 card-text font-weight-bold "
                                  text={reformatString(producto.nombre)}
                                  maxLine="2"
                                  trimRight
                                  basedOn="words"
                                  component="p"
                                />
                                <h5 className=" mb-2 ml-4 card-text mt-auto font-weight-bold "> ${producto.precio} </h5>
                              </div>
                              <div className="card-icon d-flex align-items-center">
                                <div className="iconsminds-add ml-auto" />
                              </div>
                            </div>
                          </div>
                        </NavLink>
                      </Card>
                    </Colxx>
                  );
                })}
              </Row>
            ) : (
              <div className=" mt-4 d-flex justify-content-center w-100">
                <div className=" mt-4 card-icon w-80">
                  NO HAY PRODUCTOS EN ESTA CATEGORIA
                </div>
              </div>
            )}
          </div>
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
        </Row>
      )
      }
      {!existeTienda && (
        <Colxx xxs="12">
          <BreadcrumbTienda heading="NO EXISTE TIENDA" />
        </Colxx>
      )
      }
    </div>
  );
};

export default ProductosCategoria;
