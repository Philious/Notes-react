import '@/components/iconButton.scss';
import { IconEnum, ButtonEnum } from "@/types/enums";
import Icon from '@/components/icons/Icon';
import { flattenClassName } from '@/utils/sharedUtils';

type IconButtonType = { type: ButtonEnum, icon: IconEnum, action: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void, className?: string | string[] }

const IconButton: React.FC<IconButtonType> = ({ type, icon, action, className }: IconButtonType) => {
  const classes = flattenClassName(className, 'btn  icn-btn');
  return (
    <button
      className={classes}
      onClick={action}
    >
    <div className={`bkg ${type} ${icon}`}>
      <Icon icon={icon}/>
    </div>
  </button>
  )
}

export default IconButton