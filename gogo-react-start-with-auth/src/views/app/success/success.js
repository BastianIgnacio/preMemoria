/* eslint-disable new-cap */
/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Row, Card, CardBody, Table, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Colxx } from '../../../components/common/CustomBootstrap';
import { TIENDA_CARGAR_TIENDA } from '../../../redux/actions';
import Ticket from './ticket';

const Success = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // INFORMACION SOBRE LA TIENDA
  const success = useSelector((state) => state.carrito.success);
  const ordenSuccess = useSelector((state) => state.carrito.ordenSuccess);
  const arrayOrdenSuccess = useSelector(
    (state) => state.carrito.arrayOrdenSuccess
  );
  const fechaSuccess = useSelector((state) => state.carrito.fechaSuccess);
  const horaSuccess = useSelector((state) => state.carrito.horaSuccess);

  const direccionTienda = useSelector((state) => state.tienda.direccion);
  const link = useSelector((state) => state.tienda.link);
  // eslint-disable-next-line no-unused-vars
  const fileName = `orden${ordenSuccess.id}.pdf`;

  const verTienda = () => {
    dispatch({
      type: TIENDA_CARGAR_TIENDA,
      payload: link,
    });
    history.push(`/tienda/${link}`);
  };

  return success ? (
    <>
      <div className="d-flex justify-content-center">
        <Row>
          <div className="invoice-react">
            <Colxx xxs="12" className="mb-4">
              <Card id="divToPrint" className="mb-5 invoice-contents">
                <CardBody className="d-flex flex-column justify-content-between">
                  <div className="d-flex flex-column text-center">
                    <Alert color="success" className="rounded">
                      ORDEN ENVIADA
                    </Alert>
                    <div className="border-bottom  mb-2" />
                    <div className="d-flex flex-row justify-content-between mb-5">
                      <div className="d-flex flex-column w-60 mr-2 p-4 text-semi-muted bg-semi-muted text-left">
                        <p className="mb-0">{ordenSuccess.nombrePedido}</p>
                        <p className="mb-0">{ordenSuccess.telefonoEntrega}</p>
                        <p className="mb-0">{ordenSuccess.emailEntrega}</p>
                        <p className="mb-0">{ordenSuccess.tiempoEntrega}</p>
                        {ordenSuccess.entregaDelivery && (
                          <>
                            <p className="mb-0">ENTREGA DELIVERY</p>
                            <p className="mb-0">
                              Dirección: {ordenSuccess.direccionEntrega}
                            </p>
                          </>
                        )}
                        {!ordenSuccess.entregaDelivery && (
                          <>
                            <p className="mb-0">RETIRO EN LOCAL</p>
                            <p className="mb-0">Dirección: {direccionTienda}</p>
                          </>
                        )}
                      </div>
                      <div className="d-flex w-40 flex-column text-right p-4 text-semi-muted bg-semi-muted text-center">
                        <p className="mb-0">ORDEN #: {ordenSuccess.id}</p>
                        <p className="mb-0">{fechaSuccess}</p>
                        <p className="mb-0">{horaSuccess}</p>
                      </div>
                    </div>

                    <Table responsive>
                      <thead>
                        <tr>
                          <th>PRODUCTO</th>
                          <th>NOTA ESPECIAL</th>
                          <th>CANTIDAD</th>
                          <th>SUBTOTAL</th>
                        </tr>
                      </thead>
                      <tbody>
                        {arrayOrdenSuccess.map((productoOrden, index) => {
                          return (
                            // eslint-disable-next-line react/no-array-index-key
                            <tr key={index}>
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
                    <Table borderless className="d-flex justify-content-end">
                      <tbody>
                        <tr className="font-weight-bold">
                          <td className="text-semi-muted">Total :</td>
                          <td className="text-right">$ {ordenSuccess.total}</td>
                        </tr>
                      </tbody>
                    </Table>
                    <div className="border-bottom pt-3 mb-5" />
                    <p className="text-muted text-small text-center">
                      Se ha enviado una copia a tu correo electronico.
                    </p>
                  </div>
                </CardBody>
              </Card>
              <div className="m-2">
                <PDFDownloadLink document={<Ticket />} fileName={fileName}>
                  <Button block outline color="primary" className="mb-2">
                    Descargar pdf
                  </Button>{' '}
                </PDFDownloadLink>
                <Button
                  block
                  outline
                  color="secondary"
                  className="mb-2"
                  onClick={() => verTienda()}
                >
                  Volver a la tienda
                </Button>{' '}
              </div>
            </Colxx>
          </div>
        </Row>
      </div>
    </>
  ) : (
    <p className="text-muted text-small text-center">
      NO EXISTE UNA VENTA FINALIZADA{' '}
    </p>
  );
};

export default Success;
