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
import ReactCrop from 'react-image-crop';
import { FormikSwitch } from '../../../form-validations/FormikFields';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import PreviewImage from '../../previewImage';
import { NotificationManager } from '../../../../components/common/react-notifications';
import { apiMediaUrl } from '../../../../constants/defaultValues';
import { PRODUCTO_DELETE, PRODUCTO_UPDATE } from '../../../../redux/actions';
import 'react-image-crop/lib/ReactCrop.scss';

const ThumbListViewProductos = ({ productoCategoria }) => {
  const dispatch = useDispatch();
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [webPreview, setWebPreview] = useState(true);
  const [modalCut, setModalCut] = useState(false);
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState(null);
  const [canAdd, setCanAdd] = useState(false);
  const [error, setError] = useState(null);

  const notificacionWarning = (titulo, subtitulo) => {
    NotificationManager.warning(titulo, subtitulo, 4000, null, null, 'filled');
  };
  // Validacion para el form que edita los datos de un local comercial
  const SignupSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es requerido!'),
    desc: Yup.string().required('La descripcion es requerida!'),
  });

  // Metodo para ocultar imagen al cerrar el modal de recorte
  const toggleModalCut = () => {
    setSrc(null);
    setImage(null);
    setOutput(null);
    setCanAdd(false);
    setModalCut(false);
    setWebPreview(true);
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
      setWebPreview(false);
    }
  };

  const onSubmitEliminar = () => {
    dispatch({
      type: PRODUCTO_DELETE,
      payload: {
        idProducto: productoCategoria.id,
        refCategoria: productoCategoria.refCategoria,
      },
    });
    setModalEliminar(false);
  };

  // Funcion para Enviar El put de unn ProductoCategoria
  const onSubmitEditar = (values, { setSubmitting }) => {
    const payload = {
      ...values,
    };
    setTimeout(() => {
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);
      // No se ha editado la imagen, por ende no se debe enviar en el PUT
      if (webPreview) {
        const putProducto = {
          nombre: payload.nombre,
          descripcion: payload.desc,
          precio: payload.precio,
          esVisible: payload.esVisible,
          esNuevo: payload.esNuevo,
          isBestProduct: payload.isBestProduct,
          refCategoria: productoCategoria.refCategoria,
        };
        dispatch({
          type: PRODUCTO_UPDATE,
          payload: {
            idProducto: productoCategoria.id,
            producto: putProducto,
          },
        });
        setModalEditar(!modalEditar);
        return;
      }
      if (canAdd) {
        const putProducto = {
          nombre: payload.nombre,
          descripcion: payload.desc,
          precio: payload.precio,
          esVisible: payload.esVisible,
          esNuevo: payload.esNuevo,
          isBestProduct: payload.isBestProduct,
          refCategoria: productoCategoria.refCategoria,
          imagen: output,
        };
        dispatch({
          type: PRODUCTO_UPDATE,
          payload: {
            idProducto: productoCategoria.id,
            producto: putProducto,
          },
        });
        setModalEditar(!modalEditar);
      } else {
        // Enviamos la aleta de que la foto no corresponde
        console.log('Debe ser una imgen tipo png ');
        notificacionWarning(
          'La imagen seleccionada debe ser .PNG O .JPEG',
          'IMAGEN'
        );
      }
    }, 500);
  };

  return (
    <Colxx xxs="12" key={productoCategoria.id} className="mb-2">
      <ContextMenuTrigger id="menu_id" data={productoCategoria.id}>
        <Card className="d-flex flex-row">
          <img
            alt={apiMediaUrl}
            src={apiMediaUrl + productoCategoria.imagen}
            className="list-thumbnail responsive border-0 card-img-left"
          />
          <div className="pl-2 d-flex flex-grow-1 min-width-zero ">
            <div className="card-body-products d-flex justify-content-between align-self-center align-items-lg-center w-100">
              <div className="d-flex flex-column w-70">
                <p className="mb-1 list-item-heading font-weight-semibold">
                  {productoCategoria.nombre}
                </p>
                <p className="mb-1 list-item-heading font-weight-bold ">
                  ${productoCategoria.precio}
                </p>
              </div>
              <div className="d-flex flex-row align-self-center justify-content-end w-100">
                {productoCategoria.isBestProduct && (
                  <Badge
                    color="secondary"
                    className="align-self-center mr-1"
                    pill
                  >
                    MEJORES PRODUCTOS
                  </Badge>
                )}
                {productoCategoria.esNuevo && (
                  <Badge
                    color="secondary"
                    className="align-self-center mr-1"
                    pill
                  >
                    NUEVO
                  </Badge>
                )}
                {productoCategoria.esVisible ? (
                  <Badge
                    color="primary"
                    className="align-self-center mr-1"
                    pill
                  >
                    VISIBLE
                  </Badge>
                ) : (
                  <Badge
                    color="warning"
                    className="align-self-center mr-1"
                    pill
                  >
                    NO VISIBLE
                  </Badge>
                )}
                <Button
                  onClick={() => setModalEliminar(!modalEliminar)}
                  color="danger"
                  className="align-self-center mr-1"
                >
                  Eliminar
                </Button>{' '}
                <Button
                  onClick={() => setModalEditar(!modalEditar)}
                  color="primary"
                  className="align-self-center mr-1"
                >
                  Editar
                </Button>{' '}
              </div>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
      <Modal isOpen={modalEditar} toggle={() => setModalEditar(!modalEditar)}>
        <ModalHeader>{productoCategoria.nombre}</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              nombre: productoCategoria.nombre,
              desc: productoCategoria.descripcion,
              precio: productoCategoria.precio,
              esVisible: productoCategoria.esVisible,
              esNuevo: productoCategoria.esNuevo,
              isBestProduct: productoCategoria.isBestProduct,
              webPreview: true,
              urlMediaImagen: productoCategoria.imagen,
              fileMediaImagen: null,
            }}
            validationSchema={SignupSchema}
            onSubmit={onSubmitEditar}
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
                  <Colxx xxs="12" xs="12" lg="12">
                    <FormGroup className="form-group has-top-label error-l-100 tooltip-label-right">
                      <Label>PRECIO</Label>
                      <Field
                        className="form-control"
                        type="number"
                        min="1"
                        name="precio"
                      />
                      {errors.nombre && touched.nombre ? (
                        <div className="invalid-feedback d-block ">
                          {errors.nombre}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" xs="12" lg="4">
                    <FormGroup className="error-l-100">
                      <Label className="d-block">BEST PRODUCT</Label>
                      <FormikSwitch
                        name="isBestProduct"
                        className="custom-switch custom-switch-primary"
                        value={values.isBestProduct}
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
                  <Colxx xxs="12" xs="12" lg="4">
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
                  <Colxx xxs="12" xs="12" lg="4">
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
                        NUEVA FOTO DEL PRODUCTO (Opcional)
                      </Label>
                      <InputGroup className="mb-3">
                        <Input
                          className="form-control"
                          type="file"
                          name="rutaFoto"
                          onChange={(event) => {
                            const { type } = event.target.files[0];
                            if (type === 'image/jpeg' || type === 'image/png') {
                              setSrc(
                                URL.createObjectURL(event.target.files[0])
                              );
                              setCanAdd(false);
                              setWebPreview(false);
                              setError(null);
                              setModalCut(!modalCut);
                            } else {
                              setSrc(null);
                              setImage(null);
                              setOutput(null);
                              setCanAdd(false);
                              setError(
                                'Imposible visualizar, debe ser formato PNG O JPEG'
                              );
                              setWebPreview(false);
                            }
                          }}
                        />
                      </InputGroup>
                    </FormGroup>
                    {webPreview && (
                      <div>
                        <img
                          src={apiMediaUrl + values.urlMediaImagen}
                          alt="preview"
                          width="250px"
                          height="250px"
                        />
                      </div>
                    )}
                    {output && <PreviewImage base64={output} />}
                    {error && <Label className="d-block">{error}</Label>}
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
          <p>
            Está seguro que desea eliminar la categoria{' '}
            {productoCategoria.nombre}?
          </p>
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
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ThumbListViewProductos);
