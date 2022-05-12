import { Dialog, DialogActions, DialogContent, TextField, Button,Alert, AlertTitle } from "@mui/material";
import {makeStyles} from '@mui/styles';
import  { useRef } from "react";
import { useUsuarios } from "./UsuariosProvider";


const useStyles = makeStyles((theme)=>({
    textfield: {
        margin: theme.spacing(3,0)
    }
}))
const UsuarioDialogConfirm = () => {
    const { dialogConfirmacion, setDialogConfirmacion, enviarDeVerdad,setPassword_confirm, password_confirm,mensajeError } = useUsuarios();
    const classes = useStyles();
    const input_password_confirm = useRef(null);


  return (
    <>
      <Dialog
        open={dialogConfirmacion}
        onClose={() => setDialogConfirmacion(false)}
        fullWidth
      >
        <DialogContent>
            {
            mensajeError !=="" &&
            <Alert severity="error">
                <AlertTitle>{mensajeError}</AlertTitle>
            </Alert>
            }

          <TextField
            type="password"
            className={classes.textfield}
            fullWidth
            inputRef={input_password_confirm}
            label="Confirmar contraseña"
            value={password_confirm}
            onChange={e => setPassword_confirm(e.target.value)}
            onKeyPress={e => { e.code==="Enter" && enviarDeVerdad() }}
            autoFocus
            autoComplete="off"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
            <Button variant="outlined" color="primary" onClick={enviarDeVerdad} >Confirmar</Button>
            <Button variant="outlined" color="secondary" 
                onClick={() => setDialogConfirmacion(false)}
            >Cancelar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UsuarioDialogConfirm;
