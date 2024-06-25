import '@/components/note.scss';
import { useState } from "react"
import { ButtonType, Icon } from "@/types/enums"
import IconButton from "@/components/IconButton";
import { dateFormat } from '@/utils/sharedUtils';
import { useContextMenu, useDatabase, useDialog } from "@/utils/helpers";
import toast from '@/services/toastService';

const Note:  React.FC = () => {

  const { activeNote, clearActiveNote, setActiveNote, database, dataBaseCalls } = useDatabase();
  const { openContextMenu, closeMenu } = useContextMenu();
  const { openDialog } = useDialog();
  const [ initialNote ] = useState(database.get(activeNote?.id ?? ''));
  const updateTitle = (title: string) => setActiveNote({...activeNote!, title });
  const updateBody = (body: string) => setActiveNote({...activeNote!, body });

  const saveNote = () => {
    if (activeNote) database?.has(activeNote.id) ? dataBaseCalls?.updateNote(activeNote) : dataBaseCalls?.setNote(activeNote); 
    clearActiveNote();
  }

  const close = () => {
    if (activeNote?.title === initialNote?.title && activeNote?.body === initialNote || !initialNote?.title && !initialNote?.body)  { clearActiveNote();
    } else {
      openDialog('Save before closing?', '', [
        {
          name: 'Cancel',
          action: () => {}
        }, 
        {
          name: 'No',
          action: clearActiveNote,
        }, {
          name: 'Yes',
          action: saveNote
        },
      ])
    }
  };

  const remove = (() => {
    openDialog('Remove permanently', '', [
      {
        name: 'No',
        action: () => {}
      },
      {
        name: 'Yes',
        action: () => { if (activeNote?.id) {
            dataBaseCalls?.removeNote(activeNote.id);
            clearActiveNote();
          }
        }
      }
    ])
  });

  const save = () => {
    toast('Save');
    saveNote();
  }

  const setLetterSize = () => {
    closeMenu();
    const menu = [
      {
        label: 'Larger',
        action: () => document.body.parentElement?.setAttribute('style', 'font-size: larger')
      }, {
        label: 'Large',
        action: () => document.body.parentElement?.setAttribute('style', 'font-size: large')
      }, {
        label: 'Medium',
        action: () => document.body.parentElement?.setAttribute('style', 'font-size: medium')
      }, {
        label: 'Small',
        action: () => document.body.parentElement?.setAttribute('style', 'font-size: small')
      },
    ];
    openContextMenu([...menu]);
  }

  const options = () => {
    openContextMenu([
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
 return ( activeNote?.id && noteFragment() )
}

export default Note
