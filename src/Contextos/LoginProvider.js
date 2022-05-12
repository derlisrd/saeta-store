import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { APICALLER } from '../Api/ApiCaller';
import {
  history,
  BASEURL, SECRETO
  /*  POSIBLES_ERRORES, */
} from "../Config/globales";
import swal from "sweetalert";
import CryptoJS from "crypto-js";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  // estado si esta o no logueado
  const [logueado, setLogueado] = useState(false);
  const [recordar,setRecordar] = useState(false);
  // cargando la aplicacion
  const [cargando, setCargando] = useState(true);

  // MENSAJE DE BACKEND
  const [mensajeAlerta, setMensajeAlerta] = useState(null);
  const [cargandoMensaje, setCargandoMensaje] = useState(false);


  const CifrarTexto = (text) => CryptoJS.AES.encrypt(text, SECRETO).toString();
  const DescifrarTexto = (text) => CryptoJS.AES.decrypt(text, SECRETO).toString(CryptoJS.enc.Utf8);

  const storage = JSON.parse(sessionStorage.getItem("dataUser")) || JSON.parse(localStorage.getItem("dataUser"));
  const initialDataUser = {
    permisos:storage? storage.permisos : [],
    token_user:storage? storage.token_user : "",
    nombre_user:storage? storage.nombre_user : "",
    username_user:storage? storage.username_user:"",
    id_user:storage? storage.id_user : "",
    rol_user:storage ? storage.rol_user : ""
  }
  const [datauser,setDatauser] = useState(initialDataUser);
  
  const verificarLogin = useCallback(async () => {
    
      if (datauser.token_user && datauser.token_user!=="" && !logueado ) {
        let res = await APICALLER.validateToken(datauser.token_user);
        if (res.found > 0 && res.response === "ok") {
          setLogueado(true);
        }else{
          swal({title: res.response,text: res.message,icon: "error", dangerMode: true}).then(()=>{DesLoguearse();})
        }
      
    }
    setCargando(false);
  }, [datauser,logueado]);

  const Loguearse = useCallback(async (data) => {
    setMensajeAlerta(null);
    setCargandoMensaje(true);
    try {
    let res = await Promise.all([APICALLER.getPromise({table:"empresas"}),APICALLER.login(data),APICALLER.getPromise({table:"monedas"})])
    let emp = res[0];
    let dataEmpresag = emp.response === "ok" ? emp.results[0] : {};
    var sqlDateStr = dataEmpresag?.licencia;
    var YMD = sqlDateStr.split("-");
    var sqlDate = new Date();
    sqlDate.setFullYear(parseInt(YMD[0]),parseInt(YMD[1]) - 1,parseInt(YMD[2]));
    var today = new Date();

    if (today >= sqlDate) {
      swal({ text: "Su licencia ha vencido.", icon: "warning" });
      setMensajeAlerta("Su licencia ha vencido");
      setCargandoMensaje(false);
      return false;
    } else {
      let login = res[1];
      if (login.found > 0 && login.response === "ok") {
        let log = login.results[0];
        let permisos = await APICALLER.get({
          table: `permisos_users`,
          where: `id_user_permiso,=,${log.id_user}`,
          fields: `id_permiso_permiso`,
        });
        let mon = res[2];
        localStorage.setItem("dataMonedas", JSON.stringify(mon.results))
        
        let dUser = {
          permisos:permisos.results,
          token_user:CifrarTexto(log.token_user),
          nombre_user:log.nombre_user,
          username_user:CifrarTexto(log.username_user),
          id_user:log.id_user,
          rol_user:log.rol_user
        }
        setDatauser(dUser)
        setLogueado(true);
        recordar ? localStorage.setItem("dataUser", JSON.stringify(dUser)) : sessionStorage.setItem("dataUser", JSON.stringify(dUser));
        localStorage.setItem("dataEmpresa", JSON.stringify(dataEmpresag));
        localStorage.removeItem("facturasStorage");
        localStorage.removeItem("dataProductos");
        history.push(BASEURL + "/dashboard");

        setCargandoMensaje(false);
      } else {
        setMensajeAlerta(res[1].message);
        setCargandoMensaje(false);
      }
      
    }
  } catch (error) {
    swal({text:"Servidor no responde."})   
  }
  }, [recordar]);

  const DesLoguearse = async () => {
    try {
      setLogueado(false);
      setCargandoMensaje(false);
      setDatauser({permisos:[],
        token_user:"",
        nombre_user:"",
        username_user:"",
        id_user:"",
        rol_user:""})
      sessionStorage.removeItem("dataUser");
      localStorage.removeItem("dataUser");
      localStorage.removeItem("dataProductos");
      localStorage.removeItem("facturasStorage");

      localStorage.removeItem("compras");
      //history.push(BASEURL + "/");
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    const ca = new AbortController(); let isActive = true;
    if (isActive) {
      verificarLogin();
    }
    return () => {
      isActive = false;
      ca.abort();
    };
  }, [verificarLogin]);
  
  const {id_user,rol_user,token_user,nombre_user,username_user,permisos} = datauser

  return (
    <LoginContext.Provider
      value={{
        logueado,recordar,setRecordar,
        cargando,
        Loguearse,
        setMensajeAlerta,
        mensajeAlerta,
        nombre_user,
        id_user,
        rol_user,
        token_user,
        cargandoMensaje,
        DesLoguearse,
        username_user,
        permisos,
        DescifrarTexto,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => {
  const {
    logueado,recordar,setRecordar,
    cargando,
    Loguearse,
    setMensajeAlerta,
    mensajeAlerta,
    nombre_user,
    id_user,
    rol_user,
    token_user,
    cargandoMensaje,
    DesLoguearse,
    username_user,
    permisos,
    DescifrarTexto,
  } = useContext(LoginContext);

  return {
    logueado,recordar,setRecordar,
    cargando,
    Loguearse,
    setMensajeAlerta,
    mensajeAlerta,
    nombre_user,
    id_user,
    rol_user,
    token_user,
    cargandoMensaje,
    DesLoguearse,
    username_user,
    permisos,
    DescifrarTexto,
  };
};
export default LoginProvider