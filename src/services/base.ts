function getTenant(): string {
  const hostname = window.location.hostname;
  const parts = hostname.split(".");

  if (hostname === "localhost" || parts.length < 3) {
    return import.meta.env.VITE_TENANT_FALLBACK ?? "linea-saturno";
  }

  return parts[0];
}

export const TENANT = getTenant();
export const BASE = `https://${TENANT}.saeta.online/ecommerce`;

export const HEADERS: HeadersInit = {
  "Content-Type": "application/json",
  "x-api-key": "WKvn3xFC3JflK8lkIRHVSe60hBFSEjApMZyCnEdwUc"
};
