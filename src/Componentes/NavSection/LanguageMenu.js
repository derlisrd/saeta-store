import {useState} from 'react'
import {IconButton, Icon, Menu,  List, ListItem, ListItemText } from '@mui/material'
import { useLanguage } from '../../Contextos/Language';


const LanguageMenu = () => {

    const {changeLang} = useLanguage()
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const cambiar = (lang)=>{
      handleClose()
      changeLang(lang);

    }



  return (
    <>
        <IconButton onClick={handleClick}>
        <Icon>language</Icon>
        </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <List>

            <ListItem button onClick={()=>{cambiar("es")}} >
                <ListItemText secondary="Español" />
            </ListItem>
            <ListItem button onClick={()=>{cambiar("en")}}>
                <ListItemText  secondary="English" />
            </ListItem>
            <ListItem button onClick={()=>{cambiar("pt")}}>
                <ListItemText  secondary="Portugues" />
            </ListItem>
        </List>
      </Menu>
    </>
  )
}

export default LanguageMenu
