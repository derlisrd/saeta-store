import { Fragment, useEffect, useState, lazy, Suspense } from "react";
import { createRootRoute, Outlet, Link } from "@tanstack/react-router";
import { useCartStore } from "../store/cart-store";
import { useQuery } from "@tanstack/react-query";
import { tiendaApi } from "../services/tienda";
import { TENANT } from "../services/base";
import { useTiendaStore } from "../store/tienda-info-store";



const MenuLateral = lazy(() => import('../components/headers/menu-lateral'));

function RootLayout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const cartItems = useCartStore((s) => s.items);
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const { tienda, setTienda } = useTiendaStore();
    const { data } = useQuery({
        queryKey: ["tienda", TENANT],
        queryFn: tiendaApi.info,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
    });

    // Sincronización: Cuando la query termina, guardamos en Zustand
    useEffect(() => {
        if (data) {
            setTienda(data);
            document.title = data.tienda_nombre;
        }
    }, [data, setTienda]);


    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* --- NAVBAR --- */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* Botón Hamburguesa */}
                        <button
                            onClick={toggleMenu}
                            className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600 cursor-pointer"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <Link to="/" className="text-lg font-bold text-slate-800 tracking-tight">
                            {tienda?.tienda_nombre || data?.tienda_nombre || (
                                <Fragment>Saeta<span className="text-emerald-500">Store</span></Fragment>
                            )}
                        </Link>
                    </div>

                    <Link to="/carrito" className="relative p-2 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">
                        <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>
            </header>
            <Suspense fallback={<div className="fixed inset-0 bg-white/50" />}>
                <MenuLateral toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            </Suspense>


            <Outlet />
        </div>
    );
}


export const Route = createRootRoute({
    component: RootLayout,
});