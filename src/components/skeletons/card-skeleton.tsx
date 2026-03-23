export default function CardSkeleton() {
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