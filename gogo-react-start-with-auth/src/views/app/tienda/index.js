import React, { Suspense } from 'react';
import { withRouter, Switch, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import TiendaLayout from '../../../layout/TiendaLayout';

// eslint-disable-next-line no-unused-vars
import { ProtectedRoute } from '../../../helpers/authHelper';
// eslint-disable-next-line no-unused-vars
import { UserRole } from '../../../constants/defaultValues';

const CategoriasTienda = React.lazy(() =>
  // eslint-disable-next-line prettier/prettier
  import(/* webpackChunkName: "viwes-blank-page" */ './categorias')
);
const ProductosCategoria = React.lazy(() =>
  // eslint-disable-next-line prettier/prettier
  import(/* webpackChunkName: "viwes-blank-page" */ './productos')
);

const AppTienda = ({ match }) => {
  return (
    <TiendaLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Route
              path={`${match.url}/:link/:refCategoria`}
              component={() => <ProductosCategoria />}
            />
            <Route
              path={`${match.url}/:link`}
              component={() => <CategoriasTienda />}
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

export default withRouter(connect(mapStateToProps, {})(AppTienda));
