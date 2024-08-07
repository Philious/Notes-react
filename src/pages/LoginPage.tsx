import { useState } from "react";
import IconButton from "@/components/IconButton";
import { IconEnum, ButtonEnum, PageEnum } from "@/types/enums";
import { useNavigate } from 'react-router-dom';
import TextField from '@/components/TextField';
import Pressable from '@/components/Pressable';
import styled from 'styled-components';
import { H1, PageWrapper } from "@/assets/styles/styledComponents";
import { useUserState } from "@/hooks/providerHooks";

const LoginPage = () => {
  const [ password, setPassword ] = useState('test1234');
  const [ email, setEmail ] = useState('test@test.test');
  const { login } = useUserState();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Title>
        Notes
      </Title>
      <Name name="user-name" value={email} setValue={setEmail} placeholder="User name"/>
      <Password name="user-password" value={password} setValue={setPassword} placeholder="Password"/>
        <LoginButton
          type={ButtonEnum.Filled}
          icon={IconEnum.Right}
          action={async () => await login(email, password)}
        />
      <NewUser action={() =>  navigate(PageEnum.NEW)} label="New user"/>
      <Forgot action={() => navigate(PageEnum.FORGOT)} label={`Forgot\npassword`}/>
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

const Password = styled(TextField)`
  grid-area: 4 / 1 / 5 / 3;
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
