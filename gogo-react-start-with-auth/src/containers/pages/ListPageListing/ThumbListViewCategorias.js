import React, { useState } from 'react';
import {
  Card,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../components/common/CustomBootstrap';

const ThumbListViewCategorias = ({
  product,
  isSelect,
  collect,
  onCheckItem,
}) => {
  const [modalBasic, setModalBasic] = useState(false);
  return (
    <Colxx xxs="12" key={product.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={product.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, product.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          <NavLink to={`?p=${product.id}`} className="d-flex">
            <img
              alt={product.title}
              src={product.img}
              className="list-thumbnail responsive border-0 card-img-left"
            />
          </NavLink>
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <p className="list-item-heading mb-1 truncate">
                NOMBRE CATEGORIA
              </p>
              <NavLink to={`?p=${product.id}`} className="w-10 w-sm-100">
                <p className="mb-1 text-muted text-small w-100 w-sm-100">
                  12 Productos
                </p>
              </NavLink>
              <div className="w-10 w-sm-10 mb-1">
                <Badge color={product.statusColor} pill>
                  ACTIVO
                </Badge>
              </div>
              <Button
                onClick={() => setModalBasic(!modalBasic)}
                color="primary"
                className="mb-2"
              >
                Editar
              </Button>{' '}
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
      <Modal isOpen={modalBasic} toggle={() => setModalBasic(!modalBasic)}>
        <ModalHeader>Titulo modal {product.id}</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, incididunt
          ut labore et dolore magna aliqua. Ut enim ad veniam, nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo commodo
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setModalBasic(false)}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={() => setModalBasic(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ThumbListViewCategorias);
