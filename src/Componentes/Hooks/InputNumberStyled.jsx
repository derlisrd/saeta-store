import {useState} from 'react'

const InputNumberStyled = ({number}) => {


const [number,setNumber] = useState({number})

  return (
    <div>
      <span className='prev'>m</span>\
      <span className='next'>m</span>
        <div className='box'>
            <span>{number}</span>
        </div>
    </div>
  )
}

export default InputNumberStyled
