import type { IProducto, IProductoRaw } from "./producto-model";

function getImagenPortada(images: IProducto["images"]): string | null {
  if (!images.length) return null;
  const portada = images.find((img) => img.portada === 1);
  return (portada ?? images[0]).miniatura;
}

function getPorcentajeDescuento(normal: number, promocional: number): number {
  return Math.round(((normal - promocional) / normal) * 100);
}

export function productoAdapter(raw: IProductoRaw): IProducto {
  const descuentoActivo = raw.descuento_activo === 1 && raw.precio_promocional != null && raw.precio_promocional > 0;

  return {
    id: raw.id,
    nombre: raw.nombre,
    codigo: raw.codigo,
    descripcion: raw.descripcion,
    precio_normal: raw.precio_normal,
    precio_promocional: raw.precio_promocional,
    descuento_activo: raw.descuento_activo === 1,
    disponible: raw.disponible === 1,
    precio_minimo: raw.precio_minimo,
    category: raw.category,
    images: raw.images,
    imagen_portada: getImagenPortada(raw.images),
    tiene_descuento: descuentoActivo,
    porcentaje_descuento: descuentoActivo ? getPorcentajeDescuento(raw.precio_normal, raw.precio_promocional!) : 0
  };
}

export function productosAdapter(raws: IProductoRaw[]): IProducto[] {
  return raws.map(productoAdapter);
}
