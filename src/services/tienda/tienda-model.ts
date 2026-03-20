export interface ITiendaOption {
  key: string;
  value: string;
  json?: boolean;
}

export interface ITiendaRaw {
  success: boolean;
  results: ITiendaOption[];
}

export interface ITienda {
  tienda_nombre: string;
  tienda_descripcion: string;
  tienda_telefono: string;
  tienda_whatsapp: string;
  tienda_email: string;
  tienda_direccion: string;
  tienda_logo: string;
  tienda_banner: string;
  tienda_color: string;
  tienda_activa: boolean;
  tienda_envio_costo: string;
  tienda_envio_gratis_desde: string;
}
