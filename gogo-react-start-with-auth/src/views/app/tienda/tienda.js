/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
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
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio,
  AvCheckboxGroup,
  AvCheckbox,
} from 'availity-reactstrap-validation';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import BreadcrumbTienda from '../../../containers/navs/BreadcrumbTienda';
import IntlMessages from '../../../helpers/IntlMessages';
import ImageCardModalProducto from '../../../containers/ui/ImageCardModalProducto';
import { getTiendaList } from '../../../redux/tienda/actions';
import { addNewProductCarrito } from '../../../redux/carrito/actions';
import { NotificationManager } from '../../../components/common/react-notifications';

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const Tienda = (props) => {
  const { id } = useParams();
  const [showBotonAtras, setShowBotonAtras] = useState(false);
  const [showProductos, setShowProductos] = useState(false);
  const [indexCat, setIndexCat] = useState(0);


  const [modalLarge, setModalLarge] = useState(false);
  const [modalNombreProducto, setModalNombreProducto] = useState("");
  const [modalDescripcionProducto, setModalDescripcionProducto] = useState("");
  const [modalPrecioProducto, setModalPrecioProducto] = useState(0);
  const [modalIdProducto, setModalIdProducto] = useState("");

  const [contadorProducto, setContadorProducto] = useState(0);
  const [total, setTotal] = useState(0);

  // Obtenemos las categorias del state
  const categorias = useSelector((state) => state.tiendaApp.categorias_y_productos);
  const nombreTienda = useSelector((state) => state.tiendaApp.nombreTienda);
  const horarioTienda = useSelector((state) => state.tiendaApp.horarioTienda);
  const dispatch = useDispatch();
  const estadoApp = useSelector((state) => state);
  const history = useHistory();






  const restarProducto = () => {
    if (contadorProducto > 1) {
      setContadorProducto(contadorProducto - 1);
    }
    else {
      setContadorProducto(1);
    }
  }
  const sumarProducto = () => {
    const cantidadProducto = contadorProducto + 1;
    setContadorProducto(cantidadProducto);
    setTotal(contadorProducto * modalPrecioProducto);
  }

  const actualizarNav = () => {
    props.llamarPadre(id);
  };

  const abrirModal = (nombre, descripcion, precio, idProducto) => {
    setModalNombreProducto(nombre);
    setModalDescripcionProducto(descripcion);
    setModalPrecioProducto(precio);
    setContadorProducto(1);
    setTotal(1 * precio);
    setModalIdProducto(idProducto);
    console.log("Abrimos modal")
    setModalLarge(true);
  }

  const listProductos = categorias[indexCat].productos.map((producto, index) => {
    return (
      // eslint-disable-next-line react/no-array-index-key
      <Colxx xxs="12" lg="6" className="mb-5" key={`producto_${index}`}>
        <Card className="flex-row listing-card-container">
          <div className="w-30 position-relative">
            <img
              className="card-img-left"
              src={producto.rutaFotoProducto}
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
                text={producto.nombreProducto}
                maxLine="2"
                trimRight
                basedOn="words"
                component="h5"
              />
              <ResponsiveEllipsis
                className="listing-desc text-muted"
                text={`${producto.descripcionProducto}`}
                maxLine="3"
                trimRight
                basedOn="words"
                component="p"
              />
              <Button
                color="primary"
                className="mb-2 iconsminds-add"
                onClick={() => { abrirModal(producto.nombreProducto, producto.descripcionProducto, producto.precioProducto, producto.idProducto) }}
              >$ {`${producto.precioProducto}`}
              </Button>
            </CardBody>
          </div>
        </Card>
      </Colxx>
    );
  });

  const verProductos = (index) => {
    console.log(index);
    setIndexCat(index);
    setShowBotonAtras(true);
    setShowProductos(true);
  }

  const verCategorias = () => {
    setShowBotonAtras(false);
    setShowProductos(false);
  }

  const listCategorias = categorias.map((categoria, index) => {
    return (
      // eslint-disable-next-line react/no-array-index-key
      <Colxx xxs="12" lg="4" className="mb-5" key={`categoria_${index}`}>
        <Card className="flex-row listing-card-container">
          <div className="w-40 position-relative">
            <img
              className="card-img-left"
              src={categoria.rutaFotoCategoria}
              alt="Card cap"
            />
            {categoria.badgeCategoria && (
              <Badge
                color="primary"
                pill
                className="position-absolute badge-top-left"
              >
                {categoria.badgeCategoria}
              </Badge>
            )}
          </div>
          <div className="w-60 d-flex align-items-center">
            <CardBody>
              <ResponsiveEllipsis
                className="mb-3 listing-heading"
                text={categoria.nombreCategoria}
                maxLine="2"
                trimRight
                basedOn="words"
                component="h5"
              />
              <ResponsiveEllipsis
                className="listing-desc text-muted"
                text={categoria.descripcionCategoria}
                maxLine="3"
                trimRight
                basedOn="words"
                component="p"
              />
              <Button
                color="primary iconsminds-arrow-right-in-circle"
                className="mb-2"
                block
                onClick={() => verProductos(index)}
              >
                Ver productos
              </Button>
            </CardBody>
          </div>
        </Card>
      </Colxx>
    );
  });

  const notificacionProductoAgregado = (nombreProducto, cantidad, precioTotal) => {
    const str = `${nombreProducto} x ${cantidad} || $${precioTotal}`;
    NotificationManager.success(
      str,
      'AGREGADO CORRECTAMENTE',
      3000,
      () => history.push(`/carrito/${id}`),
      null,
      'filled'
    );

  }

  const onSubmit = (event, errors, values) => {
    console.log("Agregando");
    let notaEspecialToAdd = '';
    if (values.details === '') {
      notaEspecialToAdd = 'SIN NOTA ESPECIAL';
    }
    else {
      notaEspecialToAdd = values.details;
    }
    const idProductoToAdd = modalIdProducto;
    const nombreProductoToAdd = modalNombreProducto;
    const precioProductoToAdd = modalPrecioProducto;
    const cantidadProductoToAdd = contadorProducto;
    const totalProductoToAdd = contadorProducto * modalPrecioProducto;


    console.log(nombreProductoToAdd);
    console.log(notaEspecialToAdd);
    console.log(precioProductoToAdd);
    console.log(cantidadProductoToAdd);
    console.log(totalProductoToAdd);

    let idKeyCarrito = JSON.parse(localStorage.getItem('idKeyCarrito'));
    if (idKeyCarrito === null) {
      idKeyCarrito = 0;
    }
    else {
      idKeyCarrito += 1;
    }

    localStorage.setItem('idKeyCarrito', JSON.stringify(idKeyCarrito));

    const productoToAdd = {
      idKey: idKeyCarrito,
      idProducto: idProductoToAdd,
      idTienda: id,
      nombreProducto: nombreProductoToAdd,
      notaEspecial: notaEspecialToAdd,
      precio: precioProductoToAdd,
      cantidad: cantidadProductoToAdd,
    }

    // dispatch(addNewProductCarrito(productoToAdd));
    let arr = JSON.parse(localStorage.getItem('carritoLocalStorage'));
    if (arr === null) {
      arr = [];
    }
    arr.push(productoToAdd);
    localStorage.setItem('carritoLocalStorage', JSON.stringify(arr));
    setModalLarge(false);
    notificacionProductoAgregado(nombreProductoToAdd, cantidadProductoToAdd, totalProductoToAdd);
  };



  const estado = () => {
    console.log(estadoApp);
  }


  actualizarNav();
  return (
    <Row>
      <Colxx xxs="12">
        <BreadcrumbTienda heading={nombreTienda} />
      </Colxx>
      <Colxx xxs="12">
        <Separator className="mb-5" />
      </Colxx>
      {
        showBotonAtras ? (
          <Colxx xxs="12">
            <Button color="primary" block className="mb-2 iconsminds-arrow-left-in-circle" onClick={verCategorias} >
              Volver a Categorias
            </Button>{' '}
          </Colxx>
        ) : (
          <Colxx xxs="12" />
        )
      }
      {
        showProductos ? (
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <Row>
                  {listProductos}
                </Row>
              </CardBody>
            </Card>
          </Colxx>
        ) : (
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <Row>
                  {listCategorias}
                </Row>
              </CardBody>
            </Card>
          </Colxx>
        )
      }
      <Button color="primary" block className="mb-2 iconsminds-arrow-left-in-circle" onClick={estado} >
        ver estado
      </Button>{' '}
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
                        src="/assets/img/cards/thumb-1.jpg"
                        alt="Card image cap"
                      />
                      <Badge
                        color="primary"
                        pill
                        className="position-absolute badge-top-left"
                      >
                        $ {modalPrecioProducto}
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
                        PRECIO $ {modalPrecioProducto}
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
                        {modalDescripcionProducto}
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
                              <Button color="primary" block onClick={restarProducto}>
                                -
                              </Button>
                              <Button color="primary">
                                {contadorProducto}
                              </Button>
                              <Button color="primary" onClick={sumarProducto}>
                                +
                              </Button>
                            </ButtonGroup>
                          </Colxx>
                          <Colxx xxs="12" xs="12" lg="6" className="text-center" >
                            <CardText className="text-muted text-center text-large font-weight-bold mt-2">
                              $ {contadorProducto * modalPrecioProducto}
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
    </Row >
  );
};

export default Tienda;
