/* eslint-disable prettier/prettier */
import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';
// import { ProtectedRoute, UserRole } from '../../helpers/authHelper';

const Categorias = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './categorias')
);

const Productos = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './productos')
);

const Ventas = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './ventas')
);
const ConfiguracionTienda = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './configuracionTienda')
);

const ConfiguracionMercadoPago = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './configuracionMercadoPago')
);

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/gogo`} />
            {/* <ProtectedRoute
                    path={`${match.url}/second-menu`}
                    component={SecondMenu}
                    roles={[UserRole.Admin]}
            /> */}
            <Route
              path={`${match.url}/categorias`}
              render={(props) => <Categorias {...props} />}
            />
            <Route
              path={`${match.url}/productos`}
              render={(props) => <Productos {...props} />}
            />
            <Route
              path={`${match.url}/ventas`}
              render={(props) => <Ventas {...props} />}
            />
            <Route
              path={`${match.url}/configuracionTienda`}
              render={(props) => <ConfiguracionTienda {...props} />}
            />
            <Route
              path={`${match.url}/configuracionMercadoPago`}
              render={(props) => <ConfiguracionMercadoPago {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
