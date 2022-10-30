/* eslint-disable camelcase */
/* eslint-disable new-cap */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable new-cap */
/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { Row, Card, CardBody, Table, Button } from 'reactstrap';

// eslint-disable-next-line no-unused-vars
import { Colxx } from '../../../components/common/CustomBootstrap';

const Success = () => {
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const collection_id = params.get('collection_id');
  const collection_status = params.get('collection_status');
  const payment_id = params.get('payment_id');
  const status = params.get('status');
  const external_reference = params.get('external_reference');
  const merchant_order_id = params.get('merchant_order_id');
  const preference_id = params.get('preference_id');
  const site_id = params.get('site_id');
  const processing_mode = params.get('processing_mode');
  const merchant_account_id = params.get('merchant_account_id');

  // METODO PARA CONSULTAR EL ESTADO DE UNA PREFERENCIA
  /*
  const actualizarConsultarPreference = () => {
    dispatch({
      type: CARRITO_CONSULTAR_PREFERENCE,
      payload: external_reference,
    });
  };
*/

  return (
    <>
      <p className="text-muted text-small text-center">SUCESS MERCADOPAGO</p>
      <p className="text-muted text-small text-center">{collection_id}</p>
      <p className="text-muted text-small text-center">{collection_status}</p>
      <p className="text-muted text-small text-center">{payment_id}</p>
      <p className="text-muted text-small text-center">{status}</p>
      <p className="text-muted text-small text-center">{external_reference}</p>
      <p className="text-muted text-small text-center">{merchant_order_id}</p>
      <p className="text-muted text-small text-center">{preference_id}</p>
      <p className="text-muted text-small text-center">{site_id}</p>
      <p className="text-muted text-small text-center">{processing_mode}</p>
      <p className="text-muted text-small text-center">{merchant_account_id}</p>
    </>
  );
};
export default Success;
