import '@/components/button.scss';
import { flattenClassName } from "@/utils/sharedUtils";

type ButtonProps = {
  label: string;
  action: () => void;
  className?: string | string[]
}

function Button({label, action, className}: ButtonProps) {
  const classes = flattenClassName(className, 'btn');
  return (
    <button className={classes} onClick={action}>
      <span className="btn-txt">{label}</span>
    </button>
  )
}

export default Button;
