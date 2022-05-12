import React from 'react'
import { Routes, Route, Navigate} from "react-router-dom";
import { useLogin } from '../Contextos/LoginProvider';
import { BASEURL } from '../Config/globales';
import Loading from '../Componentes/Loading';
import Categorias from '../Pages/Productos/Categorias';
import CategoriasForm from '../Pages/Productos/Categorias/CategoriasForm';
import Clientes from '../Pages/Clientes';
import ClientesForm from '../Pages/Clientes/ClientesForm';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Facturas from '../Pages/Ventas/Facturas';
import MainPage from '../Pages';
import NotFound from '../Pages/NotFound/Index';
import Productos from '../Pages/Productos/Productos';
import ProductForm from '../Pages/Productos/Productos/ProductForm'
import ProductFormEdit from '../Pages/Productos/Productos/ProductFormEdit';
import ProductosApartados from '../Pages/Productos/ProductosApartados';
import Proveedores from '../Pages/Productos/Proveedores';
import Salir from '../Pages/AcountPath/Salir';
import Settings from '../Pages/Settings/DatosEmpresa/Settings';
import Ventas from '../Pages/Ventas/Vender';
import Marcas from '../Pages/Productos/Marcas';
import Compras from '../Pages/Productos/Compras';
import Caja from '../Pages/Caja/Cajas';
import Movimientos from '../Pages/Caja/Movimientos/Index';
import RegistroMovimientos from '../Pages/Caja/RegistroMovimientos';
import NotAutorized from '../Pages/NotFound/NotAutorized';
import Depositos from '../Pages/Productos/Depositos/Index';
import Monedas from '../Pages/Monedas/Index';
import Entregas from '../Pages/Ventas/Entregas';
import EntregasView from '../Pages/Ventas/Entregas/EntregasView';
import RegistroFacturas from '../Pages/Settings/RegistroFacturas';
import Empleados from '../Pages/Empleados';
import Inventario from '../Pages/Productos/Inventario';
import Medidas from '../Pages/Medidas';
import Informes from '../Pages/Informes';
import Impuestos from '../Pages/Settings/Impuestos';
import Cuentas from '../Pages/Cuentas';
import Turnos from '../Pages/Turnos';
import Agenda from '../Pages/Agenda';
import ProductCode from '../Pages/Productos/Productos/ProductCode';
import Usuarios from '../Pages/Usuarios';
import AcountPage from '../Pages/AcountPath';
import Notas from '../Pages/Ventas/Notas';
import Transferencias from '../Pages/Productos/Transferencias';
import Info from '../Pages/Settings/Info';
/*=======================
ACA IRIAN TODAS LAS RUTAS NECESARIAS Y TODAS LAS PAGINAS
========================*/




const PrivateRoute = ({children,id})=>{
  const { logueado, cargando, permisos } = useLogin();
  if(logueado && !permisos.some(e => parseInt(e.id_permiso_permiso) === parseInt(id)) ){
    return <Navigate to={BASEURL + "/notautorized"} />
  } 
  cargando &&  <Loading />
  return logueado ? <MainPage>{children}</MainPage> : <Navigate to={BASEURL + "/"} />
}

