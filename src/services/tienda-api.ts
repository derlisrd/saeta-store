import { BASE } from "./base";

export interface Tienda {
  id: number;
  nombre: string;
  ruc: string;
  telefono: string;
  direccion: string;
  licencia: string;
}

export interface TiendaResponse {
  success: boolean;
  results: Tienda;
}

export const tiendaApi = {
  info: async (): Promise<TiendaResponse> => {
    const res = await fetch(`${BASE}/tienda`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "WKvn3xFC3JflK8lkIRHVSe60hBFSEjApMZyCnEdwUc"
      }
    });
    if (!res.ok) {
      throw new Error(`Error al obtener la tienda: HTTP ${res.status}`);
    }
    return res.json();
  }
};
