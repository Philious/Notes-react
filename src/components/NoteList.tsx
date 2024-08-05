import { IconEnum, ButtonEnum } from "@/types/enums";
import { NoteProps } from "@/types/types"
import IconButton from "@/components/IconButton";
import toast from "@/services/toastService";
import { useOverlay } from "@/hooks/providerHooks";
import NoteListItem from "@/components/NoteListItem";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { newActiveNote, setActiveNote } from '@/redux/slices/activeNoteSlice';
import styled from "styled-components";

const NoteList: React.FC = () => {
  const notes = useSelector((state: RootState) => state.notes.notes);
  
  const dispatch = useDispatch<AppDispatch>();
  const { setLetterSize } = useOverlay();

  const selectNote = (id: string) => {
    const note = notes?.find((n) => n.id === id);
    if (note) {
      dispatch(setActiveNote(note));
    } else {
      toast(`note ${id} seem to not excist ):`);
    }
  };

  return(
    <Wrapper className="note-list-container">
      <ListHeader className="list-header">
        <Header className="header">Notes</Header>
        <Options className="list-options">
          <IconButton type={ButtonEnum.Border}
            icon={IconEnum.LetterSize} action={setLetterSize} />
          <IconButton
            type={ButtonEnum.Border}
            icon={IconEnum.Add}
            action={() => dispatch(newActiveNote())}
          />
        </Options>
      </ListHeader>
      <ListItems className="list">
        { notes?.map((note) =>
          <NoteListItem note={ note } getNote={ selectNote } key={note.id} />
        )}
      </ListItems>
    </Wrapper>
  )
}

export default NoteList

const Wrapper = styled.div`
  grid-area: var(--list-area);
  max-width: var(--note-list-width);
  max-height: 100%;
  overflow-y: auto;
  padding-bottom: 3rem;
  box-shadow: 1px 0 0 var(--n-300);
  flex: 1;
  display: contents;
  @include tabletUp {
    display: grid;
    grid-template-rows: var(--toolbar-height) 1fr;
  }
` 

const ListHeader = styled.div`
    background-color: var(--black);
    position: sticky;
    top: var(--list-header-top);
    align-items: center;
    display: flex;
    place-self: center start;
    gap: .5rem;
    padding: 0 .5rem 0 1rem;
    justify-content: space-between;
    width: 100%;
    height: 3rem;
    box-sizing: border-box;
    border-bottom: 1px solid var(--n-400);
    z-index: 1;
`;
  const Header = styled.label`
    text-transform: uppercase;
    font-size: .75rem;
    font-weight: 700;
  `
  const Options =  styled.div`
    display: flex;
  `;

  const ListItems = styled.ul`
    width: 100%;
    height: 100%;
    background-color: var(--black);
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-x: hidden;
    overflow-y:auto;
    list-style: none;
    padding: 0 0 3rem 0;
    margin: 0;
    scroll-snap-type: y mandatory;
  `