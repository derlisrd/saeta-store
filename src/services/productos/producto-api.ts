import { BASE, HEADERS } from "../base";
import { productosAdapter, productoAdapter } from "./producto-adapter";
import type { IProducto, IProductoListResponse, IProductoDetailResponse } from "./producto-model";

export const productosApi = {
  lista: async (): Promise<IProducto[]> => {
    const res = await fetch(`${BASE}/productos`, { headers: HEADERS });
    if (!res.ok) throw new Error(`Error al obtener los productos: HTTP ${res.status}`);

    const data: IProductoListResponse = await res.json();
    return productosAdapter(data.results);
  },

  detalle: async (id: number): Promise<IProducto> => {
    const res = await fetch(`${BASE}/productos/${id}`, { headers: HEADERS });
    if (!res.ok) throw new Error(`Error al obtener el producto: HTTP ${res.status}`);

    const data: IProductoDetailResponse = await res.json();
    return productoAdapter(data.results);
  }
};
