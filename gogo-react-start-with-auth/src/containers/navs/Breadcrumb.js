/* eslint-disable react/no-array-index-key */
import React from 'react';
import IntlMessages from '../../helpers/IntlMessages';

const BreadcrumbContainer = ({ heading }) => {
  return (
    <>
      {heading && (
        <h1>
          <IntlMessages id={heading} />
        </h1>
      )}
    </>
  );
};

export default BreadcrumbContainer;
