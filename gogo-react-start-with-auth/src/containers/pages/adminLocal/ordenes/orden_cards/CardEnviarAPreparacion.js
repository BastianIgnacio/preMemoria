import React, { useEffect, useState } from 'react';
import { Card, CardBody, Button } from 'reactstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useDispatch } from 'react-redux';
import { ORDEN_ENVIAR_A_PREPARACION } from '../../../../../redux/actions';

const CardEnviarAPreparacion = ({ modal, orden }) => {
  const dispatch = useDispatch();
  const [percent, setPercent] = useState(0);
  const [progressText, setProgressText] = useState('0%');
  const [actualizando, setActualizando] = useState(true);

  const [mostrarCancelar, setMostrarCancelar] = useState(true);

  const [modalDetail, setModalDetail] = useState(
    'La orden esta por ser enviada a preparación'
  );
  const [modalTittle, setModalTittle] = useState('A PREPARACIÓN!');
  const [modalIcon, setModalIcon] = useState('iconsminds-clock-forward');

  const ordenEnviada = () => {
    setActualizando(false);
    setModalDetail('La orden ya se encuentra en preparación!');
    setModalTittle('ORDEN ENVIADA');
    setModalIcon('iconsminds-fax');
    setPercent(100);
    setProgressText('100%');
    setMostrarCancelar(false);
    setTimeout(() => {
      modal(false);
    }, 1500);
  };

  const enviar = () => {
    dispatch({
      type: ORDEN_ENVIAR_A_PREPARACION,
      payload: {
        orden,
        ordenEnviada,
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
    }, 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percent, actualizando]);

  const cancelar = () => {
    setActualizando(false);
    setModalDetail('La orden no ha sido enviada a preparación');
    setModalTittle('POR POCO LA ENVIAMOS!');
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
export default React.memo(CardEnviarAPreparacion);
