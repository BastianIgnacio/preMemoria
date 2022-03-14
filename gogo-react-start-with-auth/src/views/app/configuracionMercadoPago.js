/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
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
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required!'),
  select: Yup.string().required('A select option is required!'),
  reactSelect: Yup.array()
    .min(3, 'Pick at least 3 tags')
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      })
    ),
  checkboxSingle: Yup.bool().oneOf([true], 'Must agree to something'),
  checkboxCustomSingle: Yup.bool().oneOf([true], 'Must agree to something'),
  checkboxGroup: Yup.array()
    .min(2, 'Pick at least 2 tags')
    .required('At least one checkbox is required'),

  customCheckGroup: Yup.array()
    .min(2, 'Pick at least 2 tags')
    .required('At least one checkbox is required'),

  radioGroup: Yup.string().required('A radio option is required'),
  customRadioGroup: Yup.string().required('A radio option is required'),
  tags: Yup.array()
    .min(3, 'Pick at least 3 tags')
    .required('At least one checkbox is required'),
  switch: Yup.bool().oneOf([true], 'Must agree to something'),
  date: Yup.date().nullable().required('Date required'),
});

const options = [
  { value: 'food', label: 'Food' },
  { value: 'beingfabulous', label: 'Being Fabulous', disabled: true },
  { value: 'reasonml', label: 'ReasonML' },
  { value: 'unicorns', label: 'Unicorns' },
  { value: 'kittens', label: 'Kittens' },
];

const ConfiguracionMercadoPago = () => {
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Please enter your first name'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Please enter your last name'),
    email: Yup.string()
      .email('Invalid email')
      .required('Please enter your email address'),
    details: Yup.string().required('Please provide the details'),
  });

  const onSubmit = (values) => {
    console.log('asdasd');
    console.log(values.switch);
    console.log(values.publicApiKey);
    console.log(values.privateApiKey);
  };

  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <h6 className="mb-4">Configuración Cuenta de MercadoPago</h6>
            <Formik
              initialValues={{
                email: 'test@test.com',
                select: '3',
                reactSelect: [{ value: 'reasonml', label: 'ReasonML' }],
                checkboxGroup: ['kittens'],
                customCheckGroup: ['unicorns'],
                checkboxSingle: true,
                checkboxCustomSingle: false,
                radioGroup: '',
                customRadioGroup: '',
                tags: ['cake', 'dessert'],
                switch: false,
                date: null,
              }}
              onSubmit={onSubmit}
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
                    <Label>API Clave Publica</Label>
                    <Field className="form-control" name="publicApiKey" />
                    {errors.firstName && touched.firstName ? (
                      <div className="invalid-feedback d-block">
                        {errors.firstName}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup className="error-l-75">
                    <Label>API Clave Privada</Label>
                    <Field className="form-control" name="privateApiKey" />
                    {errors.firstName && touched.firstName ? (
                      <div className="invalid-feedback d-block">
                        {errors.firstName}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup className="error-l-100">
                    <Label>
                      <IntlMessages id="MercadoPago" />
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
