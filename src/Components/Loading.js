
import { makeStyles} from '@mui/styles'
import {Backdrop, CircularProgress} from '@mui/material'

const useStyles = makeStyles((theme)=>({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        backdropFilter:"blur(2px)",
      },
}))

const Loading = ()=>{
    const classes = useStyles();
    return (
    <Backdrop className={classes.backdrop} open={true} >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
}


export default Loading;