import { flattenClassName } from "@/utils/sharedUtils";
import { ReactNode } from 'react';
import styled from 'styled-components';

export type PressableProps = {
  action: () => void;
  className?: string | string[];
  label?: string;
  children?: ReactNode;
}

function Pressable({children, action, className, label}: PressableProps) {
  const classes = flattenClassName(className, 'pressable');
  return (
    <Button className={classes} onClick={action}>
      {children ?? label}
    </Button>
  )
}

export default Pressable;

const Button = styled.button`
  border: none;
  background-color: transparent;
  border-radius: 025rem;
  color: var(--n-500);
  height: 3rem;
  font-size: 0.875rem;
  font-weight: 400;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
`;