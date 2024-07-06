import '@/App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from '@/pages/MainPage';
import LoginPage from '@/pages/LoginPage';

import { Page } from '@/types/enums';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={Page.LOGIN} element={<LoginPage />} />
          <Route path={Page.MAIN} element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
