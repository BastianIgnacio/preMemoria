import React from 'react';
import {
  CardSubtitle,
  Card,
  CardBody,
  CardImg,
  Badge,
  CardText,
} from 'reactstrap';
import { Colxx } from '../../components/common/CustomBootstrap';

const ImageCardModalProducto = () => {
  return (
    <Colxx xxs="12" xs="12" lg="6">
      <Card className="mb-4">
        <div className="position-relative">
          <CardImg
            top
            src="/assets/img/cards/thumb-1.jpg"
            alt="Card image cap"
          />
          <Badge
            color="primary"
            pill
            className="position-absolute badge-top-left"
          >
            NEW
          </Badge>
          <Badge
            color="secondary"
            pill
            className="position-absolute badge-top-left-2"
          >
            TRENDING
          </Badge>
        </div>
        <CardBody>
          <CardSubtitle className="mb-4">
            Homemade Cheesecake with Fresh Berries and Mint
          </CardSubtitle>
          <CardText className="text-muted text-small mb-0 font-weight-light">
            09.04.2018
          </CardText>
        </CardBody>
      </Card>
    </Colxx>
  );
};

export default ImageCardModalProducto;
