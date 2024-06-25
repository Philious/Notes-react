import '@/components/contextMenu.scss';
import { useContextMenu } from "@/utils/helpers";
import { ContextMenuItem as ContextMenuItemType } from '@/types/types';
import { useEffect, useState } from "react";
import Icon from "./icons/Icon";
import { debounce } from '@/utils/sharedUtils';

const ContextMenuItem: React.FC<ContextMenuItemType> = (props) => {
  const click = (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (props.keepOpen) e.stopPropagation();
    props.action();
  }
  return (
    <li className="context-menu-item" key={props.label}>
      <button className="btn context-menu-item-btn" onClick={click}>
        { props.icon && <Icon icon={props.icon} /> }
        { props.label }
      </button>
    </li>
  )
}

interface ContextMenuType extends React.HTMLAttributes<HTMLElement> { context: ContextMenuItemType[] }
const ContextMenu: React.FC<ContextMenuType> = (d) => {

  const { closeMenu } = useContextMenu();
  const [ loaded, setLoaded ] = useState(false);

  const unLoad = async () =>  {
    setLoaded(false);
    setTimeout(() => closeMenu(), 250)
  }

  const onLoad = debounce(() => {
    setLoaded(true);
  }, 1);

  useEffect(() => {
    onLoad();
    return () => {};
  }, []);

  return (
    <div className={`context-menu-container ${loaded ? 'loaded' : ''}`} onClick={unLoad}>
      <ul className="context-menu">
        {d.context.map((menuItem: ContextMenuItemType) => ContextMenuItem(menuItem))}
      </ul>
    </div>
  );
}

export default ContextMenu