import '@/components/note.scss';
import { useState } from "react"
import { ButtonType, Icon } from "@/types/enums"
import IconButton from "@/components/IconButton";
import { dateFormat } from '@/utils/sharedUtils';
import { useOverlay } from "@/hooks/providerHooks";
import toast from '@/services/toastService';
import { useDispatch, useSelector } from 'react-redux';
import { DatabaseDispatch, RootState } from '@/redux/store';
import { useDatabaseFunctions } from '@/hooks/databaseFunctionHooks';
import { activeNoteDispatchers } from '@/redux/customDispatchers';

const Note: React.FC = () => {
  const dispatch = useDispatch<DatabaseDispatch>();
  const { setDialog, setContextMenu } = useOverlay();
  const activeNote = useSelector((state: RootState) => state.activeNote);

  const { setActiveNote, clearActiveNote } = activeNoteDispatchers(dispatch);
  const fn = useDatabaseFunctions()
  const database = useSelector((state: RootState) => state.database.database);

  const [ initialNote ] = useState(database[activeNote?.id ?? '']);
  const updateTitle = (title: string) => setActiveNote({...activeNote!, title });
  const updateBody = (body: string) => setActiveNote({...activeNote!, body });

  const saveNote = () => {
    if (activeNote) database[activeNote.id] ? fn?.updateNote(activeNote) : fn?.addNote(activeNote); 
    clearActiveNote();
  }

  const close = () => {
    if (activeNote?.title === initialNote?.title && activeNote?.body === initialNote.body || !initialNote?.title && !initialNote?.body)  { clearActiveNote();
    } else {
      setDialog({
        title: 'Save before closing?',
        content: '',
        actions: [
          { name: 'Cancel', action: () => {} }, 
          { name: 'No', action: clearActiveNote },
          { name: 'Yes', action: saveNote }
        ]
      })
    }
  };

  const remove = (() => {
    setDialog({
      title: 'Remove permanently', 
      content: '',
      actions: [
        { name: 'No', action: () => {} },
        { name: 'Yes', action: () => { 
          if (activeNote?.id) {
              fn?.deleteNote(activeNote.id);
              clearActiveNote();
            }
          }
        }
      ]
    })
  });

  const save = () => {
    toast('Save');
    saveNote();
  }

  const setLetterSize = () => {
    setContextMenu();
    setContextMenu([
      { label: 'Larger', action: () => document.body.parentElement?.setAttribute('style', 'font-size: larger') },
      { label: 'Large', action: () => document.body.parentElement?.setAttribute('style', 'font-size: large') },
      { label: 'Medium',  action: () => document.body.parentElement?.setAttribute('style', 'font-size: medium') },
      { label: 'Small', action: () => document.body.parentElement?.setAttribute('style', 'font-size: small') },
    ]);
  }

  const options = () => {
    setContextMenu([
      {
        label: 'Letter size',
        icon: Icon.LetterSize,
        keepOpen: true,
        action: setLetterSize
      }, {
        label: 'Remove',
        icon: Icon.Remove,
        action: remove
      },
    ])
  }

  const noteFragment = () => (
    <div id="note" className="note">
      <input
        name="titleInput"
        value={activeNote?.title}
        className="title-input"
        autoFocus
        onChange={ (e) => updateTitle(e.target.value) }
        placeholder="Title"
      />
      <div className="date">
        <span>Created: { dateFormat(activeNote?.created ?? 0) }</span>
        <span>Updated: { dateFormat(activeNote?.lastupdated ?? 0) }</span>
      </div>
      <textarea
        className="body-input"
        name="bodyInput"
        value={ activeNote?.body }
        onChange={ (e) => updateBody(e.target.value) }
        placeholder='Content...'
      />
      <div className="toolbar">
        <div className="toolbar-left-section">
          <IconButton
            type={ButtonType.Border}
            icon={Icon.Left}
            action={close}
          />
          <IconButton 
            type={ButtonType.Border}
            icon={Icon.Check}
            action={save}
          />
        </div>
        <div className="toolbar-right-section">
          <IconButton 
            type={ButtonType.Border}
            icon={Icon.Options}
            action={options}  
          />
        </div>
      </div>
  </div> 
  )
 return ( fn && activeNote?.id && noteFragment() )
}

export default Note
