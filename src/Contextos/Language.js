import { createContext,  useContext,useEffect,useState } from 'react'
import {translates} from '../Config/translates'
const Contexto = createContext()

const LanguageProvider = ({children}) => {


    const [lenguaje, setLenguaje] = useState("es");


    const [lang,setLang] = useState(translates?.[lenguaje]);


    const changeLang =  (data)=>{
        setLang(translates?.[data])
    }

    useEffect(() => {
        
    }, [])

  return (
    <Contexto.Provider value={{lang,setLang,lenguaje, setLenguaje,changeLang}}>
        {children}
    </Contexto.Provider>
  )
}

export const useLanguage = ()=>{
    const {lang,setLang,lenguaje, setLenguaje,changeLang} = useContext(Contexto)
    return {lang,setLang,lenguaje, setLenguaje,changeLang};
}




export default LanguageProvider;


