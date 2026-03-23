import TitleSkeleton from "../skeletons/title-skeleton";
import CartCounter from "./cart-counter";

interface Props {
    nombreTienda: string;
    isLoading: boolean;
}
export default function NavBar({ isLoading, nombreTienda }: Props) {
    return <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div>
                {isLoading ? <TitleSkeleton /> : (
                    <h1 className="text-sm md:text-xl font-bold text-slate-800">{nombreTienda}</h1>
                )}
            </div>
            <CartCounter />
        </div>
    </header>
}