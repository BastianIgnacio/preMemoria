/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormGroup,
  Row,
  InputGroup,
  InputGroupAddon,
  CustomInput,
  Input
} from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FormikCustomRadioGroup } from '../form-validations/FormikFields';
import { Colxx } from '../../components/common/CustomBootstrap';
import PreviewImage from './previewImage';

const AddNewModalCategoria = ({ modalOpen, toggleModal }) => {
  const categorias = [
    { value: "", label: 'Selecciona una opción' },
    { value: "1", label: 'Cateogia 1' },
    { value: "2", label: 'Categoria 2' },
    { value: "3", label: 'Categoria 3' },
  ];
  const enLinea = [
    { label: 'En Linea (Visible)', value: 1 },
    { label: 'Fuera de Linea (No Visible)', value: 2 },
  ];

  const onSubmit = (values, { setSubmitting }) => {
    const payload = {
      ...values,
    };
    setTimeout(() => {
      // Cuando no se ha seleccionado metodo de entrega
      console.log(values.foto);
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);
      // Aca deberiamos llamar a la API PARA ENVIAR EL PEDIDO
    }, 500);
    toggleModal();
  };

  // Validacion para el form que envia la orden
  const SignupSchema = Yup.object().shape({
    nombreProducto: Yup.string().required(
      'El nombre del producto es requerido!'
    ),
    selectCategoria: Yup.string().required('Debe seleccionar la categoria !'),
    descripcion: Yup.string().required('El producto debe tener una descipción'),
  });


  return (
    <Formik
      initialValues={{
        nombreProducto: '',
        selectCategoria: "",
        precio: 1,
        descripcion: '',
        enLineaRadio: 2,
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
            <ModalHeader toggle={toggleModal}>Añadir Producto</ModalHeader>
            <ModalBody>
              <Row>
                <Colxx xxs="12" xs="12" lg="12">
                  <FormGroup className="error-l-150">
                    <Label>NOMBRE PRODUCTO </Label>
                    <Field className="form-control" name="nombreProducto" />
                    {errors.nombreProducto && touched.nombreProducto ? (
                      <div className="invalid-feedback d-block">
                        {errors.nombreProducto}
                      </div>
                    ) : null}
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12" xs="12" lg="12">
                  <FormGroup className="error-l-150">
                    <Label>CATEGORIA QUE PERTENECE </Label>
                    <select
                      name="selectCategoria"
                      className="form-control"
                      value={values.selectCategoria}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {categorias.map((item, i) => {
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
                  <FormGroup className="error-l-150">
                    <Label>PRECIO DE VENTA </Label>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                      <Field className="form-control" type="number" min="1" step="10" name="precio" />
                    </InputGroup>
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12" xs="12" lg="12">
                  <FormGroup className="error-l-175">
                    <Label>DESCRIPCIÓN  </Label>
                    <Field
                      as="textarea"
                      rows="2"
                      className="form-control"
                      name="descripcion"
                    />
                    {errors.descripcion && touched.descripcion ? (
                      <div className="invalid-feedback d-block">
                        {errors.descripcion}
                      </div>
                    ) : null}
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12" xs="12" lg="12">
                  <FormGroup className="error-l-175">
                    <Label className="d-block">ESTADO DEL PRODUCTO</Label>
                    <FormikCustomRadioGroup
                      inline
                      name="enLineaRadio"
                      id="enLineaRadio"
                      label="Which of these?"
                      value={values.enLineaRadio}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      options={enLinea}
                    />
                    {errors.enLineaRadio && touched.enLineaRadio ? (
                      <div className="invalid-feedback d-block">
                        {errors.enLineaRadio}
                      </div>
                    ) : null}
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12" xs="12" lg="12">
                  <FormGroup className="error-l-175">
                    <Label className="d-block">FOTO DEL PRODUCTO (Opcional)</Label>
                    <InputGroup className="mb-3">
                      <Input
                        type="file"
                        name="foto"
                        onChange={(event) => {
                          setFieldValue("foto", event.target.files[0]);
                        }} />
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
