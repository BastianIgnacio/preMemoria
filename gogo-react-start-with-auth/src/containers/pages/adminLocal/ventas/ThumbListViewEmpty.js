import React from 'react';
import { Card } from 'reactstrap';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';

const ThumbListViewEmpty = () => {
  return (
    <Colxx xxs="12" className="mb-3">
      <ContextMenuTrigger id="menu_id">
        <Card>
          <div className=" d-flex flex-grow-1 min-width-zero">
            <div className="card-body justify-content-center ">
              <p className="list-item-heading truncate text-center">
                No hay ventas en este dia.
              </p>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ThumbListViewEmpty);
