import {Dialog,DialogActions,DialogTitle,DialogContent, Button, Grid, TextField} from "@mui/material"
import { useUsuarios } from "./UsuariosProvider";
import { useState } from "react";

const DialogChangePassword = () => {
    
    const {dialogChangePassword,setDialogChangePassword,changePassword} = useUsuarios()
    const [form,setForm] = useState({
        old:"",
        new:""
    })
    const change = e=>{
        const{name,value}=e.target
        setForm({...form,[name]:value})
    }
    const cerrar = ()=>{
        setDialogChangePassword(false);
    }
    
    
  return (
    <Dialog open={dialogChangePassword} onClose={cerrar} fullWidth>
      <DialogTitle>Cambiar contraseña</DialogTitle>
      <DialogContent dividers>
          <Grid container spacing={2}>
                <Grid item xs={12}>

              </Grid>
              <Grid item xs={12}>
                <TextField type="password" autoFocus fullWidth onChange={change} value={form.old} name="old" label="Contraseña antigua" />
              </Grid>
              <Grid item xs={12}>
                <TextField type="password" fullWidth onChange={change} value={form.new} name="new" label="Contraseña nueva" />
              </Grid>
          </Grid>
      </DialogContent>
      <DialogActions>
          <Button variant="outlined" onClick={()=>{changePassword(form)}}>Cambiar</Button>
          <Button variant="outlined" onClick={cerrar}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogChangePassword;
