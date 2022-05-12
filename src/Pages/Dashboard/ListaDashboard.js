import { BASEURL } from "../../Config/globales";

export const ListaDashboard = [
    {
        id_permiso:1,
        text:"Realizar venta",
        icon:"sell",
        bgcolor:"success.main",
        color:"#FFF",
        url:`${BASEURL}/ventas`
    },
    {
        id_permiso:30,
        text:"Cotización",
        icon:"monetization_on",
        bgcolor:"#45007d",
        color:"#FFF",
        url:`${BASEURL}/monedas`
    },
    {
        id_permiso:44,
        text:"Informes",
        icon:"trending_up",
        bgcolor:"#3f51b5",
        color:"#FFF",
        url:`${BASEURL}/informes`
    },
    {
        id_permiso:8,
        text:"Productos",
        icon:"inventory_2",
        bgcolor:"error.main",
        color:"error.contrastText",
        url:`${BASEURL}/productos`
    },

    {
        id_permiso:4,
        text:"Lista facturas",
        icon:"assignment",
        bgcolor:"#7db346",
        color:"#FFF",
        url:`${BASEURL}/facturas`
        
    },
    {
        id_permiso:16,
        text:"Entregas",
        icon:"delivery_dining",
        bgcolor:"#f27474",
        color:"primary.contrastText",
        url:`${BASEURL}/entregas`
    },
    {
        id_permiso:24,
        text:"Mov. de cajas",
        icon:"leaderboard",
        bgcolor:"#4caf50",
        color:"#FFF",
        url:`${BASEURL}/movimientos`
    },
    {
        id_permiso:22,
        text:"Cajas",
        icon:"savings",
        bgcolor:"#ffa500",
        color:"#FFF",
        url:`${BASEURL}/cajas`
    },
    {
        id_permiso:28,
        text:"Clientes",
        icon:"people",
        bgcolor:"secondary.main",
        color:"secondary.contrastText",
        url:`${BASEURL}/clientes`
    },
    {
        id_permiso:43,
        text:"Inventario",
        icon:"handyman",
        bgcolor:"info.main",
        color:"info.contrastText",
        url:`${BASEURL}/clientes`
    },
    
    {
        id_permiso:34,
        text:"Usuarios",
        icon:"manage_accounts",
        bgcolor:"#009688",
        color:"#FFF",
        url:`${BASEURL}/usuarios`
    },

    
    
]