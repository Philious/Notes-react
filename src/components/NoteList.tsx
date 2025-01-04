import { IconEnum, ButtonEnum } from "@/types/enums";
import IconButton from "@/components/IconButton";
import { useNotes, useOverlay } from "@/hooks/providerHooks";
import NoteListItem from "@/components/NoteListItem";
import styled from 'styled-components';
import { H3, queryTabletUp } from '@/assets/styles/styledComponents';

const NoteList: React.FC = () => {
  const { notes } = useNotes()
  const { setLetterSize, setNoteView } = useOverlay();

  const newNote = () => setNoteView.open({
    title: '',
    content: '',
    catalog : '',
    tags: []
  });

  const selectNote = (id: string) => {
    const note = notes.find(n => n.id === id);
    if (note) {
      setNoteView.open(note);
    }
  };

  return (
    <Wrapper>
      <HeaderBar>
        <Header>Notes</Header>
        <Actions>
          <IconButton style={ButtonEnum.Border}
            icon={IconEnum.LetterSize} action={setLetterSize} />
          <IconButton
            style={ButtonEnum.Border}
            icon={IconEnum.Add}
            action={newNote}
          />
        </Actions>
      </HeaderBar>
      <List>
        { notes?.map((note) => <NoteListItem note={note} getNote={selectNote} key={note.id} />)}
      </List>
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
  ${queryTabletUp(
    `display: grid;
    grid-template-rows: var(--toolbar-height) 1fr;`
  )}
`;

const HeaderBar = styled.div`
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

const Header = styled(H3)``;

const Actions = styled.div`
  display: flex;
`;

const List = styled.ul`
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
`;