import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { APICALLER } from "../Api/ApiCaller";
import { useLogin } from "./LoginProvider";
const Contexto = createContext();

const NotificationsProvider = ({ children }) => {
  const [cantidad, setCantidad] = useState(0); // CANTIDAD DE NOTIFICACIONES
  const [lista, setLista] = useState([]);
  const { permisos, logueado } = useLogin();
  const getLista = useCallback(async () => {
    if (logueado) {
      let autorizacion = permisos.findIndex(
        (elem) => elem.id_permiso_permiso === "37"
      );
      if (autorizacion > -1) {
        let res = await APICALLER.get({
          table: `productos`, include:"productos_depositos", on:'id_producto,id_producto_deposito',
          where:`minimo_producto,>=,stock_producto_deposito,and,tipo_producto,=,1,and,notificar_producto,=,1`,
          fields: `id_producto,nombre_producto,codigo_producto`,
        });
        

        if (res.response === "ok") {
            let cantidad = res.results.length
          setCantidad(cantidad);

          setLista(res.results);
        } else {
          console.log(res);
        }
      }
    }
  }, [permisos, logueado]);

  useEffect(() => {
    const ca = new AbortController();
    let isActive = true;
    if (isActive) {
      getLista();
    }
    return () => {
      isActive = false;
      ca.abort();
    };
  }, [getLista]);

  return (
    <Contexto.Provider value={{ cantidad, setCantidad, lista, setLista }}>
      {children}
    </Contexto.Provider>
  );
};

export const useNotifications = () => {
  const { cantidad, setCantidad, lista, setLista } = useContext(Contexto);
  return { cantidad, setCantidad, lista, setLista };
};

export default NotificationsProvider;
