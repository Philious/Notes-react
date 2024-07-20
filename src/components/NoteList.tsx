import '@/components/noteList.scss'
import { IconEnum, ButtonEnum } from "@/types/enums";
import { NoteProps } from "@/types/types"
import IconButton from "@/components/IconButton";
import toast from "@/services/toastService";
import { useOverlay } from "@/hooks/providerHooks";
import NoteListItem from "@/components/NoteListItem";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, getSortedNotes } from '@/redux/store';
import { activeNoteDispatchers } from '@/redux/customDispatchers';

const NoteList: React.FC = () => {
  const notes = useSelector(getSortedNotes);
  
  const dispatch = useDispatch<AppDispatch>();
  const { setLetterSize } = useOverlay();
  const { setActiveNote, newActiveNote } = activeNoteDispatchers(dispatch);

  const selectNote = (id: string) => {
    const note = notes.find((n) => n.id === id);
    if (note) {
      setActiveNote(note);
    } else {
      toast(`note ${id} seem to not excist ):`);
    }
  };

  return(
    <div className="note-list-container">
      <div className="list-header">
        <label className="header">Notes</label>
        <div className="list-options">
          <IconButton type={ButtonEnum.Border}
            icon={IconEnum.LetterSize} action={setLetterSize} />
          <IconButton
            type={ButtonEnum.Border}
            icon={IconEnum.Add}
            action={() => (newActiveNote())}
          />
        </div>
      </div>
      <ul className="list">
        { notes.map((note: NoteProps) =>
          <NoteListItem note={ note } getNote={ selectNote } key={note.id} />
        )}
      </ul>
    </div>
  )
}

export default NoteList