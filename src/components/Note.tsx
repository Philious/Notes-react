import { useEffect, useState } from "react"
import { IconEnum } from "@/types/enums"
import { dateFormat, equalNotes } from '@/utils/sharedUtils';
import { useOverlay } from "@/hooks/providerHooks";
import toast from '@/services/toastService';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import NoteToolbar from '@/components/NoteToolbar';
import styled from 'styled-components';
import { clearActiveNote, setActiveNote } from "@/redux/slices/activeNoteSlice";
import { addNote, deleteNote, updateNote } from "@/redux/thunks/asyncNoteThunks";

const Note: React.FC = () => {
  const activeNote = useSelector((state: RootState) => state.activeNote);
  const notes = useSelector((state: RootState) => state.notes.notes);
  const prev = notes?.find(n => n.id === activeNote.id) ?? null;
  const [ active, setActive] = useState(false);
  const [show, setShow ] = useState(false);
  const [ initialNote ] = useState(activeNote);

  const dispatch = useDispatch<AppDispatch>();
  const clear = () => dispatch(clearActiveNote());
  const { setDialog, setContextMenu, setLetterSize } = useOverlay();
  
  useEffect(() => {
    if (activeNote.id) {
      setActive(true)
      setTimeout(() => { 
        setShow(true);
      }, 1);
    } else {
      setShow(false);
      setTimeout(() => { setActive(false)}, 500);
    }
  }, [activeNote, activeNote.id, setActive, active, show])

  const updateTitle = (title: string) => dispatch(setActiveNote({...activeNote, title }));
  const updateBody = (content: string) => dispatch(setActiveNote({...activeNote, content }));

  const saveNote = () => {
    if (activeNote) prev ? dispatch(updateNote({...prev, ...activeNote})) : dispatch(addNote(activeNote)); 
    clear();
  }

  const close = () => {
    if (equalNotes(activeNote, initialNote)) {
      clear();
    } else {
      setDialog({
        title: 'Save before closing?',
        content: '',
        actions: [
          { name: 'Cancel', action: () => {} }, 
          { name: 'No', action: clear },
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
              dispatch(deleteNote(activeNote.id));
              clear();
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
    <Wrapper id="note" className={show ? 'note show' : 'note'}>
      <TitleInput
        name="titleInput"
        value={activeNote?.title}
        className="title-input"
        autoFocus
        onChange={ (e) => updateTitle(e.target.value) }
        placeholder="Title"
      />
      <DatesContainer className="date">
        <span>Created: { dateFormat(prev?.createdAt ?? 0) }</span>
        <span>Updated: { dateFormat(prev?.updatedAt ?? 0) }</span>
      </DatesContainer>
      <BodyInput
        className="body-input"
        name="bodyInput"
        value={ activeNote?.content }
        onChange={ (e) => updateBody(e.target.value) }
        placeholder='Content...'
      />
      <NoteToolbar close={close} save={save} options={options}/>
  </Wrapper> 
  )
 return ( active && noteFragment() )
}

export default Note

const Wrapper = styled.div`
  grid-area: var(--note-area);
  background-color: var( --n-0);
  position: fixed;
  inset: 0 0 0 var(--note-width);
  display: grid;
  grid-template-rows: auto 1.5rem 1fr;
  box-shadow: -1px 0 0 var(--n-300);
  z-index: 1;
  opacity: 0;
  transform: translateY(3rem);
  transition-property: opacity, transform;
  transition-duration: .5s;
  transition-timing-function: $easeOutQuint,;
  &.show {
    opacity: 1;
    transform: translateY(0)
  }
`
const TitleInput = styled.input.attrs({type: "text"})`
  box-sizing: border-box;
  padding: 0 1rem;
  margin-bottom: 0.125rem;
  font-size: 1rem;
  height: 3rem;
  width: 100%;
  background-color: transparent;
  border: none;
  box-shadow: 0 1.0625rem 0 -1rem var(--n-300);
  color: var(--n-600);
  &:focus-visible { outline-color: var(--primary); }
`;
const DatesContainer = styled.div`
  font-size: 0.625rem;
  text-transform: uppercase;
  color: var(--n-500);
  padding: 0 1rem;
  justify-content: space-between;
  display: flex;
  margin: auto 0; 
`;

const BodyInput = styled.textarea`
  background-color: transparent;
  border: none;
  box-sizing: border-box;
  line-height: 1.375;
  font-size: 0.875rem;
  width: 100%;
  height: 100%;
  padding: 1rem;
  white-space-collapse: break-spaces;
  overflow-y: auto;
  color: var(--n-600);
  resize: none;
  &:focus-visible { outline-color: var(--primary); }
`;
