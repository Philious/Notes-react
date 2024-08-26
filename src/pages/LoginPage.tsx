import { useState } from "react";
import IconButton from "@/components/IconButton";
import { IconEnum, ButtonEnum, PageEnum, InputStatus } from "@/types/enums";
import TextField from '@/components/TextField';
import Pressable from '@/components/Pressable';
import styled from 'styled-components';
import { H1, PageWrapper } from "@/assets/styles/styledComponents";
import { useUserState } from "@/hooks/providerHooks";
import google from '@/assets/images/GoogleIcon.svg';
import { checkedNavigation } from "@/utils/sharedUtils";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const [ email, setEmail ] = useState('test@test.test');
  const [ password, setPassword ] = useState('test1234');
  const [state, setState ] = useState(InputStatus.DEFAULT);
  const [message, setMessage] = useState('');

  const { login, signInPopup } = useUserState();
  const loginWithPassword = async (email: string, password: string) => {
    const response = await login(email, password);
    setMessage(response.errorCode ? response.errorMessage : '');
    setState(response.errorCode ? InputStatus.ERROR : InputStatus.OK);
    console.log(response.errorCode, state)
  }

  const navigate = checkedNavigation(useNavigate());

  return (
    <Wrapper>
      <Title>
        Notes
      </Title>
      <Name name="user-name" value={email} setValue={setEmail} placeholder="User name" status={state} />
      <MessageWrapper>
      <TextField name="user-password" value={password} setValue={setPassword} placeholder="Password" status={state} />
      {message && <ErrorMessage>{message}</ErrorMessage> }

      </MessageWrapper>
      <LoginButton
          type={ButtonEnum.Filled}
          icon={IconEnum.Right}
          action={async () => await loginWithPassword(email, password)}
        />
      <NewUser action={() =>  navigate(PageEnum.NEW)} label="New user" />
      <Forgot action={() => navigate(PageEnum.FORGOT)} label={`Forgot\npassword`}/>
      <GoogleLogin action={signInPopup}>
        <img src={google} />
      </GoogleLogin>
    </Wrapper>
  )
} 

export default LoginPage;

const Wrapper = styled(PageWrapper)`
  grid-template-rows: 1fr auto auto auto 1fr min-content;
  grid-template-columns: 3rem 1fr 3.5rem;
`;

const Title = styled(H1)`
  grid-area: 2 / 1 / 3 / 4;
`;

const Name = styled(TextField)`
  grid-area: 3 / 1 / 4 / 3;
`;

const MessageWrapper = styled.div`
  grid-area: 4 / 1 / 5 / 3;
  position: relative;
`;

const Password = styled(TextField)``;

const ErrorMessage  = styled.div`
    text-transform: capitalize;
    font-size: 0.75rem;
    color: var(--error);
    position: absolute;
    bottom: 0;
    transform: translateY(calc(100% + 2rem));
    padding: .5rem 1rem;
    border: 0.125rem solid var(--error);
    width: 100%;
    box-sizing: border-box;
    border-radius: 24px;
    text-align: center;
`;

const LoginButton = styled(IconButton)`
  grid-area: 4 / 3 / 5 / 4;
  margin-left: auto;  
`;

const Vertical = styled(Pressable)`
  transform: rotate(270deg) translate(-1rem, 2rem);
  transform-origin: left bottom;
  font-size: .875rem;
  align-self: end;
  padding: 0 1rem;
`;

const NewUser = styled(Vertical)`
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