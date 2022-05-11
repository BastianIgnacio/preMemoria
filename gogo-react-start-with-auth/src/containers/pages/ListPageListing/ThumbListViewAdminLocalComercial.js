/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Card,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Label,
  FormGroup,
  Badge,
} from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import { NavLink } from 'react-router-dom';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../components/common/CustomBootstrap';
import {
  ADMINLOCALCOMERCIAL_CHANGEPAGE,
  ADMINLOCALCOMERCIAL_CHANGEPAGESIZE,
  ADMINLOCALCOMERCIAL_REMOVE,
  ADMINLOCALCOMERCIAL_UPDATE,
  ADMINLOCALCOMERCIAL_UPDATE_CREDENTIAL,
  LOCALCOMERCIAL_REMOVE_ADMIN,
} from '../../../redux/actions';

const ThumbListViewAdminLocalComercial = ({
  administradorLocalComercial,
  collect,
}) => {
  const [modalAdminLocalComercial, setModalAdminLocalComercial] = useState(
    false
  );
  const [modalEliminar, setModalEliminar] = useState(false);

  const [modalCredenciales, setModalCredenciales] = useState(false);
  const dispatch = useDispatch();
  const results = JSON.parse(JSON.stringify(administradorLocalComercial));

  const onSubmitEliminar = (idAdministrador, isDisponible) => {
    console.log(idAdministrador);
    console.log(isDisponible);
    if (isDisponible) {
      // Solo se elimina el USUARIO ADMINISTRADOR
      // console.log('Solo se elimina el administrador');
      dispatch({
        type: ADMINLOCALCOMERCIAL_REMOVE,
        payload: idAdministrador,
      });
    } else {
      // Se elimina el administrador y se modifica de refAdministrador del local comercial
      console.log(
        ' Se elimina el administrador y se modifica de refAdministrador del local comercial'
      );
      dispatch({
        type: ADMINLOCALCOMERCIAL_REMOVE,
        payload: idAdministrador,
      });
      dispatch({ type: LOCALCOMERCIAL_REMOVE_ADMIN, payload: idAdministrador });
    }
  };

  // Funcion PARA EDITAR UN ADMINISTRADOR DE LOCAL COMERCIAL
  const onSubmitEditar = (values, { setSubmitting }) => {
    const payload = {
      ...values,
    };
    setTimeout(() => {
      // console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);
      // Aca deberiamos llamar a la API PARA ENVIAR EL PEDIDO

      const adminLocalComercial = {
        email: payload.email,
        run: payload.run,
        telefono: payload.telefono,
        first_name: payload.first_name,
        last_name: payload.last_name,
        rol: payload.rol,
      };
      const idAdminLocalComercial = results.id;
      dispatch({
        type: ADMINLOCALCOMERCIAL_UPDATE,
        payload: { idAdminLocalComercial, adminLocalComercial },
      });
      setModalAdminLocalComercial(!modalAdminLocalComercial);
      dispatch({
        type: ADMINLOCALCOMERCIAL_CHANGEPAGE,
        payload: 1,
      });
      dispatch({
        type: ADMINLOCALCOMERCIAL_CHANGEPAGESIZE,
        payload: 8,
      });
      dispatch({
        type: ADMINLOCALCOMERCIAL_CHANGEPAGESIZE,
        payload: 4,
      });
    }, 500);
  };

  // Funcion PARA EDITAR UN ADMINISTRADOR DE LOCAL COMERCIAL
  const onSubmitCredenciales = (values, { setSubmitting }) => {
    const payload = {
      ...values,
    };
    setTimeout(() => {
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);
      // Aca deberiamos llamar a la API PARA ENVIAR EL PEDIDO

      const adminLocalComercial = {
        email: payload.email,
        password: payload.password,
        run: payload.run,
        telefono: payload.telefono,
        first_name: payload.first_name,
        last_name: payload.last_name,
        rol: payload.rol,
      };
      const idAdminLocalComercial = results.id;
      dispatch({
        type: ADMINLOCALCOMERCIAL_UPDATE_CREDENTIAL,
        payload: { idAdminLocalComercial, adminLocalComercial },
      });
      setModalCredenciales(!modalCredenciales);
    }, 500);
  };

  return (
    <Colxx xxs="12" key={administradorLocalComercial.id} className="mb-3">
      <ContextMenuTrigger
        id="menu_id"
        data={administradorLocalComercial.id}
        collect={collect}
      >
        <Card>
          {administradorLocalComercial.disponible && (
            <div className="mb-2 position-relative">
              <Badge
                color="warning"
                pill
                className="position-absolute badge-top-right"
              >
                SIN LOCAL COMERCIAL
              </Badge>
            </div>
          )}
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <div className="align-self-center d-flex flex-column flex-lg-row justify-content-around min-width-zero align-items-lg-center">
                <p className="m-2 list-item-heading  truncate">
                  {`${administradorLocalComercial.first_name} ${administradorLocalComercial.last_name}`}
                </p>
                <NavLink to={`?p=${administradorLocalComercial.id}`}>
                  <p className="m-2 text-muted text-small">
                    {administradorLocalComercial.email}
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
                    onClick={() =>
                      setModalAdminLocalComercial(!modalAdminLocalComercial)
                    }
                    color="primary"
                    className="m-1"
                  >
                    Editar
                  </Button>{' '}
                  <Button
                    onClick={() => setModalCredenciales(!modalCredenciales)}
                    color="secondary"
                    className="m-1"
                  >
                    Credenciales de acceso
                  </Button>{' '}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
      <Modal
        isOpen={modalAdminLocalComercial}
        toggle={() => setModalAdminLocalComercial(!modalAdminLocalComercial)}
      >
        <ModalHeader>ADMINISTRADOR DE LOCAL COMERCIALcd</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              first_name: results.first_name,
              last_name: results.last_name,
              email: results.email,
              telefono: results.telefono,
              run: results.run,
              rol: results.rol,
            }}
            onSubmit={onSubmitEditar}
          >
            {({
              // eslint-disable-next-line no-unused-vars
              handleSubmit,
              setFieldValue,
              // eslint-disable-next-line no-unused-vars
              setFieldTouched,
              // eslint-disable-next-line no-unused-vars
              handleChange,
              handleBlur,
              values,
              errors,
              touched,
              // eslint-disable-next-line no-unused-vars
              isSubmitting,
            }) => (
              <Form className="av-tooltip tooltip-label-bottom">
                <Row>
                  <Colxx xxs="12" xs="12" lg="12">
                    <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                      <Label>EMAIL</Label>
                      <Field className="form-control" name="email" />
                      {errors.horarioAtencion && touched.horarioAtencion ? (
                        <div className="invalid-feedback d-block ">
                          {errors.horarioAtencion}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="12">
                    <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                      <Label>NOMBRES </Label>
                      <Field className="form-control" name="first_name" />
                      {errors.horarioAtencion && touched.horarioAtencion ? (
                        <div className="invalid-feedback d-block ">
                          {errors.horarioAtencion}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="12">
                    <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                      <Label>APELLIDOS</Label>
                      <Field className="form-control" name="last_name" />
                      {errors.horarioAtencion && touched.horarioAtencion ? (
                        <div className="invalid-feedback d-block ">
                          {errors.horarioAtencion}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="12">
                    <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                      <Label>RUN</Label>
                      <Field className="form-control" name="run" />
                      {errors.horarioAtencion && touched.horarioAtencion ? (
                        <div className="invalid-feedback d-block ">
                          {errors.horarioAtencion}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="12">
                    <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                      <Label>ROL</Label>
                      <Field disabled className="form-control" name="rol" />
                      {errors.horarioAtencion && touched.horarioAtencion ? (
                        <div className="invalid-feedback d-block ">
                          {errors.horarioAtencion}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="12">
                    <Button block color="primary" type="submit">
                      Guardar
                    </Button>{' '}
                    <Button
                      block
                      color="secondary"
                      onClick={() =>
                        setModalAdminLocalComercial(!modalAdminLocalComercial)
                      }
                    >
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
        isOpen={modalCredenciales}
        toggle={() => setModalCredenciales(!modalCredenciales)}
      >
        <ModalHeader>CREDENCIALES DE ACCESO </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              email: results.email,
              password: '',
              first_name: results.first_name,
              last_name: results.last_name,
              telefono: results.telefono,
              run: results.run,
              rol: results.rol,
            }}
            onSubmit={onSubmitCredenciales}
          >
            {({
              // eslint-disable-next-line no-unused-vars
              handleSubmit,
              setFieldValue,
              // eslint-disable-next-line no-unused-vars
              setFieldTouched,
              // eslint-disable-next-line no-unused-vars
              handleChange,
              handleBlur,
              values,
              errors,
              touched,
              // eslint-disable-next-line no-unused-vars
              isSubmitting,
            }) => (
              <Form className="av-tooltip tooltip-label-bottom">
                <Row>
                  <Colxx xxs="12" xs="12" lg="12">
                    <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                      <Label>EMAIL</Label>
                      <Field className="form-control" name="email" />
                      {errors.email && touched.email ? (
                        <div className="invalid-feedback d-block ">
                          {errors.email}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="12">
                    <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                      <Label>NUEVA CONTRASEÑA </Label>
                      <Field
                        type="password"
                        className="form-control"
                        name="password"
                      />
                      {errors.password && touched.password ? (
                        <div className="invalid-feedback d-block ">
                          {errors.password}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="12">
                    <Button block color="primary" type="submit">
                      Modificar
                    </Button>{' '}
                    <Button
                      block
                      color="secondary"
                      onClick={() => setModalCredenciales(!modalCredenciales)}
                    >
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
          Seguro que deseas eliminar a {administradorLocalComercial.email} ?
        </ModalHeader>
        <ModalBody>
          Se eliminarán todos los datos pertenecientes al Usuario.
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              onSubmitEliminar(
                administradorLocalComercial.id,
                administradorLocalComercial.disponible
              );
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
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ThumbListViewAdminLocalComercial);
