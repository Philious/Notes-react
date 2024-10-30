import { H1, PageWrapper } from "@/assets/styles/styledComponents";
import IconButton from "@/components/IconButton";
import Pressable from "@/components/Pressable";
import TextField from "@/components/TextField";
import { ButtonEnum, IconEnum, PageEnum } from "@/types/enums";
import { checkedNavigation } from "@/utils/sharedUtils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type EnterRecoveryEmailElement = {
  email: string;
  setEmail: (email:string) => void;
  sendNewPassword: () => {}
}

function EnterRecoveryEmail({ email, setEmail, sendNewPassword }: EnterRecoveryEmailElement) {
  return (
    <>
      <Title>Set new password</Title>
      <Email name="user-password" value={email} setValue={setEmail} placeholder="Recovery email"/>
      <SendButton
        type={ButtonEnum.Border}
        icon={IconEnum.Right}
        iconSize="2rem"
          buttonSize="2.5rem"
        action={sendNewPassword}
      />
    </>
  );
}

function ForgorPasswordPage() {
  const [ email, setEmail ] = useState('');
  const [ sent, setSent ] = useState(false);
  const navigate = checkedNavigation(useNavigate());
  const sendNewPassword = () => {
    setSent(true);
  };

return(
    <Wrapper>
      { sent && <RecoveryEmailSent>Reset password mail sent to {email}</RecoveryEmailSent>}
      { !sent && EnterRecoveryEmail({email, setEmail, sendNewPassword} as EnterRecoveryEmailElement) }
      <Back action={() => navigate(PageEnum.LOGIN)}>Back</Back>
    </Wrapper>
  )
};

export default ForgorPasswordPage;

const Title = styled(H1)``;

const Email = styled(TextField)``;

const SendButton = styled(IconButton)`
  margin-left: auto;  
`;

const Wrapper = styled(PageWrapper)`
  grid-template-rows: 1fr 2.5rem 2.5rem 1fr;
  place-content: initial;
  & > ${Email} { grid-area: 3 / 1 / 4 / 3; }
  & > ${Title} { grid-area: 2 / 1 / 3 / 4; }
  & > ${SendButton} { grid-area: 3 / 3 / 4 / 4; }
`;

const RecoveryEmailSent = styled.div`
  grid-area: 3 / 1 / 4 / 3;
`;

const Vertical = styled(Pressable)`
  transform: rotate(270deg) translateY(2rem);
  transform-origin: left bottom;
  align-self: end;
  height: auto;
  padding: 1rem 0;
`;

const Back = styled(Vertical)`
  grid-area: 6 / 1 / 7 / 2;
  white-space: nowrap;
`;
