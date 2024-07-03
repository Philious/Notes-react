import '@/components/scratchPad.scss';
import { useEffect, useState } from "react"
import IconButton from "@/components/IconButton";
import { Icon, ButtonType } from "@/types/enums";
import { addNote, updateNote } from '@/redux/databaseSlice';
import { useDispatch } from 'react-redux';
import store, { DatabaseDispatch } from '@/redux/store';
import { useOverlay } from '@/hooks/providerHooks';
import useDebounce from '@/hooks/debounce';
import { activeNoteDispatchers } from '@/redux/customDispatchers';

const ScratchPad = () => {
  const dispatch = useDispatch<DatabaseDispatch>();
  const { setContextMenu } = useOverlay();
  const { newActiveNote, updateActiveNote } = activeNoteDispatchers(dispatch);

  const [ active, setActive ] = useState(false);
  const [ inputValue, setInputValue ] = useState('');

  useEffect(() => {
    const content = store.getState().database.database['scratch']
    content ? setInputValue(content.body)
      : dispatch(addNote({
        id: 'scratch',
        title: '',
        body: '',
        lastupdated: 0,
        created: 0,
      }));
  }, [setInputValue, dispatch])

  const updateScratch = (update: string) => {
    setInputValue(update);
    dispatch(updateNote({ id: 'scratch', body: update, }));
  }
  const lazyUpdate = useDebounce(updateScratch, 2000)

  const toggle = () => setActive(!active);

  const openContextMenu = (event:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    setContextMenu([
      { label: 'Clear scratchpad', action: () => setInputValue('') },
      { label: 'make scratchpad a note', action: () => {
        newActiveNote();
        updateActiveNote({ body: inputValue, title: 'Scratch note' });
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
        value={inputValue}
        onBlur={(ev) => updateScratch((ev.target as HTMLTextAreaElement).value)}
        onInput={(ev) => {
          setInputValue((ev.target as HTMLTextAreaElement).value)
          lazyUpdate((ev.target as HTMLTextAreaElement).value)
        }}
      />
    </div>
  )
}

export default ScratchPad;