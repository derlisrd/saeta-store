import { createBrowserHistory} from 'history';

export const history = createBrowserHistory();

//const storage = JSON.parse(localStorage.getItem("dataConfig"));

export const BASEURL =  process.env.REACT_APP_BASEURL; //'/vikki'; // aqui debe ir al final sin la barra ej: /carpeta/otracaperta
export const ICONAPP = process.env.REACT_APP_ICON; //export const ICONAPP = 'content_cut'; // DEBE ESTAR INSTALADO GOOGLE FONTS ICONS https://fonts.google.com/icons?selected=Material+Icons
export const APIURL = process.env.REACT_APP_API_URL; // ejemplo: http://dominio.com/api/
export const APPNAME = process.env.REACT_APP_NAME;
export const XAPITOKEN = process.env.REACT_APP_API_KEY_TOKEN;
export const SECRETO =  process.env.REACT_APP_SECRETO;


export const POSIBLES_ERRORES = {
    "conexion": "Error de conexión.",
}

