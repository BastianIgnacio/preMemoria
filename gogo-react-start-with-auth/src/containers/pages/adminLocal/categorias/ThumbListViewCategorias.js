/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
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
  InputGroup,
  Input,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { ContextMenuTrigger } from 'react-contextmenu';
import { FormikSwitch } from '../../../form-validations/FormikFields';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import PreviewImage from '../../previewImage';
import { NotificationManager } from '../../../../components/common/react-notifications';
import { CATEGORIA_DELETE, CATEGORIA_UPDATE } from '../../../../redux/actions';
import { apiMediaUrl } from '../../../../constants/defaultValues';

const ThumbListViewCategorias = ({ categoria, collect, refLocalComercial }) => {
  const dispatch = useDispatch();
  const [modalEditar, setModalEditar] = useState(false);
  const [urlPreview, setUrlPreview] = useState(true);
  const [modalEliminar, setModalEliminar] = useState(false);
  // Promise para obtener el base64 de una imagen
  const toBase64 = (file, setFunction) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const notificacionWarning = (titulo, subtitulo) => {
    NotificationManager.warning(titulo, subtitulo, 4000, null, null, 'filled');
  };

  // Validacion para el form que edita los datos de un local comercial
  const SignupSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es requerido!'),
    desc: Yup.string().required('La descripcion es requerida!'),
  });

  const onSubmitEliminar = () => {
    dispatch({
      type: CATEGORIA_DELETE,
      payload: {
        categoria: categoria.id,
        refLocalComercial,
      },
    });
    setModalEliminar(false);
  };
  // Funcion para Enviar El put de una categoria
  const onSubmitPut = (values, { setSubmitting }) => {
    const payload = {
      ...values,
    };
    setTimeout(() => {
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);
      // No se ha editado la imagen, por ende no se debe enviar en el PUT
      if (payload.webPreview) {
        // PASAMOS HACER EL BASE64
        const putCategoria = {
          nombre: payload.nombre,
          descripcion: payload.desc,
          esVisible: payload.esVisible,
          esNuevo: payload.esNuevo,
          refLocalComercial,
        };
        dispatch({
          type: CATEGORIA_UPDATE,
          payload: {
            idCategoria: categoria.id,
            categoria: putCategoria,
            refLocalComercial,
          },
        });
        setModalEditar(!modalEditar);
      } else {
        // El put si tiene foto
        const { type } = payload.fileMediaImagen;
        const { fileMediaImagen } = payload;
        if (type === 'image/jpeg' || type === 'image/png') {
          toBase64(fileMediaImagen).then((value) => {
            const imagen = value;
            const putCategoria = {
              nombre: payload.nombre,
              descripcion: payload.desc,
              esVisible: payload.esVisible,
              esNuevo: payload.esNuevo,
              imagen,
              refLocalComercial,
            };
            dispatch({
              type: CATEGORIA_UPDATE,
              payload: {
                idCategoria: categoria.id,
                categoria: putCategoria,
                refLocalComercial,
              },
            });
            setModalEditar(!modalEditar);
          });
        } else {
          // Enviamos la aleta de que la foto no corresponde
          console.log('Debe ser una imgen tipo png ');
          notificacionWarning(
            'La imagen seleccionada debe ser .PNG O .JPEG',
            'IMAGEN'
          );
        }
      }
    }, 500);
  };

  return (
    <Colxx xxs="12" key={categoria.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={categoria.id} collect={collect}>
        <Card className="d-flex flex-row">
          <div className="d-flex">
            <img
              alt={apiMediaUrl}
              src={apiMediaUrl + categoria.imagen}
              className="list-thumbnail responsive border-0 card-img-left"
            />
          </div>
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <p className="mb-1 list-item-heading mb-1 truncate w-100 w-sm-100">
                {categoria.nombre}
              </p>
              {categoria.esNuevo && (
                <Badge color="secondary" className="m-1" pill>
                  NUEVO
                </Badge>
              )}
              {categoria.esVisible ? (
                <Badge color="primary" className="m-1" pill>
                  VISIBLE
                </Badge>
              ) : (
                <Badge color="warning" className="m-1" pill>
                  NO VISIBLE
                </Badge>
              )}
              <Button
                onClick={() => setModalEliminar(!modalEliminar)}
                color="danger"
                className="m-1"
              >
                Eliminar
              </Button>{' '}
              <Button
                onClick={() => setModalEditar(!modalEditar)}
                color="primary"
                className="m-1"
              >
                Editar
              </Button>{' '}
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
      <Modal isOpen={modalEditar} toggle={() => setModalEditar(!modalEditar)}>
        <ModalHeader>{categoria.nombre}</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              nombre: categoria.nombre,
              desc: categoria.descripcion,
              esVisible: categoria.esVisible,
              esNuevo: categoria.esNuevo,
              webPreview: true,
              urlMediaImagen: categoria.imagen,
              fileMediaImagen: null,
            }}
            validationSchema={SignupSchema}
            onSubmit={onSubmitPut}
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
              // eslint-disable-next-line no-unused-vars
              isSubmitting,
            }) => (
              <Form className="av-tooltip tooltip-label-bottom">
                <Row>
                  <Colxx xxs="12" xs="12" lg="12">
                    <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                      <Label>NOMBRE</Label>
                      <Field className="form-control" name="nombre" />
                      {errors.nombre && touched.nombre ? (
                        <div className="invalid-feedback d-block ">
                          {errors.nombre}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="12">
                    <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                      <Label>DESCRIPCION</Label>
                      <Field
                        className="form-control"
                        name="desc"
                        component="textarea"
                      />
                      {errors.desc && touched.desc ? (
                        <div className="invalid-feedback d-block ">
                          {errors.desc}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="6">
                    <FormGroup className="error-l-100">
                      <Label className="d-block">Es visible</Label>
                      <FormikSwitch
                        name="esVisible"
                        className="custom-switch custom-switch-primary"
                        value={values.esVisible}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.esVisible && touched.esVisible ? (
                        <div className="invalid-feedback d-block">
                          {errors.esVisible}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="6">
                    <FormGroup className="error-l-100">
                      <Label className="d-block">Es nuevo</Label>
                      <FormikSwitch
                        name="esNuevo"
                        className="custom-switch custom-switch-primary"
                        value={values.esNuevo}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.esNuevo && touched.esNuevo ? (
                        <div className="invalid-feedback d-block">
                          {errors.esNuevo}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="12">
                    <FormGroup className="error-l-175">
                      <Label className="d-block">
                        NUEVA FOTO DE LA CATEGORIA (Opcional)
                      </Label>
                      <InputGroup className="mb-3">
                        <Input
                          className="form-control"
                          type="file"
                          name="rutaFoto"
                          onChange={(event) => {
                            setFieldValue(
                              'fileMediaImagen',
                              event.target.files[0]
                            );
                            setFieldValue('webPreview', false);
                          }}
                        />
                      </InputGroup>
                    </FormGroup>
                    {values.webPreview ? (
                      <div>
                        <img
                          src={apiMediaUrl + values.urlMediaImagen}
                          alt="preview"
                          width="250px"
                          height="250px"
                        />
                      </div>
                    ) : (
                      <PreviewImage file={values.fileMediaImagen} />
                    )}
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="12" className="mt-1">
                    <Button block color="primary" type="submit">
                      Guardar
                    </Button>{' '}
                    <Button
                      block
                      color="secondary"
                      onClick={() => setModalEditar(!modalEditar)}
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
        <ModalHeader>Eliminar</ModalHeader>
        <ModalBody>
          <p>Está seguro que desea eliminar la categoria {categoria.nombre}?</p>
          <p>Todos los productos asociados serán eliminados.</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onSubmitEliminar}>
            Eliminar
          </Button>{' '}
          <Button color="secondary" onClick={() => setModalEliminar(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ThumbListViewCategorias);
