import styled from 'styled-components';
type TextFieldProps = {
  value: string,
  
  setValue: (update: string) => void; 
  name: string,
  placeholder?: string
  label?: string
};

function TextField({value, setValue, name, placeholder, label}:TextFieldProps) {''

  return ( 
  <InputWrapper>
    { label && <span>{label}</span> }
    <TextInput
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={ (ev) => setValue(ev.target.value) }
      />
    </InputWrapper>
  )
}

export default TextField;

const InputWrapper = styled.div`
  background: red;
  height: 100px;
`;

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
