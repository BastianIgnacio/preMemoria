import React from 'react';
import { Row } from 'reactstrap';
import Pagination from '../Pagination';
import ContextMenuContainer from '../ContextMenuContainer';
import ThumbListViewLocalesComerciales from './ThumbListViewLocalesComerciales';

function collect(props) {
  return { data: props.data };
}

const ListPageListingLocalesComerciales = ({
  items,
  displayMode,
  currentPage,
  totalPage,
  onContextMenuClick,
  onContextMenu,
  onChangePage,
}) => {
  return (
    <Row>
      {items.map((localComercial) => {
        if (displayMode === 'thumblist') {
          return (
            <ThumbListViewLocalesComerciales
              key={localComercial.id}
              localComercial={localComercial}
              collect={collect}
            />
          );
        }
        return <div key={localComercial.id} />;
      })}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i) => onChangePage(i)}
      />
      <ContextMenuContainer
        onContextMenuClick={onContextMenuClick}
        onContextMenu={onContextMenu}
      />
    </Row>
  );
};

export default React.memo(ListPageListingLocalesComerciales);
