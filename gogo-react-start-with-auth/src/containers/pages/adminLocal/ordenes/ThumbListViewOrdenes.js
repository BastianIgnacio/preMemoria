// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  // eslint-disable-next-line no-unused-vars
  CardBody,
  Button,
  // eslint-disable-next-line no-unused-vars
  Modal,
  // eslint-disable-next-line no-unused-vars
  ModalBody,
  // eslint-disable-next-line no-unused-vars
  ModalFooter,
  // eslint-disable-next-line no-unused-vars
  Table,
  // eslint-disable-next-line no-unused-vars
  Row,
  ModalHeader,
  Alert,
} from 'reactstrap';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import {
  ORDEN_GET_PRODUCTOS_ORDEN,
  // eslint-disable-next-line no-unused-vars
  ORDEN_GET_VENTA,
  ORDEN_CANCELAR_ORDEN,
  ORDEN_ENVIAR_A_PREPARACION,
  ORDEN_ENVIAR_A_REPARTO,
  ORDEN_ENVIAR_A_RETIRO,
} from '../../../../redux/actions';

const ThumbListViewOrdenes = ({ orden }) => {
  const dispatch = useDispatch();
  // const productosVenta = useSelector((state) => state.ventas.productosVenta);
  // const orden = useSelector((state) => state.ventas.orden);
  const productosOrden = useSelector((state) => state.ordenes.productosOrden);
  // eslint-disable-next-line no-unused-vars
  const venta = useSelector((state) => state.ordenes.venta);

  const [modalVerOrden, setModalVerOrden] = useState(false);
  const [modalCancelar, setModalCancelar] = useState(false);
  const [modalEnviarAPreparacion, setModalEnviarAPreparacion] = useState(false);
  const [modalEnviarAReparto, setModalEnviarAReparto] = useState(false);
  const [modalEnviarARetiro, setModalEnviarARetiro] = useState(false);

  const formatDate = (date) => {
    const d = new Date(date);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();
    let hora = d.getHours();
    let minute = d.getMinutes();
    let segundo = d.getSeconds();
    const tab = '\u00A0';
    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;
    if (hora < 10) hora = `0${hora}`;
    if (minute < 10) minute = `0${minute}`;
    if (segundo < 10) segundo = `0${segundo}`;
    return (
      // eslint-disable-next-line prefer-template
      [year, month, day].join('-') +
      tab +
      tab +
      tab +
      '[' +
      [hora, minute, segundo].join(':') +
      ']'
    );
  };
  const fecha = formatDate(orden.fecha);

  const getProductosOrden = (refOrden) => {
    dispatch({
      type: ORDEN_GET_PRODUCTOS_ORDEN,
      payload: refOrden,
    });
  };

  // eslint-disable-next-line no-unused-vars
  const cargarVenta = (refVenta) => {
    dispatch({
      type: ORDEN_GET_VENTA,
      payload: refVenta,
    });
  };
  // eslint-disable-next-line no-unused-vars
  const cancelarOrden = () => {
    dispatch({
      type: ORDEN_CANCELAR_ORDEN,
      payload: orden,
    });
  };
  const enviarAPreparacion = () => {
    dispatch({
      type: ORDEN_ENVIAR_A_PREPARACION,
      payload: orden,
    });
  };
  const enviarAReparto = () => {
    dispatch({
      type: ORDEN_ENVIAR_A_REPARTO,
      payload: orden,
    });
  };
  const enviarARetiro = () => {
    dispatch({
      type: ORDEN_ENVIAR_A_RETIRO,
      payload: orden,
    });
  };

  return (
    <Colxx xxs="12" key={orden.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={orden.id}>
        <Card>
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <div className="w-5 w-sm-10 mb-1">
                <p className="mb-1 text-muted text-medium w-100 w-sm-100">
                  #{`${orden.id} $${orden.total}`}
                </p>
              </div>
              <p className="list-item-heading mb-1 truncate"> {fecha}</p>
              {orden.estado === 'EN_COLA' && (
                <div>
                  <Button
                    onClick={() => {
                      setModalEnviarAPreparacion(!modalEnviarAPreparacion);
                    }}
                    color="success"
                    className="mb-2"
                  >
                    ENVIAR A PREPARACIÓN
                  </Button>
                  <Button
                    onClick={() => {
                      getProductosOrden(orden.id);
                      setModalVerOrden(!modalVerOrden);
                    }}
                    color="secondary"
                    className="mb-2"
                  >
                    Ver orden
                  </Button>
                  <Button
                    onClick={() => {
                      cargarVenta(orden.refVenta);
                      setModalCancelar(!modalCancelar);
                    }}
                    color="danger"
                    className="mb-2"
                  >
                    Cancelar
                  </Button>
                </div>
              )}
              {orden.estado === 'EN_PREPARACION' &&
                orden.tipoEntrega === 'DELIVERY' && (
                  <div>
                    <Button
                      onClick={() => {
                        setModalEnviarAReparto(!modalEnviarAReparto);
                      }}
                      color="success"
                      className="mb-2"
                    >
                      DESPACHAR A REPARTO
                    </Button>
                    <Button
                      onClick={() => {
                        getProductosOrden(orden.id);
                        setModalVerOrden(!modalVerOrden);
                      }}
                      color="secondary"
                      className="mb-2"
                    >
                      Ver orden
                    </Button>
                    <Button
                      onClick={() => {
                        cargarVenta(orden.refVenta);
                        setModalCancelar(!modalCancelar);
                      }}
                      color="danger"
                      className="mb-2"
                    >
                      Cancelar
                    </Button>
                  </div>
                )}
              {orden.estado === 'EN_PREPARACION' &&
                orden.tipoEntrega === 'RETIRO_LOCAL' && (
                  <div>
                    <Button
                      onClick={() => {
                        setModalEnviarARetiro(!modalEnviarARetiro);
                      }}
                      color="success"
                      className="mb-2"
                    >
                      DESPACHAR A RETIRO
                    </Button>
                    <Button
                      onClick={() => {
                        getProductosOrden(orden.id);
                        setModalVerOrden(!modalVerOrden);
                      }}
                      color="secondary"
                      className="mb-2"
                    >
                      Ver orden
                    </Button>
                    <Button
                      onClick={() => {
                        cargarVenta(orden.refVenta);
                        setModalCancelar(!modalCancelar);
                      }}
                      color="danger"
                      className="mb-2"
                    >
                      Cancelar
                    </Button>
                  </div>
                )}
              {orden.estado === 'EN_REPARTO' && (
                <div>
                  <Button
                    onClick={() => {
                      getProductosOrden(orden.id);
                      setModalVerOrden(!modalVerOrden);
                    }}
                    color="secondary"
                    className="mb-2"
                  >
                    Ver orden
                  </Button>
                </div>
              )}
              {orden.estado === 'EN_ESPERA_RETIRO' && (
                <div>
                  <Button
                    onClick={() => {
                      getProductosOrden(orden.id);
                      setModalVerOrden(!modalVerOrden);
                    }}
                    color="secondary"
                    className="mb-2"
                  >
                    Ver orden
                  </Button>
                  <Button
                    onClick={() => {
                      cargarVenta(orden.refVenta);
                      setModalCancelar(!modalCancelar);
                    }}
                    color="danger"
                    className="mb-2"
                  >
                    Cancelar
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
      <Modal
        isOpen={modalVerOrden}
        size="lg"
        toggle={() => setModalVerOrden(!modalVerOrden)}
      >
        <ModalBody>
          <Row className="invoice-react">
            <Colxx xxs="12" className="mb-4">
              <Card className="mb-5 invoice-contents">
                <CardBody className="d-flex flex-column justify-content-between">
                  <div className="d-flex flex-column">
                    {orden.entregaDelivery ? (
                      <div className="d-flex flex-row justify-content-between mb-5">
                        <div className="d-flex flex-column w-40 mr-2 p-4 text-semi-muted bg-semi-muted">
                          <p className="mb-0">Orden #{orden.id}</p>
                          <p className="mb-0">ESTADO : {orden.estado}</p>
                          <p className="mb-0">{fecha}</p>
                        </div>
                        <div className="d-flex flex-column w-60 mr-2 p-4 text-semi-muted bg-semi-muted">
                          <p className="mb-0">ENTREGA : {orden.tipoEntrega}</p>
                          <p className="mb-0">NOMBRE : {orden.nombrePedido}</p>
                          <p className="mb-0">
                            TELEFONO : {orden.telefonoEntrega}
                          </p>
                          <p className="mb-0">
                            DIRECCION : {orden.direccionEntrega}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex flex-row justify-content-between mb-5">
                        <div className="d-flex flex-column w-100 mr-2 p-4 text-semi-muted bg-semi-muted">
                          <p className="mb-0">Orden #{orden.id}</p>
                          <p className="mb-0">ESTADO : {orden.estado}</p>
                          <p className="mb-0">{fecha}</p>
                          <p className="mb-0">ENTREGA : {orden.tipoEntrega}</p>
                          <p className="mb-0">NOMBRE : {orden.nombrePedido}</p>
                          <p className="mb-0">TELEFONO : {orden.telefono}</p>
                        </div>
                      </div>
                    )}
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>NOMBRE PRODUCTO</th>
                          <th>NOTA ESPECIAL</th>
                          <th>CANTIDAD</th>
                          <th>SUBTOTAL</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productosOrden.map((productoOrden) => {
                          return (
                            <tr key={productoOrden.id}>
                              <td>
                                <p className="mb-0">{productoOrden.nombre}</p>
                              </td>
                              <td>
                                <p className="mb-0">
                                  {productoOrden.notaEspecial}
                                </p>
                              </td>
                              <td>
                                <p className="mb-0">
                                  {productoOrden.cantidad} pcs
                                </p>
                              </td>
                              <td>
                                <p className="mb-0">
                                  ${productoOrden.precioTotal}
                                </p>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                  <div className="d-flex flex-column">
                    <div className="border-bottom pt-3 mb-5" />
                    <Table responsive className="d-flex justify-content-end">
                      {orden.entregaDelivery ? (
                        <tbody>
                          <tr className="font-weight-bold">
                            <td className="text-semi-muted">Envio :</td>
                            <td className="text-right">
                              $ {orden.precioEnvio}
                            </td>
                          </tr>
                          <tr className="font-weight-bold">
                            <td className="text-semi-muted">Total :</td>
                            <td className="text-right">$ {orden.total}</td>
                          </tr>
                        </tbody>
                      ) : (
                        <tbody>
                          <tr className="font-weight-bold">
                            <td className="text-semi-muted">Total :</td>
                            <td className="text-right">$ {orden.total}</td>
                          </tr>
                        </tbody>
                      )}
                    </Table>
                    <div className="border-bottom pt-3 mb-5" />
                  </div>
                </CardBody>
              </Card>
            </Colxx>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setModalVerOrden(false)}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
      <Modal
        isOpen={modalCancelar}
        toggle={() => setModalCancelar(!modalCancelar)}
      >
        {venta.tipoPago === 'DEBITO/CREDITO_MERCADOPAGO' &&
          venta.estadoPago === 'PAGADO' &&
          venta.estadoVenta === 'FINALIZADO' && (
            <div>
              <ModalHeader>MERCADOPAGO</ModalHeader>
              <ModalBody>
                <div>
                  <p>EL PAGO YA HA SIDO REALIZADO VIA MERCADOPAGO</p>
                  <Alert color="danger">
                    <p>AL CANCELAR LA ORDEN, DEBES REVERTIR EL PAGO ONLINE.</p>
                  </Alert>
                </div>
              </ModalBody>
            </div>
          )}
        <ModalFooter>
          <Button color="danger" onClick={() => cancelarOrden()}>
            Cancelar Orden
          </Button>
          <Button color="secondary" onClick={() => setModalCancelar(false)}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
      <Modal
        isOpen={modalEnviarAPreparacion}
        toggle={() => setModalEnviarAPreparacion(!modalEnviarAPreparacion)}
      >
        {venta.tipoPago === 'DEBITO/CREDITO_MERCADOPAGO' &&
          venta.estadoPago === 'PAGADO' &&
          venta.estadoVenta === 'FINALIZADO' && (
            <div>
              <ModalHeader>MERCADOPAGO</ModalHeader>
              <ModalBody>
                <div>
                  <p>EL PAGO YA HA SIDO REALIZADO VIA MERCADOPAGO</p>
                  <Alert color="danger">
                    <p>AL CANCELAR LA ORDEN, DEBES REVERTIR EL PAGO ONLINE.</p>
                  </Alert>
                </div>
              </ModalBody>
            </div>
          )}
        <ModalFooter>
          <Button color="success" onClick={() => enviarAPreparacion()}>
            ENVIAR A PREPARACION
          </Button>
          <Button
            color="secondary"
            onClick={() => setModalEnviarAPreparacion(false)}
          >
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
      <Modal
        isOpen={modalEnviarAReparto}
        toggle={() => setModalEnviarAReparto(!modalEnviarAReparto)}
      >
        {venta.tipoPago === 'DEBITO/CREDITO_MERCADOPAGO' &&
          venta.estadoPago === 'PAGADO' &&
          venta.estadoVenta === 'FINALIZADO' && (
            <div>
              <ModalHeader>MERCADOPAGO</ModalHeader>
              <ModalBody>
                <div>
                  <p>EL PAGO YA HA SIDO REALIZADO VIA MERCADOPAGO</p>
                  <Alert color="danger">
                    <p>AL CANCELAR LA ORDEN, DEBES REVERTIR EL PAGO ONLINE.</p>
                  </Alert>
                </div>
              </ModalBody>
            </div>
          )}
        <ModalFooter>
          <Button color="success" onClick={() => enviarAReparto()}>
            ENVIAR A REPARTO
          </Button>
          <Button
            color="secondary"
            onClick={() => setModalEnviarAReparto(false)}
          >
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
      <Modal
        isOpen={modalEnviarARetiro}
        toggle={() => setModalEnviarARetiro(!modalEnviarARetiro)}
      >
        {venta.tipoPago === 'DEBITO/CREDITO_MERCADOPAGO' &&
          venta.estadoPago === 'PAGADO' &&
          venta.estadoVenta === 'FINALIZADO' && (
            <div>
              <ModalHeader>MERCADOPAGO</ModalHeader>
              <ModalBody>
                <div>
                  <p>EL PAGO YA HA SIDO REALIZADO VIA MERCADOPAGO</p>
                  <Alert color="danger">
                    <p>AL CANCELAR LA ORDEN, DEBES REVERTIR EL PAGO ONLINE.</p>
                  </Alert>
                </div>
              </ModalBody>
            </div>
          )}
        <ModalFooter>
          <Button color="success" onClick={() => enviarARetiro()}>
            ENVIAR A RETIRO
          </Button>
          <Button
            color="secondary"
            onClick={() => setModalEnviarARetiro(false)}
          >
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ThumbListViewOrdenes);
