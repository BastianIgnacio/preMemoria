import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const MercadopagoCheckOutPro = () => {
  const preferenceId = useSelector((state) => state.carrito.preferenceId);

  const FORM_ID = 'cho-container';
  const addCheckout = () => {
    const mp = new window.MercadoPago(
      'TEST-e82d5628-cf59-4d51-ad56-b391a41db165',
      {
        locale: 'es-CL',
      }
    );
    // Inicializa el checkout
    mp.checkout({
      preference: {
        id: preferenceId,
      },
      autoOpen: true,
    });
  };

  useEffect(() => {
    if (preferenceId) {
      // con el preferenceId en mano, inyectamos el script de mercadoPago
      console.log('entrando al scrip2t');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://sdk.mercadopago.com/js/v2';
      script.setAttribute('data-preference-id', preferenceId);
      script.addEventListener('load', addCheckout); // Cuando cargue el script, se ejecutará la función addCheckout
      const form = document.getElementById(FORM_ID);
      form.appendChild(script);
    }
  });

  return <div id={FORM_ID} />;
};
export default React.memo(MercadopagoCheckOutPro);
