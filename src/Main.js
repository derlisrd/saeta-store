import React from "react";
import { useLogin } from "./Contextos/LoginProvider";
import Loading from "./Componentes/Loading";
//import {  Switch } from "react-router";
import RoutesHome from "./Routes";

export default function Main() {
  const { cargando } = useLogin();

  if(cargando){
    return <Loading />
  }

  return (
      <RoutesHome />
  );
}
