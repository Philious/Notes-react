import { BaseButton } from "@/assets/styles/styledComponents";
import { ReactNode } from 'react';
import styled from 'styled-components';

export type PressableProps = {
  action: () => void;
  className?: string;
  label?: string;
  children?: ReactNode;
}

function Pressable({children, action, className, label}: PressableProps) {
  return (
    <Button className={className} onClick={action}>
      {children ?? label}
    </Button>
  )
}

export default Pressable;

const Button = styled(BaseButton)`
  color: var(--n-500);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
`;