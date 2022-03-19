import React from 'react';
import { Row, Card, CardBody, Badge } from 'reactstrap';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import { useParams, NavLink, Redirect } from 'react-router-dom';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { categorias } from '../../../data/categorias';
import BreadcrumbTienda from '../../../containers/navs/BreadcrumbTienda';

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const Carrito = (props) => {
  const { id } = useParams();
  const actualizarNav = () => {
    props.llamarPadre(id);
  };
  const existe = true;
  if (!existe) {
    return <Redirect to="/error" />;
  }
  const listCategorias = categorias.map((categoria, index) => {
    return (
      // eslint-disable-next-line react/no-array-index-key
      <Colxx xxs="12" lg="4" className="mb-5" key={`categoria_${index}`}>
        <Card className="flex-row listing-card-container">
          <div className="w-40 position-relative">
            <NavLink to={`${id}/${categoria.id_categoria}`}>
              <img
                className="card-img-left"
                src={categoria.thumb}
                alt="Card cap"
              />
              {categoria.badge && (
                <Badge
                  color="primary"
                  pill
                  className="position-absolute badge-top-left"
                >
                  {categoria.badge}
                </Badge>
              )}
            </NavLink>
          </div>
          <div className="w-60 d-flex align-items-center">
            <CardBody>
              <NavLink to={`${id}/${categoria.id_categoria}`}>
                <ResponsiveEllipsis
                  className="mb-3 listing-heading"
                  text={categoria.title}
                  maxLine="2"
                  trimRight
                  basedOn="words"
                  component="h5"
                />
              </NavLink>
              <ResponsiveEllipsis
                className="listing-desc text-muted"
                text={categoria.description}
                maxLine="3"
                trimRight
                basedOn="words"
                component="p"
              />
            </CardBody>
          </div>
        </Card>
      </Colxx>
    );
  });
  actualizarNav(id);
  return (
    <Row>
      <Colxx xxs="12">
        <BreadcrumbTienda heading="Carrito de compras de " nombreTienda={id} />
        <Separator className="mb-5" />
      </Colxx>
      {listCategorias}
    </Row>
  );
};

export default Carrito;
