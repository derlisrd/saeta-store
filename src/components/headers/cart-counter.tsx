import { useCartStore } from "../../store/cart-store";
import { Link } from "@tanstack/react-router";
export default function CartCounter() {
    const items = useCartStore((state) => state.items);
    const count = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <Link to="/carrito" className="relative p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
            <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {count}
                </span>
            )}
        </Link>
    );
}