/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  CardBody,
  CardText,
  ButtonGroup,
  Label,
  FormGroup,
  Badge,
} from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../components/common/CustomBootstrap';
import {
  LOCALCOMERCIAL_UPDATE,
  LOCALCOMERCIALS_CHANGEPAGE,
  LOCALCOMERCIALS_CHANGEPAGESIZE,
  LOCALCOMERCIALS_GETADMINSDISPONIBLES,
  LOCALCOMERCIAL_ASIGNAR_ADMIN,
  LOCALCOMERCIAL_DELETE
} from '../../../redux/actions';

const ThumbListViewLocalesComerciales = ({ localComercial, collect }) => {
  const dispatch = useDispatch();

  // Modals 
  const [modalEditar, setModalEditar] = useState(false);
  const [modalMercadopago, setModalMercadopago] = useState(false);
  const [modalAsignarAdministrador, setModalAsignarAdministrador] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);


  // Variables para mostar el administrador de cada local comercial
  const [nombreAsinar, setNombreAsignar] = useState('');
  const [apellidosAsignar, setApellidosAsingar] = useState('');
  const [runAsignar, setRunAsignar] = useState('');
  const [telefonoAsignar, setTelefonoAsignar] = useState('');


  // Hace referencia al administrador que se va asignar al LocalComerciar
  const [refAdministrador, setRefAdministrador] = useState('');





  const [mostrarMercadopago, setMostrarMercadopago] = useState(localComercial.tieneMercadopago);
  const largoKeyMercadopago = 20;
  const results = JSON.parse(JSON.stringify(localComercial))

  const localState = useSelector(
    (state) => state
  );
  const estados = [
    { label: 'Abierto', value: 'Abierto', key: 0 },
    { label: 'Cerrado', value: 'Cerrado', key: 1 },
  ];

  const estadosMercadopago = [
    { label: 'SI', value: true, key: 0 },
    { label: 'NO', value: false, key: 1 },
  ];

  const estadosDelivery = [
    { label: 'SI', value: true, key: 0 },
    { label: 'NO', value: false, key: 1 },
  ];

  const admins = useSelector((state) => state.localComercial.admins);

  // Funcion para eliminar un local comercial
  const onSubmitEliminar = (idEliminar, refAdministradorEliminar) => {
    dispatch({
      type: LOCALCOMERCIAL_DELETE,
      payload: {
        idEliminar,
        refAdministradorEliminar
      }
    });
  }

  // Funcion para Enviar el put del mercadopago
  const onSubmitMercadopago = (values, { setSubmitting }) => {
    const payload = {
      ...values,
    };

    let publicKeyToUpdate = '';
    let privateKeyToUpdate = '';
    let tieneMercadopagoToUpdate = false;

    if (payload.selectMercadopago === 'true') {
      console.log("Validar el lent de la publick key");
      publicKeyToUpdate = payload.publicKeyMercadopago;
      privateKeyToUpdate = payload.privateKeyMercadopago;
      tieneMercadopagoToUpdate = true;
    }
    else {
      console.log("No validar y enviar un NO");
      publicKeyToUpdate = 'NO';
      privateKeyToUpdate = 'NO';
      tieneMercadopagoToUpdate = false;
    }

    setTimeout(() => {
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);
      // Aca deberiamos llamar a la API PARA ENVIAR EL PEDIDO

      const localComercialToUpdate = {
        nombre: localComercial.nombre,
        direccion: localComercial.direccion,
        link: localComercial.link,
        horarioAtencion: localComercial.horarioAtencion,
        tieneDelivery: localComercial.tieneDelivery,
        estado: localComercial.estado,
        privateKeyMercadopago: privateKeyToUpdate,
        publicKeyMercadopago: publicKeyToUpdate,
        tieneMercadopago: tieneMercadopagoToUpdate
      }
      const idLocalComercialToUpdate = localComercial.id;

      dispatch({
        type: LOCALCOMERCIAL_UPDATE,
        payload: {
          localComercialToUpdate,
          idLocalComercialToUpdate
        }
      });
      setModalMercadopago(!modalMercadopago);

      dispatch({
        type: LOCALCOMERCIALS_CHANGEPAGE,
        payload: 1,
      });
      dispatch({
        type: LOCALCOMERCIALS_CHANGEPAGESIZE,
        payload: 8,
      });
      dispatch({
        type: LOCALCOMERCIALS_CHANGEPAGESIZE,
        payload: 4,
      });
    }, 500);
  };

  // Funcion para Enviar El put del localComercial
  const onSubmit = (values, { setSubmitting }) => {
    const payload = {
      ...values,
    };
    setTimeout(() => {
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);
      const updateTieneDelivery = (payload.selectDelivery === 'true');

      // ACA ARMADOR Y DISPACHAMOS EL DISPAtch
      const localComercialToUpdate = {
        nombre: payload.nombre,
        direccion: payload.direccion,
        link: payload.link,
        horarioAtencion: payload.horarioAtencion,
        tieneDelivery: updateTieneDelivery,
        estado: payload.selectEstado,
        privateKeyMercadopago: localComercial.privateKeyMercadopago,
        publicKeyMercadopago: localComercial.publicKeyMercadopago,
        tieneMercadopago: localComercial.tieneMercadopago
      }
      const idLocalComercialToUpdate = localComercial.id;

      dispatch({
        type: LOCALCOMERCIAL_UPDATE,
        payload: {
          localComercialToUpdate,
          idLocalComercialToUpdate
        }
      });
      setModalEditar(!modalEditar);

      dispatch({
        type: LOCALCOMERCIALS_CHANGEPAGE,
        payload: 1,
      });
      dispatch({
        type: LOCALCOMERCIALS_CHANGEPAGESIZE,
        payload: 8,
      });
      dispatch({
        type: LOCALCOMERCIALS_CHANGEPAGESIZE,
        payload: 4,
      });

    }, 500);
  };


  // Funcion para Enviar El put del localComercial
  const onSubmitAsignarAdministrador = (values, { setSubmitting }) => {
    const payload = {
      ...values,
    };
    setTimeout(() => {
      console.log(JSON.stringify(payload, null, 2));
      const idAdministrador = parseInt(refAdministrador, 10);
      setSubmitting(false);

      // ACA ARMADOR Y DISPACHAMOS EL DISPAtch
      const localComercialToUpdate = {
        nombre: localComercial.nombre,
        direccion: localComercial.direccion,
        link: localComercial.link,
        horarioAtencion: localComercial.horarioAtencion,
        tieneDelivery: localComercial.tieneDelivery,
        estado: localComercial.estado,
        privateKeyMercadopago: localComercial.privateKeyMercadopago,
        publicKeyMercadopago: localComercial.publicKeyMercadopago,
        tieneMercadopago: localComercial.tieneMercadopago,
        refAdministrador: idAdministrador
      }
      const idLocalComercialToUpdate = localComercial.id;
      const idAntiguoAdministrador = localComercial.refAdministrador;

      console.log('Antiguo Administrador');
      console.log(idAntiguoAdministrador);

      console.log('Nuevo Administrador');
      console.log(refAdministrador);

      dispatch({
        type: LOCALCOMERCIAL_ASIGNAR_ADMIN,
        payload: {
          localComercialToUpdate,
          idLocalComercialToUpdate,
          idAdministrador,
          idAntiguoAdministrador
        }
      });

      setModalAsignarAdministrador(!modalAsignarAdministrador);

    }, 500);
  };



  // Validacion para el form que edita los datos de un local comercial
  const SignupSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es requerido!'),
    direccion: Yup.string().required('La direccíon es requerida!'),
    link: Yup.string().required('El link es requerido!'),
    horarioAtencion: Yup.string().required(
      'El horario de atencíon es requerido!'
    ),
    selectDelivery: Yup.string().required('Ingresar una opción'),
    selectEstado: Yup.string().required('Ingresar una opción'),
  });

  const mostrarValores = (idAdmin) => {
    const intAdm = parseInt(idAdmin, 10);
    const adminLocal = admins.find(adm => adm.id === intAdm);
    setNombreAsignar(adminLocal.first_name);
    setApellidosAsingar(adminLocal.last_name);
    setRunAsignar(adminLocal.run);
    setTelefonoAsignar(adminLocal.telefono);

  };

  return (
    <Colxx xxs="12" key={localComercial.id} className="mb-3">
      <ContextMenuTrigger
        id="menu_id"
        data={localComercial.id}
        collect={collect}
      >
        <Card>
          {localComercial.refAdministrador === -1 &&
            <div className="mb-2 position-relative">
              <Badge
                color="warning"
                pill
                className="position-absolute badge-top-right"
              >
                SIN ADMINISTRADOR
              </Badge>
            </div>
          }
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <div className="align-self-center d-flex flex-column flex-lg-row justify-content-around min-width-zero align-items-lg-center">
                <p className="m-2">
                  {`${localComercial.nombre}`}
                </p>
                <NavLink
                  to={`?p=${localComercial.link}`}
                >
                  <p className="m-2 text-muted text-small">
                    {localComercial.link}
                  </p>
                </NavLink>
              </div>
              <div className="justify-content-start">
                <div className="mt-2 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                  <Button
                    onClick={() => setModalEliminar(!modalEliminar)}
                    color="danger"
                    className="m-1"
                  >
                    Eliminar
                  </Button>{' '}
                  <Button
                    onClick={() => setModalEditar(!modalEditar)}
                    color="primary"
                    className="m-1"
                  >
                    Editar
                  </Button>{' '}
                  <Button
                    onClick={() => {
                      dispatch({ type: LOCALCOMERCIALS_GETADMINSDISPONIBLES });
                      setModalAsignarAdministrador(!modalAsignarAdministrador);
                    }}
                    color="primary"
                    className="m-1"
                  >
                    Asignar Administrador
                  </Button>{' '}
                  <Button
                    onClick={() => setModalMercadopago(!modalMercadopago)}
                    color="secondary"
                    className="m-1"
                  >
                    MercadoPago
                  </Button>{' '}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
      <Modal isOpen={modalEditar} toggle={() => setModalEditar(!modalEditar)}>
        <ModalHeader>Local Comercial : {localComercial.nombre}</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              nombre: results.nombre,
              direccion: results.direccion,
              link: results.link,
              horarioAtencion: results.horarioAtencion,
              selectDelivery: results.tieneDelivery.toString(),
              selectEstado: results.estado,
            }}
            validationSchema={SignupSchema}
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
              <Form className="av-tooltip tooltip-label-bottom">
                <Row>
                  <Colxx xxs="12" xs="12" lg="12">
                    <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                      <Label>NOMBRE</Label>
                      <Field className="form-control" name="nombre" />
                      {errors.nombre && touched.nombre ? (
                        <div className="invalid-feedback d-block ">
                          {errors.nombre}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="12">
                    <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                      <Label>DIRECCÍON</Label>
                      <Field className="form-control" name="direccion" />
                      {errors.direccion && touched.direccion ? (
                        <div className="invalid-feedback d-block ">
                          {errors.direccion}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="12">
                    <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                      <Label>LINK</Label>
                      <Field className="form-control" name="link" />
                      {errors.link && touched.link ? (
                        <div className="invalid-feedback d-block ">
                          {errors.link}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="12">
                    <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                      <Label>HORARIO</Label>
                      <Field className="form-control" name="horarioAtencion" />
                      {errors.horarioAtencion && touched.horarioAtencion ? (
                        <div className="invalid-feedback d-block ">
                          {errors.horarioAtencion}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="12">
                    <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                      <Label>ACEPTA DELIVERY</Label>
                      <select
                        name="selectDelivery"
                        className="form-control"
                        value={values.selectDelivery}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        {estadosDelivery.map((item, i) => {
                          return (
                            <option value={item.value} key={item.value}>
                              {item.label}
                            </option>
                          );
                        })}
                      </select>
                      {errors.selectDelivery && touched.selectDelivery ? (
                        <div className="invalid-feedback d-block">
                          {errors.selectDelivery}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="12">
                    <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                      <Label>ESTADO</Label>
                      <select
                        name="selectEstado"
                        className="form-control"
                        value={values.selectEstado}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        {estados.map((item, i) => {
                          return (
                            <option value={item.value} key={item.value}>
                              {item.label}
                            </option>
                          );
                        })}
                      </select>
                      {errors.selectEstado && touched.selectEstado ? (
                        <div className="invalid-feedback d-block">
                          {errors.selectEstado}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="12">
                    <Button block color="primary" type="submit">
                      Guardar
                    </Button>{' '}
                    <Button block color="secondary" onClick={() => setModalEditar(!modalEditar)}>
                      Cancelar
                    </Button>{' '}
                  </Colxx>
                </Row>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
      <Modal isOpen={modalMercadopago} toggle={() => setModalMercadopago(!modalMercadopago)}>
        <ModalHeader>Confifuración MERCADOPAGO : {localComercial.nombre}</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              selectMercadopago: results.tieneMercadopago.toString(),
              publicKeyMercadopago: results.publicKeyMercadopago,
              privateKeyMercadopago: results.privateKeyMercadopago,
            }}
            onSubmit={onSubmitMercadopago}
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
              <Form className="av-tooltip tooltip-label-bottom">
                <Row>
                  <Colxx xxs="12" xs="12" lg="12">
                    <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                      <Label>ACEPTA MERCADOPAGO</Label>
                      <select
                        name="selectMercadopago"
                        className="form-control"
                        value={values.selectMercadopago}
                        onChange={(event) => {
                          if (event.target.value === 'true') {
                            setFieldValue('selectMercadopago', 'true');
                            setMostrarMercadopago(true);
                          }
                          else {
                            setFieldValue('selectMercadopago', 'false');
                            setMostrarMercadopago(false);
                          }
                        }}
                        onBlur={handleBlur}
                      >
                        {estadosMercadopago.map((item, i) => {
                          return (
                            <option value={item.value} key={item.value}>
                              {item.label}
                            </option>
                          );
                        })}
                      </select>
                      {errors.selectMercadopago && touched.selectMercadopago ? (
                        <div className="invalid-feedback d-block">
                          {errors.selectMercadopago}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>
                  {mostrarMercadopago && (
                    <Colxx xxs="12" xs="12" lg="12">
                      <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                        <Label>PUBLIC KEY MERCADOPAGO</Label>
                        <Field
                          className="form-control"
                          name="publicKeyMercadopago"
                        />
                        {errors.publicKeyMercadopago &&
                          touched.publicKeyMercadopago ? (
                          <div className="invalid-feedback d-block ">
                            {errors.publicKeyMercadopago}
                          </div>
                        ) : null}
                      </FormGroup>
                      <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                        <Label>PRIVATE KEY MERCADOPAGO</Label>
                        <Field
                          className="form-control"
                          name="privateKeyMercadopago"
                        />
                        {errors.privateKeyMercadopago &&
                          touched.privateKeyMercadopago ? (
                          <div className="invalid-feedback d-block ">
                            {errors.privateKeyMercadopago}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Colxx>
                  )}
                  <Colxx xxs="12" xs="12" lg="12">
                    <Button block color="primary" type="submit">
                      Guardar
                    </Button>{' '}
                    <Button block color="secondary" onClick={() => setModalMercadopago(!modalMercadopago)}>
                      Cancelar
                    </Button>{' '}
                  </Colxx>
                </Row>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
      <Modal isOpen={modalAsignarAdministrador} toggle={() => setModalAsignarAdministrador(!modalAsignarAdministrador)}>
        <ModalHeader>Agisnar Administrador a : {localComercial.nombre}</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              idAdministrador: '',
            }}
            onSubmit={onSubmitAsignarAdministrador}
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
              <Form className="av-tooltip tooltip-label-bottom">
                <Row>
                  <Colxx xxs="12" xs="12" lg="12">
                    <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                      <Label>ADMINISTRADOR</Label>
                      <select
                        name="selectAdministrador"
                        className="form-control"
                        value={values.idAdministrador}
                        onChange={(event) => {
                          setFieldValue('idAdministrador', event.target.value);
                          console.log(event.target.value);
                          mostrarValores(event.target.value);
                          setRefAdministrador(event.target.value);
                        }}
                        onBlur={handleBlur}
                      >
                        {admins.map((item, i) => {
                          return (
                            <option value={item.id} key={item.id}>
                              {item.email}
                            </option>
                          );
                        })}
                      </select>
                      {errors.selectMercadopago && touched.selectMercadopago ? (
                        <div className="invalid-feedback d-block">
                          {errors.selectMercadopago}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="12">
                    <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                      <Label>NOMBRES</Label>
                      <Field disabled className="form-control" value={nombreAsinar} />
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="12">
                    <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                      <Label>APELLIDOS</Label>
                      <Field disabled className="form-control" value={apellidosAsignar} />
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="12">
                    <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                      <Label>RUN</Label>
                      <Field disabled className="form-control" value={runAsignar} />
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="12">
                    <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                      <Label>TELEFONO</Label>
                      <Field disabled className="form-control" value={telefonoAsignar} />
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="12">
                    <Button block color="primary" type="submit">
                      Asignar
                    </Button>{' '}
                    <Button block color="secondary" onClick={() => setModalAsignarAdministrador(!modalAsignarAdministrador)}>
                      Cancelar
                    </Button>{' '}
                  </Colxx>
                </Row>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
      <Modal
        isOpen={modalEliminar}
        toggle={() => setModalEliminar(!modalEliminar)}
      >
        <ModalHeader>
          Seguro que deseas eliminar ?
        </ModalHeader>
        <ModalBody>
          Se eliminarán todos los datos pertenecientes al Local Comercial, será imposible recurarlos en un futuro. Ademas,
          se eliminará el Usuario Administrador de dicho Local Comercial.
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              onSubmitEliminar(localComercial.id, localComercial.refAdministrador);
              setModalEliminar(!modalEliminar);
            }}
          >
            Eliminar
          </Button>{' '}
          <Button
            color="secondary"
            onClick={() => setModalEliminar(!modalEliminar)}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </Colxx >
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ThumbListViewLocalesComerciales);
