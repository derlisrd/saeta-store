import {useState} from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
  Collapse,
} from "@mui/material";
import {makeStyles} from '@mui/styles'
import { useLocation } from "react-router-dom";
import {listamenu} from '../Config/listamenu'
import { useLogin } from "../Contextos/LoginProvider";
import { useLanguage } from "../Contextos/Language";
import { useTheme } from "../Contextos/ThemeProviderContext";
import { Link } from 'react-router-dom';





const ListaMenu = (props) => {
  const {onClose} = props
  
  const location = useLocation();
  const [listaMenu,setListaMenu] = useState(listamenu);
  const {permisos} = useLogin()
  const {lang} = useLanguage()
  // funcion para abrir menu
  const {drawerWidth} = useTheme();
  const switchOpen = (sw,id)=> {
    let array = [...listamenu];
    let index = array.findIndex((e)=> e.id===id)
    array[index].open = !sw;
    setListaMenu(array);
  }
  const cerrar = ()=>{
    onClose()
  }
  const estilos = makeStyles((theme) => ({

    links: {
      textDecoration: "none",
      color: "inherit",
      fontWeight:"bold",
    },
    selected: {
      color: theme.palette.primary.main,
    },
    expanded: {
      paddingLeft: theme.spacing(1),
    },
    root: {
      width: '100%',maxWidth: drawerWidth,
      backgroundColor: theme.palette.background.default,
    },
    submenues: {
      paddingLeft: theme.spacing(2),
    },
    oculto:{
      display:"none", visibility:"hidden"
    },
    iconItem:{
      minWidth:"30px",
    }
  }));
  const classes = estilos();




  return (
    <List
      component="nav"
      className={classes.root}
    >
      {
        listaMenu.map((data)=>(
          <div key={data.id}>
          {data.submenu ? 
           permisos.some(e => parseInt(e.id_permiso_permiso) === parseInt(data.id_permiso)) &&
          <div>
            <ListItem button onClick={()=>switchOpen(data.open,data.id)} classes={{selected:classes.selected}}>
              <ListItemIcon className={classes.iconItem}>
                <Icon color="inherit">{data.icono}</Icon>
              </ListItemIcon>
              <ListItemText primary={lang?.[data.texto] ? lang?.[data.texto] : data.texto} />
              <Icon color="inherit" >{ data.open ? `expand_less` : `expand_more` }</Icon>
            </ListItem>
            <Collapse in={data.open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding className={classes.submenues}>
                  {
                    data.submenu.map((sub,i)=>(
                      permisos.some(e => parseInt(e.id_permiso_permiso)===parseInt(sub.id_permiso)) &&
                      <div key={i} >  
                          <ListItem component={Link} to={sub.url} button onClick={cerrar} classes={{selected:classes.selected}} selected={sub.url===location.pathname ? true : false} >
                            <ListItemIcon className={classes.iconItem}>
                              <Icon color={sub.url===location.pathname ? "primary" : "inherit"}   >{sub.icono}</Icon>
                            </ListItemIcon>
                            <ListItemText primary={lang?.[sub.texto] ? lang?.[sub.texto] : sub.texto} />
                          </ListItem>
                        
                    </div>
                    ))
                  }
              </List>
            </Collapse>
          </div> 
          
          :
          <div className={permisos.some(e=> parseInt(e.id_permiso_permiso) === parseInt(data.id_permiso)) ? `` : classes.oculto }  >
          
            <ListItem component={Link} to={data.url}  button onClick={cerrar} classes={{selected:classes.selected}} selected={data.url===location.pathname ? true : false} >
              <ListItemIcon className={classes.iconItem} >
                <Icon color={data.url===location.pathname ? "primary" : "inherit"} >{data.icono}</Icon>
              </ListItemIcon>
              <ListItemText primary={lang?.[data.texto] ? lang?.[data.texto] : data.texto}/>
            </ListItem>
          </div>
          }
          </div>
        ))
      }

    </List>
  );
};

export default ListaMenu;

