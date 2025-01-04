import { useDeferredValue } from "react"
import { IconEnum } from "@/types/enums"
import { dateFormat, isEqualNotes } from '@/utils/sharedUtils';
import { useNotes } from "@/hooks/providerHooks";
import NoteToolbar from '@/components/NoteToolbar';
import styled from 'styled-components';
import { ContextMenuItemProps, DialogContextProps, Note } from "@/types/types";
import { ToggleOverlay } from "@/providers/overLayProvider";

type NoteViewProps = {
  close: () => void;
  show: boolean;
  setContextMenu: ToggleOverlay<ContextMenuItemProps[]>;
  setDialog: ToggleOverlay<DialogContextProps>;
  setLetterSize: () => void;
}

const NoteView = ({close, show, setDialog, setContextMenu, setLetterSize}: NoteViewProps) => {
  const { setActiveNote, notes, activeNote, addNote, updateNote, deleteNote } = useNotes();
  const delay = 500;
  const deferredNote = useDeferredValue<Note | null>(notes.find(n => n.id === activeNote?.id) ?? null);

  const updateTitle = (title: string) => {
    if (activeNote) setActiveNote({...activeNote, title})
  }

  const updateContent = (content: string) => {
    if (activeNote) setActiveNote({...activeNote, content})
  }

  const saveNote = () => {
    if (activeNote) {
      if(activeNote?.id) { console.log('update'); updateNote({...deferredNote as Note, ...activeNote}) }
      else { console.log('add'); addNote(activeNote); }
    }
    close();
  }

  const closeDialog = () => {
    if (activeNote && deferredNote && isEqualNotes(activeNote, deferredNote) || !activeNote?.title && !activeNote?.content) {
      close();
    } else {
      setDialog.open({
        title: 'Save before closing?',
        content: '',
        actions: [
          { name: 'Cancel', action: () => {} }, 
          { name: 'No', action: close },
          { name: 'Yes', action: saveNote }
        ]
      })
    }
  };

  const remove = () => {
    setDialog.open({
      title: 'Remove permanently?', 
      content: '',
      actions: [
        { name: 'No', action: () => {} },
        { name: 'Yes', action: () => { 
          if (activeNote?.id) {
              deleteNote(activeNote.id);
              close();
            }
          }
        }
      ]
    })
  };

  const options = () => {
    setContextMenu.open([
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

  return (
    <Wrapper id="note" $show={show} $duration={delay}>
      <TitleInput
        name="titleInput"
        value={activeNote?.title}
        className="title-input"
        autoFocus
        onChange={ (e) => updateTitle(e.target.value) }
        placeholder="Title"
      />
      <DatesContainer className="date">
        <span>Created: { dateFormat(deferredNote?.createdAt ?? 0) }</span>
        <span>Updated: { dateFormat(deferredNote?.updatedAt ?? 0) }</span>
      </DatesContainer>
      <BodyInput
        className="body-input"
        name="bodyInput"
        value={ activeNote?.content }
        onChange={ (e) => updateContent(e.target.value) }
        placeholder='Content...'
      />
      <NoteToolbar close={closeDialog} save={saveNote} options={options}/>
    </Wrapper>
    )
 
}

export default NoteView

const Wrapper = styled.div<{ $show: boolean, $duration: number}>`
  grid-area: var(--note-area);
  background-color: var(--black);
  position: fixed;
  inset: 0 0 0 var(--note-width);
  display: grid;
  grid-template-rows: auto 1.5rem 1fr;
  box-shadow: -1px 0 0 var(--n-300);
  z-index: 1;
  transition-property: opacity, transform;
  transition-duration: ${ (props) => props.$duration }ms;
  transition-timing-function: $easeOutQuint,;
  ${ (props) => `
    opacity: ${props.$show ? 1 : 0 };
    transform: translateY(${props.$show ? '0' : '3rem'})
  `}
    
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
