import '@/pages/mainPage.scss';
import { DayInfo } from "@/components/DayInfo";
import NoteList from '@/components/NoteList';
import ScratchPad from '@/components/ScratchPad';
import ContextMenu from '@/components/ContextMenu';
import Dialog from '@/components/Dialog';
import Note from '@/components/Note';
import styled from 'styled-components';
import { tabletUp } from '@/assets/styles/styledComponents';

const MainPage = () => {
  // const activeNote = useSelector((state: RootState) => state.activeNote);
  return <>
    <Wrapper>
      <DayInfo />
      <NoteList/>
      <ScratchPad />
    </Wrapper>
    <div id="overlays" className="overlays">
      <Note />
      <Dialog />
      <ContextMenu />
    </div>
  </>
} 

export default MainPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  ${tabletUp(`
    display: grid;
    grid-template-columns: var(--main-columns);
    grid-template-rows: var(--day-area-height) calc(100vh - var(--day-area-height));
  `)}
  box-shadow: 0.0625rem 0 0 var(--n-300);
`