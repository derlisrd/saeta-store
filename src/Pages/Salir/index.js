import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useLogin } from '../../Contextos/LoginProvider'
import { BASEURL } from '../../VariablesGlobales/globales'

const Salir = () => {

    const {DesLoguearse} = useLogin()
    let navigate = useNavigate()

    useEffect(()=>{
        DesLoguearse();
        navigate(BASEURL+'/')
    })

  return <Navigate to={BASEURL+`/`} />
}

export default Salir
