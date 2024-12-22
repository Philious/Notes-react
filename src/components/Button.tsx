import { BaseButton } from "@/assets/styles/styledComponents";
import styled from 'styled-components';

type ButtonProps = {
  label: string;
  action: () => void;
  className?: string,
  primary?: boolean
}

export default ({label, action, className, primary}: ButtonProps) => {
  return (
    <ButtonElement $primary={!!primary} className={className} onClick={action}>
      <span className="btn-txt">{label}</span>
    </ButtonElement>
  )
}

const ButtonElement = styled(BaseButton)<{$primary?: boolean;}>`
  background-color: ${props => props.$primary ? 'var(--n-200)' : 'transparent'};
  box-sizing: ${props => props.$primary ? 'content-box' : ' border-box'};
  color: var(--n-500);
  text-align: left;
  min-height: 3rem;
  padding: 0 1rem;
  white-space: nowrap;  
`;
