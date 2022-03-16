import React, { Suspense } from 'react';
import { withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';
// eslint-disable-next-line no-unused-vars
import { ProtectedRoute } from '../../helpers/authHelper';
// eslint-disable-next-line no-unused-vars
import { UserRole } from '../../constants/defaultValues';

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
const LocalesComerciales = React.lazy(() =>
  // eslint-disable-next-line prettier/prettier
  import(/* webpackChunkName: "viwes-blank-page" */ './localesComerciales')
);
const AdmsLocalesComerciales = React.lazy(() =>
  // eslint-disable-next-line prettier/prettier
  import(/* webpackChunkName: "viwes-blank-page" */ './admsLocalesComerciales')
);

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            {/* <ProtectedRoute
                    path={`${match.url}/second-menu`}
                    component={SecondMenu}
                    roles={[UserRole.Admin]}
            /> */}
            <ProtectedRoute
              path={`${match.url}/localesComerciales`}
              component={(props) => <LocalesComerciales {...props} />}
              roles={[UserRole.SuperAdmin]}
            />
            <ProtectedRoute
              path={`${match.url}/administradoresLocalesComerciales`}
              component={(props) => <AdmsLocalesComerciales {...props} />}
              roles={[UserRole.SuperAdmin]}
            />
            <ProtectedRoute
              path={`${match.url}/categorias`}
              component={(props) => <Categorias {...props} />}
              roles={[UserRole.AdminLocalComercial]}
            />
            <ProtectedRoute
              path={`${match.url}/productos`}
              component={(props) => <Productos {...props} />}
              roles={[UserRole.AdminLocalComercial]}
            />
            <ProtectedRoute
              path={`${match.url}/ventas`}
              component={(props) => <Ventas {...props} />}
              roles={[UserRole.AdminLocalComercial]}
            />
            <ProtectedRoute
              path={`${match.url}/configuracionTienda`}
              component={(props) => <ConfiguracionTienda {...props} />}
              roles={[UserRole.AdminLocalComercial]}
            />
            <ProtectedRoute
              path={`${match.url}/configuracionMercadoPago`}
              component={(props) => <ConfiguracionMercadoPago {...props} />}
              roles={[UserRole.AdminLocalComercial]}
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
