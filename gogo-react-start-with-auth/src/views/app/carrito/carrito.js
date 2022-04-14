/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
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
  FormGroup,
} from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from '../../../containers/form-validations/FormikFields';

import { Colxx } from '../../../components/common/CustomBootstrap';
import { NotificationManager } from '../../../components/common/react-notifications';

// eslint-disable-next-line no-unused-vars
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const Carrito = (props) => {
  // Variables para identificar que pag corresponde
  // eslint-disable-next-line no-unused-vars
  const [header, setHeader] = useState('Carrito de compras de ');
  // ID DE LA TIENDA QUE ESTAMOS CARGANDO EN EL COMPONENTE
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
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const estadoApp = useSelector((state) => state);

  // Variables para el modal
  const [modalFinalizarCompra, setModalFinalizarCompra] = useState(false);
  const [selectedRadioPago, setSelectedRadioPago] = useState(0);
  const [selectedRadioEntrega, setSelectedRadioEntrega] = useState(0);

  // Variables para el select del tiempo para opcion retiro el local
  const dataRetiroEnLocal = [
    { label: 'Lo antes posible', value: 0, key: 0 },
    { label: 'En 15 a 30 minutos', value: 1, key: 1 },
    { label: 'En 30 a 40 minutos', value: 2, key: 2 },
    { label: 'En 40 a 50 minutos', value: 3, key: 3 },
    { label: 'En 50 a 60 minutos', value: 4, key: 4 },
    { label: 'En 60 a 90 minutos', value: 5, key: 5 },
    { label: 'En 90 a 120 minutos', value: 6, key: 6 },
  ];
  const [selectedOptionLO, setSelectedOptionLO] = useState(
    dataRetiroEnLocal[0]
  );

  // Variable para el select del tiempo para la opcion de delivery
  const dataDelivery = [
    { label: 'Lo antes posible', value: 0, key: 0 },
    { label: 'En 30 a 60 minutos', value: 1, key: 1 },
    { label: 'En 60 a 90 minutos', value: 2, key: 2 },
    { label: 'En 90 a 120 minutos', value: 3, key: 3 },
    { label: 'En 120 a 150 minutos', value: 4, key: 4 },
  ];
  const [selectedOptionDelivery, setSelectedOptionDelivery] = useState(
    dataDelivery[0]
  );

  // Variables para metodo de pago
  // eslint-disable-next-line no-unused-vars
  const [mercadoPago, setMercadoPago] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [efectivo, setEfectivo] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [redcompra, setRedcompra] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [metodoDePago, setMetodoDePago] = useState(0);

  // Variables para metodo de entrega que posee un local comercial
  // eslint-disable-next-line no-unused-vars
  const [delivery, setDelivery] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [retiroEnLocal, setRetiroEnLocal] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [metodoDeEntrega, setMetodoDeEntrega] = useState(0);

  // Funcion para iniciar el carrito de compras, en caso de que este null en el localstorage
  const initCarrito = () => {
    if (JSON.parse(localStorage.getItem('carritoLocalStorage')) === null) {
      return [];
    }
    return JSON.parse(localStorage.getItem('carritoLocalStorage'));
  };

  // Variable para mostrar el array correspondiente
  // eslint-disable-next-line no-unused-vars
  const [arrayCarrito, setArrayCarrito] = useState(initCarrito());

  // Suma total del array de productos
  const totalInit = arrayCarrito
    .filter((producto) => producto.idTienda === id)
    .reduce((sum, el) => sum + el.precio * el.cantidad, 0);

  // eslint-disable-next-line no-unused-vars
  const [total, setTotal] = useState(totalInit);

  const clickRetiroEnLocal = () => {
    setSelectedRadioEntrega(1);
    setMetodoDeEntrega(1);
  };

  const clickDelivery = () => {
    setSelectedRadioEntrega(2);
    setMetodoDeEntrega(2);
  };

  const actualizarNav = () => {
    props.llamarPadre(id);
  };

  const existe = true;
  if (!existe) {
    return <Redirect to="/error" />;
  }

  // Notificacion al eliminar un producto
  const notificacionEliminarProducto = (nombreProducto) => {
    NotificationManager.info(
      nombreProducto,
      'ELIMINADO DEL CARRITO',
      2000,
      () => history.push(`/carrito/${id}`),
      null,
      'filled'
    );
  };

  // Notificacion al eliminar un producto
  const notificacionFaltaDireccion = () => {
    NotificationManager.warning(
      'POR FAVOR INGRESAR LA DIRECCION PARA LA ENTREGA',
      'DONDE LO ENTREGAMOS ?',
      2000,
      null,
      null,
      'filled'
    );
  };

  // Notificacion al eliminar un producto
  const notificacionFormaDePago = () => {
    NotificationManager.warning(
      'POR FAVOR SELECCIONAR LA FORMA DE PAGO',
      'FORMA DE PAGO',
      2000,
      null,
      null,
      'filled'
    );
  };

  // Notificacion al eliminar un producto
  const notificacionFormaEntrega = () => {
    NotificationManager.warning(
      'POR FAVOR SELECCIONAR LA FORMA DE ENTREGA',
      'ENTREGA',
      2000,
      null,
      null,
      'filled'
    );
  };
  // Variables modal eliminar
  const abrirModalEliminar = (idKey) => {
    const found = arrayCarrito.find((element) => element.idKey === idKey);
    setIdKeyEliminar(found.idKey);
    setNombreProductoEliminar(found.nombreProducto);
    setCantidadProductoEliminar(found.cantidad);
    setNotaProductoEliminar(found.notaEspecial);
    setPrecioProductoEliminar(found.precio);
    setModalEliminar(true);
  };

  // Funcion para sumar un producto en el carrito de compras
  const sumar = (idKey) => {
    const found = arrayCarrito.find((element) => element.idKey === idKey);
    const index = arrayCarrito.indexOf(found);
    const cant = arrayCarrito[index].cantidad;
    arrayCarrito[index].cantidad = cant + 1;
    const nuevoArray = [...arrayCarrito];
    setArrayCarrito(nuevoArray);
    localStorage.setItem('carritoLocalStorage', JSON.stringify(nuevoArray));
    const totalSum = nuevoArray
      .filter((producto) => producto.idTienda === id)
      .reduce((sum, el) => sum + el.precio * el.cantidad, 0);
    setTotal(totalSum);
  };

  // Funcion para restar un producto en el carrito de compras
  const restar = (idKey) => {
    const found = arrayCarrito.find((element) => element.idKey === idKey);
    const index = arrayCarrito.indexOf(found);
    const cant = arrayCarrito[index].cantidad;
    if (cant > 1) {
      arrayCarrito[index].cantidad = cant - 1;
      const nuevoArray = [...arrayCarrito];
      setArrayCarrito(nuevoArray);
      localStorage.setItem('carritoLocalStorage', JSON.stringify(nuevoArray));
      const totalSum = nuevoArray
        .filter((producto) => producto.idTienda === id)
        .reduce((sum, el) => sum + el.precio * el.cantidad, 0);
      setTotal(totalSum);
    } else {
      abrirModalEliminar(idKey);
    }
  };

  // Funcion para eliminar un producto en el carrito de compras
  const eliminar = (idKey) => {
    const found = arrayCarrito.find((element) => element.idKey === idKey);
    const index = arrayCarrito.indexOf(found);
    const nombreEliminar = arrayCarrito[index].nombreProducto;
    arrayCarrito.splice(index, 1);
    const nuevoArray = [...arrayCarrito];
    setArrayCarrito(nuevoArray);
    localStorage.setItem('carritoLocalStorage', JSON.stringify(nuevoArray));
    const totalSum = nuevoArray
      .filter((producto) => producto.idTienda === id)
      .reduce((sum, el) => sum + el.precio * el.cantidad, 0);
    setTotal(totalSum);
    setModalEliminar(false);
    notificacionEliminarProducto(nombreEliminar);
  };

  const finalizarCompra = () => {
    setModalFinalizarCompra(true);
  };

  const modificarMetodoPago = (metodo) => {
    setMetodoDePago(metodo);
    setSelectedRadioPago(metodo);
  };

  // Funcion para Enviar el pedido
  const onSubmit = (values, { setSubmitting }) => {
    const payload = {
      ...values,
      tiempoDelivery: values.tiempoDelivery.value,
      tiempoRetiro: values.tiempoRetiro.value,
      metodoDeEntrega,
      metodoDePago,
    };
    setTimeout(() => {
      // Cuando no se ha seleccionado metodo de entrega
      if (payload.metodoDeEntrega === 0) {
        notificacionFormaEntrega();
        return;
      }
      // Cuando no se ha seleccionado metodo de pago
      if (metodoDePago === 0) {
        notificacionFormaDePago();
        return;
      }
      // Cuando la direccion es null o undefined y el metodo de esntrega es delivery
      if ((typeof payload.direccionDelivery === 'undefined') && (metodoDeEntrega === 2)) {
        notificacionFaltaDireccion();
        return;
      }
      // Cuando la direccion es vacia y el metodo de entrega es delivery
      if ((payload.direccionDelivery === "") && (metodoDeEntrega === 2)) {
        notificacionFaltaDireccion();
        return;
      }
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);
      // Aca deberiamos llamar a la API PARA ENVIAR EL PEDIDO

    }, 500);


  };

  // Validacion para el form que envia la orden
  const SignupSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es requerido!'),
    telefono: Yup.string().required('El telefono o whatsapp es requerido!'),
    email: Yup.string()
      .email('La direccion de email es invalida')
      .required('La direccion de email es requerida!'),
    direccionDelivery: Yup.string(),
  });

  actualizarNav(id);
  return (
    <Row>
      <Card className="container-fluid">
        <CardBody>
          <Row className="container-fluid">
            {arrayCarrito
              .filter((producto) => producto.idTienda === id)
              .map((producto) => {
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
                            {producto.nombreProducto}
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
            {total === 0 && (
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
                    <Button
                      color="primary"
                      className="mb-0"
                      onClick={finalizarCompra}
                    >
                      FINALIZAR COMPRA
                    </Button>
                  </div>
                </div>
              </Card>
            </Colxx>
          </Row>
        </CardBody>
      </Card>
      <Modal
        isOpen={modalFinalizarCompra}
        toggle={() => setModalFinalizarCompra(!modalFinalizarCompra)}
      >
        <ModalBody>
          <Row>
            <Formik
              initialValues={{
                nombre: '',
                telefono: '',
                email: '',
                tiempoDelivery: {
                  label: 'Lo antes posible',
                  value: 0,
                  key: 0,
                },
                tiempoRetiro: { label: 'Lo antes posible', value: 0, key: 0 },
              }}
              validationSchema={SignupSchema}
              onSubmit={onSubmit}
            >
              {({
                handleSubmit,
                setFieldValue,
                setFieldTouched,
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
                isSubmitting,
              }) => (
                <Form className="av-tooltip tooltip-label-bottom">
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
                              <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                                <Label>NOMBRE</Label>
                                <Field className="form-control" name="nombre" />
                                {errors.nombre && touched.nombre ? (
                                  <div className="invalid-feedback d-block ">
                                    {errors.nombre}
                                  </div>
                                ) : null}
                              </FormGroup>
                              <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                                <Label>TELEFONO/ WHATSAPP (+569XXXXXXXX)</Label>
                                <Field
                                  className="form-control"
                                  name="telefono"
                                  maxLength="14"
                                />
                                {errors.telefono && touched.telefono ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.telefono}
                                  </div>
                                ) : null}
                              </FormGroup>
                              <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                                <Label>EMAIL</Label>
                                <Field className="form-control" name="email" />
                                {errors.email && touched.email ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.email}
                                  </div>
                                ) : null}
                              </FormGroup>
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
                                  {retiroEnLocal && (
                                    <Button
                                      color="primary"
                                      onClick={clickRetiroEnLocal}
                                      active={selectedRadioEntrega === 1}
                                    >
                                      RETIRO EN LOCAL
                                    </Button>
                                  )}
                                  {delivery && (
                                    <Button
                                      color="primary"
                                      onClick={clickDelivery}
                                      active={selectedRadioEntrega === 2}
                                    >
                                      DELIVERY
                                    </Button>
                                  )}
                                </ButtonGroup>
                              </div>
                            </Colxx>
                            {metodoDeEntrega === 1 && (
                              <Colxx xxs="12" xs="12" lg="12">
                                <div className="form-group has-float-label mt-1">
                                  <FormGroup className="form-group has-top-label">
                                    <Label>
                                      EN CUANTO TIEMPO DESEAS RETIRAR?
                                    </Label>
                                    <FormikReactSelect
                                      name="tiempoRetiro"
                                      id="state"
                                      value={values.tiempoRetiro}
                                      options={dataDelivery}
                                      onChange={setFieldValue}
                                      onBlur={setFieldTouched}
                                    />
                                    {errors.state && touched.state ? (
                                      <div className="invalid-feedback d-block">
                                        {errors.state}
                                      </div>
                                    ) : null}
                                  </FormGroup>
                                </div>
                              </Colxx>
                            )}
                            {metodoDeEntrega === 2 && (
                              <Colxx xxs="12" xs="12" lg="12">
                                <div className="form-group has-float-label mt-1">
                                  <FormGroup className="form-group has-top-label">
                                    <Label>
                                      EN CUANTO TIEMPO DESEAS LA ENTREGA?
                                    </Label>
                                    <FormikReactSelect
                                      name="tiempoDelivery"
                                      value={values.tiempoDelivery}
                                      options={dataDelivery}
                                      onChange={setFieldValue}
                                      onBlur={setFieldTouched}
                                    />
                                    {errors.state && touched.state ? (
                                      <div className="invalid-feedback d-block">
                                        {errors.state}
                                      </div>
                                    ) : null}
                                  </FormGroup>
                                </div>
                                <div className="form-group has-float-label mt-1">
                                  <FormGroup className="form-group has-top-label">
                                    <Label>EN DONDE LO ENTREGAMOS ? </Label>
                                    <Field
                                      as="textarea"
                                      rows="2"
                                      className="form-control"
                                      name="direccionDelivery"
                                      placeholder="Ingresar la direccion lo más detallado posible."
                                    />
                                    {errors.direccionDelivery &&
                                      touched.direccionDelivery ? (
                                      <div className="invalid-feedback d-block">
                                        {errors.direccionDelivery}
                                      </div>
                                    ) : null}
                                  </FormGroup>
                                </div>
                              </Colxx>
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
                                  {efectivo && (
                                    <Button
                                      color="primary"
                                      onClick={() => modificarMetodoPago(1)}
                                      active={selectedRadioPago === 1}
                                    >
                                      EFECTIVO
                                    </Button>
                                  )}
                                  {redcompra && (
                                    <Button
                                      color="primary"
                                      onClick={() => modificarMetodoPago(2)}
                                      active={selectedRadioPago === 2}
                                    >
                                      REDCOMPRA
                                    </Button>
                                  )}
                                  {mercadoPago && (
                                    <Button
                                      color="primary"
                                      onClick={() => modificarMetodoPago(3)}
                                      active={selectedRadioPago === 3}
                                    >
                                      WEBPAY
                                    </Button>
                                  )}
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
                          <Button
                            color="primary"
                            className="iconsminds-add-cart"
                            type="submit"
                            block
                          >
                            ENVIAR PEDIDO
                          </Button>
                          <Button
                            color="secondary"
                            block
                            onClick={() => setModalFinalizarCompra(false)}
                          >
                            Volver
                          </Button>
                        </CardBody>
                      </Card>
                    </Colxx>
                  </Row>
                </Form>
              )}
            </Formik>
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
