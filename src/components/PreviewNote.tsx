import { Note } from "@/types/types"
import { dateFormat } from "@/utils/sharedUtils"

interface PreviewNoteProps extends React.HTMLAttributes<HTMLDivElement> {
  note: Note;
  getNote: (id: string) => void;
}

const PreviewNote: React.FC<PreviewNoteProps> = (props) => {
  const { note, getNote } = props;
  return (
    <li className="list-item-container" key={note.id}>
    <button
      className="list-item"
      onClick={() => getNote(note.id)}
    >
      <div className="list-item-header">
        { note.title.replaceAll('&nbsp;', ' ') }
      </div>
      <div className="list-item-content">
        { note.body.replaceAll('&nbsp;', ' ') }
      </div>
      <div className="list-item-date">
        Updated: { dateFormat(note.lastupdated) }
        <br/>
        id: {note.id }
      </div>
    </button>
  </li>
  )
}

export default PreviewNote