import {useState} from 'react'
import {IconButton, Icon, Menu,  List, ListItem, ListItemIcon,ListItemText, Badge } from '@mui/material'
import { useNotifications } from '../../Contextos/NotificationsProvider'
import Funciones from '../../Funciones'

const Notifications = () => {

    const {cantidad,lista} = useNotifications()
    const [state,setState] = useState(null);
    const handleClick = (event) => {
        setState(event.currentTarget);
    };

    const close = () => {
        setState(null);
    };




  return (
    <>
        <IconButton onClick={handleClick}>
              <Badge color="error" badgeContent={cantidad}  >    
                  <Icon>notifications</Icon>
                </Badge>
        </IconButton>
      <Menu
        anchorEl={state}
        keepMounted
        open={Boolean(state)}
        onClose={close}
      >
        <List>
            {
            lista.length>0 ? 
                lista.map((e,i)=>(
                    <ListItem button key={i} onClick={()=> { Funciones.goto(`compras?code=${e.codigo_producto}`); close(); } } >
                        <ListItemText secondary={`Producto en falta: ${e.nombre_producto}`} />
                    </ListItem>
                ))
            :
            <ListItem>
                <ListItemIcon><Icon>notifications_off</Icon></ListItemIcon>
                <ListItemText secondary="No hay notificaciones" />
            </ListItem>
            }
        </List>
      </Menu>
    </>
  )
}

export default Notifications
