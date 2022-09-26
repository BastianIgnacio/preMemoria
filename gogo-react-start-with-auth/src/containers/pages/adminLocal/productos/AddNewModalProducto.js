import React, { useState } from 'react';
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
import ReactCrop from 'react-image-crop';
import { FormikCustomRadioGroup } from '../../../form-validations/FormikFields';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import PreviewImage from '../../previewImage';
import 'react-image-crop/lib/ReactCrop.scss';

import { NotificationManager } from '../../../../components/common/react-notifications';
// eslint-disable-next-line no-unused-vars
import { PRODUCTO_ADD } from '../../../../redux/actions';

const AddNewModalProducto = ({ modalOpen, toggleModal }) => {
  // eslint-disable-next-line no-unused-vars
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

  const [modalCut, setModalCut] = useState(false);
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState(null);
  const [canAdd, setCanAdd] = useState(false);
  const [error, setError] = useState('No hay imagen seleccionada');

  // Metodo para ocultar imagen al cerrar el modal de recorte
  const toggleModalCut = () => {
    setSrc(null);
    setImage(null);
    setOutput(null);
    setCanAdd(false);
    setModalCut(false);
    setError('No hay imagen seleccionada');
  };

  // Metodo para cortar la imagen
  const cropImageNow = () => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // Converting to base64
    const base64Image = canvas.toDataURL('image/jpeg');
    // Validamos si la seleccion es vacia
    if (base64Image === 'data:,') {
      notificacionWarning(
        'Debes seleccionar un trazo de la imagen',
        'ERROR AL RECORTAR'
      );
    } else {
      setCanAdd(true);
      setOutput(base64Image);
      setModalCut(!modalCut);
      setError(null);
    }
  };

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const payload = {
      ...values,
    };
    setTimeout(() => {
      if (!canAdd) {
        notificacionWarning(
          'Debes seleccionar una imagen a la categoria PNG O JPEG',
          'IMAGEN'
        );
      } else {
        let esVisible = null;
        if (payload.enLineaRadio === 1) {
          esVisible = true;
        } else {
          esVisible = false;
        }
        const producto = {
          nombre: payload.nombreProducto,
          descripcion: payload.descripcion,
          esVisible,
          precio: payload.precio,
          esNuevo: true,
          isBestProduct: false,
          refCategoria: categoriaSeleccionada.id,
          imagen: output,
        };
        console.log(producto);
        dispatch({ type: PRODUCTO_ADD, payload: producto });
        // Cerramos el modal y reseteamos el formik
        toggleModal();
        resetForm();
        // Reseteamos la imagen seleccionada
        setSrc(null);
        setImage(null);
        setOutput(null);
        setCanAdd(false);
        setError('No hay imagen seleccionada');
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
        precio: 100,
        descripcion: '',
        enLineaRadio: 2,
        imagen: null,
      }}
      validationSchema={SignupSchema}
      onSubmit={onSubmit}
    >
      {({
        handleReset,
        setFieldValue,
        setFieldTouched,
        // handleChange,
        // handleBlur,
        values,
        errors,
        touched,
      }) => (
        <>
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
                          min="100"
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
                          className="form-control"
                          type="file"
                          name="imagen"
                          onChange={(event) => {
                            const { type } = event.target.files[0];
                            if (type === 'image/jpeg' || type === 'image/png') {
                              setSrc(
                                URL.createObjectURL(event.target.files[0])
                              );
                              setCanAdd(false);
                              setModalCut(!modalCut);
                            } else {
                              setSrc(null);
                              setImage(null);
                              setOutput(null);
                              setCanAdd(false);
                              setError(
                                'Imposible visualizar, debe ser formato PNG O JPEG'
                              );
                            }
                          }}
                        />
                      </InputGroup>
                    </FormGroup>
                    {output && <PreviewImage base64={output} />}
                    {error && <Label className="d-block">{error}</Label>}
                  </Colxx>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="secondary"
                  outline
                  onClick={() => {
                    handleReset();
                    setSrc(null);
                    setImage(null);
                    setOutput(null);
                    setCanAdd(false);
                    setError('No hay imagen seleccionada');
                    toggleModal();
                  }}
                >
                  Cancelar
                </Button>
                <Button color="primary" type="submit">
                  Agregar
                </Button>{' '}
              </ModalFooter>
            </Form>
          </Modal>
          <Modal isOpen={modalCut} size="lg" toggle={() => toggleModalCut()}>
            <ModalHeader>Recortando la imagen</ModalHeader>
            <ModalBody>
              <div>
                {src && (
                  <div>
                    <ReactCrop
                      src={src}
                      onImageLoaded={setImage}
                      crop={crop}
                      onChange={setCrop}
                    />
                    <br />
                    <Button block onClick={cropImageNow}>
                      Recortar y guardar
                    </Button>
                    <br />
                    <br />
                  </div>
                )}
              </div>
            </ModalBody>
          </Modal>
        </>
      )}
    </Formik>
  );
};
export default AddNewModalProducto;
