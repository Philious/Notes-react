import '@/pages/mainPage.scss';
import { DayInfo } from "@/components/DayInfo";
import NoteList from '@/components/NoteList';
import ScratchPad from '@/components/ScratchPad';
import ContextMenu from '@/components/ContextMenu';
import Dialog from '@/components/Dialog';
import Note from '@/components/Note';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const MainPage = () => {

  const activeNote = useSelector((state: RootState) => state.activeNote);
  return <>
    <div className="main-page-container">
      <DayInfo />
      <NoteList/>
      <ScratchPad />
    </div>
    <div id="overlays" className="overlays">
      { activeNote.id && <Note /> }
      <Dialog />
      <ContextMenu />
    </div>
  </>
} 

export default MainPage;