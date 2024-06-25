import '@/pages/mainPage.scss';
import { DayInfo } from "@/components/DayInfo";
import NoteList from '@/components/NoteList';
import ScratchPad from '@/components/ScratchPad';


const MainPage = () => {
  // const { database } = useDatabaseProvider();
  return (
    <div className="main-page-container">
      <DayInfo />
      <NoteList/>
      <ScratchPad />
    </div>
  )
} 

export default MainPage;