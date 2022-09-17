import React, { useEffect, useState } from 'react';
import { Card, CardBody, Button } from 'reactstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useDispatch } from 'react-redux';
import { ORDEN_CANCELAR_ORDEN } from '../../../../../redux/actions';

const CardCancelar = ({ modal, orden, mercadopago }) => {
  const dispatch = useDispatch();
  const [percent, setPercent] = useState(0);
  const [progressText, setProgressText] = useState('0%');
  const [actualizando, setActualizando] = useState(true);

  const [mostrarCancelar, setMostrarCancelar] = useState(true);

  const [modalDetail, setModalDetail] = useState(
    'La orden está por ser cancelada'
  );
  const [modalTittle, setModalTittle] = useState('CANCELANDO ORDEN!');
  const [modalIcon, setModalIcon] = useState('iconsminds-clock-forward');

  const ordenCanceladaSuccess = () => {
    setActualizando(false);
    setModalDetail('Cancelacion finalizada con exito!');
    setModalTittle('ORDEN CANCELADA!');
    setModalIcon('simple-icon-trash');
    setPercent(100);
    setProgressText('100%');
    setMostrarCancelar(false);
    setTimeout(() => {
      modal(false);
    }, 1500);
  };

  const enviar = () => {
    dispatch({
      type: ORDEN_CANCELAR_ORDEN,
      payload: {
        orden,
        ordenCanceladaSuccess,
      },
    });
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
    }, 75);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percent, actualizando]);

  const cancelar = () => {
    setActualizando(false);
    setModalDetail('La orden sigue vigente!');
    setModalTittle('Cancelación abortada!');
    setModalIcon('iconsminds-close');
    setPercent(0);
    setProgressText('0%');
    setMostrarCancelar(false);
    setTimeout(() => {
      modal(false);
    }, 2000);
  };

  return mercadopago ? (
    <Card className="progress-banner-mercadopago">
      <CardBody className="d-flex flex-row  ">
        <div className="mb-2 ">
          <div className="d-flex justify-content-around">
            <i
              className={`${modalIcon} m-2 text-white align-text-bottom d-inline-block w-30`}
            />
            <div className="m-2 w-70">
              <div>
                <p className="lead text-white text-end">{modalTittle}</p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around mb-3">
            <div className="m-2 progress-bar-circle progress-bar-banner position-relative w-30 ">
              <CircularProgressbar
                strokeWidth={4}
                value={percent}
                text={progressText}
              />
            </div>
            {mostrarCancelar ? (
              <p className="lead text-white w-70 ">
                Al cancenlar debes revertir la transacción de forma manual.
              </p>
            ) : (
              <p className="lead text-white w-70 " />
            )}
          </div>
          {mostrarCancelar ? (
            <Button color="light" block onClick={() => cancelar()}>
              Abortar cancelacion!
            </Button>
          ) : (
            <Button disabled color="light" block onClick={() => cancelar()}>
              Abortar cancelacion!
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  ) : (
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
                Abortar cancelacion!
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
export default React.memo(CardCancelar);
