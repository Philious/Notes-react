import { BaseInput } from '@/assets/styles/styledComponents';
import styled from 'styled-components';
type TextFieldProps = {
  value: string,
  
  setValue: (update: string) => void; 
  name: string,
  className?: string | string[],
  placeholder?: string
  label?: string
};

function TextField({value, setValue, name, className, placeholder, label}:TextFieldProps) {
  const classes = `input-field-container ${className
    ? Array.isArray(className)
      ? className.join(' ') : className
    : ''
}`;

  return (
  <div className={classes}>
    { label && <span>{label}</span> }
    <TextInput
        name={name}
        className="input-field"
        value={value}
        placeholder={placeholder}
        onChange={ (ev) => setValue(ev.target.value) }
      />
    </div>
  )
}

export default TextField;

const TextInput = styled(BaseInput).attrs({type: 'text'})``;
