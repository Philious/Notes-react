import { ButtonBase, H1, PageWrapper } from "@/assets/styles/styledComponents";
import IconButton from "@/components/IconButton";
import Pressable from "@/components/Pressable";
import TextField from "@/components/TextField";
import { userActions} from "@/services/dotNetService";
import { ButtonEnum, IconEnum, PageEnum } from "@/types/enums";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function NewUserPage() {
  const [ email, setHandle ] = useState('');
  const [ password, setPassword ] = useState('');

  const navigate = useNavigate();
  const createAccount = async () => {
    const response = await userActions.register({ email, password });
    console.log(response)
    if (response.data) await userActions.login(response.data);

    navigate(PageEnum.MAIN);
  };

  return (
    <Wrapper>
      <Title>
        Create new note book
      </Title>
      <Name name="user-name" value={email} setValue={setHandle} placeholder="User name or Email"/>
      <Password name="user-password" value={password} setValue={setPassword} placeholder="Password"/>
        <LoginButton
          type={ButtonEnum.Border}
          icon={IconEnum.Right}
          action={createAccount}
        />
        <Back action={() => navigate(PageEnum.LOGIN)}>Back</Back>
    </Wrapper>
  );
};

export default NewUserPage;

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
  transform: rotate(270deg) translateY(2rem);
  transform-origin: left bottom;
  align-self: end;
  height: auto;
  padding: 1rem 0;
`;
const Back = styled(Vertical)`
  ${ButtonBase}
  grid-area: 6 / 1 / 7 / 2;
  white-space: nowrap;
`;
