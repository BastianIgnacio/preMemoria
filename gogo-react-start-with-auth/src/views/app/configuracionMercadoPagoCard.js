/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormikSwitch,
} from '../../containers/form-validations/FormikFields';
import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import BreadcrumbNoItems from '../../containers/navs/BreadcrumbNoItems';
import { TIENDA_UPDATE } from '../../redux/actions';

const ConfiguracionMercadoPagoCard = () => {
  const dispatch = useDispatch();
  const tienda = useSelector((state) => state.authUser.tienda);
  const refTienda = tienda.id;
  const {
    publicKeyMercadopago,
    accessTokenMercadopago,
    tieneMercadopago,
  } = tienda;

  const onSubmit = (values, { setSubmitting }) => {
    const payload = {
      ...values,
    };
    setTimeout(() => {
      setSubmitting(false);
      const putTienda = {
        ...tienda,
        publicKeyMercadopago: payload.publicKeyMercadopago,
        accessTokenMercadopago: payload.accessTokenMercadopago,
        tieneMercadopago: payload.switchTieneMercadopago,
      }
      if (!putTienda.tieneMercadopago) {
        putTienda.pagoRetiroLocalMercadopago = false;
        putTienda.pagoDeliveryMercadopago = false;
      }
      delete putTienda.imagen
      dispatch({
        type: TIENDA_UPDATE,
        payload: {
          localComercial: putTienda,
          refLocalComercial: refTienda,
        },
      });
      // Aca deberiamos llamar a la API PARA ENVIAR EL PEDIDO
    }, 500);
  };

  const SignupSchema = Yup.object().shape({
    publicKeyMercadopago: Yup.string()
      .required('Por favor ingresar la Public Key de MercadoPago').matches(/^(\S+$)/g, 'Este campo no puede tener espacios en blanco.'),
    accessTokenMercadopago: Yup.string()
      .required('Por favor ingresar el Access Token de MercadoPago').matches(/^(\S+$)/g, 'Este campo no puede tener espacios en blanco.'),
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
              enableReinitialize
              initialValues={{
                publicKeyMercadopago,
                accessTokenMercadopago,
                switchTieneMercadopago: tieneMercadopago,
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
                  <Row>
                    <Colxx xxs="12" xs="12" lg="12" className="m-1">
                      <FormGroup className="form-group has-top-label">
                        <Label>PUBLICK KEY DE MERCADOPAGO </Label>
                        <Field
                          className="form-control"
                          name="publicKeyMercadopago"
                        />
                        {errors.publicKeyMercadopago &&
                          touched.publicKeyMercadopago ? (
                          <div className="invalid-feedback d-block">
                            {errors.publicKeyMercadopago}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Colxx>
                    <Colxx xxs="12" xs="12" lg="12" className="m-1">
                      <FormGroup className="form-group has-top-label">
                        <Label>ACCESS TOKEN DE MERCADOPAGO </Label>
                        <Field
                          className="form-control"
                          name="accessTokenMercadopago"
                        />
                        {errors.accessTokenMercadopago &&
                          touched.accessTokenMercadopago ? (
                          <div className="invalid-feedback d-block">
                            {errors.accessTokenMercadopago}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Colxx>
                    <Colxx xxs="12" xs="12" lg="12s" className="m-1">
                      <FormGroup row className="m-1">
                        <Label for="emailHorizontal" sm={11}>
                          Recibir pagos con platadorma MERCADOPAGO
                        </Label>
                        <Colxx sm={1}>
                          <FormikSwitch
                            name="switchTieneMercadopago"
                            className="custom-switch custom-switch-primary"
                            value={values.switchTieneMercadopago}
                            onChange={setFieldValue}
                            onBlur={setFieldTouched}
                          />
                        </Colxx>
                      </FormGroup>
                    </Colxx>
                    <Colxx xxs="12" xs="12" lg="12" className=" m-1">
                      <Button block color="primary" type="submit">
                        Guardar cambios
                      </Button>
                    </Colxx>
                  </Row>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};
export default ConfiguracionMercadoPagoCard;
