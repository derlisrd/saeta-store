import {
  Icon,
  Fab,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Stack,
} from "@mui/material";

import Tablas from "../../Componentes/Tablas";

import { useUsuarios } from "./UsuariosProvider";
import { useState } from "react";

// Componente principal
const UsuariosLista = () => {
  const {
    setIdUserPermiso,
    setOpenDialog,
    cargas,
    openDialog,
    lista,
    borrarUser,
    setFormulario,
    setOpenDialogFormEdit,
    initialForm,
    setOpenDialogPermisos,
    setNombreUserPermiso,
    openchangePassword
  } = useUsuarios();
  const [inputSearch, setInputSearch] = useState("");
  const setearFormulario = (id) => {
    let array = [...lista];
    let index = array.findIndex((e) => e.id_user === id);
    array[index].password_user = "";
    setFormulario(array[index]);
    setOpenDialogFormEdit(true);
  };
  const opencloseDialog = () => {setOpenDialog(!openDialog);};
  
  const Acciones = ({ id, extraprops,filaProps }) => (
    <Stack spacing={1} direction="row">
      <Fab
        size="small"
        color="success"
        variant="round"
        onClick={() => {
          setOpenDialogPermisos(true);
          setIdUserPermiso(id);
          setNombreUserPermiso(extraprops);
        }}
      >
        <Icon>manage_accounts</Icon>
      </Fab>
      <Fab size="small" onClick={()=>{
        openchangePassword(filaProps)
      }}>
        <Icon>key</Icon>
      </Fab>
      <Fab
        size="small"
        color="primary"
        variant="round"
        onClick={() => {
          setearFormulario(id);
        }}
      >
        <Icon>edit</Icon>
      </Fab>
      <Fab
        size="small"
        color="secondary"
        variant="round"
        onClick={() => {
          borrarUser(id, extraprops);
        }}
      >
        <Icon>delete</Icon>
      </Fab>
    </Stack>
  );

  const columns = [
    {
      field: "id_user",
      title: "ID",
    },

    {
      field: "nombre_user",
      title: "Nombre",
    },
    {
      field: "username_user",
      title: "Username",
    },
    {
      field: "last_login_user",
      title: "Ult. Logueo",
    },
    {
      field: "rol_user",
      title: "Rol",
      items: {
        1: "Administrador",
        2: "Gerente",
        3: "Caja",
        4: "Vendedor",
        5: "Entrega",
      },
      comparaItem: "rol_user",
    },
  ];

  const FilterDataUsers = lista.filter((item) => {
    return item.nombre_user.toLowerCase().includes(inputSearch.toLowerCase());
  });

  const searchInput = (
    <Stack spacing={2} direction="row">
      <TextField
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <Icon>search</Icon>
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={(e) => setInputSearch(e.target.value)}
        variant="outlined"
        label="Buscar"
      />
      <Button
        color="primary"
        variant="outlined"
        size="large"
        onClick={() => {
          opencloseDialog();
          setFormulario(initialForm);
        }}
      >
        AGREGAR
      </Button>
    </Stack>
  );


  return (
    <Tablas
      nombretabla="Usuarios"
      subtitle="En el módulo USUARIO podrá registrar nuevos usuarios en el sistema ya sea un administrador o un cajero, también podrá ver la lista de usuarios registrados, buscar usuarios en el sistema, actualizar datos de otros usuarios y los suyos."
      namecolumnID="id_user"
      columnas={columns}
      filas={FilterDataUsers}
      icono="person"
      bgicono="#303f9f"
      Acciones={Acciones}
      extraprops={`nombre_user`}
      search={searchInput}
      cargando={cargas.listas}
      showOptions
    />
  );
};

export default UsuariosLista;
