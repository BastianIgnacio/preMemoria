import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import {
  Row,
  Card,
  Button,
  CardBody,
  ModalBody,
  Modal,
  ModalFooter,
  ModalHeader,
  CardText,
  ButtonGroup,
  Label,
  Input,
} from 'reactstrap';
import Select from 'react-select';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';

import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import { useParams, Redirect } from 'react-router-dom';
import { Colxx } from '../../../components/common/CustomBootstrap';

// eslint-disable-next-line no-unused-vars
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const Carrito = (props) => {
  // Variables para identificar que pag corresponde
  // eslint-disable-next-line no-unused-vars
  const [header, setHeader] = useState('Carrito de compras de ');
  const { id } = useParams();
  // Variable para saber que id del array del carrito vamos a eliminar
  // eslint-disable-next-line no-unused-vars
  const [idKeyEliminar, setIdKeyEliminar] = useState(-1);
  const [cantidadProductoEliminar, setCantidadProductoEliminar] = useState(-1);
  const [nombreProductoEliminar, setNombreProductoEliminar] = useState(-1);
  const [notaProductoEliminar, setNotaProductoEliminar] = useState(-1);
  const [precioProductoEliminar, setPrecioProductoEliminar] = useState(-1);
  const [modalEliminar, setModalEliminar] = useState(false);

  // Variables para el estado del componente
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const estadoApp = useSelector((state) => state);

  // Variables para el modal
  const [modalLarge, setModalLarge] = useState(false);
  const [selectedRadioPago, setSelectedRadioPago] = useState(0);
  const [selectedRadioEntrega, setSelectedRadioEntrega] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [retiroEnLocal, setRetiroEnLocal] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const dataRetiroEnLocal = [
    { label: 'Lo antes posible', value: 0, key: 0 },
    { label: 'En 15 a 30 minutos', value: 1, key: 1 },
    { label: 'En 30 a 40 minutos', value: 2, key: 2 },
    { label: 'En 40 a 50 minutos', value: 3, key: 3 },
    { label: 'En 50 minutos a 60 minutos', value: 4, key: 4 },
    { label: 'En 90 minutos', value: 5, key: 5 },
    { label: 'En 120 minutos', value: 6, key: 6 },
  ];
  // eslint-disable-next-line no-unused-vars
  const [selectedOptionLO, setSelectedOptionLO] = useState(
    dataRetiroEnLocal[0]
  );

  // Variable para mostrar el array correspondiente
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-unused-vars
  const [arrayCarrito, setArrayCarrito] = useState(
    JSON.parse(localStorage.getItem('carritoLocalStorage'))
  );
  // Suma total del array de productos
  const totalInit = arrayCarrito.reduce(
    (sum, el) => sum + el.precio * el.cantidad,
    0
  );

  const clickRetiroEnLocal = () => {
    setSelectedRadioEntrega(1);
    setDelivery(false);
    setRetiroEnLocal(true);
  };

  const clickDelivery = () => {
    setSelectedRadioEntrega(2);
    setDelivery(true);
    setRetiroEnLocal(false);
  };

  // eslint-disable-next-line no-unused-vars
  const [total, setTotal] = useState(totalInit);

  const actualizarNav = () => {
    props.llamarPadre(id);
  };

  const existe = true;
  if (!existe) {
    return <Redirect to="/error" />;
  }

  // Variables modal eliminar
  const abrirModalEliminar = (idKey) => {
    const found = arrayCarrito.find((element) => element.idKey === idKey);
    setIdKeyEliminar(found.idKey);
    setNombreProductoEliminar(found.nombre);
    setCantidadProductoEliminar(found.cantidad);
    setNotaProductoEliminar(found.notaEspecial);
    setPrecioProductoEliminar(found.precio);
    setModalEliminar(true);
  };

  // eslint-disable-next-line no-unused-vars
  const sumar = (idKey) => {
    const found = arrayCarrito.find((element) => element.idKey === idKey);
    const index = arrayCarrito.indexOf(found);
    const cant = arrayCarrito[index].cantidad;
    arrayCarrito[index].cantidad = cant + 1;
    const nuevoArray = [...arrayCarrito];
    setArrayCarrito(nuevoArray);
    localStorage.setItem('carritoLocalStorage', JSON.stringify(nuevoArray));
    const totalSum = nuevoArray.reduce(
      (sum, el) => sum + el.precio * el.cantidad,
      0
    );
    setTotal(totalSum);
  };

  const restar = (idKey) => {
    const found = arrayCarrito.find((element) => element.idKey === idKey);
    const index = arrayCarrito.indexOf(found);
    const cant = arrayCarrito[index].cantidad;
    if (cant > 1) {
      arrayCarrito[index].cantidad = cant - 1;
      const nuevoArray = [...arrayCarrito];
      setArrayCarrito(nuevoArray);
      localStorage.setItem('carritoLocalStorage', JSON.stringify(nuevoArray));
      const totalSum = nuevoArray.reduce(
        (sum, el) => sum + el.precio * el.cantidad,
        0
      );
      setTotal(totalSum);
    } else {
      abrirModalEliminar(idKey);
    }
  };

  const eliminar = (idKey) => {
    const found = arrayCarrito.find((element) => element.idKey === idKey);
    const index = arrayCarrito.indexOf(found);
    arrayCarrito.splice(index, 1);
    const nuevoArray = [...arrayCarrito];
    setArrayCarrito(nuevoArray);
    localStorage.setItem('carritoLocalStorage', JSON.stringify(nuevoArray));
    const totalSum = nuevoArray.reduce(
      (sum, el) => sum + el.precio * el.cantidad,
      0
    );
    setTotal(totalSum);
    setModalEliminar(false);
  };

  actualizarNav(id);
  const pagar = () => {
    console.log('pagar');
    console.log(estadoApp);
  };

  const onSubmit = (event, errors, values) => {
    console.log(errors);
    console.log(values);
    if (errors.length === 0) {
      // submit
    }
  };

  return (
    <Row>
      <Card className="container-fluid">
        <CardBody>
          <Row className="container-fluid">
            {arrayCarrito.map((producto) => {
              return (
                <Colxx xxs="12" key={producto.idKey}>
                  <Card className="d-flex flex-row mb-2">
                    <div className="d-flex">
                      <img
                        alt="Thumbnail"
                        src="/assets/img/products/chocolate-cake-thumb.jpg"
                        className="list-thumbnail responsive border-0 card-img-left"
                      />
                    </div>
                    <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                      <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero ">
                        <p className="list-item-heading mb-1 w-60 w-sm-100 font-weight-bold">
                          {producto.nombre}
                          {/* VALIDACION --> NOMBRE MAXIMO DE 65 CARACTERES */}
                        </p>
                        <p className="mb-1 text-small w-8 w-sm-100 d-flex justify-content-end">
                          <div className=" list-item-heading font-weight-bold">
                            {' '}
                            {producto.cantidad}
                            {'\u00A0'}
                          </div>
                          x $ {producto.precio}
                        </p>
                        <p className="mb-1 text-muted list-item-heading font-weight-bold w-8 w-sm-100 d-flex justify-content-end">
                          $ {producto.cantidad * producto.precio}
                        </p>
                        <div className="w-15 w-sm-100 d-flex justify-content-end">
                          <Button
                            color="primary"
                            size="xs"
                            className="mb-0 mr-1"
                            onClick={() => restar(producto.idKey)}
                          >
                            -
                          </Button>
                          <Button
                            color="primary"
                            size="xs"
                            className="mb-0 mr-1"
                            onClick={() => sumar(producto.idKey)}
                          >
                            +
                          </Button>
                          <Button
                            color="danger"
                            size="xs"
                            className="mb-0 simple-icon-trash"
                            onClick={() => abrirModalEliminar(producto.idKey)}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Colxx>
              );
            })}
            {arrayCarrito.length < 1 && (
              <Colxx xxs="12" xs="12" lg="12">
                <Card className="container-fluid d-flex flex-row mb-2 ">
                  <div className="container-fluid pl-0 d-flex flex-grow-1 min-width-zero">
                    <div className="container-fluid card-body align-self-center d-flex flex-column flex-lg-row justify-content-center min-width-zero ">
                      <p className="mb-1 text-muted text-large font-weight-bold">
                        EL CARRITO ESTA VACIO!
                      </p>
                    </div>
                  </div>
                </Card>
              </Colxx>
            )}
            <Colxx xxs="12" xs="12" lg="12">
              <Card className="container-fluid d-flex flex-row mb-2 ">
                <div className="container-fluid pl-0 d-flex flex-grow-1 min-width-zero">
                  <div className="container-fluid card-body align-self-center d-flex flex-column flex-lg-row justify-content-center min-width-zero ">
                    <p className="list-item-heading text-medium mb-2 w-50 w-sm-100 font-weight-bold ">
                      TOTAL
                      {/* VALIDACION --> NOMBRE MAXIMO DE 65 CARACTERES */}
                    </p>
                    <p className="mb-1 text-muted text-large font-weight-bold w-30 w-sm-100">
                      ${total}
                    </p>
                  </div>
                  <div className="custom-control custom-checkbox pl-0 align-self-center pr-4">
                    <Button color="primary" className="mb-0" onClick={pagar}>
                      FINALIZAR COMPRA
                    </Button>
                  </div>
                </div>
              </Card>
            </Colxx>
          </Row>
        </CardBody>
      </Card>
      <Modal isOpen={modalLarge} toggle={() => setModalLarge(!modalLarge)}>
        <ModalBody>
          <Row>
            <AvForm
              className="av-tooltip tooltip-label-right"
              onSubmit={(event, errors, values) =>
                onSubmit(event, errors, values)
              }
            >
              <Row>
                <Colxx xxs="12" xs="12" lg="12">
                  <Card className="mb-2">
                    <CardBody>
                      <Row>
                        <Colxx xxs="12" xs="12" lg="12">
                          <CardText className="text-muted text-left text-medium mb-1 font-weight-bold">
                            DATOS DE CONTACTO
                          </CardText>
                        </Colxx>
                        <Colxx xxs="12" xs="12" lg="12">
                          <div className="mt-1">
                            <Label className="form-group has-float-label">
                              <Input type="email" />
                              <span>NOMBRE </span>
                            </Label>
                            <Label className="form-group has-float-label">
                              <Input type="email" />
                              <span>TELEFONO </span>
                            </Label>
                          </div>
                        </Colxx>
                      </Row>
                    </CardBody>
                  </Card>
                </Colxx>
                <Colxx xxs="12" xs="12" lg="12">
                  <Card className="mb-2">
                    <CardBody>
                      <Row>
                        <Colxx xxs="12" xs="12" lg="12">
                          <CardText className="text-muted text-left text-medium mb-1 font-weight-bold">
                            ENTREGA
                          </CardText>
                        </Colxx>
                        <Colxx xxs="12" xs="12" lg="12">
                          <div className="d-flex justify-content-center mb-2">
                            <ButtonGroup>
                              <Button
                                color="primary"
                                onClick={clickRetiroEnLocal}
                                active={selectedRadioEntrega === 1}
                              >
                                RETIRO EN LOCAL
                              </Button>
                              <Button
                                color="primary"
                                onClick={clickDelivery}
                                active={selectedRadioEntrega === 2}
                              >
                                DELIVERY
                              </Button>
                            </ButtonGroup>
                          </div>
                        </Colxx>
                        {delivery ? (
                          <Colxx xxs="12" xs="12" lg="12">
                            <div className="d-flex justify-content-center ml-4 mr-4">
                              <AvInput
                                type="textarea"
                                placeholder="Aca debe ir la direccion de entrega, lo más exacto posible."
                                min
                                name="details"
                                id="details"
                                rows="5"
                              />
                            </div>
                          </Colxx>
                        ) : (
                          ' '
                        )}
                        {retiroEnLocal ? (
                          <Colxx xxs="12" xs="12" lg="12">
                            <div className="form-group has-float-label mt-1">
                              <Select
                                className="react-select"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={selectedOptionLO}
                                onChange={(val) => setSelectedOptionLO(val)}
                                options={dataRetiroEnLocal}
                                placeholder=""
                              />
                              <span>EN CUANTO ?</span>
                            </div>
                          </Colxx>
                        ) : (
                          ' '
                        )}
                      </Row>
                    </CardBody>
                  </Card>
                </Colxx>
                <Colxx xxs="12" xs="12" lg="12">
                  <Card className="mb-2">
                    <CardBody>
                      <Row>
                        <Colxx xxs="12" xs="12" lg="12">
                          <CardText className="text-muted text-left text-medium mb-1 font-weight-bold">
                            FORMA DE PAGO
                          </CardText>
                        </Colxx>
                        <Colxx xxs="12" xs="12" lg="12">
                          <div className="d-flex justify-content-center">
                            <ButtonGroup>
                              <Button
                                color="primary"
                                onClick={() => setSelectedRadioPago(1)}
                                active={selectedRadioPago === 1}
                              >
                                EFECTIVO
                              </Button>
                              <Button
                                color="primary"
                                onClick={() => setSelectedRadioPago(2)}
                                active={selectedRadioPago === 2}
                              >
                                REDCOMPRA
                              </Button>
                              <Button
                                color="primary"
                                onClick={() => setSelectedRadioPago(3)}
                                active={selectedRadioPago === 3}
                              >
                                MERCADOPAGO
                              </Button>
                            </ButtonGroup>
                          </div>
                        </Colxx>
                      </Row>
                    </CardBody>
                  </Card>
                </Colxx>
                <Colxx xxs="12" xs="12" lg="12">
                  <Card className="mb-4">
                    <CardBody>
                      <AvGroup>
                        <Row>
                          <Colxx
                            xxs="12"
                            xs="12"
                            lg="12"
                            className="text-center"
                          >
                            <CardText className="text-muted text-center text-large font-weight-bold mt-1 mb-2">
                              TOTAL $ 12.500
                            </CardText>
                          </Colxx>
                        </Row>
                      </AvGroup>
                      <Button
                        color="primary"
                        className="iconsminds-add-cart"
                        block
                      >
                        ENVIAR PEDIDO
                      </Button>
                      <Button color="secondary" block onClick={pagar}>
                        Volver
                      </Button>
                    </CardBody>
                  </Card>
                </Colxx>
              </Row>
            </AvForm>
          </Row>
        </ModalBody>
      </Modal>
      <Modal
        isOpen={modalEliminar}
        toggle={() => setModalEliminar(!modalEliminar)}
      >
        <ModalHeader>Quieres eliminar el producto ?</ModalHeader>
        <ModalBody>
          <Row>
            <Colxx xxs="12" xs="12" lg="12">
              <CardText className="text-muted text-left text-medium mb-1 font-weight-bold">
                NOMBRE: {nombreProductoEliminar}
              </CardText>
            </Colxx>
            <Colxx xxs="12" xs="12" lg="12">
              <CardText className="text-muted text-left text-medium mb-1 font-weight-bold">
                NOTA ESPECIAL: {notaProductoEliminar}
              </CardText>
            </Colxx>
            <Colxx xxs="12" xs="12" lg="12">
              <CardText className="text-muted text-left text-medium mb-1 font-weight-bold">
                CANTIDAD: {cantidadProductoEliminar}
              </CardText>
            </Colxx>
            <Colxx xxs="12" xs="12" lg="12">
              <CardText className="text-muted text-left text-medium mb-1 font-weight-bold">
                PRECIO: {precioProductoEliminar}
              </CardText>
            </Colxx>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => eliminar(idKeyEliminar)}>
            Eliminar
          </Button>{' '}
          <Button color="secondary" onClick={() => setModalEliminar(false)}>
            Volver
          </Button>
        </ModalFooter>
      </Modal>
    </Row>
  );
};

export default Carrito;
