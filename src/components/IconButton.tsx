import '@/components/iconButton.scss';
import { IconEnum, ButtonEnum } from "@/types/enums";
import Icon from '@/components/icons/Icon';

type IconButtonType = { type: ButtonEnum, icon: IconEnum, action: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void }

const IconButton: React.FC<IconButtonType> = ({ type, icon, action }: IconButtonType) => {

  return (
    <button
      className="btn icn-btn"
      onClick={action}
    >
    <div className={`bkg ${type} ${icon}`}>
      <Icon icon={icon}/>
    </div>
  </button>
  )
}

export default IconButton