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
  Row,
  FormGroup,
  InputGroup,
} from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Colxx } from '../../components/common/CustomBootstrap';
import PreviewImage from './previewImage';

const AddNewModalCategoria = ({ modalOpen, toggleModal }) => {
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
    nombreCategoria: Yup.string().required('El nombre es requerido!'),
  });

  return (
    <Formik
      initialValues={{
        nombreCategoria: '',
        foto: null,
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
          <Form className="av-tooltip tooltip-label-bottom">
            <ModalHeader toggle={toggleModal}>
              Añadir Nueva Categoria
            </ModalHeader>
            <ModalBody>
              <Row>
                <Colxx xxs="12" xs="12" lg="12">
                  <FormGroup className="error-l-100">
                    <Label>Nombre de la categoria </Label>
                    <Field className="form-control" name="nombreCategoria" />
                    {errors.nombreCategoria && touched.nombreCategoria ? (
                      <div className="invalid-feedback d-block">
                        {errors.nombreCategoria}
                      </div>
                    ) : null}
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12" xs="12" lg="12">
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

export default AddNewModalCategoria;
