import React, { useEffect, useState } from 'react';
import { Card, CardBody, Button } from 'reactstrap';
import { CircularProgressbar } from 'react-circular-progressbar';

const GradientWithRadialProgressCard = ({ handleCancelar }) => {
  const [percent, setPercent] = useState(0);
  const [progressText, setProgressText] = useState('0%');
  const [actualizando, setActualizando] = useState(true);

  const [modalDetail, setModalDetail] = useState(
    'La orden esta por ser enviada a preparacion'
  );
  const [modalTittle, setModalTittle] = useState('ENVIANDO ORDEN!');
  const [modalIcon, setModalIcon] = useState('iconsminds-fax');

  useEffect(() => {
    setTimeout(() => {
      if (actualizando) {
        setPercent(percent + 1);
        setProgressText(`${percent}%`);
      }
    }, 40);
  }, [percent, actualizando]);

  const cancelar = () => {
    setActualizando(false);
    setModalDetail('La orden ha sido cancelada!');
    setModalTittle('ORDEN NO ENVIADA!');
    setModalIcon('iconsminds-close');
    setPercent(0);
    setProgressText('0%');
    setTimeout(() => {
      handleCancelar();
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
            <Button color="secondary" block onClick={() => cancelar()}>
              Cerrar
            </Button>
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
export default React.memo(GradientWithRadialProgressCard);
