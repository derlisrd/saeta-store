import { useEffect } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { TENANT } from "../services/base";
import { tiendaApi } from "../services/tienda";

function RootLayout() {
    const { data } = useQuery({
        queryKey: ["tienda", TENANT],
        queryFn: tiendaApi.info,
    });

    const nombreTienda = data?.tienda_nombre ?? TENANT;

    useEffect(() => {
        document.title = nombreTienda;
    }, [nombreTienda]);

    return <Outlet />;
}

export const Route = createRootRoute({
    component: RootLayout,
});