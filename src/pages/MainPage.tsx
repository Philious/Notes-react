import '@/pages/mainPage.scss';
import { DayInfo } from "@/components/DayInfo";
import NoteList from '@/components/NoteList';
import ScratchPad from '@/components/ScratchPad';
import ContextMenu from '@/components/ContextMenu';
import Dialog from '@/components/Dialog';
import Note from '@/components/Note';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { scratch } from '@/types/enums';

const MainPage = () => {
  const storedNotes = useSelector((state: RootState) => state.notes);
  console.log('mainpage', storedNotes[scratch]);
  return <>
    <div className="main-page-container">
      <DayInfo />
      <NoteList/>
      <ScratchPad />
    </div>
    <div id="overlays" className="overlays">
      <Note />
      <Dialog />
      <ContextMenu />
    </div>
  </>
} 

export default MainPage;