/* eslint-disable new-cap */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable new-cap */
/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Row, Card, CardBody, Table, Button } from 'reactstrap';
import jsPDF from 'jspdf';
import { Colxx } from '../../../components/common/CustomBootstrap';
import { fontRegular } from './Nunito-Regular-normal';
import { fontBold } from './Nunito-Bold-normal';
import { TIENDA_CARGAR_TIENDA } from '../../../redux/actions';

const Success = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // INFORMACION SOBRE LA TIENDA Y ORDEN
  const success = useSelector((state) => state.carrito.success);
  const ordenSuccess = useSelector((state) => state.carrito.ordenSuccess);
  const arrayOrdenSuccess = useSelector(
    (state) => state.carrito.arrayOrdenSuccess
  );
  const localComercialData = useSelector(
    (state) => state.carrito.localComercialData
  );
  const fechaSuccess = useSelector((state) => state.carrito.fechaSuccess);
  // eslint-disable-next-line no-unused-vars
  const horaSuccess = useSelector((state) => state.carrito.horaSuccess);
  const link = useSelector((state) => state.tienda.link);

  const verTienda = () => {
    dispatch({
      type: TIENDA_CARGAR_TIENDA,
      payload: link,
    });
    history.push(`/tienda/${link}`);
  };

  const printDocument = () => {
    // Vamos a calcular el largo del documento
    const largoTable = arrayOrdenSuccess.length * 30;
    // eslint-disable-next-line no-unused-vars
    let largo = 80 + largoTable + 30;
    if (largo < 297) {
      largo = 297;
    }

    if (ordenSuccess.entregaDelivery) {
      // Creamos el pdf para entrega Delivery
      const doc = new jsPDF('p', 'mm', [largo, 210]);
      doc.setFillColor(244, 244, 244);
      doc.roundedRect(5, 5, 110, 45, 1, 1, 'F');
      doc.roundedRect(117, 5, 85, 45, 1, 1, 'F');

      doc.addFileToVFS('Nunito-normal.ttf', fontRegular);
      doc.addFont('Nunito-normal.ttf', 'Nunito', 'normal');
      doc.addFileToVFS('Nunito-bold.ttf', fontBold);
      doc.addFont('Nunito-bold.ttf', 'Nunito', 'bold');
      doc.setTextColor(150, 150, 150);
      doc.setFontSize(10);
      // Imprimimos el nombre del pedido
      doc.setFont('Nunito', 'bold');
      doc.text(10, 15, `Pedido de ${ordenSuccess.nombrePedido}`);
      doc.setFont('Nunito', 'normal');
      doc.text(10, 20, '+56951784619');
      doc.text(10, 25, ordenSuccess.emailEntrega);
      // Imprimimos que es entrega delovery
      doc.setFont('Nunito', 'bold');
      doc.text(10, 30, 'ENTREGA DELIVERY');
      doc.setFont('Nunito', 'normal');
      doc.text(10, 35, ordenSuccess.tiempoEntrega);
      doc.text(10, 40, `Dirección entrega: ${ordenSuccess.direccionEntrega}`, {
        maxWidth: 100,
      });

      // Imprimimos los datos del local comercial
      doc.setFont('Nunito', 'bold');
      doc.text(122, 15, localComercialData.nombreLocalComercial);
      doc.setFont('Nunito', 'normal');
      doc.text(122, 20, localComercialData.telefonoLocalComercial);
      doc.text(122, 25, localComercialData.direccionLocalComercial, {
        maxWidth: 70,
      });

      // Imprimimos los datos de la orden
      doc.setFont('Nunito', 'bold');
      doc.text(122, 35, `ORDEN #${ordenSuccess.id}`);
      doc.setFont('Nunito', 'normal');
      doc.text(122, 40, fechaSuccess);
      doc.text(122, 45, horaSuccess);

      doc.setDrawColor(244, 244, 244);
      doc.line(5, 60, 202, 60);
      doc.line(5, 70, 202, 70);

      doc.setFont('Nunito', 'bold');
      doc.setTextColor(50, 50, 50);
      doc.text(30, 66, 'PRODUCTO ', {
        maxWidth: 60,
        align: 'center',
      });
      doc.text(100, 66, 'NOTA ESPECIAL ', {
        maxWidth: 60,
        align: 'center',
      });
      doc.text(155, 66, 'CANTIDAD', {
        maxWidth: 25,
        align: 'center',
      });
      doc.text(180, 66, 'SUBTOTAL', {
        maxWidth: 40,
        align: 'center',
      });

      doc.setTextColor(150, 150, 150);
      doc.setFont('Nunito', 'normal');
      let altura = 80;
      // eslint-disable-next-line prefer-const, no-unused-vars
      let dis = 0;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < arrayOrdenSuccess.length; i++) {
        let masAlto = 0;
        // eslint-disable-next-line prefer-const
        let dimension = doc.getTextDimensions(arrayOrdenSuccess[i].nombre, {
          maxWidth: 40,
          align: 'center',
        });
        if (dimension.h > masAlto) {
          masAlto = dimension.h;
        }
        dimension = doc.getTextDimensions(arrayOrdenSuccess[i].notaEspecial, {
          maxWidth: 60,
          align: 'center',
        });
        if (dimension.h > masAlto) {
          masAlto = dimension.h;
        }

        doc.text(30, altura, arrayOrdenSuccess[i].nombre, {
          maxWidth: 40,
          align: 'center',
        });
        doc.text(100, altura, arrayOrdenSuccess[i].notaEspecial, {
          maxWidth: 70,
          align: 'center',
        });

        const cantidadPdf = `${arrayOrdenSuccess[i].cantidad}pcs`;
        doc.text(155, altura, cantidadPdf, {
          maxWidth: 40,
          align: 'center',
        });
        const totalPdf = `$${arrayOrdenSuccess[i].precioTotal}`;
        doc.text(180, altura, totalPdf, {
          maxWidth: 40,
          align: 'center',
        });
        doc.line(5, altura + masAlto, 202, altura + masAlto);
        altura += masAlto + 5 + 1;
      }
      doc.setFont('Nunito', 'bold');

      doc.text(
        46,
        altura + 5,
        'El costo del delivery no ha sido incluido, es variable y depende de la zona de despacho!'
      );

      doc.setFont('Nunito', 'bold');
      doc.text(160, altura + 20, 'Total: ', {
        maxWidth: 40,
        align: 'center',
      });
      doc.setTextColor(50, 50, 50);
      const totalString = `$${ordenSuccess.total.toString()}`;
      doc.setFont('Nunito', 'bold');
      doc.text(180, altura + 20, totalString, {
        maxWidth: 40,
        align: 'center',
      });
      doc.line(5, altura + 30, 202, altura + 30);
      doc.output('dataurlnewwindow');
    } else {
      // ******************************************* //
      // Creamos el PDF para RETIRO EN LOCAL
      const doc = new jsPDF('p', 'mm', [largo, 210]);
      doc.setFillColor(244, 244, 244);
      doc.roundedRect(5, 5, 110, 45, 1, 1, 'F');
      doc.roundedRect(117, 5, 85, 45, 1, 1, 'F');

      doc.addFileToVFS('Nunito-normal.ttf', fontRegular);
      doc.addFont('Nunito-normal.ttf', 'Nunito', 'normal');
      doc.addFileToVFS('Nunito-bold.ttf', fontBold);
      doc.addFont('Nunito-bold.ttf', 'Nunito', 'bold');
      doc.setTextColor(150, 150, 150);
      doc.setFontSize(10);
      doc.setFont('Nunito', 'bold');
      doc.text(10, 15, `Pedido de ${ordenSuccess.nombrePedido}`);
      doc.setFont('Nunito', 'normal');
      doc.text(10, 20, ordenSuccess.telefonoEntrega);
      doc.text(10, 25, ordenSuccess.emailEntrega);
      doc.setFont('Nunito', 'bold');
      doc.text(10, 30, 'RETIRO EN LOCAL');
      doc.setFont('Nunito', 'normal');
      doc.text(10, 35, ordenSuccess.tiempoEntrega);
      doc.text(
        10,
        40,
        `Dirección de retiro: ${localComercialData.direccionLocalComercial}`,
        {
          maxWidth: 100,
        }
      );

      // Imprimimos los datos del local comercial
      doc.setFont('Nunito', 'bold');
      doc.text(122, 15, localComercialData.nombreLocalComercial);
      doc.setFont('Nunito', 'normal');
      doc.text(122, 20, localComercialData.telefonoLocalComercial);
      doc.text(122, 25, localComercialData.direccionLocalComercial, {
        maxWidth: 70,
      });
      // Imprimimos los datos de la orden
      doc.setFont('Nunito', 'bold');
      doc.text(122, 35, `ORDEN #${ordenSuccess.id}`);
      doc.setFont('Nunito', 'normal');
      doc.text(122, 40, fechaSuccess);
      doc.text(122, 45, horaSuccess);

      doc.setDrawColor(244, 244, 244);
      doc.line(5, 60, 202, 60);
      doc.line(5, 70, 202, 70);

      doc.setFont('Nunito', 'bold');
      doc.setTextColor(50, 50, 50);
      doc.text(30, 66, 'PRODUCTO ', {
        maxWidth: 60,
        align: 'center',
      });
      doc.text(100, 66, 'NOTA ESPECIAL ', {
        maxWidth: 60,
        align: 'center',
      });
      doc.text(155, 66, 'CANTIDAD', {
        maxWidth: 25,
        align: 'center',
      });
      doc.text(180, 66, 'SUBTOTAL', {
        maxWidth: 40,
        align: 'center',
      });

      doc.setTextColor(150, 150, 150);
      doc.setFont('Nunito', 'normal');
      let altura = 80;
      // eslint-disable-next-line prefer-const, no-unused-vars
      let dis = 0;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < arrayOrdenSuccess.length; i++) {
        let masAlto = 0;
        // eslint-disable-next-line prefer-const
        let dimension = doc.getTextDimensions(arrayOrdenSuccess[i].nombre, {
          maxWidth: 40,
          align: 'center',
        });
        if (dimension.h > masAlto) {
          masAlto = dimension.h;
        }
        dimension = doc.getTextDimensions(arrayOrdenSuccess[i].notaEspecial, {
          maxWidth: 60,
          align: 'center',
        });
        if (dimension.h > masAlto) {
          masAlto = dimension.h;
        }

        doc.text(30, altura, arrayOrdenSuccess[i].nombre, {
          maxWidth: 40,
          align: 'center',
        });
        doc.text(100, altura, arrayOrdenSuccess[i].notaEspecial, {
          maxWidth: 70,
          align: 'center',
        });

        const cantidadPdf = `${arrayOrdenSuccess[i].cantidad}pcs`;
        doc.text(155, altura, cantidadPdf, {
          maxWidth: 40,
          align: 'center',
        });
        const totalPdf = `$${arrayOrdenSuccess[i].precioTotal}`;
        doc.text(180, altura, totalPdf, {
          maxWidth: 40,
          align: 'center',
        });
        doc.line(5, altura + masAlto, 202, altura + masAlto);
        altura += masAlto + 5 + 1;
      }
      doc.setFont('Nunito', 'bold');
      doc.text(160, altura + 5, 'Total: ', {
        maxWidth: 40,
        align: 'center',
      });
      doc.setTextColor(50, 50, 50);
      const totalString = `$${ordenSuccess.total.toString()}`;
      doc.text(180, altura + 5, totalString, {
        maxWidth: 40,
        align: 'center',
      });
      doc.line(5, altura + 15, 202, altura + 15);
      doc.output('dataurlnewwindow');
    }
  };

  return success ? (
    <div className="d-flex justify-content-center">
      <Row className="invoice-react">
        <Colxx xxs="12" className="d-flex justify-content-center ">
          <Card className="mb-1 invoice-contents-pdf">
            <CardBody className="d-flex flex-column justify-content-between">
              <div className="d-flex flex-column text-center">
                <div className="d-flex flex-row justify-content-between mb-5">
                  <div className="d-flex flex-column w-60 mr-2 p-4 text-semi-muted bg-semi-muted text-left">
                    <p className="mb-0 font-weight-bold">
                      Pedido de {ordenSuccess.nombrePedido}
                    </p>
                    <p className="mb-0">{ordenSuccess.telefonoEntrega}</p>
                    <p className="mb-0">{ordenSuccess.emailEntrega}</p>
                    {ordenSuccess.entregaDelivery && (
                      <>
                        <p className="mb-0 font-weight-bold">
                          ENTREGA DELIVERY
                        </p>
                        <p className="mb-0">{ordenSuccess.tiempoEntrega}</p>
                        <p className="mb-0">
                          Dirección Entrega: {ordenSuccess.direccionEntrega}
                        </p>
                      </>
                    )}
                    {!ordenSuccess.entregaDelivery && (
                      <>
                        <p className="mb-0 font-weight-bold">RETIRO EN LOCAL</p>
                        <p className="mb-0">{ordenSuccess.tiempoEntrega}</p>
                        <p className="mb-0">
                          Dirección de retiro:{' '}
                          {localComercialData.direccionLocalComercial}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="d-flex w-40 flex-column p-4 text-semi-muted bg-semi-muted text-left">
                    <p className="mb-0 font-weight-bold">
                      {localComercialData.nombreLocalComercial}
                    </p>
                    <p className="mb-0">
                      {localComercialData.direccionLocalComercial}
                    </p>
                    <p className="mb-0">
                      {localComercialData.telefonoLocalComercial}
                    </p>
                    <p className="mb-0 font-weight-bold">
                      ORDEN #{ordenSuccess.id}
                    </p>
                    <p className="mb-0">{fechaSuccess}</p>
                    <p className="mb-0">{horaSuccess}</p>
                  </div>
                </div>
                <div id="divToPrint">
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
                  <div className="border-bottom pt-3 mb-5" />
                  {ordenSuccess.entregaDelivery && (
                    <div className="d-flex flex-column">
                      <Table borderless className="d-flex justify-content-end">
                        <tbody>
                          <tr className="font-weight-bold">
                            <td className="text-semi-muted">
                              El costo del delivery no ha sido incluido, es
                              variable y depende de la zona de despacho!
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  )}
                  <div className="d-flex flex-column">
                    <Table borderless className="d-flex justify-content-end">
                      <tbody>
                        <tr className="font-weight-bold">
                          <td className="text-semi-muted">Total :</td>
                          <td className="text-right">$ {ordenSuccess.total}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
              <div className="border-bottom pt-3 mb-5" />
              <p className="text-muted text-small text-center">
                Se ha enviado una copia de la orden a tu correo electronico.
              </p>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx xxs="12" className="mb-4 d-flex justify-content-center ">
          <div className="m-2">
            <Button
              outline
              color="primary"
              className="mb-2"
              onClick={() => printDocument()}
            >
              Descargar pdf
            </Button>{' '}
            <Button
              outline
              color="secondary"
              className="mb-2"
              onClick={() => verTienda()}
            >
              Volver a la tienda
            </Button>{' '}
          </div>
        </Colxx>
      </Row>
    </div>
  ) : (
    <p className="text-muted text-small text-center">
      NO EXISTE UNA VENTA FINALIZADA{' '}
    </p>
  );
};

export default Success;
