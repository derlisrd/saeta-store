import {useState} from 'react'
import {IconButton, Icon, Menu,  List, ListItem, ListItemText } from '@material-ui/core'
import { useLanguage } from '../Contextos/Language';


const LanguageMenu = () => {

    const {changeLang} = useLanguage()
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (e) => {setAnchorEl(e.currentTarget);};
    const handleClose = () => {setAnchorEl(null);}


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

            <ListItem button>
                <ListItemText onClick={()=>{cambiar("es")}} secondary="Español" />
            </ListItem>
            <ListItem button>
                <ListItemText onClick={()=>{cambiar("en")}} secondary="English" />
            </ListItem>
            <ListItem button>
                <ListItemText onClick={()=>{cambiar("pt")}} secondary="Portugues" />
            </ListItem>
        </List>
      </Menu>
    </>
  )
}

export default LanguageMenu
