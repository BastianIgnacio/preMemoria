import React, { Suspense, useState } from 'react';
import { withRouter, Switch, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import TiendaLayout from '../../../layout/TiendaLayout';

// eslint-disable-next-line no-unused-vars
import { ProtectedRoute } from '../../../helpers/authHelper';
// eslint-disable-next-line no-unused-vars
import { UserRole } from '../../../constants/defaultValues';

const Carrito = React.lazy(() =>
  // eslint-disable-next-line prettier/prettier
  import(/* webpackChunkName: "viwes-blank-page" */ './carrito')
);

const AppCarrito = ({ match }) => {
  const [idTienda, setIdTienda] = useState('asdasd');
  const handleFunction = (id) => {
    console.log('You clicked submit.');
    console.log(id);
    setIdTienda(id);
  };
  return (
    <TiendaLayout idTienda={idTienda}>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Route
              path={`${match.url}/:link`}
              component={(props) => (
                <Carrito llamarPadre={handleFunction} {...props} />
              )}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </TiendaLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(AppCarrito));
