import '@/components/scratchPad.scss';
import { useState } from "react"
import IconButton from "@/components/IconButton";
import { IconEnum, ButtonEnum, scratch } from "@/types/enums";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, getScratchNote } from '@/redux/store';
import { useOverlay } from '@/hooks/providerHooks';
import useDebounce from '@/hooks/debounce';
import { activeNoteDispatchers, useDatabaseFunctions } from '@/redux/customDispatchers';
import { equalNotes } from '@/utils/sharedUtils';

const ScratchPad = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { setContextMenu } = useOverlay();
  const { newActiveNote, updateActiveNote } = activeNoteDispatchers(dispatch);

  const [ active, setActive ] = useState(false);
  const scratchNote = useSelector(getScratchNote);
  const [ body, setBody ] = useState('');
  
  const { addNote, updateNote } = useDatabaseFunctions(dispatch);
  
  const quickUpdate = (update: string) => {
    if (equalNotes(scratchNote, {...scratchNote, body: update})) return;
    addNote({...scratchNote, body: update }, scratch);
  }

  const lazyUpdate = useDebounce(quickUpdate, 2000)

  const update = (update: string) => {
    setBody(update);
    lazyUpdate(update);
  }

  const toggle = () => setActive(!active);

  const openContextMenu = (event:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    setContextMenu([
      { label: 'Clear scratchpad', action: () => updateNote({id: scratch, body: ''}) },
      { label: 'make scratchpad a note', action: () => {
        newActiveNote();
        updateActiveNote({ body });
      }},
    ]);
  }

  return (
    <div className={`scratch-pad ${ active ? 'active' : '' }`}>
      <div
        className="scratch-pad-header"
        onClick={ toggle }
      >
        <label className="header">Scratch pad</label>
        <div className="scratch-pad-options">
          <IconButton
            type={ButtonEnum.Border}
            icon={IconEnum.Options}
            action={openContextMenu}
          />
          <IconButton
            type={ButtonEnum.Border}
            icon={IconEnum.Up}
            action={() => undefined}
          />
        </div>
      </div>
      <textarea
        className="scratch-pad-area"
        value={body}
        onBlur={(ev) => quickUpdate((ev.target as HTMLTextAreaElement).value)}
        onChange={e => update((e.target as HTMLTextAreaElement).value)}
      />
    </div>
  )
}

export default ScratchPad;