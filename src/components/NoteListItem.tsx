import { NoteResponse } from "@/types/types"
import { dateFormat } from "@/utils/sharedUtils"
import Pressable from "./Pressable";
import styled from "styled-components";

type PreviewNoteProps = {
  note: NoteResponse;
  getNote: (id: string) => void;
}

const PreviewNote = ({note, getNote}: PreviewNoteProps) => {
  return (
    <ListItem key={note.id}>
      <PressableArea
        action={() => getNote(note.id)}
      >
        <Header>
          { note.title }
        </Header>
        <Content>
          { note.content }
        </Content>
        <ItemDate>
          Updated: { dateFormat(note.updatedAt) }
        </ItemDate>
      </PressableArea>
    </ListItem>
    )
}

export default PreviewNote

const ListItem = styled.li`
  scroll-snap-align: start;
  position: relative;
  &:not(:last-child) {
    box-shadow: 0 1px 0 var(--n-300);
  }
`;
const PressableArea = styled(Pressable)`
  background-color: transparent;
  border: none;
  display: grid;
  gap: .325rem;
  line-height: 1.375;
  padding: 1rem;
  place-content: start start;
  text-align: left;
  width: 100%;
  height: min-content;
  position: relative;
  &:active {
    &:after {
      content: "";
      position: absolute;
      inset: 0;
      opacity: .25;
      background-color: var(--black);
    }
  }
`;

const Header = styled.div`
  font-size: var(--list-item-font-size);
  font-weight: 700;
`;

const Content = styled.div`
  color: hsl(0, 0%, 64%);
  font-size: var(--list-item-font-size);
  line-height: var(--list-item-line-height);
  max-height: calc(var(--list-item-line-height) * 4);
  overflow: hidden;
  white-space-collapse: break-spaces;
  position: relative;
  &:after {
    content: "...";
    display: block;
    letter-spacing: .125rem;
    position: absolute;
    padding-left: .5rem;
    height: var(--list-item-line-height);
    width: 100%;
    background: #000;
    top: calc(var(--list-item-line-height) * 3);
    right: 0;
  }
}
`
const ItemDate = styled.div `
  margin-top: .5rem;
  font-size: .625rem;
  color: var(--n-400);
`;