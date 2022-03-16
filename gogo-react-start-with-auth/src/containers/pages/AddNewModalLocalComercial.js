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
import Select from 'react-select';
import IntlMessages from '../../helpers/IntlMessages';
import CustomSelectInput from '../../components/common/CustomSelectInput';

const AddNewModalLocalComercial = ({ modalOpen, toggleModal }) => {
  const admins = [
    { label: 'Cakes', value: 'Cakes', key: 0 },
    { label: 'Cupcakes', value: 'Cupcakes', key: 1 },
    { label: 'Desserts', value: 'Desserts', key: 2 },
  ];

  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id="Añadir Local Comercial" />
      </ModalHeader>
      <ModalBody>
        <Label className="mt-4">
          <IntlMessages id="Administrador del Local Comercial" />
        </Label>
        <Select
          components={{ Input: CustomSelectInput }}
          className="react-select"
          classNamePrefix="react-select"
          name="form-field-name"
          options={admins}
        />
        <Label className="mt-4">
          <IntlMessages id="Nombre" />
        </Label>
        <Input />
        <Label className="mt-4">
          <IntlMessages id="Direccion" />
        </Label>
        <Input />
        <Label className="mt-4">
          <IntlMessages id="Link Tienda" />
        </Label>
        <Input />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          <IntlMessages id="Cancelar" />
        </Button>
        <Button color="primary" onClick={toggleModal}>
          <IntlMessages id="Nuevo Local Comercial" />
        </Button>{' '}
      </ModalFooter>
    </Modal>
  );
};

export default AddNewModalLocalComercial;
