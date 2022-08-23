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
import { TIENDA_CARGAR_PRODUCTOS_CATEGORIA, TIENDA_CARGAR_TIENDA, TIENDA_SET_PRODUCTO_SELECCIONADO, TIENDA_DETALLE_MODAL, TIENDA_VOLVER_A_CATEGORIAS } from '../../../redux/actions';
import { apiMediaUrl } from '../../../constants/defaultValues';

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const Tienda = (props) => {
  const { id } = useParams();

  const [modalLarge, setModalLarge] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const notificacionProductoAgregado = (nombreProducto, cantidad, precioTotal) => {
    const str = `${nombreProducto} x ${cantidad} || $${precioTotal}`;
    NotificationManager.success(
      str,
      'AGREGADO CORRECTAMENTE',
      4000,
      () => history.push(`/carrito/${id}`),
      null,
      'filled'
    );
  }

  const isLoaded = useSelector((state) => state.tienda.isLoaded);
  const existeTienda = useSelector((state) => state.tienda.exist);

  const idTienda = useSelector((state) => state.tienda.idTienda);
  const nombreTienda = useSelector((state) => state.tienda.nombre);
  const tiendaCargada = useSelector((state) => state.tienda.tiendaCargada);
  const mostrarProductos = useSelector((state) => state.tienda.mostrarProductos);
  const categorias = useSelector((state) => state.tienda.categorias);
  const mostrarBotonAtras = useSelector((state) => state.tienda.mostrarBotonAtras);
  const productos = useSelector((state) => state.tienda.productos);

  const productoSeleccionado = useSelector((state) => state.tienda.productoSeleccionado);
  const contadorProducto = useSelector((state) => state.tienda.contadorProducto);
  const total = useSelector((state) => state.tienda.total);

  useEffect(() => {
    if (!tiendaCargada) {
      dispatch({
        type: TIENDA_CARGAR_TIENDA,
        payload: id,
      });
    }
  });

  const volverCategorias = () => {
    dispatch(
      {
        type: TIENDA_VOLVER_A_CATEGORIAS,
      }
    );
  }
  const verProductosCategoria = (idCategoria) => {
    // console.log(idCategoria);
    dispatch(
      {
        type: TIENDA_CARGAR_PRODUCTOS_CATEGORIA,
        payload: idCategoria,
      }
    );
  }

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
    setModalLarge(!modalLarge);

  }

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
    setModalLarge(false);
    notificacionProductoAgregado(productoSeleccionado.nombre, contadorProducto, total);
  };



  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <div>
      {existeTienda && (
        <Row>

          <Colxx xxs="12">
            <BreadcrumbTienda heading={nombreTienda} />
          </Colxx>
          <Colxx xxs="12">
            <Separator className="mb-5" />
          </Colxx>
          {
            mostrarBotonAtras ? (
              <Colxx xxs="12">
                <Button color="primary" block className="mb-2 iconsminds-arrow-left-in-circle" onClick={() => volverCategorias()} >
                  Volver a Categorias
                </Button>{' '}
              </Colxx>
            ) : (
              <Colxx xxs="12" />
            )
          }
          {
            mostrarProductos ? (
              <Colxx xxs="12">
                <Card>
                  <CardBody>
                    <Row>
                      {
                        productos.map((producto, index) => {
                          return (
                            // eslint-disable-next-line react/no-array-index-key
                            <Colxx xxs="12" lg="6" className="mb-5" key={`producto_${index}`}>
                              <Card className="flex-row listing-card-container">
                                <div className="w-30 position-relative">
                                  <img
                                    className="card-img-left"
                                    src={apiMediaUrl + producto.imagen}
                                    alt="Card cap"
                                  />
                                  {producto.badgeProducto && (
                                    <Badge
                                      color="primary"
                                      pill
                                      className="position-absolute badge-top-left"
                                    >
                                      {producto.badgeProducto}
                                    </Badge>
                                  )}
                                </div>
                                <div className="w-60 d-flex align-items-center">
                                  <CardBody>
                                    <ResponsiveEllipsis
                                      className="mb-3 listing-heading"
                                      text={producto.nombre}
                                      maxLine="2"
                                      trimRight
                                      basedOn="words"
                                      component="h5"
                                    />
                                    <ResponsiveEllipsis
                                      className="listing-desc text-muted"
                                      text={`${producto.descripcion}`}
                                      maxLine="3"
                                      trimRight
                                      basedOn="words"
                                      component="p"
                                    />
                                    <Button
                                      color="primary"
                                      className="mb-2 iconsminds-add"
                                      onClick={() => { abrirModal(producto) }}
                                    >$ {`${producto.precio}`}
                                    </Button>
                                  </CardBody>
                                </div>
                              </Card>
                            </Colxx>
                          );
                        })}
                    </Row>
                  </CardBody>
                </Card>
              </Colxx>
            ) : (
              <Colxx xxs="12">
                <Card>
                  <CardBody>
                    <Row>
                      {
                        categorias.map((cat) => {
                          return (
                            <Colxx xxs="12" lg="4" className="mb-5" key={`categoria_${cat.id}`}>
                              <Card className="flex-row listing-card-container">
                                <div className="w-40 position-relative">
                                  <img
                                    className="card-img-left"
                                    src={apiMediaUrl + cat.imagen}
                                    alt="Card cap"
                                  />
                                  {cat.badgeCategoria && (
                                    <Badge
                                      color="primary"
                                      pill
                                      className="position-absolute badge-top-left"
                                    >
                                      {cat.badgeCategoria}
                                    </Badge>
                                  )}
                                </div>
                                <div className="w-60 d-flex align-items-center">
                                  <CardBody>
                                    <ResponsiveEllipsis
                                      className="mb-3 listing-heading"
                                      text={cat.nombre}
                                      maxLine="2"
                                      trimRight
                                      basedOn="words"
                                      component="h5"
                                    />
                                    <ResponsiveEllipsis
                                      className="listing-desc text-muted"
                                      text={cat.descripcion}
                                      maxLine="3"
                                      trimRight
                                      basedOn="words"
                                      component="p"
                                    />
                                    <Button
                                      color="primary iconsminds-arrow-right-in-circle"
                                      className="mb-2"
                                      block
                                      onClick={() => {
                                        verProductosCategoria(cat.id);
                                      }}
                                    >
                                      Ver productos
                                    </Button>
                                  </CardBody>
                                </div>
                              </Card>
                            </Colxx>
                          );
                        })
                      }
                    </Row>
                  </CardBody>
                </Card>
              </Colxx>
            )
          }
          <Modal
            isOpen={modalLarge}
            toggle={() => setModalLarge(!modalLarge)}
          >
            <ModalBody>
              <Row>
                <AvForm
                  className="av-tooltip tooltip-label-right"
                  onSubmit={(event, errors, values) => onSubmit(event, errors, values)}
                >
                  <Row>
                    <Colxx xxs="12" xs="12" lg="6">
                      <Card className="mb-2">
                        <div className="position-relative">
                          <CardImg
                            top
                            src={apiMediaUrl + productoSeleccionado.imagen}
                            alt="Card image cap"
                          />
                          <Badge
                            color="primary"
                            pill
                            className="position-absolute badge-top-left"
                          >
                            $ {productoSeleccionado.precio}
                          </Badge>
                          <Badge
                            color="secondary"
                            pill
                            className="position-absolute badge-top-left-2"
                          >
                            NUEVO
                          </Badge>
                        </div>
                        <CardBody>
                          <CardText className="text-muted text-center text-medium mb-0 font-weight-bold">
                            PRECIO $ {productoSeleccionado.precio}
                          </CardText>
                        </CardBody>
                      </Card>
                    </Colxx>
                    <Colxx xxs="12" xs="12" lg="6">
                      <Card className="mb-2">
                        <CardBody>
                          <CardText className="text-muted text-center text-medium mb-4 font-weight-bold">
                            DESCIPCIÓN
                          </CardText>
                          <CardSubtitle className="text-muted text-center text-medium mb-4 font-weight-light">
                            {productoSeleccionado.descripcion}
                          </CardSubtitle>
                        </CardBody>
                      </Card>
                    </Colxx>
                    <Colxx xxs="12" xs="12" lg="12">
                      <Card className="mb-2">
                        <CardBody>
                          <AvGroup>
                            <CardText className="text-muted text-center text-medium mb-2 font-weight-bold">
                              AÑADE UNA NOTA AL LOCAL COMERCIAL
                            </CardText>
                            <AvInput type="textarea" placeholder="Aca puedes incluir una nota" min name="details" id="details" rows="4" />
                          </AvGroup>
                        </CardBody>
                      </Card>
                    </Colxx>

                    <Colxx xxs="12" xs="12" lg="12">
                      <Card className="mb-4">
                        <CardBody>
                          <AvGroup>
                            <Row>
                              <Colxx xxs="12" xs="12" lg="6" className="text-center mb-2">
                                <ButtonGroup >
                                  <Button color="primary" block onClick={() => restarProducto()}>
                                    -
                                  </Button>
                                  <Button color="primary">
                                    {contadorProducto}
                                  </Button>
                                  <Button color="primary" onClick={() => sumarProducto()}>
                                    +
                                  </Button>
                                </ButtonGroup>
                              </Colxx>
                              <Colxx xxs="12" xs="12" lg="6" className="text-center" >
                                <CardText className="text-muted text-center text-large font-weight-bold mt-2">
                                  $ {total}
                                </CardText>
                              </Colxx>
                            </Row>
                          </AvGroup>
                          <Button color="primary" className='iconsminds-add-cart' block >Agregar al carrito</Button>
                          <Button color="secondary" block onClick={() => { setModalLarge(false) }} >Volver</Button>
                        </CardBody>
                      </Card>
                    </Colxx>
                  </Row>
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

export default Tienda;
