/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { Component, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';
import {
  FormikReactSelect,
  FormikCheckboxGroup,
  FormikCheckbox,
  FormikRadioButtonGroup,
  FormikCustomCheckbox,
  FormikCustomCheckboxGroup,
  FormikCustomRadioGroup,
  FormikTagsInput,
  FormikSwitch,
  FormikDatePicker,
} from '../../containers/form-validations/FormikFields';
import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import BreadcrumbNoItems from '../../containers/navs/BreadcrumbNoItems';

const ConfiguracionMercadoPago = () => {
  const [publicApiKey, setPublicApiKey] = useState('DSTRUHFDFBNHTYUIOLKJ');
  const [privateApiKey, setPrivateApiKey] = useState('AJSKDLRUTIEOPSLAKSJD');

  const onSubmit = (values, { setSubmitting }) => {
    const payload = {
      ...values,
    };
    setTimeout(() => {
      // Cuando no se ha seleccionado metodo de entrega
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);
      // Aca deberiamos llamar a la API PARA ENVIAR EL PEDIDO
    }, 500);
  };

  const SignupSchema = Yup.object().shape({
    publicApiKey: Yup.string()
      .min(20, 'Error api key! Se requieren 20 digitos')
      .max(20, 'Error Api Key! Se requieren 20 digitos')
      .required('Por favor ingresar la Public Key de MercadoPago'),
    privateApiKey: Yup.string()
      .min(20, 'Error api key!')
      .max(20, 'Error Api Key!')
      .required('Por favor ingresar la PrivateKey de MercadoPago'),
  });

  return (
    <Row>
      <Colxx xxs="12">
        <BreadcrumbNoItems heading="Configuración Cuenta de MercadoPago" />
        <Separator className="mb-5" />
      </Colxx>
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <Formik
              initialValues={{
                publicApiKey,
                privateApiKey,
                switch: false,
              }}
              onSubmit={onSubmit}
              validationSchema={SignupSchema}
            >
              {({
                handleSubmit,
                setFieldValue,
                setFieldTouched,
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
                isSubmitting,
              }) => (
                <Form className="av-tooltip tooltip-label-right">
                  <FormGroup className="error-l-75">
                    <Label>API Clave Publica (20 digitos)</Label>
                    <Field className="form-control" name="publicApiKey" />
                    {errors.publicApiKey && touched.publicApiKey ? (
                      <div className="invalid-feedback d-block">
                        {errors.publicApiKey}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup className="error-l-75">
                    <Label>API Clave Privada (20 digitos)</Label>
                    <Field className="form-control" name="privateApiKey" />
                    {errors.privateApiKey && touched.privateApiKey ? (
                      <div className="invalid-feedback d-block">
                        {errors.privateApiKey}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup className="error-l-100">
                    <Label>MercadoPago</Label>
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
                    Guardar cambios
                  </Button>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};
export default ConfiguracionMercadoPago;
