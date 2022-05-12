import NumberFormat from "react-number-format";
import PropTypes from 'prop-types'

function InputNumberFormat(props) {


  const { inputRef, onChange, ...rest } = props;
  return (
    <NumberFormat
      {...rest}
      getInputRef={inputRef}
      onValueChange={(e) => {
        onChange({
          target: {
            name: props.name,
            value: e.value,
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
      isNumericString
    />
  );
  }
  InputNumberFormat.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

export  function InputNumberFormatToFloat(props) {
    const { inputRef, onChange, ...rest } = props;
    return (
      <NumberFormat
        {...rest}
        getInputRef={inputRef}
        
        name={props.name}
        onValueChange={(e) => {
          onChange({
            target: {
              name: props.name,
              value: parseFloat(e.value),
            },
          });
        }}
 
        thousandSeparator="."
        decimalSeparator=","
        isNumericString
      />
    );
  }  

export default InputNumberFormat