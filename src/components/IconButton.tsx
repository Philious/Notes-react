import '@/components/iconButton.scss';
import { Icon as IconEnum, ButtonType } from "@/types/enums";
import Icon from '@/components/icons/Icon';

type IconButtonType = { type: ButtonType, icon: IconEnum, action: () => void }

const IconButton: React.FC<IconButtonType> = (props) => {

  return (
    <button
      className="btn icn-btn"
      onClick={props.action}
    >
    <div className={`bkg ${props.type} ${props.icon}`}>
      <Icon icon={props.icon}/>
    </div>
  </button>
  )
}

export default IconButton