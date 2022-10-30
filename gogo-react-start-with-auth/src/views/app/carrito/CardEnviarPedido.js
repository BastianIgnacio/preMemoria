import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardBody, Button } from 'reactstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import { CARRITO_PROCESAR } from '../../../redux/actions';

const CardEnviarPedido = ({
  modal,
  modalMercadoPago,
  modalFinalizarCompra,
  venta,
  productosVenta,
  orden,
  productosOrden,
  refLocalComercial,
  localComercialData,
  history,
  link,
}) => {
  const dispatch = useDispatch();
  const [percent, setPercent] = useState(0);
  const [progressText, setProgressText] = useState('0%');
  const [actualizando, setActualizando] = useState(true);
  const [mostrarCancelar, setMostrarCancelar] = useState(true);
  const [modalDetail, setModalDetail] = useState(
    'Tu pedido está por ser enviado'
  );
  const [modalTittle, setModalTittle] = useState('ENVIANDO!');
  const [modalIcon, setModalIcon] = useState('simple-icon-arrow-up-circle');

  const ordenSuccess = () => {
    setActualizando(false);
    setModalDetail('Tu pedido ya fue enviado!');
    setModalTittle('ENVIADO!');
    setModalIcon('simple-icon-check');
    setPercent(100);
    setProgressText('100%');
    setMostrarCancelar(false);
    setTimeout(() => {
      modal(false);
      history.push(`/success/${link}`);
    }, 1000);
  };

  const enviar = () => {
    if (venta.tipoPago === 'DEBITO_CREDITO_MERCADOPAGO') {
      // Aca debemos despachar la action para mercadopago
      dispatch({
        type: CARRITO_PROCESAR,
        payload: {
          venta,
          productosVenta,
          orden,
          productosOrden,
          refLocalComercial,
          localComercialData,
          history,
          link,
          ordenSuccess,
          mercadoPago: true,
          modalCard: modal,
          modalMercadoPago,
          modalFinalizarCompra,
        },
      });
    } else {
      dispatch({
        type: CARRITO_PROCESAR,
        payload: {
          venta,
          productosVenta,
          orden,
          productosOrden,
          refLocalComercial,
          localComercialData,
          history,
          link,
          ordenSuccess,
          mercadoPago: false,
        },
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (percent < 100 && actualizando) {
        setPercent(percent + 1);
        setProgressText(`${percent}%`);
        if (percent > 75) {
          setMostrarCancelar(false);
        }
      } else if (percent !== 100) {
        setPercent(0);
        setProgressText('0%');
      }
      if (percent === 100 && actualizando) {
        enviar();
      }
    }, 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percent, actualizando]);

  const cancelar = () => {
    setActualizando(false);
    setModalDetail('El pedido ha sido cancelado!');
    setModalTittle('POR POCO ENVIAMOS!');
    setModalIcon('iconsminds-close');
    setPercent(0);
    setProgressText('0%');
    setMostrarCancelar(false);
    setTimeout(() => {
      modal(false);
    }, 1500);
  };

  return (
    <Card className="progress-banner">
      <CardBody className="justify-content-between d-flex flex-row align-items-center">
        <div>
          <i
            className={`${modalIcon} mr-2 text-white align-text-bottom d-inline-block`}
          />
          <div>
            <p className="lead text-white">{modalTittle}</p>
            <p className="text-small text-white">{modalDetail}</p>
            {mostrarCancelar && (
              <Button color="light" block onClick={() => cancelar()}>
                No Enviar
              </Button>
            )}
          </div>
        </div>
        <div className="progress-bar-circle progress-bar-banner position-relative">
          <CircularProgressbar
            strokeWidth={4}
            value={percent}
            text={progressText}
          />
        </div>
      </CardBody>
    </Card>
  );
};
export default React.memo(CardEnviarPedido);
