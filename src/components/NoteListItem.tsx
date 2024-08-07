import { NoteResponse } from "@/types/types"
import { dateFormat } from "@/utils/sharedUtils"
import styled from 'styled-components';
import Pressable from './Pressable';
import { H4, Small } from '@/assets/styles/styledComponents';

type PreviewNoteProps = {
  note: NoteResponse;
  getNote: (id: string) => void;
}

const PreviewNote = ({note, getNote}: PreviewNoteProps) => {
  return (
    <Wrapper key={note.id}>
      <Item
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
      </Item>
    </Wrapper>
    )
}

export default PreviewNote

const Wrapper = styled.li`
  scroll-snap-align: start;
  position: relative;
  &:not(:last-child) {
    box-shadow: 0 1px 0 var(--n-300);
  }
`;

const Item = styled(Pressable)`
  display: grid;
  gap: .325rem;
  padding: 1rem;
  place-content: start start;
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

const Header = styled(H4)``;

const Content  = styled.div`
  color: var(--n-500);
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
`;

const ItemDate = styled(Small)`
  margin-top: .5rem;
`