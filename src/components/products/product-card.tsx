import { Link } from "@tanstack/react-router";
import type { IProducto } from "../../services/productos";
import { formatPrice } from "../../utils/formats";

export default function ProductCard({ product }: { product: IProducto }) {
    return (
        <Link
            to="/producto/$id"
            params={{ id: String(product.id) }}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col cursor-pointer"
        >
            <div className="relative bg-slate-50 aspect-square overflow-hidden">
                {product.imagen_portada ? (
                    <img
                        src={product.imagen_portada}
                        alt={product.nombre}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                )}
                {product.tiene_descuento && (
                    <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                        -{product.porcentaje_descuento}%
                    </span>
                )}
                {product.category && (
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-600 text-xs px-2 py-1 rounded-full border border-slate-200">
                        {product.category.nombre}
                    </span>
                )}
            </div>

            <div className="p-4 flex flex-col gap-2 flex-1">
                <h2 className="font-semibold text-slate-800 text-sm leading-tight line-clamp-2">
                    {product.nombre}
                </h2>
                <p className="text-slate-400 text-xs font-mono">{product.codigo}</p>
                <div className="mt-auto pt-2">
                    {product.tiene_descuento ? (
                        <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="text-rose-500 font-bold text-base">
                                {formatPrice(product.precio_promocional!)}
                            </span>
                            <span className="text-slate-400 text-xs line-through">
                                {formatPrice(product.precio_normal)}
                            </span>
                        </div>
                    ) : (
                        <span className="text-slate-800 font-bold text-base">
                            {formatPrice(product.precio_normal)}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}