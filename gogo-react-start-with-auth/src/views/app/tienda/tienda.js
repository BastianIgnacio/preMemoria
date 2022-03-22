/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
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
import { useParams, NavLink } from 'react-router-dom';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { categorias } from '../../../data/categorias';
import BreadcrumbTienda from '../../../containers/navs/BreadcrumbTienda';
import IntlMessages from '../../../helpers/IntlMessages';
import ImageCardModalProducto from '../../../containers/ui/ImageCardModalProducto';

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

  const [contadorProducto, setContadorProducto] = useState(0);
  const [total, setTotal] = useState(0)


  const restarProducto = () => {
    if (contadorProducto > 1) {
      setContadorProducto(contadorProducto - 1);
    }
    else {
      setContadorProducto(1);
    }
  }
  const sumarProducto = () => {
    console.log("Antes de setear un +1 ");
    console.log(contadorProducto);
    const cantidadProducto = contadorProducto + 1;
    setContadorProducto(cantidadProducto);
    console.log("Despues de setear un +1");
    console.log(contadorProducto);

    setTotal(contadorProducto * modalPrecioProducto);
  }

  const actualizarNav = () => {
    props.llamarPadre(id);
  };
  const [header, setHeader] = useState(`Categorias de la tienda : ${id}`)


  const abrirModal = (nombre, descripcion, precio) => {

    setModalNombreProducto(nombre);
    setModalDescripcionProducto(descripcion);
    setModalPrecioProducto(precio);
    setContadorProducto(1);
    setTotal(1 * precio);
    console.log("Abrimos modal")
    setModalLarge(true);


  }

  const ver = () => {
    console.log("-----------");
    console.log(contadorProducto);
    console.log(modalPrecioProducto);
    console.log("Total a pagar:");
    console.log(contadorProducto * modalPrecioProducto);
    console.log("-----------");
  }


  const divAction = () => {
    console.log("funka")
  }
  const listProductos = categorias[indexCat].productos.map((producto, index) => {
    return (
      // eslint-disable-next-line react/no-array-index-key
      <Colxx xxs="12" lg="4" className="mb-5" key={`producto_${index}`}>
        <Card className="flex-row listing-card-container">
          <div className="w-40 position-relative">
            <img
              className="card-img-left"
              src={producto.thumb}
              alt="Card cap"
            />
            {producto.badge && (
              <Badge
                color="primary"
                pill
                className="position-absolute badge-top-left"
              >
                {producto.badge}
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
                text={`${producto.precioProducto}`}
                maxLine="3"
                trimRight
                basedOn="words"
                component="p"
              />
              <Button
                color="primary"
                className="mb-2 iconsminds-add"
                onClick={() => { abrirModal(producto.nombreProducto, producto.descripcion, producto.precioProducto) }}
              >Añadir
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
    setHeader(`Productos de la Tienda : categoria ${index}`);
    setShowProductos(true);
  }

  const verCategorias = () => {
    setShowBotonAtras(false);
    setShowProductos(false);
    setHeader(`Categorias de la tienda : ${id}`);
  }

  const listCategorias = categorias.map((categoria, index) => {
    return (
      // eslint-disable-next-line react/no-array-index-key
      <Colxx xxs="12" lg="4" className="mb-5" key={`categoria_${index}`}>
        <Card className="flex-row listing-card-container">
          <div className="w-40 position-relative">
            <img
              className="card-img-left"
              src={categoria.thumb}
              alt="Card cap"
            />
            {categoria.badge && (
              <Badge
                color="primary"
                pill
                className="position-absolute badge-top-left"
              >
                {categoria.badge}
              </Badge>
            )}
          </div>
          <div className="w-60 d-flex align-items-center">
            <CardBody>
              <ResponsiveEllipsis
                className="mb-3 listing-heading"
                text={categoria.title}
                maxLine="2"
                trimRight
                basedOn="words"
                component="h5"
              />
              <ResponsiveEllipsis
                className="listing-desc text-muted"
                text={categoria.description}
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
                Ver más
              </Button>
            </CardBody>
          </div>
        </Card>
      </Colxx>
    );
  });

  const onSubmit = (event, errors, values) => {
    console.log(errors);
    console.log(values);
    if (errors.length === 0) {
      // submit
    }
  };

  actualizarNav();
  return (
    <Row>
      <Colxx xxs="12">
        <BreadcrumbTienda heading={header} />
      </Colxx>
      <Colxx xxs="12">
        <Separator className="mb-5" />
      </Colxx>
      {showBotonAtras ? (
        <Colxx xxs="12">
          <Button color="primary" block className="mb-2 iconsminds-arrow-left-in-circle" onClick={verCategorias} >
            Categorias
          </Button>{' '}
        </Colxx>
      ) : (
        <Colxx xxs="12" />
      )}

      {showProductos ? (
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
      )}
      <Modal
        isOpen={modalLarge}
        size="lg"
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
                        PRECIO UNITARIO $ {modalPrecioProducto}
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
                          <Colxx xxs="12" xs="12" lg="6" className="text-center bm-6">
                            <ButtonGroup >
                              <Button color="primary" block onClick={restarProducto}>
                                <IntlMessages id="-" />
                              </Button>
                              <Button color="primary">
                                {contadorProducto}
                              </Button>
                              <Button color="primary" onClick={sumarProducto}>
                                <IntlMessages id="+" />
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
                      <Button color="primary" className='iconsminds-add-cart' block onClick={ver} >Agregar al carrito</Button>
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
