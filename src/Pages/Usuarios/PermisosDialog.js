import {
  Checkbox,
  DialogTitle,
  List,
  ListItem,
  Dialog,
  DialogContent,
  Icon,
  FormControlLabel,
  LinearProgress,
  DialogActions,
  Button,
} from "@mui/material";
import { useUsuarios } from "./UsuariosProvider";
import { useEffect,useCallback,useState } from "react";
import { APICALLER } from "../../Api/ApiCaller";
import { useLogin } from "../../Contextos/LoginProvider";

const PermisosDialog = () => {
  
  const {
    openDialogPermisos,
    setOpenDialogPermisos,
    nombreUserPermiso,
    setNombreUserPermiso,
    setIdUserPermiso,
    idUserPermiso,
    listaPermisos,
  } = useUsuarios();
  const {token_user} = useLogin()
  const [listaPermisosUsuario,setListaPermisosUsuario] = useState([])
  const [cargando,setCargando] = useState(true)
  const cerrar = () => {
    setOpenDialogPermisos(false);
    setIdUserPermiso(null);
    setNombreUserPermiso("");
  };

  const Enviar = async(check,idPermiso,index) => {
    setCargando(true)
    let array = [...listaPermisosUsuario]
    array[index].checked = !check;
    setListaPermisosUsuario(array)
    if(check===false){
      
      let data = {id_user_permiso:idUserPermiso,id_permiso_permiso:idPermiso}
      let res = await APICALLER.insert({table:`permisos_users`,data,token:token_user})
      res.response!=="ok" && console.log(res)
    }
    else{
      let res = await APICALLER.delete({token:token_user,table:`permisos_users`,namecolumns:`id_user_permiso,id_permiso_permiso`,ids:`${idUserPermiso},${idPermiso}`})
      res.response!=="ok" && console.log(res)
    }
    setCargando(false)
  };


  const getPermisos= useCallback(async()=>{
      if(idUserPermiso!==null){
        setCargando(true)
        // permisos habilitados
        let res = await APICALLER.get({table:`permisos_users`,where:`id_user_permiso,=,${idUserPermiso}`})
        
        if(res.response==="ok") {
            let result = res.results;
            
            let permisos = [...listaPermisos];
            let array = [];
            permisos.forEach((element)=>{
                let exist = result.findIndex(item=> item.id_permiso_permiso===element.id_permiso)
                
                array.push({...permisos,                    
                    id_permiso:element.id_permiso,
                    checked: exist<0 ? false : true,
                    clave_permiso: element.clave_permiso,
                    descripcion_permiso: element.descripcion_permiso
                    })
            })
            
            setListaPermisosUsuario(array)
        }else{
            console.log(res)
        }
        setCargando(false)
      }
  },[idUserPermiso,listaPermisos])

  useEffect(()=>{
    const ca = new AbortController()
    let isActive = true;

    if(isActive){
      getPermisos();
    }

    return ()=>{
      isActive = false;
      ca.abort();
    }
  },[getPermisos])

  return (
    <Dialog open={openDialogPermisos} onClose={cerrar} fullWidth>
      <DialogTitle>
          Permisos para: {nombreUserPermiso}
      </DialogTitle>
      <DialogContent dividers>
          {
              cargando && <LinearProgress />
          }
        <List>
          { listaPermisosUsuario.map((item,index) => (
            <ListItem key={item.id_permiso}>
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<Icon color="success" sx={{ fontSize:33 }}  >toggle_on</Icon>}
                    icon={<Icon>toggle_off</Icon>}
                    color="primary"
                    name={item.clave_permiso}
                    onChange={()=>{Enviar(item.checked,item.id_permiso,index)}}
                    checked={item.checked}

                  />
                }
                label={item.descripcion_permiso}
              /> 
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={cerrar}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PermisosDialog;
