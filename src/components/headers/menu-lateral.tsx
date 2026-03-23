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
                    <MenuLink to="/" onClick={toggleMenu} icon={HomeIcon}>Inicio</MenuLink>
                    <MenuLink to="/carrito" onClick={toggleMenu} icon={CartIcon}>Mi Carrito</MenuLink>
                    <div className="h-px bg-slate-100 my-4" />
                    <MenuLink to="/contacto" onClick={toggleMenu} icon={ContactIcon}>Contacto</MenuLink>
                </nav>

                <div className="mt-auto pt-6 border-t border-slate-100">
                    <p className="text-md text-slate-400 text-center">Hecho con ♥️⚡️</p>
                </div>
            </div>
        </aside>
    </Fragment>
}

interface MenuLinkProps {
    to: string;
    children: React.ReactNode;
    onClick: () => void;
    icon: React.ElementType; // Esto permite pasar el componente del icono
}

function MenuLink({ to, children, onClick, icon: Icon }: MenuLinkProps) {
    return (
        <Link
            to={to}
            onClick={onClick}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all font-medium group"
        >
            <span className="text-slate-400 group-hover:text-emerald-500 transition-colors">
                <Icon className="w-5 h-5" />
            </span>
            {children}
        </Link>
    );
}
const HomeIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={className}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 11a2 2 0 0 1 2 2v2h10v-2a2 2 0 1 1 4 0v4a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-4a2 2 0 0 1 2 -2" /><path d="M5 11v-5a3 3 0 0 1 3 -3h8a3 3 0 0 1 3 3v5" /><path d="M6 19v2" /><path d="M18 19v2" /></svg>
);

const CartIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={className}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M15 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>
);

const ContactIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={className}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /></svg>
)