import { BASE } from "./base";

const HEADERS = {
  "Content-Type": "application/json",
  "x-api-key": "WKvn3xFC3JflK8lkIRHVSe60hBFSEjApMZyCnEdwUc"
};

export const productosApi = {
  lista: async () => {
    const res = await fetch(`${BASE}/productos`, { headers: HEADERS });
    if (!res.ok) throw new Error(`Error al obtener los productos: HTTP ${res.status}`);
    return res.json();
  },

  detalle: async (id: number) => {
    const res = await fetch(`${BASE}/productos/${id}`, { headers: HEADERS });
    if (!res.ok) throw new Error(`Error al obtener el producto: HTTP ${res.status}`);
    return res.json();
  }
};
