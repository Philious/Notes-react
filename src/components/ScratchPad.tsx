import { useState } from "react"
import IconButton from "@/components/IconButton";
import { IconEnum, ButtonEnum } from "@/types/enums";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { useOverlay } from '@/hooks/providerHooks';
import styled from 'styled-components';
import { newActiveNote } from "@/redux/slices/activeNoteSlice";
import { updateScratch } from "@/redux/thunks/asyncScratchThunk";


const ScratchPad = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { setContextMenu } = useOverlay();

  const [ active, setActive ] = useState(false);
  const scratchPad = useSelector((state: RootState) => state.scratchPad.scratch.content);
  const [ content, setContent ] = useState(scratchPad);


  const updateOnType = (update: string) => {
    setContent(update)
  }

  const updateOnBlur = (update: string) => {
    if (scratchPad !== update) {
      dispatch(updateScratch(update));
    }
  }

  const toggle = () => setActive(!active);

  const openContextMenu = (event:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    setContextMenu([
      { label: 'Clear scratchpad', action: () => dispatch(updateScratch('')) },
      { label: 'make scratchpad a note', action: () => {
        dispatch(newActiveNote({ content }));
      }},
    ]);
  }

  return (
    <Wrapper $active={active}>
      <Header
        onClick={toggle}
      >
        <Title className="header">Scratch pad</Title>
        <ActionWrapper>
          <Options $active={active}
            type={ButtonEnum.Border}
            icon={IconEnum.Options}
            action={openContextMenu}
          />
          <Arrow $active={active}
            type={ButtonEnum.Border}
            icon={IconEnum.Up}
            action={() => undefined}
          />
        </ActionWrapper>
      </Header>
      <TextInput
        value={content}
        onBlur={(ev) => updateOnBlur((ev.target as HTMLTextAreaElement).value)}
        onChange={e => updateOnType((e.target as HTMLTextAreaElement).value)}
      />
    </Wrapper>
  )
}

export default ScratchPad;

const Wrapper = styled.div<{$active: boolean}>`
  background-color: #000;
  display: grid;
  grid-template-rows: 48px 1fr;
  grid-area: var(--scratch-area);
  padding: 0 .5rem 2rem 1rem;
  position: fixed;
  inset: auto calc(100vw - var(--scratch-width)) 0 0;
  transform: translateY(${props => props.$active ? 0 : 'calc(100% - var(--toolbar-height))'});
  box-shadow: 0 -0.0625rem 0 var(--n-300), 0.0625rem 0 var(--n-300);
  transition: transform .25s;
  box-sizing: border-box;
`;

const Header = styled.div`
  height: 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-transform: uppercase;
  font-size: .75rem;
  font-weight: 700;
  place-self: center start;
`;

const Title = styled.div`
  height: 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-transform: uppercase;
  font-size: .75rem;
  font-weight: 700;
  place-self: center start;
`;

const ActionWrapper = styled.div`
  display: flex;
`;

const Options = styled(IconButton)<{$active: boolean}>`
  transition: transform .25s; 
  transform: ${props => props.$active ? 'scale(1)' : 'scale(0)'};
`
const Arrow = styled(IconButton)<{$active: boolean}>`
  transition: transform .25s; 
  transform: ${props => props.$active ? 'rotate(180deg)' : 'rotate(0)' }
`;

const TextInput = styled.textarea`
  background-color: hsl(320deg 16% 13%); 
  border-radius: .5rem;
  box-shadow: 0 0 0 1px hsl(320, 64%, 12%), 0 0 0 3px hsl(320, 64%, 6%) inset;
  border: none;
  padding: 1rem;
  font-size: .625rem;
  height: 25vh;
  width: 100%;
  resize: none;
  box-sizing: border-box;
`;
