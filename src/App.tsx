import '@/App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from '@/pages/MainPage';
import LoginPage from '@/pages/LoginPage';

import { PageEnum } from '@/types/enums';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={PageEnum.LOGIN} element={<LoginPage />} />
          <Route path={PageEnum.MAIN} element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
