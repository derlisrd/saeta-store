import {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import { useLogin } from "../../Contextos/LoginProvider";
import { APICALLER } from "../../Api/ApiCaller";
import swal from "sweetalert";

const UsuarioContext = createContext();

const UsuariosProvider = ({ children }) => {
  const [openDialogPermisos, setOpenDialogPermisos] = useState(false);
  const [idUserPermiso,setIdUserPermiso] = useState(null)
  const [nombreUserPermiso,setNombreUserPermiso] = useState("")
  const [listaPermisos,setListaPermisos] = useState([])

  const [openDialog, setOpenDialog] = useState(false);

  const [openDialogFormEdit, setOpenDialogFormEdit] = useState(false);

  const [dialogConfirmacion, setDialogConfirmacion] = useState(false);
  const [dialogChangePassword,setDialogChangePassword] = useState(false);
  const [password_confirm, setPassword_confirm] = useState("");

  const [mensajeError, setMensajeError] = useState("");

  const table = `users`;

  const [lista, setLista] = useState([]);
  const initialCargas = {listas:true,guardar:false}
  const [cargas,setCargas] = useState(initialCargas);
  const { token_user, id_user,username_user,DescifrarTexto } = useLogin();

  const initialForm = {
    id_user:"",
    nombre_user: "",
    username_user: "",
    password_user: "",
    email_user: "",
    rol_user: "",
  };
  const [formulario, setFormulario] = useState(initialForm);
  const openchangePassword =  user=>{
    if(id_user===user.id_user){
      setDialogChangePassword(true);
    }
  }
  const changePassword = async(f)=>{
    let passOld = f.old;
    let resPassOld = await APICALLER.confirmPassword({username_user: DescifrarTexto(username_user),password_user:passOld})
    if(resPassOld.response==="ok" && resPassOld.found===1){
      let data = {password_user: f.new,id_user: id_user}
      let res = await APICALLER.updatePassword(data);
      if(res.response==="ok"){
        setDialogChangePassword(false);
        swal({icon:"success",text:"Contraseña cambiada exitosamente, para mayor seguridad, cierre la sesión e inicie nuevamente.",timer:6000});
      }
    }
    else{
      swal({text:"Contraseña incorrecta",timer:6000,icon:"error"});
    }
  }

  /*************************************************************** */
  const borrarUser = (ID, nombre) => {
    if (ID === id_user) {
      swal({icon: "error",title: "Que estás haciendo?",text: "No te puedes borrar a ti mismo",timer:1400});
    } else {
      swal({
        title: "Borrar",icon: "warning",
        text: `Borrar a ${nombre}`,
        buttons: ["Cancelar", "Borrar"],
      }).then((e) => {
        if (e) {
          swal({
            title: "Confirmar contraseña",
            icon: "info",
            dangerMode: true,
            buttons: ["Cancelar", "Confirmar"],
            content: {
              element: "input",
              attributes: {
                placeholder: "Debemos estar seguros de que no eres un farzante",
                type: "password",
              },
            },
          }).then(async (pass) => {
            if (pass) {
            const pas = await APICALLER.confirmPassword({username_user: DescifrarTexto(username_user),password_user:pass})
              
              if (pas.response === "ok") {
                setCargas({...cargas,guardar:true});
                let res = await Promise.all([APICALLER.delete({table: "users",id: ID,token: token_user}),APICALLER.delete({table:'permisos_users',namecolumns:`id_user_permiso`,ids:ID,token:token_user})])
               
                if (res[1].response === "ok") {
                  swal({ icon: "success", title: "Borrado correctamente",timer:1200 });
                  getDatas();
                }
              } else {
                swal({
                  icon: "error",
                  title: "Ha ocurrido un error",
                  text:pas.message
                });
                
              }
              

            }
          });
        }
      });
    }
  };

  /*************************************************************** */


  const enviarFormulario = async(e) => {
    e.preventDefault();

    const {username_user,email_user} = formulario;
    
    var exist;
    if(formulario.id_user===""){
      exist = await APICALLER.get({table:'users',token:token_user,where:`username_user,=,'${username_user}',or,email_user,=,'${email_user}'`})
    }
    else{
      exist = await APICALLER.get({table:'users',token:token_user,
      where:`(username_user,=,'${username_user}',or,email_user,=,'${email_user}'),and,id_user,!=,${formulario.id_user}`})
      
    }
    
    if(exist.found<1){
      setDialogConfirmacion(true);
    }
    else{
      swal({text:'Usuario o email están ocupados, elija otros',timer:3000,icon:'error'})
    }
  };

  /******************************************************* */

  const enviarDeVerdad = async () => {
      
      const res = await APICALLER.confirmPassword({username_user: DescifrarTexto( username_user),password_user:password_confirm})
      if (res.response === "ok") {
        formulario.id_user==="" ?  insertDeVerdad() : updateDeVerdad() ;
      } else {
        setMensajeError(res.message);
      }
      
  };

  const limpiarTodo = ()=>{
    setMensajeError("");
    setPassword_confirm("");
    setDialogConfirmacion(false);
    setOpenDialogFormEdit(false);
    setOpenDialog(false);
    setFormulario(initialForm);
    getDatas();
  }

  /****************************************** */
  const updateDeVerdad = async () => {
    setCargas({...cargas,guardar:true});
    delete formulario.password_user;
    const res = await APICALLER.update({ table:'users',
      token: token_user,
      data: formulario,
      id:formulario.id_user,
    });
    if (res.response === "ok") {
      swal({
        icon: "success",
        text: "Actualizado correctamente",
        timer:2000,
      });
      limpiarTodo();
      setOpenDialogFormEdit(false)
    } 
    setCargas({...cargas,guardar:false});
  };

  /******************************************************* */

  const insertDeVerdad = async () => {
      setCargas({...cargas,guardar:true});
      delete formulario.id_user;
      //console.log(formulario)
      const res = await APICALLER.register({ datos:formulario });
      if (res.response === "ok") {
        swal({
          icon: "success",
          text: "Agregado correctamente",
          timer:2000,
        });
        //console.log(res);
      }
      else{ console.log(res)} 
      setCargas({...cargas,guardar:false});
      limpiarTodo()
  }

  /****************************************** */

  const getDatas = useCallback(async () => {
    

    setCargas({listas:true,guardar:false});
    let res = await Promise.all([APICALLER.get({table:'users',token:token_user,/* where:"id_user,<>,1" */}),APICALLER.get({table:`permisos`,sort:'-descripcion_permiso'})]);
    setLista(res[0].results);
    let array = [...res[1].results]
    array.forEach((element,index) => {
       array[index].checked=false
    });
    setListaPermisos(array)
    setCargas({guardar:false,listas:false});
  },[token_user])


  useEffect(() => {
    const ca = new AbortController()
    let isActive = true;
    if(isActive){
      getDatas();
    }
    return ()=>{
      isActive = false; ca.abort();
    }
  }, [getDatas]);

  return (
    <UsuarioContext.Provider
      value={{
        openDialog,
        setOpenDialog,
        cargas,
        lista,
        setLista,
        enviarFormulario,
        dialogConfirmacion,
        setDialogConfirmacion,
        enviarDeVerdad,
        password_confirm,
        setPassword_confirm,
        mensajeError,
        setMensajeError,
        formulario,
        setFormulario,
        initialForm,
        borrarUser,
        table,
        openDialogFormEdit,
        setOpenDialogFormEdit,
        openDialogPermisos,
        setOpenDialogPermisos,changePassword,dialogChangePassword,setDialogChangePassword,openchangePassword,
        idUserPermiso,setIdUserPermiso,nombreUserPermiso,setNombreUserPermiso,listaPermisos,setListaPermisos,
        
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};

export const useUsuarios = () => {
  const {
    openDialog,
    setOpenDialog,
    cargas,lista,
    setLista,
    enviarFormulario,
    dialogConfirmacion,
    setDialogConfirmacion,
    enviarDeVerdad,
    password_confirm,
    setPassword_confirm,
    mensajeError,
    setMensajeError,
    formulario,
    setFormulario,
    initialForm,
    borrarUser,
    openDialogFormEdit,
    setOpenDialogFormEdit,
    openDialogPermisos,
    setOpenDialogPermisos,changePassword,dialogChangePassword,setDialogChangePassword,openchangePassword,
    idUserPermiso,setIdUserPermiso,nombreUserPermiso,setNombreUserPermiso,listaPermisos,setListaPermisos,
  } = useContext(UsuarioContext);
  return {
    openDialog,
    setOpenDialog,
    cargas,lista,
    setLista,
    enviarFormulario,
    dialogConfirmacion,
    setDialogConfirmacion,
    enviarDeVerdad,
    password_confirm,
    setPassword_confirm,
    mensajeError,
    setMensajeError,
    formulario,
    setFormulario,
    initialForm,
    borrarUser,
    openDialogFormEdit,
    setOpenDialogFormEdit,
    openDialogPermisos,
    setOpenDialogPermisos,changePassword,dialogChangePassword,setDialogChangePassword,openchangePassword,
    idUserPermiso,setIdUserPermiso,nombreUserPermiso,setNombreUserPermiso,listaPermisos,setListaPermisos,
  };
};

export default UsuariosProvider;
