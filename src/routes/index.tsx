import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { TENANT } from "../services/base";
import { productosApi } from "../services/productos";
import type { IProducto } from "../services/productos";
import CardSkeleton from "../components/skeletons/card-skeleton";

export const Route = createFileRoute("/")({
    component: Catalogo,
});

function formatPrice(price: number) {
    return new Intl.NumberFormat("es-PY", {
        style: "currency",
        currency: "PYG",
        minimumFractionDigits: 0,
    }).format(price);
}

function ProductCard({ product }: { product: IProducto }) {
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





function Catalogo() {

    const { data: productos, isLoading, isError, error } = useQuery({
        queryKey: ["productos", TENANT],
        queryFn: productosApi.lista,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
    });

    const products = productos ?? [];

    return (
        <div className="min-h-screen bg-slate-50">

            <main className="max-w-6xl mx-auto px-4 py-8">
                {isError && (
                    <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
                        <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center">
                            <svg className="w-7 h-7 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-slate-600 font-medium">Error al cargar productos</p>
                        <p className="text-slate-400 text-sm">{(error as Error).message}</p>
                    </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {isLoading
                        ? Array.from({ length: 10 }).map((_, i) => <CardSkeleton key={i} />)
                        : products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                </div>

                {!isLoading && !isError && products.length === 0 && (
                    <div className="flex items-center justify-center py-24 text-slate-400">
                        <p>Sin productos</p>
                    </div>
                )}
            </main>
        </div>
    );
}