import {useState} from 'react'
import {IconButton, Icon, Menu,  List, ListItem, ListItemIcon,ListItemText, } from '@mui/material'
import { BASEURL, history } from '../VariablesGlobales/globales'
import swal from 'sweetalert'
import { Funciones } from '../Funciones/Funciones'

const UserMenu = () => {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const cerrarSesion = ()=>{
      swal({
        text: "Desea cerrar el sistema?",
        icon: "warning",
        buttons: ["Cancelar", "OK"],
      }).then((yes) => {
        if (yes) {
          console.log("salir");
          //Funciones.goto("salir");
        }
        else{
          handleClose();
        }
      })
    }
  return (
    <>
        <IconButton onClick={handleClick}><Icon color="inherit" >more_vert</Icon></IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <List>
            <ListItem button >
                <ListItemIcon><Icon>manage_accounts</Icon></ListItemIcon>
                <ListItemText primary="Perfil" />
            </ListItem>
            <ListItem button onClick={cerrarSesion}>
                <ListItemIcon><Icon>logout</Icon></ListItemIcon>
                <ListItemText primary="Salir" />
            </ListItem>
        </List>
      </Menu>
    </>
  )
}

export default UserMenu
