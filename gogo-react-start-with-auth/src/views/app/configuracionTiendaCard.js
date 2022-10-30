/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  CardText,
} from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FormikSwitch } from '../../containers/form-validations/FormikFields';
import { Colxx } from '../../components/common/CustomBootstrap';
import { regionesChile } from '../../constants/defaultValues';
import { TIENDA_UPDATE } from '../../redux/actions';
import { NotificationManager } from '../../components/common/react-notifications';

const ConfiguracionTiendaCard = () => {
  const history = useHistory();
  const notificacionWarning = (titulo, subtitulo, historyRef) => {
    if (historyRef) {
      NotificationManager.warning(
        titulo,
        subtitulo,
        4000,
        () => {
          history.push(historyRef);
        },
        null,
        'filled'
      );
    } else {
      NotificationManager.warning(
        titulo,
        subtitulo,
        4000,
        null,
        null,
        'filled'
      );
    }
  };

  const dispatch = useDispatch();
  const tienda = useSelector((state) => state.authUser.tienda);
  const refTienda = tienda.id;
  const { accessTokenMercadopago, publicKeyMercadopago, estado } = tienda;

  const { tieneMercadopago } = tienda;
  // Metodos de Entrega
  const { tieneRetiroLocal, tieneDelivery } = tienda;

  // Metodos de pago disponibles Retiro Local
  const {
    pagoRetiroLocalEfectivo,
    pagoRetiroLocalPos,
    pagoRetiroLocalMercadopago,
  } = tienda;

  // Metodos de pago disponibles Delivery

  const {
    pagoDeliveryEfectivo,
    pagoDeliveryPos,
    pagoDeliveryMercadopago,
  } = tienda;

  // Ubicacion
  const { region, comuna, direccion } = tienda;

  // Configuracion de la tienda
  const { nombre, link, horarioAtencion, telefono } = tienda;

  // eslint-disable-next-line no-unused-vars
  const [regiones, setRegiones] = useState(
    JSON.parse(JSON.stringify(regionesChile))
  );
  const getComunas = (regionBuscar) => {
    const comunasReturn = regiones.find(
      (regionIterator) => regionIterator.region === regionBuscar
    );
    return JSON.parse(JSON.stringify(comunasReturn.comunas));
  };
  const [comunas, setComunas] = useState(
    JSON.parse(JSON.stringify(getComunas(region)))
  );

  const onSubmit = (values, { setSubmitting }) => {
    const payload = {
      ...values,
    };
    setTimeout(() => {
      setSubmitting(false);
      const putTienda = {
        nombre: payload.nombre,
        link: payload.link,
        horarioAtencion: payload.horarioAtencion,
        telefono: payload.telefono,
        region: payload.selectRegion,
        comuna: payload.selectComuna,
        direccion: payload.direccion,
        tieneDelivery: payload.switchTieneDelivery,
        tieneRetiroLocal: payload.switchTieneRetiroLocal,
        pagoDeliveryEfectivo: payload.switchPagoDeliveryEfectivo,
        pagoDeliveryPos: payload.switchPagoDeliveryPos,
        pagoDeliveryMercadopago: payload.switchPagoDeliveryMercadopago,
        pagoRetiroLocalEfectivo: payload.switchPagoRetiroLocalEfectivo,
        pagoRetiroLocalPos: payload.switchPagoRetiroLocalPos,
        pagoRetiroLocalMercadopago: payload.switchPagoRetiroLocalMercadopago,
        accessTokenMercadopago,
        publicKeyMercadopago,
        estado,
      };

      dispatch({
        type: TIENDA_UPDATE,
        payload: {
          localComercial: putTienda,
          refLocalComercial: refTienda,
        },
      });
    }, 500);
  };

  // Validacion para el form que envia la orden
  const SignupSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es un campo requerido!'),
    link: Yup.string().required('El link es un campo requerido'),
    horarioAtencion: Yup.string().required(
      'El horario de atencion es un campo requerido'
    ),
    telefono: Yup.string()
      .required('Debe ingresar el telefono!')
      .matches(
        '^[+569][1-9]{11}$',
        'Debe ingresar con el formato +569XXXXXXXX.'
      ),
    selectRegion: Yup.string().required('La region es un campo requerido!'),
    selectComuna: Yup.string().required('La comuna es un campo requerido!'),
    direccion: Yup.string().required('La direccion es un campo requerido!'),
  });

  return (
    <Card>
      <CardBody>
        <Formik
          enableReinitialize
          initialValues={{
            nombre,
            link,
            horarioAtencion,
            telefono,

            selectRegion: region,
            selectComuna: comuna,
            direccion,

            // Switch para delivery
            switchTieneDelivery: tieneDelivery,
            switchPagoDeliveryEfectivo: pagoDeliveryEfectivo,
            switchPagoDeliveryPos: pagoDeliveryPos,
            switchPagoDeliveryMercadopago: pagoDeliveryMercadopago,

            // Switch para retiro local
            switchTieneRetiroLocal: tieneRetiroLocal,
            switchPagoRetiroLocalEfectivo: pagoRetiroLocalEfectivo,
            switchPagoRetiroLocalPos: pagoRetiroLocalPos,
            switchPagoRetiroLocalMercadopago: pagoRetiroLocalMercadopago,
          }}
          validationSchema={SignupSchema}
          onSubmit={onSubmit}
        >
          {({
            errors,
            touched,
            values,
            setFieldValue,
            setFieldTouched,
            handleChange,
            handleBlur,
          }) => (
            <Form className="av-tooltip tooltip-label-right">
              <Row>
                <Colxx xxs="12" xs="12" lg="6">
                  <CardText className="text-muted text-left text-medium mb-2 font-weight-bold">
                    Configuracion de la tienda
                  </CardText>
                  <FormGroup className="form-group has-top-label ml-3">
                    <Label>NOMBRE DE LA TIENDA</Label>
                    <Field className="form-control" name="nombre" />
                    {errors.nombre && touched.nombre ? (
                      <div className="invalid-feedback d-block">
                        {errors.nombre}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup className="form-group has-top-label ml-3">
                    <Label>LINK</Label>
                    <Field className="form-control" name="link" disabled />
                    {errors.link && touched.link ? (
                      <div className="invalid-feedback d-block">
                        {errors.link}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup className="form-group has-top-label ml-3">
                    <Label>HORARIO ATENCION</Label>
                    <Field className="form-control" name="horarioAtencion" />
                    {errors.horarioAtencion && touched.horarioAtencion ? (
                      <div className="invalid-feedback d-block">
                        {errors.horarioAtencion}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup className="form-group has-top-label ml-3">
                    <Label>TELEFONO </Label>
                    <Field className="form-control" name="telefono" />
                    {errors.telefono && touched.telefono ? (
                      <div className="invalid-feedback d-block">
                        {errors.telefono}
                      </div>
                    ) : null}
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12" xs="12" lg="6">
                  <CardText className="text-muted text-left text-medium mb-2 font-weight-bold">
                    Ubicación
                  </CardText>
                  <FormGroup className="form-group has-top-label ml-3">
                    <Label>REGION</Label>
                    <select
                      name="selectRegion"
                      className="form-control"
                      value={values.selectRegion}
                      onChange={(event) => {
                        setFieldValue('selectRegion', event.target.value);
                        const comunasNuevaRegion = getComunas(
                          event.target.value
                        );
                        setComunas(comunasNuevaRegion);
                        setFieldValue('selectComuna', comunasNuevaRegion[0]);
                      }}
                      onBlur={handleBlur}
                    >
                      {regiones.map((item, i) => {
                        return (
                          <option value={item.region} key={item.region}>
                            {item.region}
                          </option>
                        );
                      })}
                    </select>
                  </FormGroup>
                  <FormGroup className="form-group has-top-label ml-3">
                    <Label>COMUNA</Label>
                    <select
                      name="selectComuna"
                      className="form-control"
                      value={values.selectComuna}
                      onChange={(event) => {
                        setFieldValue('selectComuna', event.target.value);
                      }}
                      onBlur={handleBlur}
                    >
                      {comunas.map((item, i) => {
                        return (
                          <option value={item} key={item}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </FormGroup>
                  <FormGroup className="form-group has-top-label ml-3">
                    <Label>DIRECCION </Label>
                    <Field className="form-control" name="direccion" />
                    {errors.direccion && touched.direccion ? (
                      <div className="invalid-feedback d-block">
                        {errors.direccion}
                      </div>
                    ) : null}
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12" xs="12" lg="6" className="mb-3">
                  <CardText className="text-muted text-left text-medium mb-2 font-weight-bold">
                    Configuracion para ordenes con servicio Delivery
                  </CardText>
                  <FormGroup row className="m-1">
                    <Label for="emailHorizontal" sm={9}>
                      Recibir ordenes con servicio delivery
                    </Label>
                    <Colxx sm={3}>
                      <FormikSwitch
                        name="switchTieneDelivery"
                        className="custom-switch custom-switch-primary"
                        value={values.switchTieneDelivery}
                        onChange={() => {
                          if (values.switchTieneDelivery) {
                            setFieldValue(
                              'switchTieneDelivery',
                              !values.switchTieneDelivery
                            );
                            setFieldValue('switchPagoDeliveryEfectivo', false);
                            setFieldValue('switchPagoDeliveryPos', false);
                            setFieldValue(
                              'switchPagoDeliveryMercadopago',
                              false
                            );
                          } else {
                            setFieldValue(
                              'switchTieneDelivery',
                              !values.switchTieneDelivery
                            );
                          }
                        }}
                        onBlur={setFieldTouched}
                      />
                    </Colxx>
                  </FormGroup>
                  <FormGroup row className="ml-2 mt-1 mb-1 mr-1">
                    <Label for="emailHorizontal" sm={10}>
                      Pago con efectivo
                    </Label>
                    <Colxx sm={2}>
                      <FormikSwitch
                        name="switchPagoDeliveryEfectivo"
                        className="custom-switch custom-switch-primary"
                        value={values.switchPagoDeliveryEfectivo}
                        onChange={() => {
                          if (values.switchTieneDelivery) {
                            setFieldValue(
                              'switchPagoDeliveryEfectivo',
                              !values.switchPagoDeliveryEfectivo
                            );
                          }
                        }}
                        onBlur={setFieldTouched}
                      />
                    </Colxx>
                  </FormGroup>
                  <FormGroup row className="ml-2 mt-1 mb-1 mr-1">
                    <Label for="emailHorizontal" sm={10}>
                      Pago con tarjetas de credito/debito POS
                    </Label>
                    <Colxx sm={2}>
                      <FormikSwitch
                        name="switchPagoDeliveryPos"
                        className="custom-switch custom-switch-primary"
                        value={values.switchPagoDeliveryPos}
                        onChange={() => {
                          if (values.switchTieneDelivery) {
                            setFieldValue(
                              'switchPagoDeliveryPos',
                              !values.switchPagoDeliveryPos
                            );
                          }
                        }}
                        onBlur={setFieldTouched}
                      />
                    </Colxx>
                  </FormGroup>
                  <FormGroup row className="ml-2 mt-1 mb-1 mr-1">
                    <Label for="emailHorizontal" sm={10}>
                      Pago con MercadoPago
                    </Label>
                    <Colxx sm={2}>
                      <FormikSwitch
                        name="switchPagoDeliveryMercadopago"
                        className="custom-switch custom-switch-primary"
                        value={values.switchPagoDeliveryMercadopago}
                        onChange={() => {
                          if (values.switchPagoDeliveryMercadopago) {
                            setFieldValue(
                              'switchPagoDeliveryMercadopago',
                              false
                            );
                          } else if (
                            values.switchTieneDelivery &&
                            tieneMercadopago
                          ) {
                            setFieldValue(
                              'switchPagoDeliveryMercadopago',
                              true
                            );
                          } else {
                            if (
                              !values.switchTieneDelivery &&
                              !tieneMercadopago
                            ) {
                              notificacionWarning(
                                'Primero: Debes habilitar la opción Recibir ordenes con servicio delivery',
                                'Error de activacion'
                              );
                              notificacionWarning(
                                'Segundo: Debes activar la opcion Recibir pagos con platadorma MERCADOPAGO ',
                                'Error de activacion',
                                '/app/configuracionMercadoPago'
                              );
                              return;
                            }
                            if (!values.switchTieneDelivery) {
                              notificacionWarning(
                                'Debes habilitar la opción Delivery',
                                'Error de activacion'
                              );
                            }
                            if (!tieneMercadopago) {
                              notificacionWarning(
                                'Segundo: Debes activar la opcion Recibir pagos con platadorma MERCADOPAGO ',
                                'Error de activacion',
                                '/app/configuracionMercadoPago'
                              );
                            }
                          }
                        }}
                        onBlur={setFieldTouched}
                      />
                    </Colxx>
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12" xs="12" lg="6" className="mb-3">
                  <CardText className="text-muted text-left text-medium mb-2 font-weight-bold">
                    Configuracion para ordenes con servicio Retiro en local
                  </CardText>
                  <FormGroup row className="m-1">
                    <Label for="emailHorizontal" sm={9}>
                      Recibir ordenes con retiro en local
                    </Label>
                    <Colxx sm={3}>
                      <FormikSwitch
                        name="switchTieneRetiroLocal"
                        className="custom-switch custom-switch-primary"
                        value={values.switchTieneRetiroLocal}
                        onChange={() => {
                          if (values.switchTieneRetiroLocal) {
                            setFieldValue(
                              'switchTieneRetiroLocal',
                              !values.switchTieneRetiroLocal
                            );
                            setFieldValue(
                              'switchPagoRetiroLocalEfectivo',
                              false
                            );
                            setFieldValue('switchPagoRetiroLocalPos', false);
                            setFieldValue(
                              'switchPagoRetiroLocalMercadopago',
                              false
                            );
                          } else {
                            setFieldValue(
                              'switchTieneRetiroLocal',
                              !values.switchTieneRetiroLocal
                            );
                          }
                        }}
                        onBlur={setFieldTouched}
                      />
                    </Colxx>
                  </FormGroup>
                  <FormGroup row className="ml-2 mt-1 mb-1 mr-1">
                    <Label for="emailHorizontal" sm={10}>
                      Pago con efectivo
                    </Label>
                    <Colxx sm={2}>
                      <FormikSwitch
                        name="switchPagoRetiroLocalEfectivo"
                        className="custom-switch custom-switch-primary"
                        value={values.switchPagoRetiroLocalEfectivo}
                        onChange={() => {
                          if (values.switchTieneRetiroLocal) {
                            setFieldValue(
                              'switchPagoRetiroLocalEfectivo',
                              !values.switchPagoRetiroLocalEfectivo
                            );
                          }
                        }}
                        onBlur={setFieldTouched}
                      />
                    </Colxx>
                  </FormGroup>
                  <FormGroup row className="ml-2 mt-1 mb-1 mr-1">
                    <Label for="emailHorizontal" sm={10}>
                      Pago con tarjetas de credito/debito POS
                    </Label>
                    <Colxx sm={2}>
                      <FormikSwitch
                        name="switchPagoRetiroLocalPos"
                        className="custom-switch custom-switch-primary"
                        value={values.switchPagoRetiroLocalPos}
                        onChange={() => {
                          if (values.switchTieneRetiroLocal) {
                            setFieldValue(
                              'switchPagoRetiroLocalPos',
                              !values.switchPagoRetiroLocalPos
                            );
                          }
                        }}
                        onBlur={setFieldTouched}
                      />
                    </Colxx>
                  </FormGroup>
                  <FormGroup row className="ml-2 mt-1 mb-1 mr-1">
                    <Label for="emailHorizontal" sm={10}>
                      Pago con MercadoPago
                    </Label>
                    <Colxx sm={2}>
                      <FormikSwitch
                        name="switchPagoRetiroLocalMercadopago"
                        className="custom-switch custom-switch-primary"
                        value={values.switchPagoRetiroLocalMercadopago}
                        onChange={() => {
                          if (values.switchPagoRetiroLocalMercadopago) {
                            setFieldValue(
                              'switchPagoRetiroLocalMercadopago',
                              false
                            );
                          } else if (
                            values.switchTieneRetiroLocal &&
                            tieneMercadopago
                          ) {
                            setFieldValue(
                              'switchPagoRetiroLocalMercadopago',
                              true
                            );
                          } else {
                            if (
                              !values.switchTieneRetiroLocal &&
                              !tieneMercadopago
                            ) {
                              notificacionWarning(
                                'Primero: Debes habilitar la opción Recibir ordenes con retiro en local',
                                'Error de activacion'
                              );
                              notificacionWarning(
                                'Segundo: Debes activar la opcion Recibir pagos con platadorma MERCADOPAGO ',
                                'Error de activacion',
                                '/app/configuracionMercadoPago'
                              );
                              return;
                            }
                            if (!values.switchTieneRetiroLocal) {
                              notificacionWarning(
                                'Debes habilitar la opción retiro en local',
                                'Error de activacion'
                              );
                            }
                            if (!tieneMercadopago) {
                              notificacionWarning(
                                'Debes activar la opcion Recibir pagos con platadorma MERCADOPAGO ',
                                'Error de activacion',
                                '/app/configuracionMercadoPago'
                              );
                            }
                          }
                        }}
                        onBlur={setFieldTouched}
                      />
                    </Colxx>
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12" xs="12" lg="12">
                  <Button color="primary" type="submit" block className="m-2">
                    Guardar Cambios
                  </Button>
                </Colxx>
              </Row>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

export default ConfiguracionTiendaCard;
