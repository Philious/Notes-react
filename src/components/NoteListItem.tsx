import '@/components/noteListItem.scss'
import { NoteProps } from "@/types/types"
import { dateFormat } from "@/utils/sharedUtils"

type PreviewNoteProps = {
  note: NoteProps;
  getNote: (id: string) => void;
}

const PreviewNote = ({note, getNote}: PreviewNoteProps) => {
  return (
    <li className="list-item-container" key={note.id}>
      <button
        className="list-item"
        onClick={() => getNote(note.id)}
      >
        <div className="list-item-header">
          { note.title }
        </div>
        <div className="list-item-content">
          { note.content }
        </div>
        <div className="list-item-date">
          Updated: { dateFormat(note.updatedAt) }
        </div>
      </button>
    </li>
    )
}

export default PreviewNote