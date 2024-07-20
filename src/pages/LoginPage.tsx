import { useState } from "react";
import IconButton from "@/components/IconButton";
import { IconEnum, ButtonEnum, PageEnum } from "@/types/enums";
import googleIcon from '@/assets/images/GoogleIcon.svg';
import { useLoginState } from '@/hooks/providerHooks';
import { useNavigate } from 'react-router-dom';
import { hasFirebase } from '@/utils/sharedUtils';
import TextField from '@/components/TextField';
import Pressable from '@/components/Pressable';
import styled from 'styled-components';

const LoginPage = () => {
  const { redirectSignIn, passwordSignIn, newUser, forgotPassword } = useLoginState();
  
  const [ password, setPassword ] = useState('test1234');
  const [ userName, setUsername ] = useState('test@test.test');
  const navigate = useNavigate();
  const passwordLogin = () => {
    if (!hasFirebase()) {
      navigate(PageEnum.MAIN);
    }
    passwordSignIn(userName, password);
  }

  const redirectLogin = () => {
    if (!hasFirebase()) navigate(PageEnum.MAIN)
    redirectSignIn()
  }

  return (
    <Wrapper>
      <Title>
        Notes
      </Title>
      <Name name="user-name" value={userName} setValue={setUsername} placeholder="User name"/>
      <Password name="user-password" value={password} setValue={setPassword} placeholder="Password"/>
        <LoginButton
          type={ButtonEnum.Filled}
          icon={IconEnum.Right}
          action={passwordLogin}
        />
      <NewUser action={newUser} label="New User"/>
      <Forgot action={forgotPassword} label={`Forgot\nPassword`}/>
      <GoogleLogin
        className="google-login"
        action={redirectLogin}
      >
       { <img src={googleIcon} alt="Google icon" className="google-icon" /> }
      </GoogleLogin>
    </Wrapper>
  )
} 

export default LoginPage;

const Wrapper = styled.div`
  box-sizing: border-box;
  display: grid;
  gap: 1rem 0;
  place-content: center;
  width: 100vw;
  height: 100vh;
  padding: 2rem;
  max-width: 20rem;
  margin: auto;
  grid-template-rows: 1fr auto auto auto 1fr min-content;
  grid-template-columns: 3rem 1fr 3.5rem;
  place-items: center start;
`;
const Title = styled.h1`
  grid-area: 2 / 1 / 3 / 2;
  font-size: 0.875rem;
  font-weight: 400;
`;
const Name = styled(TextField)`
  grid-area: 3 / 1 / 4 / 3;
`; 
const Password = styled(TextField)`
  grid-area: 4 / 1 / 5 / 3;
`;
const LoginButton = styled(IconButton)`
  grid-area: 4 / 3 / 5 / 4;
  margin-left: auto;  
`;
const Vertical = styled(Pressable)`
  transform: rotate(270deg) translateY(2rem);
  transform-origin: left bottom;
  align-self: end;
  height: auto;
  padding: 1rem 0;
`;
const NewUser = styled(Vertical)`;
  grid-area: 6 / 1 / 7 / 2;
  white-space: nowrap;
`;
const Forgot = styled(Vertical)`
  grid-area: 6 / 2 / 7 / 3;
  white-space: pre-wrap;
`;
const GoogleLogin = styled(Pressable)`
  grid-area: 6 / 3 / 7 / 4;
`;
