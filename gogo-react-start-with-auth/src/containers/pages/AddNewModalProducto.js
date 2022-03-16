import React from 'react';
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import Select from 'react-select';
import IntlMessages from '../../helpers/IntlMessages';
import CustomSelectInput from '../../components/common/CustomSelectInput';

const AddNewModalCategoria = ({ modalOpen, toggleModal }) => {
  const categories = [
    { label: 'ADM1', value: 'Cakes', key: 0 },
    { label: 'ADM2', value: 'Cupcakes', key: 1 },
    { label: 'ADM3', value: 'Desserts', key: 2 },
  ];
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id="Añadir Producto" />
      </ModalHeader>
      <ModalBody>
        <Label className="mt-4">
          <IntlMessages id="Nombre producto" />
        </Label>
        <Input />
        <Label className="mt-4">
          <IntlMessages id="Categoria del producto" />
        </Label>
        <Select
          components={{ Input: CustomSelectInput }}
          className="react-select"
          classNamePrefix="react-select"
          name="form-field-name"
          options={categories}
        />
        <Label className="mt-4">
          <IntlMessages id="Precio" />
        </Label>
        <Input />
        <Label className="mt-4">
          <IntlMessages id="Estado del articulo" />
        </Label>
        <CustomInput
          type="radio"
          id="exCustomRadio"
          name="customRadio"
          label="En linea"
        />
        <CustomInput
          type="radio"
          id="exCustomRadio2"
          name="customRadio"
          label="Fuera de linea"
        />
        <Label className="mt-4">
          <IntlMessages id="Fotos del producto" />
        </Label>
        <InputGroup className="mb-3">
          <CustomInput
            type="file"
            id="exampleCustomFileBrowser2"
            name="customFile"
          />
          <InputGroupAddon addonType="append">Upload</InputGroupAddon>
        </InputGroup>
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
