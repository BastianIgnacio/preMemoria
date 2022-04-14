/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  InputGroup,
  Input,
} from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FormikSwitch } from '../../containers/form-validations/FormikFields';
import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import BreadcrumbNoItems from '../../containers/navs/BreadcrumbNoItems';
import PreviewImage from '../../containers/pages/previewImage';
import { regionesChile } from '../../constants/defaultValues';

const ConfiguracionTienda = () => {
  // eslint-disable-next-line no-unused-vars
  const [regiones, setRegiones] = useState(
    JSON.parse(JSON.stringify(regionesChile))
  );

  const [region, setRegion] = useState(regiones[0].region);
  const [comunas, setComunas] = useState(
    JSON.parse(JSON.stringify(regiones[0].comunas))
  );

  const getComunas = (regionBuscar) => {
    const comunasReturn = regiones.find(
      (regionIterator) => regionIterator.region === regionBuscar
    );
    return JSON.parse(JSON.stringify(comunasReturn.comunas));
  };

  const [switchDeliery, setSwitchDelvivery] = useState(false);
  const [direccionTienda, setDireccionTienda] = useState(
    'DIRECCION DE LA TIENDA'
  );
  const [nombreTienda, setNombreTienda] = useState('NOMBRE DE LA TIENDA');
  const [linkPersonalizado, setLinkPersonalizado] = useState(
    'Linkpersonalizadodelatienda'
  );

  const onSubmit = (values, { setSubmitting }) => {
    const payload = {
      ...values,
    };
    setTimeout(() => {
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);
      // Aca deberiamos llamar a la API PARA ENVIAR EL PEDIDO
    }, 500);
  };

  // Validacion para el form que envia la orden
  const SignupSchema = Yup.object().shape({
    nombreTienda: Yup.string().required('El nombre del producto es requerido!'),
    direccionTienda: Yup.string().required(
      'El nombre del producto es requerido!'
    ),
    selectRegion: Yup.string().required('El nombre del producto es requerido!'),
    selectComuna: Yup.string().required('El nombre del producto es requerido!'),
    linkPersonalizado: Yup.string().required(
      'El nombre del producto es requerido!'
    ),
  });

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <BreadcrumbNoItems heading="Configuracion de tu tienda" />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Card>
        <CardBody>
          <Formik
            initialValues={{
              nombreTienda,
              direccionTienda,
              selectRegion: region,
              selectComuna: comunas[0],
              linkPersonalizado,
              switch: switchDeliery,
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
                    <FormGroup>
                      <Label>Nombre de la tienda</Label>
                      <Field className="form-control" name="nombreTienda" />
                      {errors.name && touched.name && (
                        <div className="invalid-feedback d-block">
                          {errors.name}
                        </div>
                      )}
                    </FormGroup>
                    <FormGroup className="error-l-150">
                      <Label>Region</Label>
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
                    <FormGroup>
                      <Label> Comuna </Label>
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
                    <FormGroup>
                      <Label>Direccion de la tienda</Label>
                      <Field className="form-control" name="direccionTienda" />
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
                      />
                      {errors.name && touched.name && (
                        <div className="invalid-feedback d-block">
                          {errors.name}
                        </div>
                      )}
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="6">
                    <FormGroup className="error-l-175">
                      <Label className="d-block">
                        FOTO DE LA CATEGORIA (Opcional)
                      </Label>
                      <InputGroup className="mb-3">
                        <Input
                          type="file"
                          name="foto"
                          onChange={(event) => {
                            setFieldValue('foto', event.target.files[0]);
                          }}
                        />
                      </InputGroup>
                    </FormGroup>
                    {values.foto && <PreviewImage file={values.foto} />}
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="6">
                    <FormGroup className="error-l-100">
                      <Label>Recibir ordenes con servicio de DELIVERY</Label>
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
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="12">
                    <Button color="primary" type="submit" block>
                      Guardar Cambios
                    </Button>
                  </Colxx>
                </Row>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export default ConfiguracionTienda;
