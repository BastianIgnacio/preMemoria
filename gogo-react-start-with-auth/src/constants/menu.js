import { adminRoot, UserRole } from './defaultValues';

const data = [
  {
    id: 'localesComerciales',
    icon: 'iconsminds-bucket',
    label: 'Locales',
    to: `${adminRoot}/localesComerciales`,
    roles: [UserRole.SuperAdmin],
  },
  {
    id: 'administradoresLocalesComerciales',
    icon: 'iconsminds-bucket',
    label: 'Adm. Locales',
    to: `${adminRoot}/administradoresLocalesComerciales`,
    roles: [UserRole.SuperAdmin],
  },
  {
    id: 'categorias',
    icon: 'iconsminds-bucket',
    label: 'Categorias',
    to: `${adminRoot}/categorias`,
    roles: [UserRole.AdminLocalComercial],
  },
  {
    id: 'productos',
    icon: 'iconsminds-bucket',
    label: 'Productos',
    to: `${adminRoot}/productos`,
    roles: [UserRole.AdminLocalComercial],
  },
  {
    id: 'ventas',
    icon: 'iconsminds-bucket',
    label: 'Ventas',
    to: `${adminRoot}/ventas`,
    roles: [UserRole.AdminLocalComercial],
  },
  {
    id: 'configuracionTienda',
    icon: 'iconsminds-bucket',
    label: 'Configuracion',
    to: `${adminRoot}/configuracionTienda`,
    roles: [UserRole.AdminLocalComercial],
  },
  {
    id: 'mercadoPago',
    icon: 'iconsminds-bucket',
    label: 'MercadoPago',
    to: `${adminRoot}/configuracionMercadoPago`,
    roles: [UserRole.AdminLocalComercial],
  },
];
export default data;
