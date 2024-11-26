import { BaseInput } from '@/assets/styles/styledComponents';
import styled from 'styled-components';
type TextFieldProps = {
  value: string,
  type?: 'text' | 'number' | 'password';
  setValue: (update: string) => void; 
  name: string,
  className?: string | string[],
  placeholder?: string
  label?: string
  autocomplete?: 'email' | 'new-password' | 'current-password' | 'off';
};

function TextField({value, setValue, name, className, placeholder, label, type = 'text', autocomplete}:TextFieldProps) {
  const classes = `input-field-container ${className
    ? Array.isArray(className)
      ? className.join(' ') : className
    : ''
}`;

  return (
    <div className={classes}>
      { label && <span>{label}</span> }
      <TextInput
        type={type}
        name={name}
        className="input-field"
        value={value}
        placeholder={placeholder}
        onChange={ (ev) => setValue(ev.target.value) }
        autoComplete={autocomplete}
      />
    </div>
  )
}

export default TextField;

const TextInput = styled(BaseInput)``;
