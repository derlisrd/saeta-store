import {useState} from 'react'
import {IconButton, Icon, Menu,  List, ListItem, ListItemIcon,ListItemText, Badge } from '@material-ui/core'
import { useNotifications } from '../Contextos/NotificationsProvider'

const Notifications = () => {

    const {cantidad,lista} = useNotifications()
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };




  return (
    <>
        <IconButton onClick={handleClick}>
              <Badge color="error" badgeContent={cantidad}  >    
                  <Icon>notifications</Icon>
                </Badge>
        </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <List>
            {
            lista.length>0 ? 
                lista.map((item,i)=>(
                    <ListItem button key={i} >
                        <ListItemText secondary={`Producto en falta: ${item.nombre_producto}`} />
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
