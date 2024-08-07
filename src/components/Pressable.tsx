import { BaseButton } from "@/assets/styles/styledComponents";
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

const Button = styled(BaseButton)`
  color: var(--n-500);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
`;