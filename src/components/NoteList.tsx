import '@/components/noteList.scss'
import { Icon, ButtonType } from "@/types/enums";
import { Note } from "@/types/types"
import IconButton from "@/components/IconButton";
import toast from "@/services/toastService";
import { useContextMenu, useDatabase} from "@/utils/helpers";
import PreviewNote from "./PreviewNote";


const NoteList: React.FC = () => {
  const { database, newActiveNote, setActiveNote } = useDatabase();
  const { openContextMenu, closeMenu } = useContextMenu();
  
  const getNote = (id: string) => {
    const note = database.get(id);
    note ? setActiveNote(note) :  newNote();
    toast('Get Note: ' + id)
  };

  const newNote = () => {
    toast('New Note');
    newActiveNote();
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
        {[...database.values()].map((note: Note) =>
          <PreviewNote note={ note } getNote={ getNote } key={note.id} />
        )}
      </ul>
    </div>
  )
}

export default NoteList