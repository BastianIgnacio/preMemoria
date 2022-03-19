/* eslint-disable react/no-array-index-key */
import React from 'react';
import IntlMessages from '../../helpers/IntlMessages';

const BreadcrumbContainer = ({ heading, nombreTienda }) => {
  return (
    <>
      {heading && (
        <h1>
          <IntlMessages id={heading + nombreTienda} />
        </h1>
      )}
    </>
  );
};

export default BreadcrumbContainer;
