import { flattenClassName } from "@/utils/sharedUtils";
import styled from 'styled-components';

type ButtonProps = {
  label: string;
  action: () => void;
  className?: string | string[],
  primary?: boolean
}

export default ({label, action, className, primary}: ButtonProps) => {
  const classes = flattenClassName(className, 'btn');
  return (
    <ButtonElement $primary={!!primary} className={classes} onClick={action}>
      <span className="btn-txt">{label}</span>
    </ButtonElement>
  )
}

const ButtonElement = styled.button<{$primary?: boolean;}>`
  background-color: ${props => props.$primary ? 'var(--n-200)' : 'transparent'};
  box-sizing: ${props => props.$primary ? 'content-box' : ' border-box'};
  border: none;
  color: var(--n-500);
  text-align: left;
  height: 3rem;
  font-size: 0.875rem;
  font-weight: 400;
  padding: 0 1rem;
  border-radius: 0.25rem;
  white-space: nowrap;
`;
