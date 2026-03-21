import { BASE, HEADERS } from "../base";
import { tiendaAdapter } from "./tienda-adapter";
import type { ITienda, ITiendaRaw } from "./tienda-model";

export const tiendaApi = {
  info: async (): Promise<ITienda> => {
    const res = await fetch(`${BASE}/tienda`, { headers: HEADERS });
    if (!res.ok) throw new Error(`Error al obtener la tienda: HTTP ${res.status}`);

    const data: ITiendaRaw = await res.json();
    return tiendaAdapter(data);
  }
};
