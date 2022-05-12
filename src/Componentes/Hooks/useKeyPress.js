import {useEffect,useRef} from 'react'

const useKeyPress = (key,cb) => {
  
    const callbackRef = useRef(cb)


    useEffect(() => {
        callbackRef.current = cb;
    }, [cb])

    useEffect(() => {
        
    function handle (event){
        if(event.code=== key){
            callbackRef.current(event)
        }
    }

        document.addEventListener("keypress",handle)
        return ()=> document.removeEventListener("keypress",handle)
  }, [key])
}

export default useKeyPress
