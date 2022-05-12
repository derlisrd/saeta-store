import { Container, Stack, TextField, Typography, Button, FormGroup, FormControlLabel, Checkbox} from '@mui/material'
import React, {useState} from 'react'
import { useConfig } from '../../Contextos/DataConfigProvider'

const RegisterForm = () => {

    const {setConfig} = useConfig();
    const initialForm = {
        apiurl:"",
        apikey:"",
        appname:"",
        baseurl:"",
    }
    const [form,setForm] = useState(initialForm);
    const [registerSwitch,setRegisterSwitch] = useState(true);

    const change = e=>{
        const {value,name}= e.target
        setForm({...form,[name]:value})
    }

    const enviar = async()=>{
        setConfig(form)
    }

  return (
    <Container maxWidth="xs" >
        <Stack spacing={2} direction={"column"} sx={{ alignItems:"center", minHeight:"100vh", justifyContent:"center" }}>
            <Typography variant="h5">Instalación de sistema</Typography>
            <TextField onChange={change} value={form.appname} name="appname" autoFocus  fullWidth label="Nombre de tienda" helperText="Ej: /carpeta/sistema" />
            <TextField onChange={change} value={form.baseurl} name="baseurl" fullWidth label="Base url" helperText="Ej: /carpeta/sistema" />
            <TextField onChange={change} value={form.apiurl} name="apiurl" fullWidth label="Endpoint api url" helperText="Ej: http://api.ejemplo.com/" />
            <TextField onChange={change} value={form.apikey} name="apikey" fullWidth label="API KEY" helperText="" />
            <FormGroup>
                <FormControlLabel control={<Checkbox color="success" onChange={()=> setRegisterSwitch(!registerSwitch) }  />} label="Ya tengo un usuario" />
            </FormGroup>
            {
                registerSwitch &&        
            <>
            <Typography variant="button">REGISTRO DE USUARIO</Typography>
            <TextField disabled={registerSwitch} fullWidth label="Nombre" />
            <TextField disabled={registerSwitch} fullWidth label="Username" />    
            <TextField disabled={registerSwitch} fullWidth label="Contraseña" />
            </>
            }
            <Button size="large" onClick={enviar} variant="contained">Iniciar</Button>
        </Stack>
    </Container>
  )
}

export default RegisterForm
