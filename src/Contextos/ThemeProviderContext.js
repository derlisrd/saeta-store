import { createContext, useContext, useState, useEffect } from "react";
import { Paper } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const ThemeContextValue = createContext();

const ThemeProviderContext = ({ children }) => {


  const [themeMode, setThemeMode] = useState("light");

  const drawerWidth = 275;

  const theme = createTheme({

    palette: {
      mode: themeMode==='light' ? "light" : "dark",
      background:{
        paper:themeMode==='light' ? "#fff" : "#171721",
        default:themeMode==='light' ? "#f9f9f9" : "#101013",
      }, 
      neutral: {
        main: '#64748B',
        contrastText: '#fff',
      },
    },
  
    typography: {
      fontSize:13,
      fontWeightMedium:"bold",
      fontWeightRegular:"500",
      fontFamily:"Montserrat",
      caption:{
        fontSize:11,
      },
      body1:{
        fontSize:14
      }
    },
    components:{
      
      MuiTypography:{
        
      },
      MuiLink: {
        defaultProps: {
          
        },
      },
      MuiCard:{
        styleOverrides:{
          root:{
            borderRadius:"12px",
            boxShadow:"7px 6px 8px 1px rgb(0 0 0 / 10%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 3px 3px 3px 0px rgb(0 0 0 / 12%)"
          }
        }
      },
      MuiPaper:{
        styleOverrides:{
          root:{
            transition:'all 0.01s linear',
          }
        }
      },
      MuiListItem:{
        styleOverrides:{
          root:{
            fontWeight:"bold",
            borderRadius:"9px",
            transition:'all 0.01s linear',
            "&.Mui-selected":{
              backgroundColor: themeMode==='light' ? "#b9ddff" : "#0066cc",
              "& span":{
                fontWeight:"bold"
              }
            },
            "&:hover": {
              backgroundColor:themeMode==='light' ? "#b9ddff" : "#0066cc",
              fontWeight:"bold",
            },
            
          },
        
        },
      
      },
      MuiCssBaseline:{
        styleOverrides:{
          body: {
            transition:'all 0.01s linear',
          },
          
        }
      }
    }
  }); 
  document.body.style.backgroundColor = themeMode==="dark" ? `#171721` : `#fff`;
  
 



  const changeTheme = ()=>{
    if(themeMode==='light') 
      { 
        localStorage.setItem("themeMode","dark");
        setThemeMode("dark") 
      } 
    else
      { 
        localStorage.setItem("themeMode","light");
        setThemeMode("light")
      }
  }

  const verifica = ()=>{
    const themeModeLocal = localStorage.getItem("themeMode");
    if(themeModeLocal){
      setThemeMode(themeModeLocal);
    }
    else{
      localStorage.setItem("themeMode","light");
    }
  }
  

  useEffect(() => {
    verifica();
  }, [])

  return (
    <ThemeContextValue.Provider value={{themeMode, setThemeMode,changeTheme,drawerWidth}}>
      <ThemeProvider theme={theme}>
      {<CssBaseline />}
        <Paper elevation={0}  >
          {children}
        </Paper>
      </ThemeProvider>
    </ThemeContextValue.Provider>
  );
};

export const useTheme = ()=>{
    const {themeMode, setThemeMode,changeTheme,drawerWidth} = useContext(ThemeContextValue);
    return {themeMode, setThemeMode,changeTheme,drawerWidth}
}

export default ThemeProviderContext