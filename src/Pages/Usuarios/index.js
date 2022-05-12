import React from 'react'

import UsuariosProvider from './UsuariosProvider'
import UsuariosLista from './UsuariosLista'
import UsuarioForm from './UsuarioForm'
import UsuarioDialogConfirm from './UsuarioDialogConfirm'
import UsuarioFormEdit from './UsuarioFormEdit'
import PermisosDialog from './PermisosDialog'
import DialogChangePassword from './DialogChangePassword'

const Usuarios = () => {
  return (
    <UsuariosProvider>
      <UsuariosLista />
      <UsuarioDialogConfirm />
      <UsuarioForm />
      <PermisosDialog />
      <UsuarioFormEdit />
      <DialogChangePassword />
    </UsuariosProvider>
  )
}

export default Usuarios
