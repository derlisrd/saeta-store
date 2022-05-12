
import { withStyles} from '@mui/styles';
import Button from '@mui/material/Button';
import TextField  from '@mui/material/TextField';
import  Card  from '@mui/material/Card';

const CButton = withStyles({
    root: {
      padding: '15px',
      fontSize:"0.9rem",
      boxShadow:"8px 7px 4px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",  
    },
    label: {
    
    },
  })(Button);

  const CTextField = withStyles({
    root: {
      '& .MuiInputBase-input': {
        fontSize: 20,

      },
      marginTop:10,
      marginBottom:10,
    },
  })(TextField);

  const CCardBlue = withStyles({
    root: {
        background:"linear-gradient(31deg, #28a0ffdb 30%, #ffffff 90%)",
      }
    },
  )(Card);

  const CCardRed = withStyles({
    root: {
        background:"linear-gradient(45deg, #f7670087 30%, #ffffffb3 90%)",
      }
    },
  )(Card);



export function CustomCardRed ({...res}){
  return <CCardRed {...res} ></CCardRed>
}


export function CustomCardBlue ({...res}){

  return(<CCardBlue {...res} ></CCardBlue>)

}


export function CustomField ({...rest}){

    return(
        <CTextField {...rest} >
        </CTextField>
    )

}




export function CustomButton ({...rest}){

    return(
        <CButton {...rest} >
        </CButton>
    )

}