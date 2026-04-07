import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { TENANT } from "../services/base";
import { productosApi } from "../services/productos";
import CardSkeleton from "../components/skeletons/card-skeleton";
import ProductCard from "../components/products/product-card";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/")({
    component: Catalogo,
});








function Catalogo() {
    const [search, setSearch] = useState("")
    const { data: productos, isLoading, isError, error } = useQuery({
        queryKey: ["productos", TENANT],
        queryFn: productosApi.lista,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
    });


    const filteredProducts = useMemo(() => {
        if (!productos) return [];
        if (!search.trim()) return productos;

        const term = search.toLowerCase();
        return productos.filter(p =>
            p.nombre.toLowerCase().includes(term) ||
            p.codigo.toLowerCase().includes(term) ||
            p.category?.nombre.toLowerCase().includes(term)
        );
    }, [productos, search]);

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

                <div className="relative group mb-4">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                        <svg className="w-5 h-5 group-focus-within:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Buscar por nombre, código o categoría..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-slate-100 border-none rounded-2xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none text-slate-700"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4">
                    {isLoading
                        ? Array.from({ length: 10 }).map((_, i) => <CardSkeleton key={i} />)
                        : filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                </div>

                {!isLoading && !isError && filteredProducts.length === 0 && (
                    <div className="flex items-center justify-center py-24 text-slate-400">
                        <p>Sin productos</p>
                    </div>
                )}
            </main>
        </div>
    );
}