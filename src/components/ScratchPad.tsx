import '@/components/scratchPad.scss';
import { useEffect, useRef, useState } from "react"
import IconButton from "@/components/IconButton";
import { Icon, ButtonType, scratch } from "@/types/enums";
import { addNote, updateNote } from '@/redux/notesSlice';
import { useDispatch, useSelector } from 'react-redux';
import store, { AppDispatch, RootState } from '@/redux/store';
import { useOverlay } from '@/hooks/providerHooks';
import useDebounce from '@/hooks/debounce';
import { activeNoteDispatchers } from '@/redux/customDispatchers';

const ScratchPad = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { setContextMenu } = useOverlay();
  const { newActiveNote, updateActiveNote } = activeNoteDispatchers(dispatch);

  const [ active, setActive ] = useState(false);
  const initialNote = useSelector((state: RootState) => state.notes[scratch]);
  const scratchBody = useRef(initialNote?.body)

  useEffect(() => {
    /*
    const content = scratchBody.current
    content ? 
      : dispatch(addNote({
        id: scratch,
        title: '',
        body: '',
        lastupdated: 0,
        created: 0,
      }));
      */
  }, [dispatch])

  const updateScratch = (update: string) => {
    //setInputValue(update);
    dispatch(updateNote({ id: scratch, body: update, }));
  }
  const lazyUpdate = useDebounce(updateScratch, 2000)

  const toggle = () => setActive(!active);

  const openContextMenu = (event:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    setContextMenu([
      { label: 'Clear scratchpad', action: () => '' },
      { label: 'make scratchpad a note', action: () => {
        newActiveNote();
        updateActiveNote({ body: scratchBody.current, title: 'Scratch note' });
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
        value={scratchBody.current}
        onBlur={(ev) => updateScratch((ev.target as HTMLTextAreaElement).value)}
        onInput={(ev) => {
          lazyUpdate((ev.target as HTMLTextAreaElement).value)
        }}
      />
    </div>
  )
}

export default ScratchPad;