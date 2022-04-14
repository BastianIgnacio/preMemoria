/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
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
import Select from 'react-select';
import { Colxx } from '../../components/common/CustomBootstrap';
import CustomSelectInput from '../../components/common/CustomSelectInput';

const AddNewModalLocalComercial = ({ modalOpen, toggleModal }) => {
  const admins = [
    { label: 'Admin 1', value: '1', key: 0 },
    { label: 'Admin 2', value: '2', key: 1 },
    { label: 'Amin 3', value: '3', key: 2 },
  ];

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
    toggleModal();
  };

  // Validacion para el form que envia la orden
  const SignupSchema = Yup.object().shape({
    selectAdministrador: Yup.string().required('El nombre es requerido!'),
    nombreLocalComercial: Yup.string().required('El nombre es requerido!'),
    direccionLocalComercial: Yup.string().required('La direccion es requerida!'),
    linkLocalComercial: Yup.string().required('El LINK es requerido!'),
  });
  return (
    <Formik
      initialValues={{
        selectAdministrador: admins[0].value,
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
                  <FormGroup className="error-l-150">
                    <Label>ADMINISTRADOR DEL LOCAL COMERCIAL</Label>
                    <select
                      name="selectAdministrador"
                      className="form-control"
                      value={values.selectAdministrador}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {admins.map((item, i) => {
                        return (
                          <option value={item.value} key={item.value}>
                            {item.label}
                          </option>
                        );
                      })}
                    </select>
                    {errors.selectCategoria && touched.selectCategoria ? (
                      <div className="invalid-feedback d-block">
                        {errors.selectCategoria}
                      </div>
                    ) : null}
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12" xs="12" lg="12">
                  <FormGroup className="error-l-100">
                    <Label>Nombre del local comercial </Label>
                    <Field className="form-control" name="nombreLocalComercial" />
                    {errors.nombreLocalComercial &&
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
                    <Field className="form-control" name="direccionLocalComercial" />
                    {errors.direccionLocalComercial &&
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
                    {errors.linkLocalComercial &&
                      touched.linkLocalComercial ? (
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
              </Button>{' '}
            </ModalFooter>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

export default AddNewModalLocalComercial;
