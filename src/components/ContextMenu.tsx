import { ContextMenuItemProps } from '@/types/types';
import { useState } from "react";
import Icon from "@/components/icons/Icon";
import { useOverlay } from '@/hooks/providerHooks';
import styled from 'styled-components';
import { easing } from '@/assets/styles/styledComponents';

const ContextMenuItem = ({label, icon, keepOpen, action}: ContextMenuItemProps) => {
  const click = (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (keepOpen) e.stopPropagation();
    action();
  }
  return (
    <ListItem key={label}>
      <ListItemButton $hasIcon={!!icon} className="btn context-menu-item-btn" onClick={click}>
        { icon && <Icon icon={icon} /> }
        { label }
      </ListItemButton>
    </ListItem>
  )
}

const ContextMenu: React.FC = () => {
  const { setContextMenu, contextMenu} = useOverlay()
  const [ contextMenuRef, setContextMenuRef ] = useState<ContextMenuItemProps[]>();

  if (contextMenu) {
    setTimeout(() => { 
      setContextMenuRef(contextMenu)
    }, 1);
  } else {
    setTimeout(() => { setContextMenuRef(contextMenu)}, 250);
  }

  if (contextMenu || contextMenuRef) {
    return (
      <Wrapper className={`context-menu-container ${contextMenuRef && contextMenu ? 'show' : ''}`} onClick={() => setContextMenu()}>
        <List className="context-menu">
          {(contextMenu ?? contextMenuRef!).map((menuItem: ContextMenuItemProps) => ContextMenuItem(menuItem))}
        </List>
      </Wrapper>
    );
  }
}

export default ContextMenu

const Wrapper = styled.div`
  position: fixed;
  max-width: 100vw;
  max-height: 100vh;
  inset: 0;
  display: grid;
  place-content: end center;
  z-index: 1;
  background-color: hsla(0, 0%, 0%, .24);
  opacity: 0;
  transition: opacity .25s  ${easing.easeOutQuint};
  &.show {
    opacity: 1;
    .context-menu { transform: translateY(0) }
  }
`;
const List = styled.ul`
display: grid;
  width: min(calc(100vw - 2rem), 320px);
  background-color: var(--n-200);
  border-radius: .5rem;
  box-shadow: 0 0 2px hsla(0,0%,0%, .48), 0 2px 6px hsla(0,0%,0%, .24), 0 6px 18px hsla(0,0%,0%, .12), 0 18px 54px hsla(0,0%,0%, .06);
  margin: auto auto 3rem;
  padding: 0;
  transition: transform .25s ${easing.easeOutQuint};
  transform: translateY(3rem);
`;

const ListItem = styled.li`
  list-style-type: none;
  &:not(:last-child) {
    border-bottom: 1px solid var(--n-300);
  }
`;

const ListItemButton = styled.button<{$hasIcon: boolean}>`
  background-color: transparent;
  border: none;
  padding: ${props => props.$hasIcon ? '0 1rem 0 0' : '0 1rem'};
  display: flex;
  align-items: center;
  justify-content: ${props => props.$hasIcon ? 'flex-start' : 'center'};
  gap: 0rem;
  width: 100%;
  height: 3rem;
  position: relative;
  .icn {
    width: 3rem;
  }
`