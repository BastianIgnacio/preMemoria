import React from 'react';
import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import Breadcrumb from '../../containers/navs/Breadcrumb';

const ConfiguracionTienda = ({ match }) => {
  const onSubmit = (values) => {
    console.log(values);
  };
  const validateName = (value) => {
    let error;
    if (!value) {
      error = 'Please enter your name';
    } else if (value.length < 2) {
      error = 'Value must be longer than 2 characters';
    }
    return error;
  };
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Configuracion de tu tienda" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Card>
        <CardBody>
          <Formik
            initialValues={{
              nombreTienda: 'Tiendita 1',
              direccionTienda: '3',
              region: '3',
              comuna: 'Talca',
              linkPersonalizado: 'link',
            }}
            onSubmit={onSubmit}
          >
            {({ errors, touched }) => (
              <Form className="av-tooltip tooltip-label-right">
                <FormGroup>
                  <Label>Nombre de la tienda</Label>
                  <Field
                    className="form-control"
                    name="nombreTienda"
                    validate={validateName}
                  />
                  {errors.name && touched.name && (
                    <div className="invalid-feedback d-block">
                      {errors.name}
                    </div>
                  )}
                </FormGroup>
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export default ConfiguracionTienda;
