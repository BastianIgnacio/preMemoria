import React from 'react';
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  InputGroup,
  CustomInput,
  InputGroupAddon,
} from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import { FormikSwitch } from '../../containers/form-validations/FormikFields';
import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import Breadcrumb from '../../containers/navs/Breadcrumb';
import ReactSelectRegiones from './reactSelectRegiones';
import IntlMessages from '../../helpers/IntlMessages';

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
              localidadComunaCiudad: 'Talca',
              linkPersonalizado: 'link',
              switch: false,
            }}
            onSubmit={onSubmit}
          >
            {({ errors, touched, values, setFieldValue, setFieldTouched }) => (
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
                <FormGroup>
                  <Label>Direccion de la tienda</Label>
                  <Field
                    className="form-control"
                    name="direccionTienda"
                    validate={validateName}
                  />
                  {errors.name && touched.name && (
                    <div className="invalid-feedback d-block">
                      {errors.name}
                    </div>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Region</Label>
                  <ReactSelectRegiones
                    className="form-control"
                    classNamePrefix="asd"
                    name="region"
                    validate={validateName}
                  />
                  {errors.name && touched.name && (
                    <div className="invalid-feedback d-block">
                      {errors.name}
                    </div>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Localidad / Comuna / Ciudad</Label>
                  <Field
                    className="form-control"
                    name="localidadComunaCiudad"
                    validate={validateName}
                  />
                  {errors.name && touched.name && (
                    <div className="invalid-feedback d-block">
                      {errors.name}
                    </div>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Link Personalizado</Label>
                  <Field
                    className="form-control"
                    name="linkPersonalizado"
                    validate={validateName}
                  />
                  {errors.name && touched.name && (
                    <div className="invalid-feedback d-block">
                      {errors.name}
                    </div>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Link Personalizado</Label>
                  <InputGroup className="mb-3">
                    <CustomInput
                      type="file"
                      id="exampleCustomFileBrowser2"
                      name="customFile"
                    />
                    <InputGroupAddon addonType="append">Upload</InputGroupAddon>
                  </InputGroup>
                </FormGroup>
                <FormGroup className="error-l-100">
                  <Label>
                    <IntlMessages id="Recibir ordenes con servicio de delivery" />
                  </Label>
                  <FormikSwitch
                    name="switch"
                    className="custom-switch custom-switch-primary"
                    value={values.switch}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                  {errors.switch && touched.switch ? (
                    <div className="invalid-feedback d-block">
                      {errors.switch}
                    </div>
                  ) : null}
                </FormGroup>
                <Button color="primary" type="submit">
                  Guardar Cambios
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
