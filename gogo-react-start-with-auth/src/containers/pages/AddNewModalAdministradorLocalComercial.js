import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from 'reactstrap';
import IntlMessages from '../../helpers/IntlMessages';

const AddNewModalAdministradorLocalComercial = ({ modalOpen, toggleModal }) => {
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id="Añadir Administrador de Local Comercial" />
      </ModalHeader>
      <ModalBody>
        <Label className="mt-4">
          <IntlMessages id="Correo Electronico" />
        </Label>
        <Input />
        <Label className="mt-4">
          <IntlMessages id="Clave" />
        </Label>
        <Input />
        <Label className="mt-4">
          <IntlMessages id="Nombre" />
        </Label>
        <Input />
        <Label className="mt-4">
          <IntlMessages id="Apellidos" />
        </Label>
        <Input />
        <Label className="mt-4">
          <IntlMessages id="Telefono" />
        </Label>
        <Input />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          <IntlMessages id="Cancelar" />
        </Button>
        <Button color="primary" onClick={toggleModal}>
          <IntlMessages id="Agregar" />
        </Button>{' '}
      </ModalFooter>
    </Modal>
  );
};

export default AddNewModalAdministradorLocalComercial;
