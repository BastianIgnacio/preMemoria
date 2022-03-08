import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'categorias',
    icon: 'iconsminds-bucket',
    label: 'Categorias',
    to: `${adminRoot}/categorias`,
  },
  {
    id: 'croductos',
    icon: 'iconsminds-bucket',
    label: 'Productos',
    to: `${adminRoot}/productos`,
  },
  {
    id: 'centas',
    icon: 'iconsminds-bucket',
    label: 'Ventas',
    to: `${adminRoot}/ventas`,
  },
  {
    id: 'configuracionTienda',
    icon: 'iconsminds-bucket',
    label: 'Configuracion',
    to: `${adminRoot}/configuracionTienda`,
  },
  {
    id: 'mercadoPago',
    icon: 'iconsminds-bucket',
    label: 'MercadoPago',
    to: `${adminRoot}/configuracionMercadoPago`,
  },
];
export default data;
