export function formatPrice(price: number) {
    return new Intl.NumberFormat("es-PY", {
        style: "currency",
        currency: "PYG",
        minimumFractionDigits: 0,
    }).format(price);
}