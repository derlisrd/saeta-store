import {makeStyles} from '@mui/styles';
export const StylesGenerales = makeStyles((theme) => ({

    titulodialog:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center"
      },
      cargando:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:"100%",
      },
      page:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        "& > *": {
            margin: theme.spacing(0, 1),
          },
      },
      botones:{
        "& > *":{
          margin: theme.spacing(0,1)
        }
      },
      inputs:{
        display:"flex",
        flexWrap:"wrap",
        alignItems:"center",
        "& > *":{
          margin:"10px 10px 10px 0",
        }
      },
      textfield: {
        marginTop: theme.spacing(1),
        marginBottom:theme.spacing(1),
      },
      textfieldHidden:{
        display:"none",
      },
      loaderSend:{
        margin:theme.spacing(1,0,2,0),
      },
      selects:{
        minWidth:"100%",
        marginTop:theme.spacing(1),
        marginBottom:theme.spacing(1),
      },
      centrar:{
        display:"flex",
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        height:"80vh",
        flexDirection:"column",
        "& > *":{
          marginTop:"25px",
        }
      },
      iconWarning:{
        fontSize:120,
        color:"orange",
      },
      labelSelect :{
        marginTop:"3px",
        marginLeft:"5px",
      },
      SelectForm:{
          minWidth:300,
          marginTop:theme.spacing(2),
          marginRight:theme.spacing(2),

      },
      linearProgress:{
        marginBottom:theme.spacing(1)
      }
}))