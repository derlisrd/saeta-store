import React from 'react'
//import { useConfig } from '../../Contextos/DataConfigProvider'
import LoginForm from './LoginForm';
//import RegisterForm from './RegisterForm';

const AcountPage = () => {

    //const {dataConfig} = useConfig();


    return <LoginForm />

  /* return (
    <>
        {
            dataConfig ? <LoginForm /> : <RegisterForm />
        }  
    </>
  ) */
}

export default AcountPage
