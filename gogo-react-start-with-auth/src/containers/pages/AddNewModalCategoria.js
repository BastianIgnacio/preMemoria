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

const AddNewModalCategoria = ({ modalOpen, toggleModal }) => {
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id="Añadir Nueva Categoria" />
      </ModalHeader>
      <ModalBody>
        <Label>
          <IntlMessages id="Nombre categoria" />
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

export default AddNewModalCategoria;
