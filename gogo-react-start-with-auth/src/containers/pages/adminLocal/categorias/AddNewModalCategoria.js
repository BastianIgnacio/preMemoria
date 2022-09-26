/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import ReactCrop from 'react-image-crop';
import { CATEGORIA_ADD } from '../../../../redux/actions';
import { FormikCustomRadioGroup } from '../../../form-validations/FormikFields';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import PreviewImage from '../../previewImage';
import { NotificationManager } from '../../../../components/common/react-notifications';
import 'react-image-crop/lib/ReactCrop.scss';

const AddNewModalCategoria = ({ modalOpen, toggleModal }) => {
  const dispatch = useDispatch();
  const idTienda = useSelector((state) => state.authUser.tienda.id);

  const [modalCut, setModalCut] = useState(false);
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState(null);
  const [canAdd, setCanAdd] = useState(false);
  const [error, setError] = useState('No hay imagen seleccionada');

  const notificacionWarning = (titulo, subtitulo) => {
    NotificationManager.warning(titulo, subtitulo, 4000, null, null, 'filled');
  };
  const enLinea = [
    { label: 'En Linea (Visible)', value: 1 },
    { label: 'Fuera de Linea (No Visible)', value: 2 },
  ];

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

  // Enviamos la nueva categoria
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
        const categoria = {
          nombre: payload.nombreCategoria,
          descripcion: payload.desCategoria,
          esVisible,
          esNuevo: true,
          imagen: output,
          refLocalComercial: idTienda,
        };
        dispatch({ type: CATEGORIA_ADD, payload: categoria });
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
    nombreCategoria: Yup.string().required('El nombre es requerido!'),
    desCategoria: Yup.string().required('La descripción es requerida!'),
  });

  return (
    <Formik
      initialValues={{
        nombreCategoria: '',
        desCategoria: '',
        imagen: null,
        enLineaRadio: 2,
      }}
      validationSchema={SignupSchema}
      onSubmit={onSubmit}
    >
      {({
        handleSubmit,
        handleReset,
        setFieldValue,
        setFieldTouched,
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
        isSubmitting,
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
                    <FormGroup className="error-l-100">
                      <Label>Descripcion de la categoria </Label>
                      <Field className="form-control" name="desCategoria" />
                      {errors.desCategoria && touched.desCategoria ? (
                        <div className="invalid-feedback d-block">
                          {errors.desCategoria}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="12">
                    <FormGroup className="error-l-175">
                      <Label className="d-block">ESTADO DE LA CATEGORIA</Label>
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
                      <Label className="d-block">FOTO DE LA CATEGORIA</Label>
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
                    setError(null);
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

export default AddNewModalCategoria;
