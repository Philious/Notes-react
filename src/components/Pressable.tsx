import '@/components/pressable.scss';
import { flattenClassName } from "@/utils/sharedUtils";
import { ReactNode } from 'react';

type PressableProps = {
  action: () => void;
  className?: string | string[];
  label?: string;
  children?: ReactNode;
}

function Pressable({children, action, className, label}: PressableProps) {
  const classes = flattenClassName(className, 'pressable');
  return (
    <button className={classes} onClick={action}>
      {children ?? label}
    </button>
  )
}

export default Pressable;
