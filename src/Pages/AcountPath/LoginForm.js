import { useState, useRef } from "react";
import {Container,TextField,InputAdornment, Icon,IconButton, Alert, Grid, FormControlLabel, Checkbox,Box, Stack} from "@mui/material";
import {CustomButton} from '../../Componentes/Customs/muiCustom'
import { motion } from "framer-motion";
import Loading from "../../Componentes/Loading";
import { useLogin } from "../../Contextos/LoginProvider";
import { Navigate } from "react-router";
import {  BASEURL,ICONAPP } from "../../Config/globales";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles((theme) => ({
  centerDiv:{
    minHeight:`calc(100vh - 20px)`,
    justifyContent:"center",
    alignItems:"center",
    display:"flex",
    flexDirection:"column",
    margin: "5px 10px"
  },
  formulario:{
    padding: 20,
    margin:"5px auto",
    border: "1px solid whitesmoke",
    borderRadius: 10,
  },
  icon:{
    fontSize:80,
    marginTop:(theme.spacing(-8))
  }
}))

export default function LoginForm() {
  const { Loguearse, logueado, mensajeAlerta, cargandoMensaje, cargando,recordar,setRecordar } = useLogin();
  const inicialValues = () => ({ username_user: "", password_user: ""});
  const [values, setValues] = useState(inicialValues);
  const inputPassword = useRef(null)
  const [TypePassInput,setTypePassInput] = useState("password")
  const changeInputType = ()=> {setTypePassInput( TypePassInput==="text" ? "password" : "text" );inputPassword.current.focus();}
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const enviarDatos = (e) => {e.preventDefault();Loguearse(values);};

  
  const styles = useStyles();
  if (cargando) {return <Loading />;}

  if (logueado) {return <Navigate to={BASEURL + "/dashboard"} />;}
  
  return (

    <motion.div
      initial={{ opacity: 0, y: "-50px" }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={styles.centerDiv}
    >
      <Container  maxWidth="xs"  >
        
      <Box boxShadow={3} className={styles.formulario}>
      <Stack justifyContent="center" alignItems="center">
        <Icon className={styles.icon}>{ICONAPP}</Icon>
        </Stack>
        <form onSubmit={enviarDatos}>
            <Grid container spacing={3} justifyContent="center" alignItems="center">
              <Grid item xs={12}><h2 style={{ textAlign:"center" }}>Ingresar</h2></Grid>
              <Grid item xs={12}>
              {mensajeAlerta && 
        <Alert  severity="error" icon={false} variant="outlined" > {mensajeAlerta}</Alert>
       }
              </Grid>
              <Grid item xs={12}>
              <TextField value={values.username_user} onChange={handleOnchange} required autoComplete="off" id="username_user" name="username_user" autoFocus
                label="Usuario" fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon color="disabled">perm_identity</Icon>
                    </InputAdornment>
                  ),
                }}
              />
              </Grid>
              <Grid item xs={12}>
              <TextField inputRef={inputPassword} value={values.password_user} onChange={handleOnchange} required id="password_user" name="password_user"
                  label="Contraseña" fullWidth type={TypePassInput}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon color="disabled">lock</Icon>
                      </InputAdornment>
                    ),endAdornment:(
                      <InputAdornment position="end">
                        <IconButton onClick={changeInputType}><Icon>{TypePassInput==="text" ? `visibility_off` : `visibility`}</Icon></IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
              <FormControlLabel control={<Checkbox checked={recordar} onChange={e=> setRecordar(e.target.checked)} />} label="Recordarme" />
              </Grid>
              <Grid item xs={12}>

                <CustomButton type="submit" variant="contained" color="primary" disabled={cargandoMensaje} fullWidth startIcon={<Icon>{cargandoMensaje? "rotate_left" : "login"}</Icon>}>
                  {cargandoMensaje ? "Cargando..." : "Ingresar"}
                </CustomButton>
              
              </Grid>
            </Grid>
        </form>
        </Box>
      </Container>
    </motion.div>

  );
}
