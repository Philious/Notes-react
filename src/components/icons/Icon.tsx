import '@/components/iconButton.scss';
import { IconEnum } from "@/types/enums";
import { Add } from "@/components/icons/Add";
import { Arrow } from "@/components/icons/Arrow";
import { Remove } from "@/components/icons/Remove";
import { Check } from "@/components/icons/Check";
import { ContextOptions } from "@/components/icons/ContextOptions";
import { LetterSize } from "@/components/icons/LetterSize";
import { List } from "@/components/icons/List";
import { Logout } from "@/components/icons/Logout";
import { Settings } from "@/components/icons/Settings";

interface IconType extends React.HTMLAttributes<SVGAElement> { icon: IconEnum }

const Icon: React.FC<IconType> = (props) => {
  const iconStack = {
    [IconEnum.Add]: Add,
    [IconEnum.Down]: Arrow,
    [IconEnum.Cancel]: Remove,
    [IconEnum.Remove]: Remove,
    [IconEnum.Left]: Arrow,
    [IconEnum.List]: List,
    [IconEnum.Options]: ContextOptions,
    [IconEnum.Right]: Arrow,
    [IconEnum.Setting]: Settings,
    [IconEnum.Up]: Arrow,
    [IconEnum.Check]: Check,
    [IconEnum.LetterSize]: LetterSize,
    [IconEnum.LogOut]: Logout,
  }
  
  return (
    <>
      {  iconStack[props.icon]() }
    </>
  )
}

export default Icon