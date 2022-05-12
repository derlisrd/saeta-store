import {
  Icon, IconButton,
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
  FormLabel,
  InputLabel,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useUsuarios } from "./UsuariosProvider";

const UsuarioFormEdit = () => {
  const {
    openDialogFormEdit,
    setOpenDialogFormEdit,
    formulario,
    setFormulario,
    enviarFormulario, id_user
  } = useUsuarios();

  const [inputType,setInputType] = useState("password");
  const changeType = useCallback(()=>{
    setInputType(inputType==="text" ? "password":"text");
  },[inputType])

  const handlerOnChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };
  const cerrar = () => {
    setOpenDialogFormEdit(false);
  };


  return (
    <Dialog fullWidth open={openDialogFormEdit} onClose={cerrar}>
      <form onSubmit={enviarFormulario}>
        <DialogTitle>Editar usuario</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
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
                <InputLabel>Rol de usuario</InputLabel>
                <Select
                  value={formulario.rol_user}
                  variant="outlined"
                  label="Rol de usuario"
                  fullWidth
                  name="rol_user"
                  onChange={handlerOnChange}
                  
                >
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
              {
                formulario.id_user===id_user && <TextField
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
              }
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary" variant="outlined">
            Editar
          </Button>
          <Button
            onClick={() => {
              cerrar();
            }}
            variant="outlined"
            color="secondary"
          >
            Cancelar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UsuarioFormEdit;
