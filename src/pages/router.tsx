import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from '@/pages/MainPage';
import LoginPage from '@/pages/LoginPage';
import { PageEnum } from '@/types/enums';
import NewUserPage from '@/pages/NewUserPage';
import ForgorPasswordPage from '@/pages/ForgotPasswordPage';
import styled from 'styled-components';

function Router() {
  return (
    <>
      <Wrapper>
        <BrowserRouter>
          <Routes>
            <Route path={PageEnum.LOGIN} element={<LoginPage />} />
            <Route path={PageEnum.MAIN} element={<MainPage />} />
            <Route path={PageEnum.NEW} element={<NewUserPage />} />
            <Route path={PageEnum.FORGOT} element={<ForgorPasswordPage />} />
          </Routes>
        </BrowserRouter>
      </Wrapper>
    </>
  )
}

export default Router

const Wrapper = styled.div`
  background-color: var(--black)
`;