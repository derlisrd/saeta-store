import { useEffect } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { tiendaApi } from "../services/tienda-api";
import { TENANT } from "../services/base";

function RootLayout() {
    const { data } = useQuery({
        queryKey: ["tienda", TENANT],
        queryFn: tiendaApi.info,
    });

    const nombreTienda = data?.results.nombre ?? TENANT;

    useEffect(() => {
        document.title = nombreTienda;
    }, [nombreTienda]);

    return <Outlet />;
}

export const Route = createRootRoute({
    component: RootLayout,
});