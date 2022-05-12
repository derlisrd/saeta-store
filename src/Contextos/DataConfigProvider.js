import React,{createContext,useContext,useState} from 'react'


const DataConfigContext = createContext();

const DataConfigProvider = ({children}) => {

    const storage = JSON.parse(localStorage.getItem("dataConfig"));

    const [dataConfig,setDataConfig] = useState(storage ? storage : null)

    const setConfig = async(f)=>{
        setDataConfig(f);
        localStorage.setItem("dataConfig",JSON.stringify(f))
        window.location.reload();
    }

  return (
    <DataConfigContext.Provider value={{ dataConfig,setDataConfig,setConfig }}>
      {children}
    </DataConfigContext.Provider>
  )
}


export const useConfig = ()=>{
    const {dataConfig,setDataConfig,setConfig} = useContext(DataConfigContext);
    return {dataConfig,setDataConfig,setConfig}
}

export default DataConfigProvider
