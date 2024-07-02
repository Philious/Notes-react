import '@/pages/mainPage.scss';
import { DayInfo } from "@/components/DayInfo";
import NoteList from '@/components/NoteList';
import ScratchPad from '@/components/ScratchPad';
import { Loader } from '@/components/Loader';
import ContextMenu from '@/components/ContextMenu';
import Dialog from '@/components/Dialog';
import Note from '@/components/Note';

const MainPage = () => {
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
      <Loader />
    </div>
  </>
} 

export default MainPage;