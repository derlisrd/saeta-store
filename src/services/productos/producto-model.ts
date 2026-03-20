export interface IProductoImage {
  id: number;
  url: string;
  miniatura: string;
  portada: number;
}

export interface IProductoCategory {
  id: number;
  nombre: string;
}

export interface IProducto {
  id: number;
  nombre: string;
  codigo: string;
  descripcion: string | null;
  precio_normal: number;
  precio_promocional: number | null;
  descuento_activo: boolean;
  disponible: boolean;
  precio_minimo: number;
  category: IProductoCategory | null;
  images: IProductoImage[];
  // computed
  imagen_portada: string | null;
  tiene_descuento: boolean;
  porcentaje_descuento: number;
}

export interface IProductoRaw {
  id: number;
  nombre: string;
  codigo: string;
  descripcion: string | null;
  precio_normal: number;
  precio_promocional: number | null;
  descuento_activo: number;
  disponible: number;
  precio_minimo: number;
  category: IProductoCategory | null;
  images: IProductoImage[];
}

export interface IProductoListResponse {
  success: boolean;
  results: IProductoRaw[];
}

export interface IProductoDetailResponse {
  success: boolean;
  results: IProductoRaw;
}
