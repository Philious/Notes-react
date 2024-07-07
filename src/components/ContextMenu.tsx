import '@/components/contextMenu.scss';
import { ContextMenuItemType } from '@/types/types';
import { useState } from "react";
import Icon from "@/components/icons/Icon";
import { useOverlay } from '@/hooks/providerHooks';

const ContextMenuItem = ({label, icon, keepOpen, action}: ContextMenuItemType) => {
  const click = (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (keepOpen) e.stopPropagation();
    action();
  }
  return (
    <li className="context-menu-item" key={label}>
      <button className="btn context-menu-item-btn" onClick={click}>
        { icon && <Icon icon={icon} /> }
        { label }
      </button>
    </li>
  )
}

console.log('Rendering ContextMenu') // <--- se efter hur mycket omrenderingar vi har på denna

const ContextMenu: React.FC = () => {
  const { setContextMenu, contextMenu} = useOverlay()
  const [ contextMenuRef, setContextMenuRef ] = useState<ContextMenuItemType[]>();

  if (contextMenu) {
    setTimeout(() => { 
      setContextMenuRef(contextMenu)
    }, 1);
  } else {
    setTimeout(() => { setContextMenuRef(contextMenu)}, 250);
  }

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