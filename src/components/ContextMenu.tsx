import '@/components/contextMenu.scss';
import { ContextMenuItem as ContextMenuItemType } from '@/types/types';
import { useEffect, useState } from "react";
import Icon from "./icons/Icon";
import { useOverlay } from '@/hooks/providerHooks';

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

const ContextMenu: React.FC = () => {
  const { setContextMenu, contextMenu} = useOverlay()
  const [ contextMenuRef, setContextMenuRef ] = useState<ContextMenuItemType[]>();
  useEffect(() => { 
    if (contextMenu) {
      setTimeout(() => { 
        setContextMenuRef(contextMenu)
      }, 1);
    } else {
      setTimeout(() => { setContextMenuRef(contextMenu)}, 250);
    }
  });

  if (contextMenu || contextMenuRef) {
    return (
      <div className={`context-menu-container ${contextMenuRef && contextMenu ? 'show' : ''}`} onClick={() => setContextMenu()}>
        <ul className="context-menu">
          {(contextMenu ?? contextMenuRef!).map((menuItem: ContextMenuItemType) => ContextMenuItem(menuItem))}
        </ul>
      </div>
    );
  }
}

export default ContextMenu