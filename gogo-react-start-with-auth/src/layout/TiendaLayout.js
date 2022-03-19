import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TopNavTienda from '../containers/navs/tienda/TopnavTienda';
import Footer from '../containers/navs/Footer';

const TiendaLayout = ({ containerClassnames, children, history, idTienda }) => {
  return (
    <div id="app-container" className={containerClassnames}>
      <TopNavTienda history={history} idTienda={idTienda} />
      <main>
        <div className="container-fluid">{children}</div>
      </main>
      <Footer />
    </div>
  );
};
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};
const mapActionToProps = {};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(TiendaLayout)
);
