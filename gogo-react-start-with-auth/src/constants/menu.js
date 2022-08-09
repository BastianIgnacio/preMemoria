import { adminRoot, UserRole } from './defaultValues';

const data = [
  {
    id: 'localesComerciales',
    icon: 'iconsminds-shop-2',
    label: 'menu.locales',
    to: `${adminRoot}/localesComerciales`,
    roles: [UserRole.SuperAdmin],
  },
  {
    id: 'administradoresLocalesComerciales',
    icon: 'iconsminds-business-mens',
    label: 'menu.admlocales',
    to: `${adminRoot}/administradoresLocalesComerciales`,
    roles: [UserRole.SuperAdmin],
  },
  {
    id: 'categorias',
    icon: 'iconsminds-receipt-4',
    label: 'menu.categorias',
    to: `${adminRoot}/categorias`,
    roles: [UserRole.AdminLocalComercial],
  },
  {
    id: 'productos',
    icon: 'iconsminds-shopping-cart',
    label: 'menu.productos',
    to: `${adminRoot}/productos`,
    roles: [UserRole.AdminLocalComercial],
  },
  {
    id: 'ventas',
    icon: 'iconsminds-cash-register-2',
    label: 'menu.ventas',
    to: `${adminRoot}/ventas`,
    roles: [UserRole.AdminLocalComercial],
  },
  {
    id: 'ordenes',
    icon: 'iconsminds-check',
    label: 'menu.ordenes',
    to: `${adminRoot}/ordenes`,
    roles: [UserRole.AdminLocalComercial],
  },
  {
    id: 'configuracionTienda',
    icon: 'iconsminds-gear',
    label: 'menu.configuracion',
    to: `${adminRoot}/configuracionTienda`,
    roles: [UserRole.AdminLocalComercial],
  },
  {
    id: 'mercadoPago',
    icon: 'iconsminds-credit-card',
    label: 'menu.mercadopago',
    to: `${adminRoot}/configuracionMercadoPago`,
    roles: [UserRole.AdminLocalComercial],
  },
];
export default data;
