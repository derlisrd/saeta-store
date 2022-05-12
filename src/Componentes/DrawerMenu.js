import React from "react";
import { Typography, Icon,SwipeableDrawer } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ListaMenu from "./ListaMenu";
import { APPNAME, BASEURL, ICONAPP } from "../Config/globales";
import { useTheme } from "../Contextos/ThemeProviderContext";
import { Link } from "react-router-dom";


export default function DrawerMenu({variant,onClose,open,onOpen}) {
  const { drawerWidth } = useTheme();
  const estilos = makeStyles((theme) => ({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: theme.palette.background.default,
    },
    toolbar: theme.mixins.toolbar,
    appname: {
      display: "flex",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      transition: "all 0.2s linear",
    },
    linkHome:{
      textDecoration:"none",
      color: theme.palette.neutral.main,
    },
  }));
  const classes = estilos();
  return (
    <SwipeableDrawer
      variant={variant}
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
      open={open}
      onOpen={()=>{onOpen(true)}}
      onClose={()=>{onClose(false)}}
      anchor='left'
    >
      <div className={classes.toolbar}>
        <Link to={BASEURL+'/'} className={classes.linkHome}>
          <Typography className={classes.appname} variant="button">
            {APPNAME}
            <Icon color="primary">{ICONAPP}</Icon>
          </Typography>
        </Link>
      </div>

      <ListaMenu  onClose={variant==='temporary' ? ()=>{onClose(false)} : ()=>{}} />
    </SwipeableDrawer>
  );
}
