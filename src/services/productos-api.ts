import { BASE } from "./base";

export const productosApi = {
  lista: async () => {
    const res = await fetch(`${BASE}/productos`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "WKvn3xFC3JflK8lkIRHVSe60hBFSEjApMZyCnEdwUc"
      }
    });
    if (!res.ok) {
      throw new Error(`Error al obtener los productos: HTTP ${res.status}`);
    }
    return res.json();
  }
};
