import { TextField } from "@material-ui/core"
import { InputNumberFormatToFloat } from "./InputNumberFormat"


const InputTextNumber = ({...rest}) => {
  return (
    <TextField
    {...rest}
    InputProps={{
      inputComponent: InputNumberFormatToFloat,
    }}
  />
  )
}

export default InputTextNumber
