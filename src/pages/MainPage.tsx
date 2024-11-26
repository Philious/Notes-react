import { DayInfo } from "@/components/DayInfo";
import NoteList from '@/components/NoteList';
import ScratchPad from '@/components/ScratchPad';
import styled from 'styled-components';
import { queryTabletUp } from '@/assets/styles/styledComponents';

const MainPage = () => {
  return <>
    <Wrapper>
      <DayInfo />
      <NoteList/>
      <ScratchPad />
    </Wrapper>
  </>
} 

export default MainPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  ${queryTabletUp(`
    display: grid;
    grid-template-columns: var(--main-columns);
    grid-template-rows: var(--day-area-height) calc(100vh - var(--day-area-height));
  `)}
  box-shadow: 0.0625rem 0 0 var(--n-300);
`