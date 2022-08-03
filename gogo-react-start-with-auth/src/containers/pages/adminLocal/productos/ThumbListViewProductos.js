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
import { apiMediaUrl } from '../../../../constants/defaultValues';

const ThumbListViewProductos = ({ productoCategoria }) => {
  const dispatch = useDispatch();
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  // Validacion para el form que edita los datos de un local comercial
  const SignupSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es requerido!'),
  });

  const onSubmitEliminar = () => {
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
      // Consultamos si el PUT tiene foto
      if (payload.imagen === null || payload.imagen === undefined) {
        // El PUT no tiene foto

        // despachamos la action y hacemos el return

        setModalEditar(!modalEditar);
        return;
      }
      // .............................................
      // .............................................
      // El put si tiene foto
      const { type } = payload.rutaFoto;
      // Validamos la foto
      if (type === 'image/jpeg' || type === 'image/png') {
        // Aca deberiamos llamar a la API PARA ENVIAR EL PEDIDO
      }
    }, 500);
  };

  return (
    <Colxx xxs="12" key={productoCategoria.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={productoCategoria.id}>
        <Card>
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <p className="list-item-heading mb-1 truncate">
                {productoCategoria.nombre}
              </p>
              <div className="w-5 w-sm-10 mb-1">
                <Badge color={productoCategoria.statusColor} pill>
                  ACTIVO
                </Badge>
              </div>
              <div className="w-5 w-sm-10 mb-1">
                <Button
                  onClick={() => setModalEliminar(!modalEliminar)}
                  color="danger"
                  className="mb-2"
                >
                  Eliminar
                </Button>{' '}
              </div>
              <div className="w-5 w-sm-10 mb-1">
                <Button
                  onClick={() => setModalEditar(!modalEditar)}
                  color="primary"
                  className="mb-2"
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
              descripcion: productoCategoria.descripcion,
              esVisible: productoCategoria.esVisible,
              esNuevo: productoCategoria.esNuevo,
              isBestProduct: productoCategoria.isBestProduct,
              imagen: productoCategoria.imagen,
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
                        NUEVA FOTO DE LA CATEGORIA (Opcional)
                      </Label>
                      <InputGroup className="mb-3">
                        <Input
                          className="form-control"
                          type="file"
                          name="imagen"
                          onChange={(event) => {
                            setFieldValue('imagen', event.target.files[0]);
                          }}
                        />
                      </InputGroup>
                    </FormGroup>
                    {values.imagen && (
                      <PreviewImage file={apiMediaUrl + values.imagen} />
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
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ThumbListViewProductos);
