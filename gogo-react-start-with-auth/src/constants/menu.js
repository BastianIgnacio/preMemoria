import { adminRoot, UserRole } from './defaultValues';

const data = [
  {
    id: 'localesComerciales',
    icon: 'iconsminds-shop-2',
    label: 'Locales',
    to: `${adminRoot}/localesComerciales`,
    roles: [UserRole.SuperAdmin],
  },
  {
    id: 'administradoresLocalesComerciales',
    icon: 'iconsminds-business-mens',
    label: 'Adm. Locales',
    to: `${adminRoot}/administradoresLocalesComerciales`,
    roles: [UserRole.SuperAdmin],
  },
  {
    id: 'categorias',
    icon: 'iconsminds-receipt-4',
    label: 'Categorias',
    to: `${adminRoot}/categorias`,
    roles: [UserRole.AdminLocalComercial],
  },
  {
    id: 'productos',
    icon: 'iconsminds-shopping-cart',
    label: 'Productos',
    to: `${adminRoot}/productos`,
    roles: [UserRole.AdminLocalComercial],
  },
  {
    id: 'ventas',
    icon: 'iconsminds-cash-register-2',
    label: 'Ventas',
    to: `${adminRoot}/ventas`,
    roles: [UserRole.AdminLocalComercial],
  },
  {
    id: 'configuracionTienda',
    icon: 'iconsminds-gear',
    label: 'Configuracion',
    to: `${adminRoot}/configuracionTienda`,
    roles: [UserRole.AdminLocalComercial],
  },
  {
    id: 'mercadoPago',
    icon: 'iconsminds-credit-card',
    label: 'MercadoPago',
    to: `${adminRoot}/configuracionMercadoPago`,
    roles: [UserRole.AdminLocalComercial],
  },
];
export default data;
