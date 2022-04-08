import {
  TIENDA_LIST_GET_PRODUCTS,
  TIENDA_LIST_GET_PRODUCTS_SUCCESS,
} from '../actions';

const INIT_STATE = {
  categorias_y_productos: [
    {
      idCategoria: 'cat1',
      idLocalComercial: 1,
      nombreCategoria: 'Herramientas',
      descripcionCategoria: 'Todo sobre herramientas para el hogar',
      rutaFotoCategoria: '/assets/img/blog/small-5.jpg',
      badgeCategoria: 'NUEVO',
      type: 'image',
      esVisible: true,
      productos: [
        {
          idCategoria: 'cat1',
          idProducto: '001',
          nombreProducto: 'Producto 1',
          descripcionProducto: 'Aqui va la descripcion del producto',
          precioProducto: 6900,
          rutaFotoProducto: '/assets/img/blog/producto1.jpg',
          badgeProducto: 'NEW',
        },
        {
          idCategoria: 'cat1',
          idProducto: '002',
          nombreProducto: 'Producto 2',
          descripcionProducto: 'Aqui va la descripcion del producto',
          precioProducto: 6900,
          rutaFotoProducto: '/assets/img/blog/producto1.jpg',
          badgeProducto: 'NEW',
        },
        {
          idCategoria: 'cat1',
          idProducto: '003',
          nombreProducto: 'Producto 3',
          descripcionProducto: 'Aqui va la descripcion del producto',
          precioProducto: 6900,
          rutaFotoProducto: '/assets/img/blog/producto1.jpg',
          badgeProducto: 'NEW',
        },
      ],
    },
    {
      idCategoria: 'cat1',
      idLocalComercial: 1,
      nombreCategoria: 'Herramientas',
      descripcionCategoria: 'Todo sobre herramientas para el hogar',
      rutaFotoCategoria: '/assets/img/blog/small-5.jpg',
      badgeCategoria: 'NUEVO',
      type: 'image',
      esVisible: true,
      productos: [
        {
          idCategoria: 'cat1',
          idProducto: '004',
          nombreProducto: 'Producto 4',
          descripcionProducto: 'Aqui va la descripcion del producto',
          precioProducto: 6900,
          rutaFotoProducto: '/assets/img/blog/producto1.jpg',
          badgeProducto: 'NEW',
        },
        {
          idCategoria: 'cat1',
          idProducto: '005',
          nombreProducto: 'Producto 5',
          descripcionProducto: 'Aqui va la descripcion del producto',
          precioProducto: 6900,
          rutaFotoProducto: '/assets/img/blog/producto1.jpg',
          badgeProducto: 'NEW',
        },
        {
          idCategoria: 'cat1',
          idProducto: '006',
          nombreProducto: 'Producto 6',
          descripcionProducto: 'Aqui va la descripcion del producto',
          precioProducto: 6900,
          rutaFotoProducto: '/assets/img/blog/producto1.jpg',
          badgeProducto: 'NEW',
        },
      ],
    },
    {
      idCategoria: 'cat1',
      idLocalComercial: 1,
      nombreCategoria: 'Herramientas',
      descripcionCategoria: 'Todo sobre herramientas para el hogar',
      rutaFotoCategoria: '/assets/img/blog/small-5.jpg',
      badgeCategoria: 'NUEVO',
      type: 'image',
      esVisible: true,
      productos: [
        {
          idCategoria: 'cat1',
          idProducto: '007',
          nombreProducto: 'Producto 7',
          descripcionProducto: 'Aqui va la descripcion del producto',
          precioProducto: 6900,
          rutaFotoProducto: '/assets/img/blog/producto1.jpg',
          badgeProducto: 'NEW',
        },
        {
          idCategoria: 'cat1',
          idProducto: '008',
          nombreProducto: 'Producto 8',
          descripcionProducto: 'Aqui va la descripcion del producto',
          precioProducto: 6900,
          rutaFotoProducto: '/assets/img/blog/producto1.jpg',
          badgeProducto: 'NEW',
        },
        {
          idCategoria: 'cat1',
          idProducto: '009',
          nombreProducto: 'Producto 9',
          descripcionProducto: 'Aqui va la descripcion del producto',
          precioProducto: 6900,
          rutaFotoProducto: '/assets/img/blog/producto1.jpg',
          badgeProducto: 'NEW',
        },
      ],
    },
  ],
  idLocalComercial: 1,
  nombreLocalComercial: 'Tienda de prueba',
  horarioAtencion: 'desde 12:00 hasta 21:00',
  isOpen: false,
  logo: 'ruta/logo',
  loading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TIENDA_LIST_GET_PRODUCTS:
      // eslint-disable-next-line no-debugger
      return {
        ...state,
        loading: false,
      };
    case TIENDA_LIST_GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: true,
        categorias_y_productos: action.payload,
      };
    default:
      return { ...state };
  }
};
