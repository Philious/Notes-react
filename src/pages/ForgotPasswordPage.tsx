import { ButtonBase, H1, PageWrapper } from "@/assets/styles/styledComponents";
import IconButton from "@/components/IconButton";
import Pressable from "@/components/Pressable";
import TextField from "@/components/TextField";
import { ButtonEnum, IconEnum, PageEnum } from "@/types/enums";
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
        action={sendNewPassword}
      />
    </>
  );
}

function ForgorPasswordPage() {
  const [ email, setEmail ] = useState('');
  const [ sent, setSent ] = useState(false);
  const navigate = useNavigate();
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

const Wrapper = styled(PageWrapper)`
  grid-template-rows: 1fr auto auto 1fr min-content;
  grid-template-columns: 3rem 1fr 3.5rem;
`;
const Title = styled(H1)`
  grid-area: 2 / 1 / 3 / 4;
`;
const Email = styled(TextField)`
  grid-area: 3 / 1 / 4 / 3;
`;
const RecoveryEmailSent = styled.div`
  grid-area: 3 / 1 / 4 / 3;
`;
const SendButton = styled(IconButton)`
  grid-area: 3 / 3 / 4 / 4;
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
