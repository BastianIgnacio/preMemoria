/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
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

import { useParams, useHistory } from 'react-router-dom';
import { FormikReactSelect } from '../../../containers/form-validations/FormikFields';

import { Colxx } from '../../../components/common/CustomBootstrap';
import { NotificationManager } from '../../../components/common/react-notifications';
import {
  CARRITO_ELIMINAR_PRODUCTO,
  CARRITO_INIT,
  CARRITO_PROCESAR,
  CARRITO_RES_PRODUCTO,
  CARRITO_SUM_PRODUCTO,
} from '../../../redux/actions';
import { tiposPago, estadosPago, estadosVenta, tiposEntrega, estadosOrden } from '../../../constants/defaultValues';

const Carrito = () => {
  // ID DE LA TIENDA QUE ESTAMOS CARGANDO EN EL COMPONENTE
  const { id } = useParams();

  // Variables para el estado del componente
  const dispatch = useDispatch();
  const history = useHistory();



  // VARIABLES DEL MODAL
  const [modalFinalizarCompra, setModalFinalizarCompra] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  // INFORMACION SOBRE LA TIENDA
  const idTienda = useSelector((state) => state.carrito.idTienda);
  const carritoCargado = useSelector((state) => state.carrito.carritoCargado);
  const total = useSelector((state) => state.carrito.total);
  const arrayCarrito = useSelector((state) => state.carrito.arrayCarrito);


  // METODOS DE PAGO DISPONIBLES
  const pagoRetiroLocalEfectivo = useSelector(
    (state) => state.carrito.pagoRetiroLocalEfectivo
  );
  const pagoRetiroLocalPos = useSelector(
    (state) => state.carrito.pagoRetiroLocalPos
  );
  const pagoRetiroLocalMercadopago = useSelector(
    (state) => state.carrito.pagoRetiroLocalMercadopago
  );
  const pagoDeliveryEfectivo = useSelector(
    (state) => state.carrito.pagoDeliveryEfectivo
  );
  const pagoDeliveryPos = useSelector((state) => state.carrito.pagoDeliveryPos);
  const pagoDeliveryMercadopago = useSelector(
    (state) => state.carrito.pagoDeliveryMercadopago
  );
  const [metodoDePago, setMetodoDePago] = useState(0);

  // METODOS DE ENTREGA
  const tieneDelivery = useSelector((state) => state.carrito.tieneDelivery);
  const tieneRetiroLocal = useSelector(
    (state) => state.carrito.tieneRetiroLocal
  );
  const [metodoDeEntrega, setMetodoEntrega] = useState(0);

  // eslint-disable-next-line no-unused-vars
  const dataRetiroEnLocal = useSelector(
    (state) => state.carrito.dataRetiroEnLocal
  );
  const dataDelivery = useSelector((state) => state.carrito.dataDelivery);

  useEffect(() => {
    if (!carritoCargado) {
      dispatch({
        type: CARRITO_INIT,
        payload: id,
      });
    }
  });

  // Funcion para sumar un producto en el carrito de compras
  const sumar = (producto) => {
    dispatch({
      type: CARRITO_SUM_PRODUCTO,
      payload: producto,
    });
  };
  // Funcion para sumar un producto en el carrito de compras
  const restar = (producto) => {
    dispatch({
      type: CARRITO_RES_PRODUCTO,
      payload: producto,
    });
  };
  // Funcion para eliminar un producto en el carrito de compras
  const eliminar = (producto) => {
    dispatch({
      type: CARRITO_ELIMINAR_PRODUCTO,
      payload: producto,
    });
    setModalEliminar(!modalEliminar);
  };
  // Notificacion al eliminar un producto
  // eslint-disable-next-line no-unused-vars
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
  // eslint-disable-next-line no-unused-vars
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
  // eslint-disable-next-line no-unused-vars
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
  // eslint-disable-next-line no-unused-vars
  const notificacionFormaEntrega = () => {
    NotificationManager.warning(
      'POR FAVOR SELECCIONAR UN METODO DE ENTREGA',
      'ENTREGA',
      2000,
      null,
      null,
      'filled'
    );
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

  const finalizarCompra = () => {
    setModalFinalizarCompra(true);
  };

  const clickRetiroEnLocal = () => {
    setMetodoEntrega(1);
    // Se reinicia el metodo de pago
    setMetodoDePago(0);
  };

  const clickDelivery = () => {
    setMetodoEntrega(2);
    // Se reinicia el metodo de pago
    setMetodoDePago(0);
  };

  // Funcion para Enviar el pedido
  const enviarPedido = (values, { setSubmitting }) => {
    // eslint-disable-next-line no-unused-vars
    const payload = {
      ...values,
      tiempoDelivery: values.tiempoDelivery.label,
      tiempoRetiro: values.tiempoRetiro.label,
    };
    setTimeout(() => {
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);

      if (metodoDeEntrega === 0) {
        notificacionFormaEntrega();
        return;
      }
      if (metodoDePago === 0) {
        notificacionFormaDePago();
        return;
      }
      // RETIRO EN LOCAL
      if (metodoDeEntrega === 1) {
        // RETIRO EN LOCAL, PAGO EFECTIVO
        if (metodoDePago === 1) {
          // GENERAR VENTA 
          const venta = {
            total,
            // tipo de pago 1 = EFECTIVO
            tipoPago: tiposPago[0].id,
            estadoPago: estadosPago[0].id,
            estadosVenta: estadosVenta[0].id,
            refLocalComercial: idTienda,
          }
          const productosVenta = arrayCarrito.map((pv) => {
            return {
              nombreProducto: pv.nombre,
              descripcionProducto: pv.descripcion,
              cantidad: pv.cantidad,
              precioUnitario: pv.precio,
              total: pv.total,
            };
          });

          // GENERAR ORDEN
          const orden = {
            // tipo de entrega 0 = RETIRO_LOCAL
            tipoEntrega: tiposEntrega[0].id,
            entregaDelivery: false,
            estado: estadosOrden[0].id,
            direccionEntrega: 'NO HAY DIRECCION ENTREGA',
            telefonoEntrega: payload.telefono,
            nombrePedido: payload.nombre,
            precioEnvio: 0,
            total,
            tiempoEntrega: payload.tiempoRetiro,
            refLocalComercial: idTienda,
            productos: arrayCarrito,
          };
          const productosOrden = arrayCarrito.map((pv) => {
            const notaEspecialValidacion = pv.notaEspecial.trim();
            if (notaEspecialValidacion === '') {
              return {
                nombre: pv.nombre,
                descripcion: pv.descripcion,
                notaEspecial: 'SIN NOTA ESPECIAL',
                precioTotal: pv.total,
                precioUnitario: pv.precio,
                cantidad: pv.cantidad,
              };
            }
            return {
              nombre: pv.nombre,
              descripcion: pv.descripcion,
              notaEspecial: pv.notaEspecial,
              precioTotal: pv.total,
              precioUnitario: pv.precio,
              cantidad: pv.cantidad,
            };
          });
          // DESPACHAMOS LA ACCION PARA PROCESAR LA VENTA Y ORDEN
          dispatch({
            type: CARRITO_PROCESAR,
            payload: {
              venta,
              productosVenta,
              orden,
              productosOrden,
              refLocalComercia: idTienda
            }
          })
        }
        // RETIRO EN LOCAL, PAGO CON REDCOMPRA POS
        if (metodoDePago === 2) {
          // GENERAR VENTA 
          const venta = {
            total,
            // tipo de pago 1 = DEBITO_CREDITO_POS
            tipoPago: tiposPago[1].id,
            estadoPago: estadosPago[0].id,
            estadosVenta: estadosVenta[0].id,
            refLocalComercial: idTienda,
          }
          const productosVenta = arrayCarrito.map((pv) => {
            return {
              nombreProducto: pv.nombre,
              descripcionProducto: pv.descripcion,
              cantidad: pv.cantidad,
              precioUnitario: pv.precio,
              total: pv.total,
            };
          });

          // GENERAR ORDEN
          const orden = {
            // tipo de entrega 0 = RETIRO_LOCAL
            tipoEntrega: tiposEntrega[0].id,
            entregaDelivery: false,
            estado: estadosOrden[0].id,
            direccionEntrega: 'NO HAY DIRECCION ENTREGA',
            telefonoEntrega: payload.telefono,
            nombrePedido: payload.nombre,
            precioEnvio: 0,
            total,
            tiempoEntrega: payload.tiempoRetiro,
            refLocalComercial: idTienda,
            productos: arrayCarrito,
          };
          const productosOrden = arrayCarrito.map((pv) => {
            const notaEspecialValidacion = pv.notaEspecial.trim();
            if (notaEspecialValidacion === '') {
              return {
                nombre: pv.nombre,
                descripcion: pv.descripcion,
                notaEspecial: 'SIN NOTA ESPECIAL',
                precioTotal: pv.total,
                precioUnitario: pv.precio,
                cantidad: pv.cantidad,
              };
            }
            return {
              nombre: pv.nombre,
              descripcion: pv.descripcion,
              notaEspecial: pv.notaEspecial,
              precioTotal: pv.total,
              precioUnitario: pv.precio,
              cantidad: pv.cantidad,
            };
          });
          // DESPACHAMOS LA ACCION PARA PROCESAR LA VENTA Y ORDEN
          dispatch({
            type: CARRITO_PROCESAR,
            payload: {
              venta,
              productosVenta,
              orden,
              productosOrden,
              refLocalComercia: idTienda
            }
          })
        }
        // RETIRO EN LOCAL, PAGO CON MERCADOPAGO ONLINE
        if (metodoDePago === 3) {
          console.log('retiro en local, pago en mercadopago');
        }
      }
      // DELIVERY
      if (metodoDeEntrega === 2) {
        // VALIDAMOS LA DIRECCION DE ENTREGA
        const direccionValidacion = payload.direccionDelivery.trim();
        if (direccionValidacion === '') {
          notificacionFaltaDireccion();
          return;
        }
        // RETIRO EN LOCAL, PAGO EFECTIVO
        if (metodoDePago === 4) {
          // GENERAR VENTA 
          const venta = {
            total,
            // tipo de pago 1 = EFECTIVO
            tipoPago: tiposPago[0].id,
            estadoPago: estadosPago[0].id,
            estadosVenta: estadosVenta[0].id,
            refLocalComercial: idTienda,
          }
          const productosVenta = arrayCarrito.map((pv) => {
            return {
              nombreProducto: pv.nombre,
              descripcionProducto: pv.descripcion,
              cantidad: pv.cantidad,
              precioUnitario: pv.precio,
              total: pv.total,
            };
          });

          // GENERAR ORDEN
          const orden = {
            // tipo de entrega 1 = DELIVERY
            tipoEntrega: tiposEntrega[1].id,
            entregaDelivery: true,
            // Estado de orden 0 = EN_COLA
            estado: estadosOrden[0].id,
            direccionEntrega: payload.direccionDelivery,
            telefonoEntrega: payload.telefono,
            nombrePedido: payload.nombre,
            precioEnvio: 0,
            total,
            tiempoEntrega: payload.tiempoRetiro,
            refLocalComercial: idTienda,
            productos: arrayCarrito,
          };
          const productosOrden = arrayCarrito.map((pv) => {
            const notaEspecialValidacion = pv.notaEspecial.trim();
            if (notaEspecialValidacion === '') {
              return {
                nombre: pv.nombre,
                descripcion: pv.descripcion,
                notaEspecial: 'SIN NOTA ESPECIAL',
                precioTotal: pv.total,
                precioUnitario: pv.precio,
                cantidad: pv.cantidad,
              };
            }
            return {
              nombre: pv.nombre,
              descripcion: pv.descripcion,
              notaEspecial: pv.notaEspecial,
              precioTotal: pv.total,
              precioUnitario: pv.precio,
              cantidad: pv.cantidad,
            };
          });
          // DESPACHAMOS LA ACCION PARA PROCESAR LA VENTA Y ORDEN
          dispatch({
            type: CARRITO_PROCESAR,
            payload: {
              venta,
              productosVenta,
              orden,
              productosOrden,
              refLocalComercia: idTienda
            }
          });
        }
        if (metodoDePago === 5) {
          // RETIRO EN LOCAL, PAGO REDCOMPRA CON POS
          console.log('delivery, pago con redcompra');
        }
        if (metodoDePago === 6) {
          // RETIRO EN LOCAL, PAGO CON MERCADOPAGO ONLINE
          console.log('delivery, pago con mercadopago');
        }
      }
    }, 500);
  };

  return (
    < Row >
      <Card className="container-fluid">
        <CardBody>
          <Row className="container-fluid">
            {arrayCarrito.map((producto, index) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <Colxx xxs="12" key={index}>
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
                        <span className="list-item-heading mb-1 w-60 w-sm-100 font-weight-bold">
                          {producto.nombre}
                          {/* VALIDACION --> NOMBRE MAXIMO DE 65 CARACTERES */}
                        </span>
                        <span className="mb-1 text-small w-8 w-sm-100 d-flex justify-content-end">
                          <div className=" list-item-heading font-weight-bold">
                            {' '}
                            {producto.cantidad}
                            {'\u00A0'}
                          </div>
                          x $ {producto.precio}
                        </span>
                        <span className="mb-1 text-muted list-item-heading font-weight-bold w-8 w-sm-100 d-flex justify-content-end">
                          $ {producto.cantidad * producto.precio}
                        </span>
                        <div className="w-15 w-sm-100 d-flex justify-content-end">
                          <Button
                            color="primary"
                            size="xs"
                            className="mb-0 mr-1"
                            onClick={() => {
                              restar(producto);
                            }}
                          >
                            -
                          </Button>
                          <Button
                            color="primary"
                            size="xs"
                            className="mb-0 mr-1"
                            onClick={() => {
                              sumar(producto);
                            }}
                          >
                            +
                          </Button>
                          <Button
                            color="danger"
                            size="xs"
                            className="mb-0 simple-icon-trash"
                            onClick={() => {
                              setModalEliminar(!modalEliminar);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                  <Modal
                    isOpen={modalEliminar}
                    toggle={() => setModalEliminar(!modalEliminar)}
                  >
                    <ModalHeader>Quieres eliminar el producto ?</ModalHeader>
                    <ModalBody>
                      <Row>
                        <Colxx xxs="12" xs="12" lg="12">
                          <CardText className="text-muted text-left text-medium mb-1 font-weight-bold">
                            NOMBRE: {producto.nombre}
                          </CardText>
                        </Colxx>
                        <Colxx xxs="12" xs="12" lg="12">
                          <CardText className="text-muted text-left text-medium mb-1 font-weight-bold">
                            NOTA ESPECIAL: {producto.notaEspecial}
                          </CardText>
                        </Colxx>
                        <Colxx xxs="12" xs="12" lg="12">
                          <CardText className="text-muted text-left text-medium mb-1 font-weight-bold">
                            CANTIDAD: {producto.cantidad}
                          </CardText>
                        </Colxx>
                        <Colxx xxs="12" xs="12" lg="12">
                          <CardText className="text-muted text-left text-medium mb-1 font-weight-bold">
                            PRECIO: {producto.precio}
                          </CardText>
                        </Colxx>
                      </Row>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="primary"
                        onClick={() => eliminar(producto)}
                      >
                        Eliminar
                      </Button>{' '}
                      <Button
                        color="secondary"
                        onClick={() => setModalEliminar(false)}
                      >
                        Volver
                      </Button>
                    </ModalFooter>
                  </Modal>
                </Colxx>
              );
            })}
            {arrayCarrito.length === 0 && (
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
                    </p>
                    <p className="mb-1 text-muted text-large font-weight-bold w-30 w-sm-100">
                      ${total}
                    </p>
                  </div>
                  <div className="custom-control custom-checkbox pl-0 align-self-center pr-4">
                    <Button
                      color="primary"
                      className="mb-0"
                      onClick={() => finalizarCompra()}
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
                direccionDelivery: '',
                tiempoDelivery: {
                  label: 'Lo antes posible',
                  value: 0,
                  key: 0,
                },
                tiempoRetiro: { label: 'Lo antes posible', value: 0, key: 0 },
              }}
              validationSchema={SignupSchema}
              onSubmit={enviarPedido}
            >
              {({
                setFieldValue,
                setFieldTouched,
                values,
                errors,
                touched,
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
                                  {tieneRetiroLocal && (
                                    <Button
                                      color="primary"
                                      onClick={clickRetiroEnLocal}
                                      active={metodoDeEntrega === 1}
                                    >
                                      RETIRO EN LOCAL
                                    </Button>
                                  )}
                                  {tieneDelivery && (
                                    <Button
                                      color="primary"
                                      onClick={clickDelivery}
                                      active={metodoDeEntrega === 2}
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
                                {
                                  // ENTREGA RETIRO EN LOCAL COMERCIAL
                                  metodoDeEntrega === 1 && (
                                    <ButtonGroup>
                                      {pagoRetiroLocalEfectivo && (
                                        <Button
                                          color="primary"
                                          active={metodoDePago === 1}
                                          onClick={() => {
                                            setMetodoDePago(1);
                                          }}
                                        >
                                          EFECTIVO
                                        </Button>
                                      )}
                                      {pagoRetiroLocalPos && (
                                        <Button
                                          color="primary"
                                          active={metodoDePago === 2}
                                          onClick={() => {
                                            setMetodoDePago(2);
                                          }}
                                        >
                                          REDCOMPRA POS
                                        </Button>
                                      )}
                                      {pagoRetiroLocalMercadopago && (
                                        <Button
                                          color="primary"
                                          active={metodoDePago === 3}
                                          onClick={() => {
                                            setMetodoDePago(3);
                                          }}
                                        >
                                          MERCADOPAGO
                                        </Button>
                                      )}
                                    </ButtonGroup>
                                  )
                                }
                                {
                                  // ENTREGA DELIVERY
                                  metodoDeEntrega === 2 && (
                                    <ButtonGroup>
                                      {pagoDeliveryEfectivo && (
                                        <Button
                                          color="primary"
                                          active={metodoDePago === 4}
                                          onClick={() => {
                                            setMetodoDePago(4);
                                          }}
                                        >
                                          EFECTIVO
                                        </Button>
                                      )}
                                      {pagoDeliveryPos && (
                                        <Button
                                          color="primary"
                                          active={metodoDePago === 5}
                                          onClick={() => {
                                            setMetodoDePago(5);
                                          }}
                                        >
                                          REDCOMPRA POS
                                        </Button>
                                      )}
                                      {pagoDeliveryMercadopago && (
                                        <Button
                                          color="primary"
                                          active={metodoDePago === 6}
                                          onClick={() => {
                                            setMetodoDePago(6);
                                          }}
                                        >
                                          MERCADOPAGO
                                        </Button>
                                      )}
                                    </ButtonGroup>
                                  )
                                }
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
                                TOTAL ${total}
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
    </Row >
  );
};

export default Carrito;
