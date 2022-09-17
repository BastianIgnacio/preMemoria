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
  Label,
  FormGroup,
  CustomInput,
} from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { useParams, useHistory } from 'react-router-dom';
import { FormikReactSelect, FormikCustomRadioGroup } from '../../../containers/form-validations/FormikFields';

import { Colxx } from '../../../components/common/CustomBootstrap';
import {
  CARRITO_ELIMINAR_PRODUCTO,
  CARRITO_INIT,
  CARRITO_PRODUCTO_ELIMINAR,
  CARRITO_RES_PRODUCTO,
  CARRITO_SUM_PRODUCTO,
  TIENDA_CARGAR_TIENDA,
} from '../../../redux/actions';
import { tiposPago, estadosPago, estadosVenta, tiposEntrega, estadosOrden } from '../../../constants/defaultValues';
import CardEnviarPedido from './CardEnviarPedido';

const Carrito = () => {
  // ID DE LA TIENDA QUE ESTAMOS CARGANDO EN EL COMPONENTE
  const { link } = useParams();

  // Variables para el estado del componente
  const dispatch = useDispatch();
  const history = useHistory();



  // VARIABLES DEL MODAL
  const [modalFinalizarCompra, setModalFinalizarCompra] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalEnviandoOrden, setModalEnviandoOrden] = useState(false);

  // VARIABLES PARA UN PEDIDO
  const [venta, setVenta] = useState([]);
  const [productosVenta, setProductosVenta] = useState([])
  const [orden, setOrden] = useState([])
  const [productosOrden, setProductosOrden] = useState([])

  // INFORMACION SOBRE LA TIENDA
  const idTienda = useSelector((state) => state.carrito.idTienda);
  const carritoCargado = useSelector((state) => state.carrito.carritoCargado);
  const total = useSelector((state) => state.carrito.total);
  const arrayCarrito = useSelector((state) => state.carrito.arrayCarrito);
  const productoParaEliminar = useSelector((state) => state.carrito.productoParaEliminar);
  const direccionTienda = useSelector((state) => state.tienda.direccion);


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

  // eslint-disable-next-line no-unused-vars
  const [metodoDePago, setMetodoDePago] = useState(0);


  // eslint-disable-next-line no-unused-vars
  const opcionesPagoRetiroLocal = [
    { value: tiposPago[0].id, label: tiposPago[0].label, disabled: !pagoRetiroLocalEfectivo },
    { value: tiposPago[1].id, label: tiposPago[1].label, disabled: !pagoRetiroLocalPos },
    { value: tiposPago[2].id, label: tiposPago[2].label, disabled: !pagoRetiroLocalMercadopago },
  ];

  const opcionesVisiblesPagoRetiroLocal = [];
  opcionesPagoRetiroLocal.map((opc) => {
    if (!opc.disabled) {
      opcionesVisiblesPagoRetiroLocal.push(opc);
    }
    return "";
  });

  // eslint-disable-next-line no-unused-vars
  const opcionesPagoDelivery = [
    { value: tiposPago[0].id, label: tiposPago[0].label, disabled: !pagoDeliveryEfectivo },
    { value: tiposPago[1].id, label: tiposPago[1].label, disabled: !pagoDeliveryPos },
    { value: tiposPago[2].id, label: tiposPago[2].label, disabled: !pagoDeliveryMercadopago },
  ];
  const opcionesVisiblesPagoDelivery = [];
  opcionesPagoDelivery.map((opc) => {
    if (!opc.disabled) {
      opcionesVisiblesPagoDelivery.push(opc);
    }
    return "";
  });


  // METODOS DE ENTREGA
  const tieneDelivery = useSelector((state) => state.carrito.tieneDelivery);
  const tieneRetiroLocal = useSelector(
    (state) => state.carrito.tieneRetiroLocal
  );
  // Se inicia el metodo de entrega como RETIRO_LOCAL
  const [metodoDeEntrega, setMetodoEntrega] = useState(0);

  // eslint-disable-next-line no-unused-vars
  const opcionesEntrega = [
    { value: 'RETIRO_LOCAL', label: 'Retiro en Local', disabled: !tieneRetiroLocal },
    { value: 'DELIVERY', label: 'Delivery', disabled: !tieneDelivery },
  ];

  // eslint-disable-next-line no-unused-vars
  const dataRetiroEnLocal = useSelector(
    (state) => state.carrito.dataRetiroEnLocal
  );
  const dataDelivery = useSelector((state) => state.carrito.dataDelivery);
  const tiendaCargada = useSelector((state) => state.tienda.tiendaCargada);

  useEffect(() => {
    if (!carritoCargado) {
      dispatch({
        type: CARRITO_INIT,
        payload: link,
      });
    }
    if (!tiendaCargada) {
      dispatch({
        type: TIENDA_CARGAR_TIENDA,
        payload: link,
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



  // Validacion para el form que envia la orden
  const SignupSchemaRetiroLocal = Yup.object().shape({
    nombre: Yup.string().required('El nombre es requerido!'),
    telefono: Yup.string().required('El telefono o whatsapp es requerido!'),
    email: Yup.string()
      .email('La direccion de email es invalida')
      .required('La direccion de email es requerida!'),
    customRadioGroupFormaPago: Yup.string().required('Forma de pago requerida!'),
  });

  // Validacion para el form que envia la orden
  const SignupSchemaDelivery = Yup.object().shape({
    nombre: Yup.string().required('El nombre es requerido!'),
    telefono: Yup.string().required('El telefono o whatsapp es requerido!'),
    email: Yup.string()
      .email('La direccion de email es invalida!')
      .required('La direccion de email es requerida!'),
    direccionDelivery: Yup.string().required('La direccion es requerida!'),
    customRadioGroupFormaPago: Yup.string().required('Forma de pago requerida!'),
  });

  const finalizarCompra = () => {
    if (arrayCarrito.length !== 0) {
      setMetodoEntrega(0);
      setModalFinalizarCompra(true);
    }
  };

  const onClickModalEliminar = (producto) => {
    dispatch({
      type: CARRITO_PRODUCTO_ELIMINAR,
      payload: producto,
    });
    setModalEliminar(!modalEliminar);
  };

  // Funcion para Enviar el pedido para retiro en local
  // eslint-disable-next-line no-unused-vars
  const enviarPedidoRetiroLocal = (values, { setSubmitting }) => {
    // eslint-disable-next-line no-unused-vars
    const payload = {
      ...values,
      tiempoRetiro: values.tiempoRetiro.label,
    };
    setTimeout(() => {
      console.log(JSON.stringify(payload, null, 2));

      if (payload.customRadioGroupFormaPago === 'EFECTIVO') {
        const ventaPrev = {
          total,
          // tipo de pago 1 = EFECTIVO
          tipoPago: tiposPago[0].id,
          estadoPago: estadosPago[0].id,
          estadoVenta: estadosVenta[0].id,
          refLocalComercial: idTienda,
        }
        setVenta(ventaPrev);

        const productosVentaPrev = arrayCarrito.map((pv) => {
          return {
            nombreProducto: pv.nombre,
            descripcionProducto: pv.descripcion,
            cantidad: pv.cantidad,
            precioUnitario: pv.precio,
            total: pv.total,
          };
        });
        setProductosVenta(productosVentaPrev);

        // GENERAR ORDEN
        const ordenPrev = {
          // tipo de entrega 0 = RETIRO_LOCAL
          tipoEntrega: tiposEntrega[0].id,
          entregaDelivery: false,
          estado: estadosOrden[0].id,
          direccionEntrega: 'NO HAY DIRECCION ENTREGA',
          telefonoEntrega: payload.telefono,
          emailEntrega: payload.email,
          nombrePedido: payload.nombre,
          precioEnvio: 0,
          total,
          tiempoEntrega: payload.tiempoRetiro,
          refLocalComercial: idTienda,
          productos: arrayCarrito,
        };
        setOrden(ordenPrev);

        const productosOrdenPrev = arrayCarrito.map((pv) => {
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
        setProductosOrden(productosOrdenPrev);

      }
      if (payload.customRadioGroupFormaPago === 'DEBITO_CREDITO_POS') {
        // GENERAR VENTA 
        const ventaPrev = {
          total,
          // tipo de pago 1 = DEBITO_CREDITO_POS
          tipoPago: tiposPago[1].id,
          estadoPago: estadosPago[0].id,
          estadoVenta: estadosVenta[0].id,
          refLocalComercial: idTienda,
        }
        setVenta(ventaPrev);

        const productosVentaPrev = arrayCarrito.map((pv) => {
          return {
            nombreProducto: pv.nombre,
            descripcionProducto: pv.descripcion,
            cantidad: pv.cantidad,
            precioUnitario: pv.precio,
            total: pv.total,
          };
        });
        setProductosVenta(productosVentaPrev);

        // GENERAR ORDEN
        const ordenPrev = {
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
        setOrden(ordenPrev);

        const productosOrdenPrev = arrayCarrito.map((pv) => {
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
        setProductosOrden(productosOrdenPrev)
        // DESPACHAMOS LA ACCION PARA PROCESAR LA VENTA Y ORDEN
      }
      if (payload.customRadioGroupFormaPago === 'DEBITO_CREDITO_MERCADOPAGO') {
        // GENERAR VENTA 
        const ventaPrev = {
          total,
          // tipo de pago 1 = DEBITO_CREDITO_MERCADOPAGO
          tipoPago: tiposPago[2].id,
          // estado de pago 1 = PAGADO
          estadoPago: estadosPago[1].id,
          // estado de venta 1 = FINALIZADO
          estadoVenta: estadosVenta[1].id,
          refLocalComercial: idTienda,
        }
        setVenta(ventaPrev);

        const productosVentaPrev = arrayCarrito.map((pv) => {
          return {
            nombreProducto: pv.nombre,
            descripcionProducto: pv.descripcion,
            cantidad: pv.cantidad,
            precioUnitario: pv.precio,
            total: pv.total,
          };
        });
        setProductosVenta(productosVentaPrev);

        // GENERAR ORDEN
        const ordenPrev = {
          // tipo de entrega 1 = RETIRO_LOCAL
          tipoEntrega: tiposEntrega[0].id,
          entregaDelivery: false,
          // Estado de orden 0 = EN_COLA
          estado: estadosOrden[0].id,
          direccionEntrega: `Retiro en local (${direccionTienda})`,
          telefonoEntrega: payload.telefono,
          nombrePedido: payload.nombre,
          precioEnvio: 0,
          total,
          tiempoEntrega: payload.tiempoRetiro,
          refLocalComercial: idTienda,
          productos: arrayCarrito,
        };
        setOrden(ordenPrev);

        const productosOrdenPrev = arrayCarrito.map((pv) => {
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
        setProductosOrden(productosOrdenPrev);
      }
      setModalEnviandoOrden(!modalEnviandoOrden);
    }, 500);
  };

  // Funcion para Enviar el pedido
  // eslint-disable-next-line no-unused-vars
  const enviarPedidoDelivery = (values, { setSubmitting }) => {
    // eslint-disable-next-line no-unused-vars
    const payload = {
      ...values,
      tiempoDelivery: values.tiempoDelivery.label,
    };
    setTimeout(() => {
      console.log(JSON.stringify(payload, null, 2));
      if (payload.customRadioGroupFormaPago === 'EFECTIVO') {
        const ventaPrev = {
          total,
          // tipo de pago 1 = EFECTIVO
          tipoPago: tiposPago[0].id,
          // estado de pago 0 = EN_ESPERA_PAGO 
          estadoPago: estadosPago[0].id,
          // estado de venta = EN_PROCESO
          estadoVenta: estadosVenta[0].id,
          refLocalComercial: idTienda,
        }
        setVenta(ventaPrev);

        const productosVentaPrev = arrayCarrito.map((pv) => {
          return {
            nombreProducto: pv.nombre,
            descripcionProducto: pv.descripcion,
            cantidad: pv.cantidad,
            precioUnitario: pv.precio,
            total: pv.total,
          };
        });
        setProductosVenta(productosVentaPrev);

        // GENERAR ORDEN
        const ordenPrev = {
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
        setOrden(ordenPrev);

        const productosOrdenPrev = arrayCarrito.map((pv) => {
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
        setProductosOrden(productosOrdenPrev);

      }
      if (payload.customRadioGroupFormaPago === 'DEBITO_CREDITO_POS') {
        // GENERAR VENTA 
        const ventaPrev = {
          total,
          // tipo de pago 1 = DEBITO_CREDITO_POS
          tipoPago: tiposPago[1].id,
          // estado de pago 0 = EN_ESPERA_PAGO 
          estadoPago: estadosPago[0].id,
          // estado de venta = EN_PROCESO
          estadoVenta: estadosVenta[0].id,
          refLocalComercial: idTienda,
        }
        setVenta(ventaPrev);

        const productosVentaPrev = arrayCarrito.map((pv) => {
          return {
            nombreProducto: pv.nombre,
            descripcionProducto: pv.descripcion,
            cantidad: pv.cantidad,
            precioUnitario: pv.precio,
            total: pv.total,
          };
        });
        setProductosVenta(productosVentaPrev);

        // GENERAR ORDEN
        const ordenPrev = {
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
        setOrden(ordenPrev);

        const productosOrdenPrev = arrayCarrito.map((pv) => {
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
        setProductosOrden(productosOrdenPrev);
      }
      if (payload.customRadioGroupFormaPago === 'DEBITO_CREDITO_MERCADOPAGO') {
        // GENERAR VENTA 
        const ventaPrev = {
          total,
          // tipo de pago 1 = DEBITO_CREDITO_MERCADOPAGO
          tipoPago: tiposPago[2].id,
          // estado de pago 1 = PAGADO
          estadoPago: estadosPago[1].id,
          // estado de venta 1 = FINALIZADO
          estadoVenta: estadosVenta[1].id,
          refLocalComercial: idTienda,
        }
        setVenta(ventaPrev);

        const productosVentaPrev = arrayCarrito.map((pv) => {
          return {
            nombreProducto: pv.nombre,
            descripcionProducto: pv.descripcion,
            cantidad: pv.cantidad,
            precioUnitario: pv.precio,
            total: pv.total,
          };
        });
        setProductosVenta(productosVentaPrev);

        // GENERAR ORDEN
        const ordenPrev = {
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
        setOrden(ordenPrev);

        const productosOrdenPrev = arrayCarrito.map((pv) => {
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
        setProductosOrden(productosOrdenPrev);
      }
      setModalEnviandoOrden(!modalEnviandoOrden);
    }, 500);
  };


  return (
    <div className="d-flex justify-content-center">
      <Row className="background-tienda d-flex justify-content-center">
        <div className="mb-4  background-tienda-contents w-96">
          <Card>
            <CardBody>
              <Row className="d-flex justify-content-center">
                {arrayCarrito.map((producto) => {
                  return (
                    <Colxx xxs="12" key={producto.keyCarritoProducto}>
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
                                onClick={() => onClickModalEliminar(producto)}
                              />
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Colxx>
                  );
                })}
                {arrayCarrito.length === 0 && (
                  <Colxx xxs="12" xs="12" lg="12">
                    <div className="d-flex justify-content-center w-100">
                      <div className=" m-2 card-icon w-80">
                        EL CARRITO ESTA VACIO UWU
                      </div>
                    </div>
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
                        {(arrayCarrito.length === 0) ? (
                          <Button
                            color="primary"
                            className="mb-0"
                            disabled
                          >
                            FINALIZAR COMPRA
                          </Button>

                        ) : (<Button
                          color="primary"
                          className="mb-0"
                          onClick={() => finalizarCompra()}
                        >
                          FINALIZAR COMPRA
                        </Button>)}
                      </div>
                    </div>
                  </Card>
                </Colxx>
              </Row>
            </CardBody>
          </Card>

        </div>
      </Row>
      <Modal
        isOpen={modalEliminar}
        toggle={() => setModalEliminar(!modalEliminar)}
      >
        <ModalHeader>Quieres eliminar el producto ?</ModalHeader>
        <ModalBody>
          <Row>
            <Colxx xxs="12" xs="12" lg="12">
              <CardText className="text-muted text-left text-medium mb-1 font-weight-bold">
                NOMBRE: {productoParaEliminar.nombre}
              </CardText>
            </Colxx>
            <Colxx xxs="12" xs="12" lg="12">
              <CardText className="text-muted text-left text-medium mb-1 font-weight-bold">
                NOTA ESPECIAL: {productoParaEliminar.notaEspecial}
              </CardText>
            </Colxx>
            <Colxx xxs="12" xs="12" lg="12">
              <CardText className="text-muted text-left text-medium mb-1 font-weight-bold">
                CANTIDAD: {productoParaEliminar.cantidad}
              </CardText>
            </Colxx>
            <Colxx xxs="12" xs="12" lg="12">
              <CardText className="text-muted text-left text-medium mb-1 font-weight-bold">
                PRECIO: {productoParaEliminar.precio}
              </CardText>
            </Colxx>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => eliminar(productoParaEliminar)}
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
      <Modal
        isOpen={modalFinalizarCompra}
        toggle={() => setModalFinalizarCompra(!modalFinalizarCompra)}
      >
        <ModalBody>
          <Row>
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
                      <CustomInput
                        type="radio"
                        id="exCustomRadio"
                        name="customRadio"
                        label={tiposEntrega[0].label}
                        onClick={() => { setMetodoEntrega(1) }}
                      />
                      <CustomInput
                        type="radio"
                        id="exCustomRadio2"
                        name="customRadio"
                        label={tiposEntrega[1].label}
                        onClick={() => { setMetodoEntrega(2) }}
                      />
                    </Colxx>
                    {(metodoDeEntrega === 1) && (
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
                          customRadioGroupFormaPago: '',
                        }}
                        validationSchema={SignupSchemaRetiroLocal}
                        onSubmit={enviarPedidoRetiroLocal}
                      >
                        {({
                          setFieldValue,
                          setFieldTouched,
                          values,
                          errors,
                          touched,
                        }) => (
                          <Form className="av-tooltip tooltip-label-bottom">
                            <Colxx xxs="12" xs="12" lg="12">
                              <CardText className="text-muted text-left text-medium mb-1 font-weight-bold">
                                DATOS DE CONTACTO
                              </CardText>
                            </Colxx>
                            <Colxx xxs="12" xs="12" lg="12">
                              <FormGroup className="form-group has-top-label error-l-100 tooltip-right-top">
                                <Label>NOMBRE</Label>
                                <Field className="form-control" name="nombre" />
                                {errors.nombre && touched.nombre ? (
                                  <div className="invalid-feedback d-block ">
                                    {errors.nombre}
                                  </div>
                                ) : null}
                              </FormGroup>
                              <FormGroup className="form-group has-top-label error-l-100 tooltip-right-top">
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
                              <FormGroup className="form-group has-top-label error-l-100 tooltip-right-top">
                                <Label>EMAIL</Label>
                                <Field className="form-control" name="email" />
                                {errors.email && touched.email ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.email}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>
                            <Colxx xxs="12" xs="12" lg="12">
                              <CardText className="text-muted text-left text-medium mb-1 font-weight-bold">
                                DIRECCIÓN DE RETIRO  {direccionTienda}
                              </CardText>
                            </Colxx>
                            <Colxx xxs="12" xs="12" lg="12">
                              <div className="form-group has-float-label">
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
                            <Colxx xxs="12" xs="12" lg="12">
                              <CardText className="text-muted text-left text-medium mb-1 font-weight-bold">
                                FORMA DE PAGO
                              </CardText>
                            </Colxx>
                            <Colxx xxs="12" xs="12" lg="12" >
                              <FormGroup className="error-l-175 tooltip-right-top">
                                <FormikCustomRadioGroup
                                  inline
                                  name="customRadioGroupFormaPago"
                                  id="customRadioGroupFormaPago"
                                  label="Which of these?"
                                  value={values.customRadioGroupFormaPago}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                  options={opcionesVisiblesPagoRetiroLocal}
                                />
                                {errors.customRadioGroupFormaPago && touched.customRadioGroupFormaPago ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.customRadioGroupFormaPago}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>
                            <Colxx
                              xxs="12"
                              xs="12"
                              lg="12"
                              className="text-center mt-2"
                            >
                              <CardText className="text-muted text-center text-large font-weight-bold mt-1 mb-2">
                                TOTAL ${total}
                              </CardText>
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
                            </Colxx>
                          </Form>
                        )}
                      </Formik>
                    )}
                    {(metodoDeEntrega === 2) && (
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
                          customRadioGroupFormaPago: '',
                        }}
                        validationSchema={SignupSchemaDelivery}
                        onSubmit={enviarPedidoDelivery}
                      >
                        {({
                          setFieldValue,
                          setFieldTouched,
                          values,
                          errors,
                          touched,
                        }) => (
                          <Form className="av-tooltip tooltip-label-bottom">
                            <Colxx xxs="12" xs="12" lg="12">
                              <CardText className="text-muted text-left text-medium mb-1 font-weight-bold">
                                DATOS DE CONTACTO
                              </CardText>
                            </Colxx>
                            <Colxx xxs="12" xs="12" lg="12">
                              <FormGroup className="form-group has-top-label error-l-100 tooltip-right-top">
                                <Label>NOMBRE</Label>
                                <Field className="form-control" name="nombre" />
                                {errors.nombre && touched.nombre ? (
                                  <div className="invalid-feedback d-block ">
                                    {errors.nombre}
                                  </div>
                                ) : null}
                              </FormGroup>
                              <FormGroup className="form-group has-top-label error-l-100 tooltip-right-top">
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
                              <FormGroup className="form-group has-top-label error-l-100 tooltip-right-top">
                                <Label>EMAIL</Label>
                                <Field className="form-control" name="email" />
                                {errors.email && touched.email ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.email}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>
                            <Colxx xxs="12" xs="12" lg="12">
                              <CardText className="text-muted text-left text-medium mb-1 font-weight-bold">
                                DATOS DE LA ENTREGA
                              </CardText>
                            </Colxx>
                            <Colxx xxs="12" xs="12" lg="12">
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

                              </FormGroup>
                              <FormGroup className="form-group has-top-label tooltip-right-top">
                                <Label>EN DONDE LO ENTREGAMOS ? </Label>
                                <Field
                                  as="textarea"
                                  className="form-control"
                                  name="direccionDelivery"
                                />
                                {errors.direccionDelivery &&
                                  touched.direccionDelivery ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.direccionDelivery}
                                  </div>
                                ) : null}

                              </FormGroup>
                            </Colxx>
                            <Colxx xxs="12" xs="12" lg="12">
                              <CardText className="text-muted text-left text-medium mb-1 font-weight-bold">
                                FORMA DE PAGO
                              </CardText>
                            </Colxx>
                            <Colxx xxs="12" xs="12" lg="12">
                              <FormGroup className="tooltip-right-top">
                                <FormikCustomRadioGroup
                                  inline
                                  name="customRadioGroupFormaPago"
                                  id="customRadioGroupFormaPago"
                                  label="Which of these?"
                                  value={values.customRadioGroupFormaPago}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                  options={opcionesVisiblesPagoDelivery}
                                />
                                {errors.customRadioGroupFormaPago && touched.customRadioGroupFormaPago ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.customRadioGroupFormaPago}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>
                            <Colxx
                              xxs="12"
                              xs="12"
                              lg="12"
                              className="text-center"
                            >
                              <CardText className="text-muted text-center text-large font-weight-bold mt-1 mb-2">
                                TOTAL ${total}
                              </CardText>
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
                            </Colxx>
                          </Form>
                        )}
                      </Formik>
                    )}
                  </Row>
                </CardBody>
              </Card>
            </Colxx>
          </Row>
        </ModalBody>
      </Modal>
      <Modal
        isOpen={modalEnviandoOrden}
        toggle={() => {
          console.log('cancelando');
        }}
      >
        <ModalBody>
          <CardEnviarPedido modal={setModalEnviandoOrden} venta={venta}
            productosVenta={productosVenta} orden={orden} productosOrden={productosOrden} link={link} history={history} />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Carrito;
