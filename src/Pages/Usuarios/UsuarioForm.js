import {
  Icon,LinearProgress,
  Alert,
  IconButton,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormLabel,InputLabel
} from "@mui/material";

import { useUsuarios } from "./UsuariosProvider";

import { useCallback, useState } from "react";


const UsuarioForm = () => {
  const [inputType,setInputType] = useState("password");
  const {openDialog,enviarFormulario,setOpenDialog,formulario, setFormulario,cargas} = useUsuarios()
  
  const changeType = useCallback(()=>{
    setInputType(inputType==="text" ? "password":"text");
  },[inputType])

  const cerrar = ()=>{
    setOpenDialog(false);
  }

  const handlerOnChange =  (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };


  return (
        <form onSubmit={enviarFormulario}>
      <Dialog open={openDialog} fullWidth  onClose={()=>cerrar()}>
          <DialogTitle>
          Agregar
          </DialogTitle>
          <DialogContent dividers >
            <Grid container spacing={2}>
            <Grid item xs={12}>
              {cargas.guardar && <LinearProgress />}
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
              autoFocus
              required
              label="Nombre completo"
              autoComplete="off"
              name="nombre_user"
              onChange={handlerOnChange}
              value={formulario.nombre_user}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon color="disabled">account_circle</Icon>
                  </InputAdornment>
                ),
              }}
              fullWidth
              variant="outlined"
              error={false}
              helperText="Nombre del usuario"
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
              label="Login de usuario"
              autoComplete="off"
              name="username_user"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon color="disabled">person</Icon>
                  </InputAdornment>
                ),
              }}
              onChange={handlerOnChange}
              value={formulario.username_user}
              fullWidth
              variant="outlined"
              helperText="Username con el que se loguea"
            />
            </Grid>
            <Grid item xs={12}>
            <FormLabel>
              <InputLabel>
                Rol de usuario
              </InputLabel>
            <Select 
              value={formulario.rol_user}
              variant="outlined"
              label="Rol de usuario"
              fullWidth
              name="rol_user"
              onChange={handlerOnChange}
            >
              <MenuItem value="" disabled>Seleccione un rol</MenuItem>
              <MenuItem value={1}>Administrador</MenuItem>
              <MenuItem value={2}>Gerente</MenuItem>
              <MenuItem value={3}>Cajero</MenuItem>
              <MenuItem value={4}>Vendedor</MenuItem>
              <MenuItem value={5}>Entrega</MenuItem>
            </Select>
            </FormLabel>
            </Grid>
            <Grid item xs={12}>
            <TextField
              name="email_user"
              autoComplete="off"
              onChange={handlerOnChange}
              value={formulario.email_user}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon color="disabled">email</Icon>
                  </InputAdornment>
                ),
              }}
              label="Correo Electrónico"
              type="email"
              fullWidth
              variant="outlined"
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
              name="password_user"
              onChange={handlerOnChange}
              required
              value={formulario.password_user}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={changeType}>
                      <Icon>visibility</Icon>
                    </IconButton>
                  </InputAdornment>
                ),
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon color="disabled">vpn_key</Icon>
                  </InputAdornment>
                ),
              }}
              label="Contraseña"
              type={inputType}
              fullWidth
              variant="outlined"
            />
            </Grid>
            <Grid item xs={12}>

            <Alert severity="info">
              Recuerde elegir una contraseña segura. No ponga 123, fecha de
              nacimiento, o nombre de perro, nah ! mentira, puede poner la contraseña que le guste y crea que sea segura.
            </Alert>
            </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={enviarFormulario} color="primary" variant="outlined">
              Agregar
            </Button>
            <Button
              onClick={()=>cerrar()}
              variant="outlined"
              color="error"
            >
              Cancelar
            </Button>
          </DialogActions>
      </Dialog>
        </form>
  );
};

export default UsuarioForm;
