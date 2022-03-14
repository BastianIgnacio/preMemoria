import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';
// import { ProtectedRoute, UserRole } from '../../helpers/authHelper';

const Gogo = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './gogo')
);
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './blank-page')
);
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
  // eslint-disable-next-line prettier/prettier
  import(/* webpackChunkName: "viwes-blank-page" */ './configuracionMercadoPago')
);

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/gogo`} />
            <Route
              path={`${match.url}/gogo`}
              render={(props) => <Gogo {...props} />}
            />
            {/* <ProtectedRoute
                    path={`${match.url}/second-menu`}
                    component={SecondMenu}
                    roles={[UserRole.Admin]}
            /> */}
            <Route
              path={`${match.url}/blank-page`}
              render={(props) => <BlankPage {...props} />}
            />
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
