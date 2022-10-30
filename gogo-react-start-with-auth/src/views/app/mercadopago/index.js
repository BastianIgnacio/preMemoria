import React, { Suspense, useState } from 'react';
import { withRouter, Switch, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import TiendaLayout from '../../../layout/TiendaLayout';

const Success = React.lazy(() =>
  // eslint-disable-next-line prettier/prettier
  import(/* webpackChunkName: "viwes-blank-page" */ './success')
);

const Pending = React.lazy(() =>
  // eslint-disable-next-line prettier/prettier
  import(/* webpackChunkName: "viwes-blank-page" */ './pending')
);

const Failure = React.lazy(() =>
  // eslint-disable-next-line prettier/prettier
  import(/* webpackChunkName: "viwes-blank-page" */ './failure')
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
            <Route
              path={`${match.url}/success`}
              component={(props) => (
                <Success llamarPadre={handleFunction} {...props} />
              )}
            />
            <Route
              path={`${match.url}/pending`}
              component={(props) => (
                <Pending llamarPadre={handleFunction} {...props} />
              )}
            />
            <Route
              path={`${match.url}/failure`}
              component={(props) => (
                <Failure llamarPadre={handleFunction} {...props} />
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
