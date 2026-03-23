import { create } from "zustand";
import type { ITienda } from "../services/tienda";


interface TiendaState {
  tienda: ITienda | null;
  setTienda: (tienda: ITienda) => void;
}

export const useTiendaStore = create<TiendaState>((set) => ({
  tienda: null,
  setTienda: (tienda) => set({ tienda })
}));
