import type { ITienda, ITiendaOption } from "./tienda-model";

function toMap(options: ITiendaOption[]): Record<string, string> {
  return Object.fromEntries(options.map((o) => [o.key, o.value]));
}

function get(map: Record<string, string>, key: keyof ITienda, fallback = ""): string {
  return map[key] ?? fallback;
}

export function tiendaAdapter(data: any): ITienda {

  const options = data.results
  const map = toMap(options);

  return {
    tienda_nombre: get(map, "tienda_nombre"),
    tienda_descripcion: get(map, "tienda_descripcion"),
    tienda_telefono: get(map, "tienda_telefono"),
    tienda_whatsapp: get(map, "tienda_whatsapp"),
    tienda_email: get(map, "tienda_email"),
    tienda_direccion: get(map, "tienda_direccion"),
    tienda_logo: get(map, "tienda_logo"),
    tienda_banner: get(map, "tienda_banner"),
    tienda_color: get(map, "tienda_color", "#000000"),
    tienda_activa: get(map, "tienda_activa") === "1",
    tienda_envio_costo: get(map, "tienda_envio_costo", "0"),
    tienda_envio_gratis_desde: get(map, "tienda_envio_gratis_desde", "0")
  };
}
