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
import { NotificationManager } from '../../../components/common/react-notifications';
import {
  LOCALCOMERCIAL_UPDATE,
  LOCALCOMERCIALS_UPDATE_ITEMS,
  LOCALCOMERCIAL_BEFORE_UPDATE,
  LOCALCOMERCIAL_RESET_ITEMS,
  LOCALCOMERCIAL_CARGAR_ADMINISTRADOR,
  LOCALCOMERCIAL_MODIFICAR_CREDENCIALES,
  LOCALCOMERCIAL_EDITAR,
  LOCALCOMERCIAL_ELIMINAR,
} from '../../../redux/actions';

const ThumbListViewLocalesComerciales = ({ localComercial, collect }) => {

  const dispatch = useDispatch();
  // Modals 
  const [modalEditar, setModalEditar] = useState(false);
  const [modalAdministrador, setModalAdministrador] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalCredenciales, setModalCredenciales] = useState(false);

  // console.log(admins);
  const nombresAsignar = useSelector((state) => state.localComercial.nombresAsignar);
  const apellidosAsignar = useSelector((state) => state.localComercial.apellidosAsignar);
  const telefonoAsignar = useSelector((state) => state.localComercial.telefonoAsignar);
  const refAdministradorAsignar = useSelector((state) => state.localComercial.refAdministradorAsignar);
  const primeraCarga = useSelector((state) => state.localComercial.primeraCargaAdmins);

  //
  const administrador = useSelector((state) => state.localComercial.administrador);



  // Variables traidas desde redux
  const paginaActual = useSelector((state) => state.localComercial.paginaActual);
  const itemsPorPagina = useSelector((state) => state.localComercial.itemsPorPagina);

  // Mercadopago
  const largoKeyMercadopago = 20;

  const estadosHabilitado = [
    { label: 'SI', value: true, key: 0 },
    { label: 'NO', value: false, key: 1 },
  ];


  // EDITAR un LOCAL COMERCIAL
  // Funcion para Enviar El put del localComercial
  const onSubmit = (values, { setSubmitting }) => {
    const payload = {
      ...values,
    };
    setTimeout(() => {
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);

      // ACA ARMADOR Y DISPACHAMOS EL DISPAtch
      const localComercialToUpdate = {
        nombre: payload.nombre,
        direccion: payload.direccion,
        link: payload.link,
        horarioAtencion: payload.horarioAtencion,
        habilitado: payload.habilitado,
        tieneDelivery: localComercial.tieneDelivery,
        estado: localComercial.estado,
      }

      dispatch({
        type: LOCALCOMERCIAL_EDITAR, payload: {
          localComercial: localComercialToUpdate,
          refLocalComercial: localComercial.id,
          modal: setModalEditar,
          paginaActual,
          itemsPorPagina,
        }
      });

    }, 500);
  };





  // Validacion para el form que edita los datos de un local comercial
  const SignupSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es requerido!'),
    direccion: Yup.string().required('La direccíon es requerida!'),
    link: Yup.string().required('El link es requerido!').matches(/^\S*$/, 'No son permitidos los espacios en blanco.'),
    horarioAtencion: Yup.string().required(
      'El horario de atencíon es requerido!'
    ),
  });


  // Validacion para el form que edita las credenciales de Mercadopago
  const SignupSchemaMercadopago = Yup.object().shape({
    publicKeyMercadopago: Yup.string().required('Requerido!')
      .min(largoKeyMercadopago, `El largo debe ser de ${largoKeyMercadopago} caracteres`)
      .max(largoKeyMercadopago, `El largo debe ser de ${largoKeyMercadopago} caracteres`)
      .matches(/^\S*$/, 'No son permitidos los espacios en blanco.'),
    privateKeyMercadopago: Yup.string().required('Requerido!')
      .min(largoKeyMercadopago, `El largo debe ser de ${largoKeyMercadopago} caracteres`)
      .max(largoKeyMercadopago, `El largo debe ser de ${largoKeyMercadopago} caracteres`)
      .matches(/^\S*$/, 'No son permitidos los espacios en blanco.'),
  });



  const abrirModalAdministrador = (refLocalComercial) => {
    dispatch({ type: LOCALCOMERCIAL_CARGAR_ADMINISTRADOR, payload: { refLocalComercial, modal: setModalAdministrador } });
  }

  // TODO CREDENCIALES 
  const abrirModalCredenciales = (refLocalComercial) => {
    dispatch({ type: LOCALCOMERCIAL_CARGAR_ADMINISTRADOR, payload: { refLocalComercial, modal: setModalCredenciales } });
  }
  const submitCredenciales = (values, { setSubmitting }) => {
    const payload = {
      ...values,
    };
    setTimeout(() => {
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);
      const userPut = {
        username: administrador.username,
        email: payload.emailChange,
        password: payload.passwordChange,
        nombre: administrador.nombre,
        apellido: administrador.apellido,
        rol: "adminLocal",
        telefono: administrador.telefono,
        refTienda: localComercial.id,
      }
      // Ahora debemos enviar el put
      dispatch({
        type: LOCALCOMERCIAL_MODIFICAR_CREDENCIALES, payload: {
          refLocalComercial: localComercial.id,
          user: userPut,
          modal: setModalCredenciales,
        }
      });

    }, 500);
  };
  const SignupSchemaCredenciales = Yup.object().shape({
    emailChange: Yup.string().email('Formato invalido').required('Correo electronico requerido'),
    passwordChange: Yup.string().required('Debes ingresar una contraseña').matches("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})", "Debe contener al menos 8 caracteres, Uno en mayuscula, Uno en minuscula y Un numero."),
    repeatPasswordChange: Yup.string().required('Debes repetir la contraseña').oneOf([Yup.ref("passwordChange"), null], "Las contraseñas no son iguales")
  });

  const submitAdministrador = (values, { setSubmitting }) => {
    const payload = {
      ...values,
    };
    setTimeout(() => {
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);

      const userPut = {
        username: administrador.username,
        email: payload.emailAsignar,
        nombre: payload.nombreAsignar,
        apellido: payload.apellidoAsignar,
        rol: "adminLocal",
        telefono: payload.telefonoAsignar,
        refTienda: localComercial.id,
      }
      // Ahora debemos enviar el put
      dispatch({
        type: LOCALCOMERCIAL_MODIFICAR_CREDENCIALES, payload: {
          refLocalComercial: localComercial.id,
          user: userPut,
          modal: setModalAdministrador,
        }
      });

    }, 500);
  };

  const SignupSchemaAdministrador = Yup.object().shape({
    emailAsignar: Yup.string().email('Formato invalido').required('Correo electronico requerido'),
    nombreAsignar: Yup.string().required('Debe ingresar el nombre! '),
    apellidoAsignar: Yup.string().required('Debe ingresar el apellido! '),
    // eslint-disable-next-line no-useless-escape
    telefonoAsignar: Yup.string().required('Debe ingresar el telefono!').matches("^569[0-9]{8}$", "Debe ingresar con el formato 569XXXXXXXX."),
  });

  const eliminar = (refLocalComercial) => {
    dispatch({
      type: LOCALCOMERCIAL_ELIMINAR,
      payload: refLocalComercial,
    });
  }


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
                    onClick={() => setModalEditar(!modalEditar)}
                    color="primary"
                    className="m-1"
                  >
                    Editar
                  </Button>{' '}
                  <Button
                    onClick={() => abrirModalAdministrador(localComercial.id)}
                    color="primary"
                    className="m-1"
                  >
                    Administrador
                  </Button>{' '}
                  <Button
                    onClick={() => abrirModalCredenciales(localComercial.id)}
                    color="primary"
                    className="m-1"
                  >
                    Modificar Credenciales
                  </Button>{' '}
                  <Button
                    onClick={() => setModalEliminar(!modalEliminar)}
                    color="danger"
                    className="m-1"
                  >
                    Eliminar
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
              nombre: localComercial.nombre,
              direccion: localComercial.direccion,
              link: localComercial.link,
              horarioAtencion: localComercial.horarioAtencion,
              habilitado: localComercial.habilitado.toString(),
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
                      <Label>HORARIO ATENCIÓN</Label>
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
                      <Label>HABILITADO</Label>
                      <select
                        name="habilitado"
                        className="form-control"
                        value={values.habilitado}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        {estadosHabilitado.map((item, i) => {
                          return (
                            <option value={item.value} key={item.value}>
                              {item.label}
                            </option>
                          );
                        })}
                      </select>
                      {errors.estadosHabilitado && touched.estadosHabilitado ? (
                        <div className="invalid-feedback d-block">
                          {errors.estadosHabilitado}
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
      <Modal isOpen={modalCredenciales} toggle={() => setModalCredenciales(!modalCredenciales)}>
        <ModalHeader>MODIFICAR CREDENCIALES DE ACCESO : {localComercial.nombre}</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              emailChange: administrador.email,
              passwordChange: '',
              repeatPasswordChange: '',
            }}
            onSubmit={submitCredenciales}
            validationSchema={SignupSchemaCredenciales}
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
                      <Label>EMAIL</Label>
                      <Field className="form-control" name="emailChange" />
                    </FormGroup>
                    {errors.emailChange && touched.emailChange ? (
                      <div className="invalid-feedback d-block">
                        {errors.emailChange}
                      </div>
                    ) : null}
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="12">
                    <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                      <Label>NUEVA CONTRASEÑA</Label>
                      <Field type="password" className="form-control" name="passwordChange" />
                    </FormGroup>
                    {errors.passwordChange && touched.passwordChange ? (
                      <div className="invalid-feedback d-block">
                        {errors.passwordChange}
                      </div>
                    ) : null}
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="12">
                    <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                      <Label>REPETIR CONTRASEÑA</Label>
                      <Field type="password" className="form-control" name="repeatPasswordChange" />
                    </FormGroup>
                    {errors.repeatPasswordChange && touched.repeatPasswordChange ? (
                      <div className="invalid-feedback d-block">
                        {errors.repeatPasswordChange}
                      </div>
                    ) : null}
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="12">
                    <Button block color="primary" type="submit">
                      Guardar
                    </Button>{' '}
                    <Button block color="secondary" onClick={() => setModalCredenciales(!modalCredenciales)}>
                      Cancelar
                    </Button>{' '}
                  </Colxx>
                </Row>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>

      <Modal isOpen={modalAdministrador} toggle={() => setModalAdministrador(!modalAdministrador)}>
        <ModalHeader>Agisnar Administrador a : {localComercial.nombre}</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              emailAsignar: administrador.email,
              nombreAsignar: administrador.nombre,
              apellidoAsignar: administrador.apellido,
              telefonoAsignar: administrador.telefono,
            }}
            validationSchema={SignupSchemaAdministrador}
            onSubmit={submitAdministrador}

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
                      <Label>EMAIL</Label>
                      <Field disabled className="form-control" name="emailAsignar" />
                      {errors.emailAsignar && touched.emailAsignar ? (
                        <div className="invalid-feedback d-block">
                          {errors.emailAsignar}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="12">
                    <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                      <Label>NOMBRES</Label>
                      <Field className="form-control" name="nombreAsignar" />
                    </FormGroup>
                    {errors.nombreAsignar && touched.nombreAsignar ? (
                      <div className="invalid-feedback d-block">
                        {errors.nombreAsignar}
                      </div>
                    ) : null}
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="12">
                    <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                      <Label>APELLIDOS</Label>
                      <Field className="form-control" name="apellidoAsignar" />
                    </FormGroup>
                    {errors.apellidoAsignar && touched.apellidoAsignar ? (
                      <div className="invalid-feedback d-block">
                        {errors.apellidoAsignar}
                      </div>
                    ) : null}
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="12">
                    <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                      <Label>TELEFONO</Label>
                      <Field className="form-control" name="telefonoAsignar" />
                    </FormGroup>
                    {errors.telefonoAsignar && touched.telefonoAsignar ? (
                      <div className="invalid-feedback d-block">
                        {errors.telefonoAsignar}
                      </div>
                    ) : null}
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="12">
                    <Button block color="primary" type="submit">
                      Guardar
                    </Button>{' '}
                    <Button block color="secondary" onClick={() => setModalAdministrador(!modalAdministrador)}>
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
              eliminar(localComercial.id);
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
