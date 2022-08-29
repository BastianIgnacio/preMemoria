/* eslint-disable react/no-unknown-property */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Alert, Row, Card, CardBody, Table } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';




const Success = () => {

  // INFORMACION SOBRE LA TIENDA
  // eslint-disable-next-line no-unused-vars
  const idTienda = useSelector((state) => state.carrito.idTienda);

  const success = useSelector((state) => state.carrito.success);
  const ordenSuccess = useSelector((state) => state.carrito.ordenSuccess);
  const arrayOrdenSuccess = useSelector((state) => state.carrito.arrayOrdenSuccess);
  const fechaSuccess = useSelector((state) => state.carrito.fechaSuccess);
  const horaSuccess = useSelector((state) => state.carrito.horaSuccess);

  console.log('imprimiendo sucess');
  console.log(success);
  console.log('imprimiendo orden sucess');
  console.log(ordenSuccess);
  console.log('imprimiendo array orden sucess');
  console.log(arrayOrdenSuccess);

  return success ? (
    <div className="d-flex justify-content-center">
      <Row className="invoice-react">
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-5 invoice-contents">
            <CardBody className="d-flex flex-column justify-content-between">
              <div className="d-flex flex-column">
                <div className="d-flex flex-row justify-content-between pt-2 pb-2">
                  <div className="d-flex align-self-center">
                    <img
                      src="https://coloredstrategies.com/mailing/gogo.png"
                      alt="Logo"
                    />
                  </div>
                  <div className="d-flex w-30 text-right align-self-center">
                    <Alert color="success" className="rounded">
                      ORDEN ENVIADA
                    </Alert>
                  </div>
                </div>
                <div className="border-bottom pt-4 mb-2" />

                <div className="d-flex flex-row justify-content-between mb-5">
                  <div className="d-flex flex-column w-70 mr-2 p-4 text-semi-muted bg-semi-muted">
                    <p className="mb-0">{ordenSuccess.nombrePedido}</p>
                    <p className="mb-0">{ordenSuccess.telefonoEntrega}</p>
                    <p className="mb-0">{ordenSuccess.emailEntrega}</p>
                    <p className="mb-0">{ordenSuccess.tiempoEntrega}</p>
                    {ordenSuccess.entregaDelivery && (
                      <div>
                        <p className="mb-0">
                          Entrega delivery
                        </p>
                        <p className="mb-0">
                          DIRECCION DE LA ENTREGA
                        </p>
                      </div>
                    )}
                    {!ordenSuccess.entregaDelivery && (
                      <div>
                        <p className="mb-0">
                          Retiro en local comercial
                        </p>
                        <p className="mb-0">
                          DIRECCION DEL LOCAL COMERCIAL
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="d-flex w-30 flex-column text-right p-4 text-semi-muted bg-semi-muted">
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
                  Se ha enviado una copia a tu correo electronico. {' '}
                </p>
              </div>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </div>
  ) : (
    <p className="text-muted text-small text-center">
      NO EXISTE UNA VENTA FINALIZADA{' '}
    </p>

  )
};


export default Success;
