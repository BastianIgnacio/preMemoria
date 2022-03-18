import React from 'react';
import {
  CardText,
  Row,
  Card,
  CardImg,
  CardTitle,
  CardImgOverlay,
} from 'reactstrap';
import { useParams } from 'react-router-dom';
import { Colxx } from '../../../components/common/CustomBootstrap';

const Tienda = () => {
  const categorias = [
    { label: 'Completos', value: 'maule', key: 0 },
    { label: 'Tecnologia', value: 'metropolitana', key: 1 },
    { label: 'Veganos', value: 'ohiggins', key: 2 },
  ];

  const listCategorias = categorias.map((categoria) => (
    <div key={categoria.key}>
      <Card inverse className="mb-4">
        <CardImg
          src="../../../../assets/img/cards/thumb-1.jpg"
          alt="Card image cap"
        />
        <CardImgOverlay>
          <CardTitle>{categoria.label}</CardTitle>
          <CardText>
            This is a wider card with supporting text below as a natural
            additional content.
          </CardText>
        </CardImgOverlay>
      </Card>
    </div>
  ));

  const { id } = useParams();
  return (
    <>
      <Row>
        <p>Tienda : {id}</p>
        <Colxx xxs="12" xs="6" lg="3">
          {listCategorias}
        </Colxx>
      </Row>
    </>
  );
};

export default Tienda;
