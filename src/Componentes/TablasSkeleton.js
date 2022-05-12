
import {Box, CircularProgress} from '@mui/material'


/*import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
}); */

const TablasSkeleton = ({columnas}) => {

  //const classes = useStyles();
  return (
    <Box sx={{ display: 'flex',width:"100%",alignItems:"center",justifyContent:"center" }}>
      <CircularProgress />
    </Box>
  )
}

export default TablasSkeleton
