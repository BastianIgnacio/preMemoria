/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  FormGroup,
  Row,
} from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Colxx } from '../../components/common/CustomBootstrap';

import { ADMINLOCALCOMERCIAL_ADD } from '../../redux/actions';

const AddNewModalAdministradorLocalComercial = ({ modalOpen, toggleModal }) => {
  const dispatch = useDispatch();

  const onSubmit = (values, { setSubmitting }) => {
    const payload = {
      ...values,
    };
    setTimeout(() => {
      // Cuando no se ha seleccionado metodo de entrega
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);
      // Aca deberiamos llamar a la API PARA ENVIAR EL PEDIDO
      const adminLocalComercial = {
        email: payload.emailAdministrador,
        password: payload.passwordAdministrador,
        run: payload.runAdministrador,
        telefono: payload.telefonoAdministrador,
        username: "usernamedeprueba2",
        first_name: payload.nombresAdministrador,
        last_name: payload.apellidosAdministrador,
        rol: "adminLocal"
      }
      dispatch({ type: ADMINLOCALCOMERCIAL_ADD, payload: adminLocalComercial });
    }, 500);
    toggleModal();
  };

  // Validacion para el form que envia la orden
  const SignupSchema = Yup.object().shape({
    nombresAdministrador: Yup.string().required('El nombre es requerido!'),
    apellidosAdministrador: Yup.string().required('El apellido es requerido!'),
    runAdministrador: Yup.string().min(8, 'Debe ser de 8 digitos').max(8, 'Debe ser de 8 digitos').required('La RUN es requerido!'),
    telefonoAdministrador: Yup.string().required('El telefono es requerido!'),
    emailAdministrador: Yup.string().email('Formato de email invalido !').required('El email es requerido!'),
    passwordAdministrador: Yup.string().min(8, 'La contraseña debe tener minimo 8 caracteres!').required('Una contraseña es requerida!'),
  });
  return (
    <Formik
      initialValues={{
        nombresAdministrador: '',
        apellidosAdministrador: '',
        runAdministrador: '',
        telefonoAdministrador: '',
        emailAdministrador: '',
        passwordAdministrador: '',
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
        <Modal
          isOpen={modalOpen}
          toggle={toggleModal}
          wrapClassName="modal-right"
          backdrop="static"
        >
          <Form>
            <ModalHeader toggle={toggleModal}>
              Añadir Administrador de local comercial
            </ModalHeader>
            <ModalBody>
              <Row>
                <Colxx xxs="12" xs="12" lg="12">
                  <FormGroup className="error-l-200">
                    <Label>Nombre</Label>
                    <Field className="form-control" name="nombresAdministrador" />
                    {errors.nombresAdministrador &&
                      touched.nombresAdministrador ? (
                      <div className="invalid-feedback d-block">
                        {errors.nombresAdministrador}
                      </div>
                    ) : null}
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12" xs="12" lg="12">
                  <FormGroup className="error-l-200">
                    <Label>Apellido </Label>
                    <Field className="form-control" name="apellidosAdministrador" />
                    {errors.apellidosAdministrador &&
                      touched.apellidosAdministrador ? (
                      <div className="invalid-feedback d-block">
                        {errors.apellidosAdministrador}
                      </div>
                    ) : null}
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12" xs="12" lg="12">
                  <FormGroup className="error-l-200">
                    <Label>RUN sin digito verificador y sin puntos</Label>
                    <Field mask="99.999.999" className="form-control" name="runAdministrador" />
                    {errors.runAdministrador &&
                      touched.runAdministrador ? (
                      <div className="invalid-feedback d-block">
                        {errors.runAdministrador}
                      </div>
                    ) : null}
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12" xs="12" lg="12">
                  <FormGroup className="error-l-200">
                    <Label>Telefono Contacto</Label>
                    <Field className="form-control" name="telefonoAdministrador" />
                    {errors.telefonoAdministrador &&
                      touched.telefonoAdministrador ? (
                      <div className="invalid-feedback d-block">
                        {errors.telefonoAdministrador}
                      </div>
                    ) : null}
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12" xs="12" lg="12">
                  <FormGroup className="error-l-200">
                    <Label>Email</Label>
                    <Field className="form-control" name="emailAdministrador" />
                    {errors.emailAdministrador &&
                      touched.emailAdministrador ? (
                      <div className="invalid-feedback d-block">
                        {errors.emailAdministrador}
                      </div>
                    ) : null}
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12" xs="12" lg="12">
                  <FormGroup className="error-l-200">
                    <Label>Contraseña  </Label>
                    <Field type="password" className="form-control" name="passwordAdministrador" />
                    {errors.passwordAdministrador &&
                      touched.passwordAdministrador ? (
                      <div className="invalid-feedback d-block">
                        {errors.passwordAdministrador}
                      </div>
                    ) : null}
                  </FormGroup>
                </Colxx>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" outline onClick={toggleModal}>
                Cancelar
              </Button>
              <Button color="primary" type="submit">
                Agregar
              </Button>{' '}
            </ModalFooter>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

export default AddNewModalAdministradorLocalComercial;
