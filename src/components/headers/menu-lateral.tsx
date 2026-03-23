import { Link } from "@tanstack/react-router";
import { Fragment } from "react";

interface Props {
    isMenuOpen: boolean;
    toggleMenu: () => void;
}

export default function MenuLateral({ isMenuOpen, toggleMenu }: Props) {
    return <Fragment>
        {/* --- DRAWER (MENU LATERAL) --- */}
        {/* Overlay */}
        <div
            className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            onClick={toggleMenu}
        />

        <aside
            className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
            <div className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                    <span className="font-bold text-xl text-slate-800">Menú</span>
                    <button onClick={toggleMenu} className="p-2 text-slate-400 hover:text-slate-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <nav className="flex flex-col gap-2">
                    <MenuLink to="/" onClick={toggleMenu} icon="🏠">Inicio</MenuLink>
                    <MenuLink to="/carrito" onClick={toggleMenu} icon="🛒">Mi Carrito</MenuLink>
                    <div className="h-px bg-slate-100 my-4" />
                    <MenuLink to="/contacto" onClick={toggleMenu} icon="📞">Contacto</MenuLink>
                </nav>

                <div className="mt-auto pt-6 border-t border-slate-100">
                    <p className="text-md text-slate-400 text-center">Hecho con ♥️⚡️</p>
                </div>
            </div>
        </aside>
    </Fragment>
}

// Sub-componente para links del menú
function MenuLink({ to, children, onClick, icon }: any) {
    return (
        <Link
            to={to}
            onClick={onClick}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all font-medium"
        >
            <span className="text-lg">{icon}</span>
            {children}
        </Link>
    );
}
