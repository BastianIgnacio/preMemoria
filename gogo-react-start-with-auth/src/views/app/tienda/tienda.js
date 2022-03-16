import React, { useEffect } from 'react';
import { Row, Card } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { Colxx } from '../../../components/common/CustomBootstrap';

const Tienda = () => {
  const { id } = useParams();
  useEffect(() => {
    document.body.classList.add('background');
    document.body.classList.add('no-footer');

    return () => {
      document.body.classList.remove('background');
      document.body.classList.remove('no-footer');
    };
  }, []);

  return (
    <>
      <div className="fixed-background" />
      <main>
        <div className="container">
          <Row className="h-100">
            <Colxx xxs="12" md="10" className="mx-auto my-auto">
              <Card className="auth-card">
                <div className="position-relative image-side ">
                  <p className="text-white h2">
                    LA TIENDA QUE ESTAMOS VISITANDO ES LA {id}
                  </p>
                </div>
              </Card>
            </Colxx>
          </Row>
        </div>
      </main>
    </>
  );
};

export default Tienda;
