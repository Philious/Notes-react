import { useEffect, useState } from "react"
import IconButton from "@/components/IconButton";
import { IconEnum, ButtonEnum } from "@/types/enums";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { useOverlay } from '@/hooks/providerHooks';
import useDebounce from '@/hooks/debounce';
import styled from 'styled-components';
import { newActiveNote } from "@/redux/activeNoteSlice";
import { updateScratch } from "@/redux/asyncScratchThunk";

const ScratchPad = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { setContextMenu } = useOverlay();

  const [ active, setActive ] = useState(false);
  const scratchPad = useSelector((state: RootState) => state.scratchPad.scratch);
  const [ content, setContent ] = useState(scratchPad.content);

  const quickUpdate = (update: string) => {
    if (scratchPad && scratchPad.content !== update) {
      dispatch(updateScratch(content));
    }
  }

  const lazyUpdate = useDebounce(quickUpdate, 2000)

  const update = (update: string) => {
    setContent(update);
    lazyUpdate(update);
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
        onClick={ toggle }
      >
        <Title className="header">Scratch pad</Title>
        <Options>
          <IconButton
            type={ButtonEnum.Border}
            icon={IconEnum.Options}
            action={openContextMenu}
            className="options-icn"
          />
          <IconButton
            type={ButtonEnum.Border}
            icon={IconEnum.Up}
            action={() => undefined}
            className="arrow-icn"
          />
        </Options>
      </Header>
      <TextInput
        value={content}
        onBlur={(ev) => quickUpdate((ev.target as HTMLTextAreaElement).value)}
        onChange={e => update((e.target as HTMLTextAreaElement).value)}
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
  .icn-btn { transition: transform .25s; }
  .arrow-icn { transform: ${props => props.$active ? 'rotate(180deg)' : 'rotate(0)' };
  .options-icn { transform: ${props => props.$active ? 'scale(1)' : 'scale(0)' };
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
const Options = styled.div`
  display: flex;
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
