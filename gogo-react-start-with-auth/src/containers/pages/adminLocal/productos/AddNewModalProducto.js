import React from 'react';
// eslint-disable-next-line no-unused-vars
import { useSelector, useDispatch } from 'react-redux';
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
  Input,
} from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FormikCustomRadioGroup } from '../../../form-validations/FormikFields';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import PreviewImage from '../../previewImage';

import { NotificationManager } from '../../../../components/common/react-notifications';
import { PRODUCTO_ADD } from '../../../../redux/actions';

const AddNewModalProducto = ({ modalOpen, toggleModal }) => {
  const dispatch = useDispatch();
  const categoriaSeleccionada = useSelector(
    (state) => state.productos.categoriaSeleccionada
  );
  const notificacionWarning = (titulo, subtitulo) => {
    NotificationManager.warning(titulo, subtitulo, 4000, null, null, 'filled');
  };
  const enLinea = [
    { label: 'En Linea (Visible)', value: 1 },
    { label: 'Fuera de Linea (No Visible)', value: 2 },
  ];

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const payload = {
      ...values,
    };
    setTimeout(() => {
      // Cuando no se ha seleccionado metodo de entrega
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);
      // Aca deberiamos llamar a la API PARA ENVIAR EL PEDIDO
      if (payload.imagen === null || payload.imagen === undefined) {
        notificacionWarning(
          'Debes seleccionar una imagen a la categoria PNG O JPEG',
          'IMAGEN'
        );
        return;
      }
      const { type } = payload.imagen;
      if (type === 'image/jpeg' || type === 'image/png') {
        let { imagen } = payload;
        let esVisible = null;
        if (payload.enLineaRadio === 1) {
          esVisible = true;
        } else {
          esVisible = false;
        }
        toBase64(imagen).then((value) => {
          imagen = value;
          const producto = {
            nombre: payload.nombreProducto,
            descripcion: payload.descripcion,
            esVisible,
            esNuevo: true,
            imagen,
            refCategoria: categoriaSeleccionada.id,
          };
          dispatch({ type: PRODUCTO_ADD, payload: producto });
          toggleModal();
          resetForm();
        });
      } else {
        // Aca deberiamos mostrar una notificacion
        notificacionWarning('Debe ser JPEG O PNG', 'IMAGEN');
      }
      setSubmitting(false);
    }, 500);
  };

  // Validacion para el form que envia la orden
  const SignupSchema = Yup.object().shape({
    nombreProducto: Yup.string().required(
      'El nombre del producto es requerido!'
    ),
    descripcion: Yup.string().required('El producto debe tener una descipción'),
  });

  return (
    <Formik
      initialValues={{
        nombreProducto: '',
        precio: 1,
        descripcion: '',
        enLineaRadio: 2,
        imagen: null,
      }}
      validationSchema={SignupSchema}
      onSubmit={onSubmit}
    >
      {({
        setFieldValue,
        setFieldTouched,
        // handleChange,
        // handleBlur,
        values,
        errors,
        touched,
      }) => (
        <Modal
          isOpen={modalOpen}
          toggle={toggleModal}
          wrapClassName="modal-right"
          backdrop="static"
        >
          <Form className="av-tooltip tooltip-label-bottom">
            <ModalHeader toggle={toggleModal}>
              Añadir Producto a {categoriaSeleccionada.nombre}
            </ModalHeader>
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
                    <Label>PRECIO DE VENTA </Label>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                      <Field
                        className="form-control"
                        type="number"
                        min="1"
                        name="precio"
                      />
                    </InputGroup>
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12" xs="12" lg="12">
                  <FormGroup className="error-l-175">
                    <Label>DESCRIPCIÓN </Label>
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
                    <Label className="d-block">
                      FOTO DEL PRODUCTO (Opcional)
                    </Label>
                    <InputGroup className="mb-3">
                      <Input
                        type="file"
                        name="imagen"
                        onChange={(event) => {
                          setFieldValue('imagen', event.target.files[0]);
                        }}
                      />
                    </InputGroup>
                  </FormGroup>
                  {values.imagen && <PreviewImage file={values.imagen} />}
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
export default AddNewModalProducto;
