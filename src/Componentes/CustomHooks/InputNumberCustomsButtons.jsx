import { IconButton, Stack,Icon, Typography } from '@mui/material';
import React, { useState } from 'react'

const InputNumberCustomButtons = ({initial}) => {

  const [cantidad,setCantidad] = useState(initial)


  const add = ()=>{
    setCantidad(cantidad + 1);
  }

  const less = ()=>{
    setCantidad(cantidad - 1);
  }

  return (
    <Stack direction="row">
    <IconButton onClick={less} ><Icon>remove_circle_outline</Icon></IconButton>
    <Typography variant="h6" >
        {cantidad}
      </Typography>
    <IconButton onClick={add} ><Icon>add_circle_outline</Icon></IconButton>
    </Stack>
  )
}

export default InputNumberCustomButtons
