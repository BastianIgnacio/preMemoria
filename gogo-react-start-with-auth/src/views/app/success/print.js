/* eslint-disable new-cap */
/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import { Row, Card, CardBody, Table, Button } from 'reactstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Colxx } from '../../../components/common/CustomBootstrap';
import { fontRegular } from './Nunito-Regular-normal';
import { fontBold } from './Nunito-Bold-normal';

const Print = () => {
  // INFORMACION SOBRE LA TIENDA
  console.log('asd');
  const success = true;
  const ordenSuccess = {
    id: 129,
    fecha: '2022-09-11T01:51:54.511602Z',
    tipoEntrega: 'RETIRO_LOCAL',
    entregaDelivery: false,
    estado: 'EN_COLA',
    direccionEntrega:
      'Retiro en local (direccion de la tienda es la calla tanto numero tanto de la coiudad tanto)',
    telefonoEntrega: '951784619',
    emailEntrega: 'default@default.com',
    nombrePedido: 'Chinos',
    precioEnvio: 0,
    total: 15000,
    tiempoEntrega: 'En 30 a 60 minutos',
    refLocalComercial: 1,
    refVenta: 205,
  };

  const arrayOrdenSuccess = [
    {
      nombre: 'PRODUCTO 4 PRODUCTO 4 PRODUCTO 4 PRODUCTO 4 PRODUCTO 4',
      descripcion: 'asdasd',
      notaEspecial:
        'SIN NOTA ESPECIALSIN NOTA ESPECIALSIN NOTA ESPECIALSIN NOTA ESPECIALSIN NOTA ESPECIAL',
      precioTotal: 15000,
      precioUnitario: 5000,
      cantidad: 3,
      refOrden: 129,
    },
    {
      nombre: 'PRODUCTO 4',
      descripcion: 'asdasd',
      notaEspecial:
        'SIN NOTA ESPECIALSIN NOTA ESPECIALSIN NOTA ESPECIALSIN NOTA ESPECIALSIN NOTA ESPECIAL',
      precioTotal: 15000,
      precioUnitario: 5000,
      cantidad: 3,
      refOrden: 129,
    },
    {
      nombre: 'PRODUCTO 4',
      descripcion: 'asdasd',
      notaEspecial:
        'SIN NOTA ESPECIALSIN NOTA ESPECIALSIN NOTA ESPECIALSIN NOTA ESPECIALSIN NOTA ESPECIAL',
      precioTotal: 15000,
      precioUnitario: 5000,
      cantidad: 3,
      refOrden: 129,
    },
    {
      nombre: 'PRODUCTO 4',
      descripcion: 'asdasd',
      notaEspecial:
        'SIN NOTA ESPECIALSIN NOTA ESPECIALSIN NOTA ESPECIALSIN NOTA ESPECIALSIN NOTA ESPECIAL',
      precioTotal: 15000,
      precioUnitario: 5000,
      cantidad: 3,
      refOrden: 129,
    },
    {
      nombre: 'PRODUCTO 4',
      descripcion: 'asdasd',
      notaEspecial:
        'SIN NOTA ESPECIALSIN NOTA ESPECIALSIN NOTA ESPECIALSIN NOTA ESPECIALSIN NOTA ESPECIAL',
      precioTotal: 15000,
      precioUnitario: 5000,
      cantidad: 3,
      refOrden: 129,
    },
  ];

  const fechaSuccess = 'fecha';
  const horaSuccess = 'hora';

  const direccionTienda = 'Direccion tienda';
  // eslint-disable-next-line no-unused-vars
  const fileName = `orden${ordenSuccess.id}.pdf`;

  const printDocument = () => {
    const input = document.getElementById('divToPrint');
    html2canvas(input, {
      useCORS: true,
      allowTaint: true,
      scrollY: -window.scrollY,
    }).then((canvas) => {
      const image = canvas.toDataURL('image/jpeg', 1.0);
      console.log('alto');
      console.log(canvas.height);
      const mmAlto = canvas.height / 3.78;
      const altoDoc = mmAlto + 80;
      const doc = new jsPDF('p', 'mm', [altoDoc, 210]);
      doc.setFillColor(220, 220, 220);
      doc.roundedRect(5, 5, 200, 70, 2, 2, 'F');
      doc.setFillColor(248, 248, 255);
      doc.roundedRect(10, 30, 190, 40, 2, 2, 'F');

      doc.addFileToVFS('Nunito-normal.ttf', fontRegular);
      doc.addFont('Nunito-normal.ttf', 'Nunito', 'normal');
      doc.addFileToVFS('Nunito-bold.ttf', fontBold);
      doc.addFont('Nunito-bold.ttf', 'Nunito', 'bold');

      doc.setFontSize(10);
      doc.setFont('Nunito', 'bold');
      doc.text(15, 15, 'Pedido de Mauricio Sepulveda');
      doc.setFont('Nunito', 'normal');
      doc.setFont(undefined, 'normal');
      doc.text(15, 20, 'Telefono +56951784619');
      doc.text(15, 25, 'Email de contacto mauricio@gmail.com');

      doc.setFont('Nunito', 'bold');
      doc.text(15, 35, 'ORDEN #566');
      doc.setFont('Nunito', 'normal');
      doc.text(15, 40, 'FECHA ');
      doc.text(15, 45, 'HORA');
      doc.text(15, 50, 'RETIRO EN LOCAL');
      doc.text(15, 55, 'EN 60 A 90 MINUTOS APROX');
      doc.text(15, 60, 'DIRECICON DE LA TIENDA');
      doc.text(15, 65, 'METODO DE PAGO ES ');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      const widthRatio = pageWidth / canvas.width;
      const heightRatio = pageHeight / canvas.height;
      const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

      const canvasWidth = canvas.width * ratio;
      const canvasHeight = canvas.height * ratio;

      doc.addImage(image, 'JPEG', 15, 80, canvasWidth - 30, canvasHeight - 30);
      doc.output('dataurlnewwindow');
    });
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
            <Button outline color="secondary" className="mb-2">
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

export default Print;
