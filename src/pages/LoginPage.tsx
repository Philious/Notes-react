import { useState } from "react";
import IconButton from "@/components/IconButton";
import { IconEnum, ButtonEnum, PageEnum, InputStatus } from "@/types/enums";
import TextField from '@/components/TextField';
import Pressable from '@/components/Pressable';
import styled from 'styled-components';
import { PageWrapper } from "@/assets/styles/styledComponents";
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
      <div></div>
      <LoginWrapper>
        <Title>Notes</Title>
        <Name name="user-name" value={email} setValue={setEmail} placeholder="User name" status={state} />
        <Password name="user-password" value={password} setValue={setPassword} placeholder="Password" status={state} assistiveText={message} />
        <LoginButton
          type={ButtonEnum.Filled}
          icon={IconEnum.Right}
          iconSize="2rem"
          buttonSize="2.5rem"
          action={async () => await loginWithPassword(email, password)}
        />
      </LoginWrapper>
      <OtherOptions>
        <NewUser action={() => navigate(PageEnum.NEW)} label="New user" />
        <Forgot action={() => navigate(PageEnum.FORGOT)} label={`Forgot\npassword`}/>
        <GoogleLogin action={signInPopup}>
          <img src={google} />
        </GoogleLogin>
      </OtherOptions>
    </Wrapper>
  )
} 

export default LoginPage;

const Wrapper = styled(PageWrapper)`
  grid-template-rows: 1fr auto 1fr;
  gap: 0;
  place-content: initial;
`;

const Title = styled.div``;

const Name = styled(TextField)``;

const Password = styled(TextField)``;

const LoginWrapper = styled.div`
  transform: translateY(-2.5rem);
  width: 100%;
  grid-template-areas: "title title" "name ." "password button";
  display: grid;
  gap: 1rem 0;
  align-self: start;
  & > ${Title} {grid-area: title}
  & > ${Name} {grid-area: name;}
  & > ${Password} {grid-area: password;}
`;

const LoginButton = styled(IconButton)`
  margin-left: auto;
  grid-area: button;
`;

const OtherOptions = styled.div`
  display: flex;
  width: 100%;
  align-self: end;
`;

const VerticalSnippet = styled(Pressable)`
  transform: rotate(180deg) translateX(1rem);
  font-size: .875rem;
  align-self: end;
  padding: 0 1rem;
  writing-mode: vertical-rl;
  text-orientation: mixed;
`;

const NewUser = styled(VerticalSnippet)`
  white-space: nowrap;
`;

const Forgot = styled(VerticalSnippet)`
  white-space: pre-wrap;
`;

const GoogleLogin = styled(Pressable)`
  flex: 1;
  justify-content: flex-end;
`;