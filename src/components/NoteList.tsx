import '@/components/noteList.scss'
import { Icon, ButtonType, scratch } from "@/types/enums";
import { Note } from "@/types/types"
import IconButton from "@/components/IconButton";
import toast from "@/services/toastService";
import { useOverlay } from "@/hooks/providerHooks";
import PreviewNote from "./PreviewNote";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { activeNoteDispatchers } from '@/redux/customDispatchers';

const NoteList: React.FC = () => {
  const notes = useSelector((state: RootState) => state.notes);
  const dispatch = useDispatch<AppDispatch>();
  const { setContextMenu } = useOverlay();
  const { setActiveNote, newActiveNote } = activeNoteDispatchers(dispatch);

  const getNote = (id: string) => {
    const note = notes[id];
    note ? setActiveNote(note) : newNote();
    toast('Get Note: ' + id)
  };

  const newNote = () => {
    newActiveNote();
    toast('New Note');
  }
  
  const setLetterSize = () => {
    setContextMenu([
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
    ]);
  }

  const letterSizeIcon = { type: ButtonType.Border, icon: Icon.LetterSize, action: setLetterSize }
  const addIcon = { type: ButtonType.Border, icon: Icon.Add, action: newNote }

  return(
    <div className="note-list-container">
      <div className="list-header">
        <label className="header">Notes</label>
        <div className="list-options">
          <IconButton { ...letterSizeIcon }/>
          <IconButton { ...addIcon }/>
        </div>
      </div>
      <ul className="list">
        { Object.values(notes).filter(n => n.id !== scratch).map((note: Note) =>
          <PreviewNote note={ note } getNote={ getNote } key={note.id} />
        )}
      </ul>
    </div>
  )
}

export default NoteList