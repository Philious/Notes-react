import '@/components/note.scss';
import { useState } from "react"
import { ButtonEnum, IconEnum } from "@/types/enums"
import IconButton from "@/components/IconButton";
import { dateFormat, equalNotes } from '@/utils/sharedUtils';
import { useOverlay } from "@/hooks/providerHooks";
import toast from '@/services/toastService';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { activeNoteDispatchers, useDatabaseFunctions } from '@/redux/customDispatchers';

const Note: React.FC = () => {
  const activeNote = useSelector((state: RootState) => state.activeNote);
  const [ initialNote ] = useState(activeNote);
  const database = useSelector((state: RootState) => state.notes);

  const dispatch = useDispatch<AppDispatch>();
  const { setDialog, setContextMenu, setLetterSize } = useOverlay();
  const { setActiveNote, clearActiveNote } = activeNoteDispatchers(dispatch);
  const { addNote, deleteNote, updateNote } = useDatabaseFunctions(dispatch);
  
  const updateTitle = (title: string) => setActiveNote({...activeNote!, title });
  const updateBody = (body: string) => setActiveNote({...activeNote!, body });

  const saveNote = () => {
    if (activeNote) database[activeNote.id] ? updateNote(activeNote) : addNote(activeNote); 
    clearActiveNote();
  }

  const close = () => {
    if (equalNotes(activeNote, initialNote)) { clearActiveNote();
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

  const remove = () => {
    setDialog({
      title: 'Remove permanently?', 
      content: '',
      actions: [
        { name: 'No', action: () => {} },
        { name: 'Yes', action: () => { 
          if (activeNote?.id) {
              deleteNote(activeNote.id);
              clearActiveNote();
            }
          }
        }
      ]
    })
  };

  const save = () => {
    toast('Save');
    saveNote();
  }

  const options = () => {
    setContextMenu([
      {
        label: 'Letter size',
        icon: IconEnum.LetterSize,
        keepOpen: true,
        action: setLetterSize
      }, {
        label: 'Remove',
        icon: IconEnum.Remove,
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
            type={ButtonEnum.Border}
            icon={IconEnum.Left}
            action={close}
          />
          <IconButton 
            type={ButtonEnum.Border}
            icon={IconEnum.Check}
            action={save}
          />
        </div>
        <div className="toolbar-right-section">
          <IconButton 
            type={ButtonEnum.Border}
            icon={IconEnum.Options}
            action={options}  
          />
        </div>
      </div>
  </div> 
  )
 return ( activeNote?.id && noteFragment() )
}

export default Note
