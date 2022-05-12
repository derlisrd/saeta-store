import React, { useEffect } from 'react'
import { Navigate } from 'react-router'
import { useLogin } from '../../Contextos/LoginProvider'
import { BASEURL } from '../../Config/globales'

const Salir = () => {

    const {DesLoguearse} = useLogin()

    useEffect(()=>{
        DesLoguearse();
    })

  return (
    <Navigate to={BASEURL+`/`} />
  )
}

export default Salir
