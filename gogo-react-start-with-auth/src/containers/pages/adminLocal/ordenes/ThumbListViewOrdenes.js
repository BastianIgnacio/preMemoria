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
} from 'reactstrap';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import { ORDEN_GET_PRODUCTOS_ORDEN } from '../../../../redux/actions';

const ThumbListViewOrdenes = ({ orden }) => {
  const dispatch = useDispatch();
  // const productosVenta = useSelector((state) => state.ventas.productosVenta);
  // const orden = useSelector((state) => state.ventas.orden);
  const productosOrden = useSelector((state) => state.ordenes.productosOrden);

  const [modalVerOrden, setModalVerOrden] = useState(false);

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
              <Button
                onClick={() => {
                  /*
                  getOrden(venta.id);
                  setModalOrden(!modalOrden);
                  */
                }}
                color="primary"
                className="mb-2"
              >
                Enviar a preparación
              </Button>{' '}
              <Button
                onClick={() => {
                  getProductosOrden(orden.id);
                  setModalVerOrden(!modalVerOrden);
                }}
                color="primary"
                className="mb-2"
              >
                Ver orden
              </Button>{' '}
              <Button
                onClick={() => {
                  /* 
                  getProductosVenta(orden.id);
                  setModalDetalle(!modalDetalle);
                  */
                }}
                color="primary"
                className="mb-2"
              >
                Cancelar
              </Button>{' '}
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
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ThumbListViewOrdenes);