export default function HomeRoutes() {
  let R = BASEURL+"/";
  return (
    <Routes>
        <Route path={R+'salir'} element={<Salir />} />
        <Route path={R+'ventas'} element={<PrivateRoute id={1}><Ventas /></PrivateRoute>} />
        <Route path={R+'productos'} element={<PrivateRoute id={8}><Productos /></PrivateRoute>} />
        <Route path={R+'productos/bc'} element={<PrivateRoute id={8}><ProductCode /></PrivateRoute>} />        
        <Route path={R+'productos/new'} element={<PrivateRoute id={9}><ProductForm /></PrivateRoute>} />
        <Route path={R+'productos/new/:id'} element={<PrivateRoute id={9}><ProductFormEdit /></PrivateRoute>} />
        <Route path={R+'categorias'} element={<PrivateRoute id={10}><Categorias /></PrivateRoute>} />
        <Route path={R+'categorias/new'} element={<PrivateRoute id={11}><CategoriasForm /></PrivateRoute>} />
        <Route path={R+'categorias/new/:id'} element={<PrivateRoute id={11}><CategoriasForm /></PrivateRoute>} />
        <Route path={R+'marcas'} element={<PrivateRoute id={12}><Marcas /></PrivateRoute>} />
        <Route path={R+'proveedores'} element={<PrivateRoute id={14}><Proveedores /></PrivateRoute>} />
        <Route path={R+'facturas'} element={<PrivateRoute id={4}><Facturas /></PrivateRoute>} />
        <Route path={R+"entregas"} element={<PrivateRoute id={16}><Entregas /></PrivateRoute>} />
        <Route path={R+"entregas/view/:id"} element={<PrivateRoute id={16}><EntregasView /></PrivateRoute>} />
        <Route path={R+"apartados"} element={<PrivateRoute id={18}><ProductosApartados /></PrivateRoute>} />
        <Route path={R+"compras"} element={<PrivateRoute id={20}><Compras /></PrivateRoute>} />
        <Route path={R+"movimientos"} element={<PrivateRoute id={24}><Movimientos /></PrivateRoute>} />
        <Route path={R+'cajas'} element={<PrivateRoute id={22}><Caja /></PrivateRoute>} />
        <Route path={R+'clientes'} element={<PrivateRoute id={28}><Clientes /></PrivateRoute>} />
        <Route path={R+'clientes/new'} element={<PrivateRoute id={29}><ClientesForm /></PrivateRoute>} />
        <Route path={R+'clientes/new/:id'} element={<PrivateRoute id={29}><ClientesForm /></PrivateRoute>} />
        <Route path={R+'monedas'} element={<PrivateRoute id={30}><Monedas /></PrivateRoute>} />
        <Route path={R+'medidas'} element={<PrivateRoute id={32}><Medidas /></PrivateRoute>} />
        <Route path={R+'usuarios'} element={<PrivateRoute id={34}><Usuarios /></PrivateRoute>} />
        <Route path={R+'settings'} element={<PrivateRoute id={36}><Settings /></PrivateRoute>} />
        <Route path={R+'dashboard'} element={<PrivateRoute id={59}><Dashboard /></PrivateRoute>} />
        <Route path={R+'depositos'} element={<PrivateRoute id={39}><Depositos /></PrivateRoute>} />
        <Route path={R+'empleados'} element={<PrivateRoute id={41}><Empleados /></PrivateRoute>} />
        <Route path={R+'registrofacturas'} element={<PrivateRoute id={38}><RegistroFacturas /></PrivateRoute>} />
        <Route path={R+'inventario'} element={<PrivateRoute id={43}><Inventario /></PrivateRoute>} />
        <Route path={R+'informes'} element={<PrivateRoute id={44}><Informes /></PrivateRoute>} />
        <Route path={R+'impuestos'} element={<PrivateRoute id={45}><Impuestos /></PrivateRoute>} />
        <Route path={R+'cuentas'} element={<PrivateRoute id={47}><Cuentas /></PrivateRoute>} />
        <Route path={R+'registromovimientos'} element={<PrivateRoute id={26}><RegistroMovimientos /></PrivateRoute>} />
        <Route path={R+'turnos'} element={<PrivateRoute id={49}><Turnos /></PrivateRoute>} />
        <Route path={R+'agenda'} element={<PrivateRoute id={58}><Agenda /></PrivateRoute>} />
        <Route path={R+'notas'} element={<PrivateRoute id={6}><Notas /></PrivateRoute>} />
        <Route path={R+'transferencias'} element={<PrivateRoute id={60}><Transferencias /></PrivateRoute>} />
        <Route path={R+'info'} element={<PrivateRoute id={59}><Info /></PrivateRoute>} />
        <Route path={R+'notautorized'} element={<NotAutorized />} />
        <Route path={R} element={<AcountPage />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

