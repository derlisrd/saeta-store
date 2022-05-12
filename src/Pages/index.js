import React, { useState } from "react";
import {  Hidden } from "@mui/material";
import {makeStyles} from '@mui/styles'

import NavBar from "../Componentes/NavBar";
import DrawerMenu from "../Componentes/DrawerMenu";

import {useTheme} from '../Contextos/ThemeProviderContext'

export default function MainPage({ children }) {
  const [abrirMenu, setAbrirMenu] = useState(false);
  const [abrirMenuGrande, setAbrirMenuGrande] = useState(true);
  const {drawerWidth} = useTheme()

  const accionAbrirMenuGrande = (option) =>  setAbrirMenuGrande(option);
  const accionAbrirMenu = (option) => setAbrirMenu(option);

  const estilos = makeStyles((theme) => {
    return {
      root: {
        display: "flex",
      },
      container:{
        margin:"0",
        padding:"10px",
        borderRadius:"8px",
      },
      toolbar: theme.mixins.toolbar,
      // cuando se esconde el menu
      content: {
        flexGrow: 1,
        padding: theme.spacing(1),
        minHeight: "calc(99vh - " + theme.mixins.toolbar.minHeight + "px)",
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.up("md")]:{ //
          marginLeft: -drawerWidth,  
        }
      },
      // cuando se expande el menu
      contentExpand: {
        flexGrow: 1,
        padding: theme.spacing(1),
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
        minHeight: "calc(99vh - " + theme.mixins.toolbar.minHeight + "px)",
      },
    };
  });
  const classes = estilos();

  return (
    <div className={classes.root}>
      <NavBar
        AbrirMenu={accionAbrirMenu}
        AbrirMenuGrande={accionAbrirMenuGrande}
        open={abrirMenuGrande}
        openPhone={abrirMenu}
      />
      <Hidden mdDown>
        <DrawerMenu variant="persistent" open={abrirMenuGrande} onOpen={accionAbrirMenuGrande} onClose={accionAbrirMenuGrande} />
      </Hidden>

      <Hidden mdUp>
        <DrawerMenu variant="temporary" open={abrirMenu} onOpen={accionAbrirMenu} onClose={accionAbrirMenu} />
      </Hidden>
      <div
        className={abrirMenuGrande ? classes.contentExpand : classes.content}
      >
        <div className={classes.toolbar} />
        <div className={classes.container}>
        {children}
        </div>
      </div>
    </div>
  );
}
