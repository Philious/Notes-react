import '@/components/textField.scss';
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

const TextInput = styled.input.attrs({type: 'text'})`
  background-color: var(--n-100);
  border: 0.0625rem solid var(--n-300);
  color: var(--n-500);
  border-radius: 0.125rem;
  padding: 0 1rem;
  height: 2.25rem;
  width: 100%;
  box-sizing: border-box;
`;
