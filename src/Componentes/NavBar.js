import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Icon,
  Hidden,
  Tooltip,
} from "@mui/material/";
import {makeStyles} from '@mui/styles'
import { useTheme } from "../Contextos/ThemeProviderContext";
import UserMenu from "./NavSection/UserMenu";
import Notifications from "./NavSection/Notifications";
import LanguageMenu from "./NavSection/LanguageMenu";



export default function NavBar({ AbrirMenu, AbrirMenuGrande,open,openPhone }) {



const { themeMode, changeTheme, drawerWidth } = useTheme();

  const estilos = makeStyles((theme) => ({

    appBar: {
      [theme.breakpoints.up("md")]:{
        width: "100%",
      },
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: theme.palette.background.default,
    },
    // cuando está abierto
    appBarShift: {
      [theme.breakpoints.down("md")]:{
        width: "100%",
      },
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      backgroundColor: theme.palette.background.default,
    },

    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("lg")]: {},
    },

    titulos:{
      display:"flex",
      width:"100%",
      justifyContent:"flex-end",
      alignItems:"center",
      
    },
    //NOMBRE DE USUARIO
    nombreUsuario:{
      [theme.breakpoints.down("md")]: {
        display:"none",
      },
    },


  }));
  const classes = estilos();

  

  return (
    <AppBar position="fixed" color="inherit" className={ open ? classes.appBarShift : classes.appBar}>
      <Toolbar>
        <Hidden mdDown>
          <IconButton className={classes.menuButton} onClick={()=>{AbrirMenuGrande(!open)}}>
            <Icon color="primary"> { open ? `menu_open`: `menu`} </Icon>
          </IconButton>
        </Hidden>

        <Hidden mdUp>
          <IconButton className={classes.menuButton} onClick={()=>{AbrirMenu(!openPhone)}}>
            <Icon color="secondary">menu</Icon>
          </IconButton>
        </Hidden>

        <div className={classes.titulos}>

          <div>
            <LanguageMenu />
            <Notifications />

            <Tooltip title="Cambiar de tema" >
              <IconButton onClick={changeTheme} >
                <Icon color="warning" >
                  { themeMode==="dark" ? `nights_stay` : `tungsten` }
                </Icon>
              </IconButton>
              </Tooltip>

            <UserMenu />
          </div>
        </div>

      </Toolbar>
      
    </AppBar>


  );
}
