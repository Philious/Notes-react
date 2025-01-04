import { Route, Routes } from 'react-router-dom'
import MainPage from '@/pages/MainPage';
import LoginPage from '@/pages/LoginPage';
import { PageEnum } from '@/types/enums';
import NewUserPage from '@/pages/NewUserPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import styled from 'styled-components';

function Pages() {
  return (
    <>
      <Wrapper>
        <Routes>
          <Route path={PageEnum.LOGIN} element={<LoginPage />} />
          <Route path={PageEnum.NEW} element={<NewUserPage />} />
          <Route path={PageEnum.MAIN} element={<MainPage />} />
          <Route path={PageEnum.FORGOT} element={<ForgotPasswordPage />} />
        </Routes>
      </Wrapper>
    </>
  )
}

export default Pages

const Wrapper = styled.div`
  background-color: var(--black)
`;