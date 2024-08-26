import { BaseInput } from '@/assets/styles/styledComponents';
import { InputStatus } from '@/types/enums';
import styled from 'styled-components';
type TextFieldProps = {
  value: string;
  setValue: (update: string) => void; 
  name: string;
  placeholder?: string;
  label?: string;
  status?: InputStatus;
  assistiveText?: string;
};

function TextField({value, setValue, name, placeholder, label, assistiveText, status = InputStatus.DEFAULT}: TextFieldProps) {

  return (
    <Wrapper>
      { label && <Label>{label}</Label> }
      <TextInput
        name={name}
        className="input-field"
        value={value}
        placeholder={placeholder}
        onChange={ (ev) => setValue(ev.target.value) }
        $status={status}
      />
      <AssistiveText $status={status}>{assistiveText}</AssistiveText>
    </Wrapper>
  )
}

export default TextField;
const Wrapper = styled.div`
  display: grid;
  gap: 0.125rem
`;
const Label = styled.label``;
const TextInput = styled(BaseInput).attrs({type: 'text'})<{$status: InputStatus}>`
  border-color: ${props => props.$status === InputStatus.DEFAULT ? 'var(--n-300)' : props.$status === InputStatus.ERROR ? 'var(--error)' : 'var(--correct)'}
`;
const AssistiveText = styled.span<{$status: InputStatus}>`
  color: ${props => props.$status === InputStatus.DEFAULT ? 'var(--n-300)' : props.$status === InputStatus.ERROR ? 'var(--error)' : 'var(--correct)'}
`;
