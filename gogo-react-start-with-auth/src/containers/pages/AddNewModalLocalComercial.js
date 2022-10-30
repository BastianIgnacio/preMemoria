/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';
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
import {
  LOCALCOMERCIAL_ADD,
  LOCALCOMERCIALS_CHANGEPAGE,
} from '../../redux/actions';

const AddNewModalLocalComercial = ({ modalOpen, toggleModal }) => {
  const dispatch = useDispatch();

  const onSubmit = (values, { setSubmitting }) => {
    const payload = {
      ...values,
    };
    setTimeout(() => {
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);
      // Aca deberiamos llamar a la API PARA ENVIAR EL PEDIDO

      const nuevoLocalComercial = {
        tittle: 'seteado',
        nombre: payload.nombreLocalComercial,
        direccion: payload.direccionLocalComercial,
        link: payload.linkLocalComercial,
        horarioAtencion: 'seteado',
        tieneDelivery: false,
        estado: 'Cerrado',
        accessTokenMercadopago: 'NO',
        publicKeyMercadopago: 'NO',
        logo: 'deafult',
      };
      dispatch({ type: LOCALCOMERCIAL_ADD, payload: nuevoLocalComercial });
      dispatch({ type: LOCALCOMERCIALS_CHANGEPAGE, payload: 1 });
    }, 500);
    toggleModal();
  };

  // Validacion para el form que envia la orden
  const SignupSchema = Yup.object().shape({
    nombreLocalComercial: Yup.string().required('El nombre es requerido!'),
    direccionLocalComercial: Yup.string().required(
      'La direccion es requerida!'
    ),
    // eslint-disable-next-line no-useless-escape
    linkLocalComercial: Yup.string().required('El LINK es requerido!').matches(/^\S*$/, 'No son permitidos los espacios en blanco.'),
  });
  return (
    <Formik
      initialValues={{
        nombreLocalComercial: '',
        direccionLocalComercial: '',
        linkLocalComercial: '',
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
              Añadir Local Comercial
            </ModalHeader>
            <ModalBody>
              <Row>
                <Colxx xxs="12" xs="12" lg="12">
                  <FormGroup className="error-l-100">
                    <Label>Nombre del local comercial </Label>
                    <Field
                      className="form-control"
                      name="nombreLocalComercial"
                    />
                    {errors.nombreLocalComercial &&
                      // eslint-disable-next-line prettier/prettier
                      touched.nombreLocalComercial ? (
                      <div className="invalid-feedback d-block">
                        {errors.nombreLocalComercial}
                      </div>
                    ) : null}
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12" xs="12" lg="12">
                  <FormGroup className="error-l-100">
                    <Label>Direccion Local Comercial </Label>
                    <Field
                      className="form-control"
                      name="direccionLocalComercial"
                    />
                    {errors.direccionLocalComercial &&
                      // eslint-disable-next-line prettier/prettier
                      touched.direccionLocalComercial ? (
                      <div className="invalid-feedback d-block">
                        {errors.direccionLocalComercial}
                      </div>
                    ) : null}
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12" xs="12" lg="12">
                  <FormGroup className="error-l-100">
                    <Label>LINK Local Comercial </Label>
                    <Field className="form-control" name="linkLocalComercial" />
                    {errors.linkLocalComercial && touched.linkLocalComercial ? (
                      <div className="invalid-feedback d-block">
                        {errors.linkLocalComercial}
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
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

export default AddNewModalLocalComercial;
