import React, { useEffect } from 'react';
import { Row, Card, CardTitle, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { Colxx } from '../components/common/CustomBootstrap';
import { getCurrentUser } from '../helpers/Utils';

const Error = () => {
  const history = useHistory();
  const redirigir = () => {
    const currentUser = getCurrentUser();
    if (currentUser.role === 1) {
      // Role de super admin
      return history.push('/app/localesComerciales');
    }
    if (currentUser.role === 2) {
      // Role de AdminLocalComercial
      return history.push('/app/categorias');
    }
    return null;
  };
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
                  <p className="text-white h2">HA OCURRIDO UN ERROR</p>
                </div>
                <div className="form-side">
                  <CardTitle className="mb-4">ERROR</CardTitle>
                  <p className="display-1 font-weight-bold mb-5">404</p>
                  <Button
                    onClick={redirigir}
                    className="btn btn-primary btn-shadow btn-lg"
                  >
                    Volver
                  </Button>
                </div>
              </Card>
            </Colxx>
          </Row>
        </div>
      </main>
    </>
  );
};

export default Error;
