import '@/App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from '@/pages/MainPage';
import LoginPage from './pages/LoginPage';
import Note from './components/Note';
import Dialog from './components/Dialog';
import ContextMenu from './components/ContextMenu';
import { Loader } from './components/Loader';
import { useContextMenu } from './utils/helpers';

function App() {
  const { contextMenu } = useContextMenu();
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
    <div id="overlays" className="overlays">
      <Note />
      <Dialog/>
      { contextMenu.length > 0 && <ContextMenu context={contextMenu}/> }
      <Loader />
    </div>
    </>
  )
}

export default App
