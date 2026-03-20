import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { productosApi } from "../services/productos-api";
import { tiendaApi } from "../services/tienda-api";
import { TENANT } from "../services/base";

export const Route = createFileRoute("/producto/$id")({
    component: ProductoDetalle,
});

interface ProductImage {
    id: number;
    url: string;
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
    descripcion: string | null;
    category: { id: number; nombre: string } | null;
    images: ProductImage[];
}

function formatPrice(price: number) {
    return new Intl.NumberFormat("es-PY", {
        style: "currency",
        currency: "PYG",
        minimumFractionDigits: 0,
    }).format(price);
}

function ProductoDetalle() {
    const { id } = Route.useParams();
    const [activeImg, setActiveImg] = useState(0);

    const { data: tiendaData } = useQuery({
        queryKey: ["tienda", TENANT],
        queryFn: tiendaApi.info,
        refetchOnWindowFocus: false,
    });

    const { data, isLoading, isError } = useQuery({
        queryKey: ["producto", TENANT, id],
        queryFn: () => productosApi.detalle(Number(id)),
        staleTime: 1000 * 60 * 5, // 5 minutos
        refetchOnWindowFocus: false,
    });

    const nombreTienda = tiendaData?.results.nombre ?? TENANT;
    const product: Product | undefined = data?.results;

    const hasDiscount =
        product &&
        product.descuento_activo === 1 &&
        product.precio_promocional != null &&
        product.precio_promocional > 0;

    const discountPct =
        hasDiscount && product
            ? Math.round(
                ((product.precio_normal - product.precio_promocional!) /
                    product.precio_normal) *
                100
            )
            : 0;

    const whatsappNumber = tiendaData?.results.telefono?.replace(/\D/g, "") ?? "";
    const whatsappMsg = product
        ? encodeURIComponent(
            `Hola! Me interesa el producto: *${product.nombre}* (Cód: ${product.codigo})`
        )
        : "";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
                <div className="max-w-4xl mx-auto flex items-center gap-3">
                    <Link
                        to="/"
                        className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors text-sm"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Volver
                    </Link>
                    <span className="text-slate-300">|</span>
                    <span className="text-slate-700 font-semibold text-sm truncate">
                        {nombreTienda}
                    </span>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8">
                {/* Loading skeleton */}
                {isLoading && (
                    <div className="grid md:grid-cols-2 gap-8 animate-pulse">
                        <div className="aspect-square bg-white rounded-2xl border border-slate-100" />
                        <div className="flex flex-col gap-4 py-2">
                            <div className="h-7 bg-slate-100 rounded w-3/4" />
                            <div className="h-4 bg-slate-100 rounded w-1/3" />
                            <div className="h-8 bg-slate-100 rounded w-1/2 mt-4" />
                            <div className="h-12 bg-slate-100 rounded-xl mt-auto" />
                        </div>
                    </div>
                )}

                {/* Error */}
                {isError && (
                    <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
                        <p className="text-slate-600 font-medium">Producto no encontrado</p>
                        <Link to="/" className="text-slate-400 text-sm underline">
                            Volver al catálogo
                        </Link>
                    </div>
                )}

                {/* Detalle */}
                {product && (
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Galería */}
                        <div className="flex flex-col gap-3">
                            {/* Imagen principal */}
                            <div className="relative bg-white rounded-2xl border border-slate-100 aspect-square overflow-hidden">
                                {product.images.length > 0 ? (
                                    <img
                                        src={product.images[activeImg]?.url ?? product.images[activeImg]?.miniatura}
                                        alt={product.nombre}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-200">
                                        <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                )}
                                {hasDiscount && (
                                    <span className="absolute top-4 left-4 bg-rose-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow">
                                        -{discountPct}%
                                    </span>
                                )}
                            </div>

                            {/* Thumbnails */}
                            {product.images.length > 1 && (
                                <div className="flex gap-2 flex-wrap">
                                    {product.images.map((img, i) => (
                                        <button
                                            key={img.id}
                                            onClick={() => setActiveImg(i)}
                                            className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${i === activeImg
                                                ? "border-slate-900 scale-105"
                                                : "border-slate-200 hover:border-slate-400"
                                                }`}
                                        >
                                            <img
                                                src={img.miniatura}
                                                alt={`${product.nombre} ${i + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex flex-col gap-4">
                            {product.category && (
                                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full w-fit">
                                    {product.category.nombre}
                                </span>
                            )}

                            <h1 className="text-2xl font-bold text-slate-900 leading-tight">
                                {product.nombre}
                            </h1>

                            <p className="text-slate-400 text-xs font-mono">
                                Cód: {product.codigo}
                            </p>

                            {/* Precio */}
                            <div className="mt-2">
                                {hasDiscount ? (
                                    <div className="flex items-baseline gap-3">
                                        <span className="text-3xl font-bold text-rose-500">
                                            {formatPrice(product.precio_promocional!)}
                                        </span>
                                        <span className="text-slate-400 text-lg line-through">
                                            {formatPrice(product.precio_normal)}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-3xl font-bold text-slate-900">
                                        {formatPrice(product.precio_normal)}
                                    </span>
                                )}
                            </div>

                            {/* Descripción */}
                            {product.descripcion && (
                                <p className="text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                                    {product.descripcion}
                                </p>
                            )}

                            {/* Spacer */}
                            <div className="flex-1" />

                            {/* WhatsApp CTA */}
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white font-semibold py-3.5 px-6 rounded-2xl transition-all duration-150 shadow-sm shadow-emerald-200"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Consultar por WhatsApp
                            </a>

                            <Link
                                to="/"
                                className="text-center text-slate-400 text-sm hover:text-slate-600 transition-colors"
                            >
                                ← Ver más productos
                            </Link>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}