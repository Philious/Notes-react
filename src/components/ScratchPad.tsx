import '@/components/scratchPad.scss';
import { useEffect, useState } from "react"
import IconButton from "@/components/IconButton";
import { Icon, ButtonType, scratch } from "@/types/enums";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { useOverlay } from '@/hooks/providerHooks';
import useDebounce from '@/hooks/debounce';
import { activeNoteDispatchers, useDatabaseFunctions } from '@/redux/customDispatchers';

const ScratchPad = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { setContextMenu } = useOverlay();
  const { newActiveNote, updateActiveNote } = activeNoteDispatchers(dispatch);

  const [ active, setActive ] = useState(false);
  const storedNotes = useSelector((state: RootState) => state.notes);
  const [ initialNote ] = useState(storedNotes[scratch]);
  
  const { addNote, updateNote } = useDatabaseFunctions(dispatch);
  const [ body, setBody ] = useState('');

  useEffect(() => {
    if (initialNote?.body) setBody(initialNote?.body)
  }, [initialNote]);

  const quickUpdate = (update: string) => {
    addNote({...initialNote, body: update }, scratch);
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
        updateActiveNote({ body, title: 'Scratch note' });
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
            type={ButtonType.Border}
            icon={Icon.Options}
            action={openContextMenu}
          />
          <IconButton
            type={ButtonType.Border}
            icon={Icon.Up}
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