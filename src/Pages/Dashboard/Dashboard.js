import { Container, Typography,Icon,Box } from "@mui/material";
import {makeStyles} from '@mui/styles';
import {Link} from 'react-router-dom'
import { useLogin } from "../../Contextos/LoginProvider"
import { ListaDashboard } from "./ListaDashboard"
import {useLanguage} from "../../Contextos/Language"
const useStyles = makeStyles((theme) => ({
    icono:{
        fontSize:100,
    },
    grid:{
        display:"grid",
        gap:"10px",
        gridTemplateColumns:"repeat(auto-fill,minmax(175px,1fr))",
    },
    mb20:{
        marginBottom:"20px"
    },
    box:{
        display:"flex",
        justifyContent:"center",
        flexDirection:"column",
        alignItems:"center",
        border:"1px solid whitesmoke",
        borderRadius:"6px",
    },
    titulo:{
        marginBottom:theme.spacing(4),
    },
    link:{
        textDecoration:"none"
    },

}))

const Dashboard = () => {
    const classes = useStyles()

    const {permisos, nombre_user} = useLogin()
    const {lang} = useLanguage()
    const FilterData =  [];

    ListaDashboard.forEach(i=>{
        if(permisos.some(e => parseInt(e.id_permiso_permiso) === parseInt(i.id_permiso))){
            FilterData.push(i)
        }
    })

  return (
    <Container>
        <div className={classes.titulo}>
            <Typography variant="h5" >
                Hola: {nombre_user}
            </Typography>
            <Typography variant="caption">
               { lang?.["SubModDashboard"]}
            </Typography>
        </div>
        

        <div className={classes.grid} >
            {
                FilterData.map((e,i)=>(
                    <div key={i}  >
                        <Link to={e.url} className={classes.link} >
                            <Box bgcolor={e.bgcolor} className={classes.box} color={e.color} p={2}>
                                <Icon className={classes.icono} >{e.icon}</Icon>
                                <Typography variant="button">
                                    { lang?.[e.text] ? lang?.[e.text] : e.text }
                                </Typography>
                            </Box>
                        </Link>
                    </div>
                ))
            }
        </div>

    </Container>
  )
}

export default Dashboard
