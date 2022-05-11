import React from 'react';
import { Row } from 'reactstrap';
import Pagination from '../Pagination';
import DataListView from '../DataListView';
import ImageListView from '../ImageListView';
import ThumbListViewAdminLocalComercial from './ThumbListViewAdminLocalComercial';

function collect(props) {
  return { data: props.data };
}

const ListPageListingAdminLocalComercial = ({
  items,
  displayMode,
  selectedItems,
  onCheckItem,
  currentPage,
  totalPage,
  onChangePage,
}) => {
  return (
    <Row>
      {items.map((product) => {
        if (displayMode === 'imagelist') {
          return (
            <ImageListView
              key={product.id}
              product={product}
              isSelect={selectedItems.includes(product.id)}
              collect={collect}
              onCheckItem={onCheckItem}
            />
          );
        }
        if (displayMode === 'thumblist') {
          return (
            <ThumbListViewAdminLocalComercial
              key={product.id}
              administradorLocalComercial={product}
              collect={collect}
              onCheckItem={onCheckItem}
            />
          );
        }
        return (
          <DataListView
            key={product.id}
            product={product}
            isSelect={selectedItems.includes(product.id)}
            onCheckItem={onCheckItem}
            collect={collect}
          />
        );
      })}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i) => onChangePage(i)}
      />
    </Row>
  );
};

export default React.memo(ListPageListingAdminLocalComercial);
