function getTenant(): string {
  const hostname = window.location.hostname; // e.g. "linea-saturno.saeta.store"
  const parts = hostname.split(".");

  // En local (localhost) usa un fallback
  if (hostname === "localhost" || parts.length < 3) {
    return import.meta.env.VITE_TENANT_FALLBACK ?? "linea-saturno";
  }

  return parts[0]; // "linea-saturno"
}

export const TENANT = getTenant();
export const BASE = `https://${TENANT}.saeta.online/ecommerce`;
