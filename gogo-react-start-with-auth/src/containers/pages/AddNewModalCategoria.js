/* eslint-disable no-unused-vars */
import React, { useState, useSelector } from 'react';
import { useDispatch } from 'react-redux';
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
import { CATEGORIA_ADD, CATEGORIA_UPDATE_ITEMS } from '../../redux/actions';
import { FormikCustomRadioGroup } from '../form-validations/FormikFields';
import { Colxx } from '../../components/common/CustomBootstrap';
import PreviewImage from './previewImage';
import { NotificationManager } from '../../components/common/react-notifications';

const AddNewModalCategoria = ({ modalOpen, toggleModal, idTienda }) => {
  const dispatch = useDispatch();
  const [base64img, setBase64img] = useState('asd');
  const notificacionWarning = (titulo, subtitulo) => {
    NotificationManager.warning(titulo, subtitulo, 4000, null, null, 'filled');
  };
  const enLinea = [
    { label: 'En Linea (Visible)', value: 1 },
    { label: 'Fuera de Linea (No Visible)', value: 2 },
  ];

  const toBase64 = (file, setFunction) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // Enviamos la nueva categoria
  const onSubmit = (values, { setSubmitting }) => {
    const payload = {
      ...values,
    };
    setTimeout(() => {
      // Cuando no se ha seleccionado metodo de entrega
      console.log(JSON.stringify(payload, null, 2));
      if (payload.foto === null || payload.foto === undefined) {
        notificacionWarning(
          'Debes seleccionar una imagen a la categoria PNG O JPEG',
          'IMAGEN'
        );
        return;
      }
      const { type } = payload.foto;
      let rutaFoto;
      if (type === 'image/jpeg' || type === 'image/png') {
        const { foto } = payload;
        toBase64(foto).then((value) => {
          rutaFoto = value;
          return value;
        });
        let esVisible = null;
        if (payload.enLineaRadio === 1) {
          esVisible = true;
        } else {
          esVisible = false;
        }
        setTimeout(() => {
          const categoria = {
            nombre: payload.nombreCategoria,
            esVisible,
            esNuevo: true,
            rutaFoto,
            refLocalComercial: idTienda,
          };
          dispatch({ type: CATEGORIA_ADD, payload: categoria });
        }, 1000);
        toggleModal();
      } else {
        // Aca deberiamos mostrar una notificacion
        notificacionWarning('Debe ser JPEG O PNG', 'IMAGEN');
      }
      setSubmitting(false);
    }, 500);
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
        enLineaRadio: 2,
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
