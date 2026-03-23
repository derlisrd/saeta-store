import { createFileRoute, Link } from "@tanstack/react-router";
import { useTiendaStore } from "../store/tienda-info-store";

export const Route = createFileRoute("/contacto")({
    component: ContactoPage,
});

function ContactoPage() {
    const { tienda } = useTiendaStore();

    if (!tienda) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-slate-400 font-medium">Cargando información...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header Simple */}
            <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
                <div className="max-w-2xl mx-auto flex items-center gap-4">
                    <Link to="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <h1 className="text-lg font-bold text-slate-800">Contacto</h1>
                </div>
            </header>

            <main className="max-w-2xl mx-auto p-6 space-y-6">
                {/* Card Principal de la Tienda */}
                <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center">
                    <div className="w-24 h-24 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-3xl font-black mx-auto mb-4 shadow-xl">
                        {tienda.tienda_nombre.substring(0, 1)}
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-1">{tienda.tienda_nombre}</h2>
                    <p className="text-slate-500 text-sm mb-6 line-clamp-2">{tienda.tienda_descripcion}</p>

                    <div className="flex justify-center gap-4">
                        <a
                            href={`https://wa.me/${tienda.tienda_whatsapp}`}
                            target="_blank"
                            className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"
                        >
                            <span>WhatsApp</span>
                        </a>
                        {tienda.tienda_email && (
                            <a
                                href={`mailto:${tienda.tienda_email}`}
                                className="bg-slate-50 text-slate-600 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"
                            >
                                <span>Email</span>
                            </a>
                        )}
                    </div>
                </section>

                {/* Detalles de Ubicación y Horarios */}
                <div className="grid gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-start gap-4">
                        <div className="p-3 bg-blue-50 rounded-xl text-blue-500">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800">Dirección</h4>
                            <p className="text-slate-500 text-sm">{tienda.tienda_direccion || "Asunción, Paraguay"}</p>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-start gap-4">
                        <div className="p-3 bg-amber-50 rounded-xl text-amber-500">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800">Horario de Atención</h4>
                            <p className="text-slate-500 text-sm italic">Consultar vía WhatsApp para una respuesta inmediata.</p>
                        </div>
                    </div>
                </div>

                {/* Footer de Soporte */}
                <div className="text-center pt-8">
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">Hecho por</p>
                    <span className="text-lg font-black text-slate-800">Saeta<span className="text-emerald-500">Tiendas</span></span>
                </div>
            </main>
        </div>
    );
}