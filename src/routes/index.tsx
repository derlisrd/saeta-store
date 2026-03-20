import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { productosApi } from "../services/productos-api";
import { tiendaApi } from "../services/tienda-api";
import { TENANT } from "../services/base";

export const Route = createFileRoute("/")({
    component: Catalogo,
});

interface ProductImage {
    id: number;
    miniatura: string;
    portada: number;
}

interface Product {
    id: number;
    nombre: string;
    codigo: string;
    precio_normal: number;
    precio_promocional: number | null;
    descuento_activo: number;
    disponible: number;
    category: { id: number; nombre: string } | null;
    images: ProductImage[];
}

interface ApiResponse {
    success: boolean;
    results: Product[];
}

function formatPrice(price: number) {
    return new Intl.NumberFormat("es-PY", {
        style: "currency",
        currency: "PYG",
        minimumFractionDigits: 0,
    }).format(price);
}

function getCoverImage(images: ProductImage[]): string | null {
    if (!images.length) return null;
    const cover = images.find((img) => img.portada === 1);
    return (cover ?? images[0]).miniatura;
}

function ProductCard({ product }: { product: Product }) {
    const cover = getCoverImage(product.images);
    const hasDiscount =
        product.descuento_activo === 1 &&
        product.precio_promocional != null &&
        product.precio_promocional > 0;

    return (
        <Link
            to="/producto/$id"
            params={{ id: String(product.id) }}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col cursor-pointer"
        >
            <div className="relative bg-slate-50 aspect-square overflow-hidden">
                {cover ? (
                    <img
                        src={cover}
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
                {hasDiscount && (
                    <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                        -{Math.round(((product.precio_normal - product.precio_promocional!) / product.precio_normal) * 100)}%
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
                    {hasDiscount ? (
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

function SkeletonCard() {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 animate-pulse">
            <div className="aspect-square bg-slate-100" />
            <div className="p-4 flex flex-col gap-3">
                <div className="h-4 bg-slate-100 rounded w-3/4" />
                <div className="h-3 bg-slate-100 rounded w-1/2" />
                <div className="h-5 bg-slate-100 rounded w-1/3 mt-2" />
            </div>
        </div>
    );
}

function Catalogo() {
    const { data: tiendaData } = useQuery({
        queryKey: ["tienda", TENANT],
        queryFn: tiendaApi.info,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutos
    });

    const { data, isLoading, isError, error } = useQuery<ApiResponse>({
        queryKey: ["productos", TENANT],
        queryFn: productosApi.lista,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutos
    });

    const nombreTienda = tiendaData?.results.nombre ?? TENANT;
    const products = data?.results ?? [];

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                            {nombreTienda}
                        </h1>
                        {!isLoading && !isError && (
                            <p className="text-slate-400 text-xs mt-0.5">
                                {products.length} productos disponibles
                            </p>
                        )}
                    </div>
                    <span className="text-xs text-slate-400 font-mono bg-slate-100 px-2 py-1 rounded-lg">
                        Catálogo
                    </span>
                </div>
            </header>

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
                        ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
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