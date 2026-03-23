import { Link, createFileRoute } from "@tanstack/react-router";
import { useCartStore } from "../store/cart-store";
import { useTiendaStore } from "../store/tienda-info-store"; // Importamos el nuevo store
import { formatPrice } from "../utils/formats";

export const Route = createFileRoute("/carrito")({
    component: CarritoPage,
});

function CarritoPage() {
    const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
    const { tienda } = useTiendaStore(); // Obtenemos la info de la tienda desde el store global

    const total = getTotal();

    const generarMensajeWhatsApp = () => {
        if (items.length === 0) return "";

        // Usamos la info del store (tienda)
        let mensaje = `*Nuevo Pedido - ${tienda?.tienda_nombre || "Tienda"}*\n\n`;
        items.forEach((item) => {
            const precio = item.tiene_descuento ? item.precio_promocional : item.precio_normal;
            mensaje += `- ${item.quantity}x ${item.nombre} [${item.codigo}] (${formatPrice(precio!)})\n`;
        });
        mensaje += `\n*Total: ${formatPrice(total)}*`;

        return `https://wa.me/${tienda?.tienda_whatsapp}?text=${encodeURIComponent(mensaje)}`;
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <div className="bg-white p-8 rounded-3xl shadow-sm text-center max-w-sm w-full">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Tu canasta está vacía</h2>
                    <p className="text-slate-500 text-sm mb-6">Parece que aún no has agregado productos a tu pedido.</p>
                    <Link to="/" className="block w-full bg-slate-900 text-white font-semibold py-3 rounded-xl">
                        Volver a la tienda
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-32">
            <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
                <div className="max-w-2xl mx-auto flex items-center justify-between">
                    <Link to="/" className="text-slate-500 hover:text-slate-800 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <h1 className="text-lg font-bold text-slate-800">Mi Canasta</h1>
                    <button onClick={clearCart} className="text-xs text-rose-500 font-medium hover:underline">Vaciar</button>
                </div>
            </header>

            <main className="max-w-2xl mx-auto p-4 flex flex-col gap-3">
                {items.map((item) => (
                    <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex gap-4 shadow-sm items-center">
                        <img src={item.imagen_portada || ""} alt={item.nombre} className="w-20 h-20 rounded-xl object-cover bg-slate-50 border border-slate-50" />
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-slate-800 text-sm truncate">{item.nombre}</h3>
                            <p className="text-[10px] text-slate-400 font-mono mb-2 uppercase tracking-wider">{item.codigo}</p>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-900">
                                    {formatPrice(item.tiene_descuento ? item.precio_promocional! : item.precio_normal)}
                                </span>
                                <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1 border border-slate-100">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-white rounded-md transition-colors">-</button>
                                    <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-white rounded-md transition-colors">+</button>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-slate-300 hover:text-rose-500 p-2 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                ))}
            </main>

            {/* Footer de Pago */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20">
                <div className="max-w-2xl mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-slate-500 font-medium">Total estimado</span>
                        <span className="text-2xl font-black text-slate-900">{formatPrice(total)}</span>
                    </div>
                    <a
                        href={generarMensajeWhatsApp()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-100"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Confirmar pedido vía WhatsApp
                    </a>
                </div>
            </footer>
        </div>
    );
}