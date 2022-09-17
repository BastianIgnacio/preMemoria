import React, { Suspense, useState } from 'react';
import { withRouter, Switch, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import TiendaLayout from '../../../layout/TiendaLayout';

const Success = React.lazy(() =>
  // eslint-disable-next-line prettier/prettier
  import(/* webpackChunkName: "viwes-blank-page" */ './success')
);
const Print = React.lazy(() =>
  // eslint-disable-next-line prettier/prettier
  import(/* webpackChunkName: "viwes-blank-page" */ './print')
);

const AppSuccess = ({ match }) => {
  // eslint-disable-next-line no-unused-vars
  const [idTienda, setIdTienda] = useState('asdasd');
  const handleFunction = (id) => {
    setIdTienda(id);
  };
  return (
    <TiendaLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Route path={`${match.url}/print`} component={() => <Print />} />
            <Route
              path={`${match.url}/:id`}
              component={(props) => (
                <Success llamarPadre={handleFunction} {...props} />
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

export default withRouter(connect(mapStateToProps, {})(AppSuccess));
