import '@/pages/loginPage.scss';
import { useState } from "react";
import IconButton from "@/components/IconButton";
import { IconEnum, ButtonEnum, PageEnum } from "@/types/enums";
import googleIcon from '@/assets/images/GoogleIcon.svg';
import { useLoginState } from '@/hooks/providerHooks';
import { useNavigate } from 'react-router-dom';
import { hasFirebase } from '@/utils/sharedUtils';
import TextField from '@/components/TextField';
import Pressable from '@/components/Pressable';

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
    <div className="login-view">
      <h1 className="title">
        Notes
      </h1>
      <TextField name="user-name" className="name" value={userName} setValue={setUsername} placeholder="User name"/>
      <TextField name="user-password" className="password" value={password} setValue={setPassword} placeholder="Password"/>
      <div className="password-login-btn">
        <IconButton
          type={ButtonEnum.Filled}
          icon={IconEnum.Right}
          action={passwordLogin}
        />
      </div>
      <Pressable className={['new', 'vertical']} action={newUser} label="New User"/>
      <Pressable className={['forgot', 'vertical']} action={forgotPassword} label={`Forgot\nPassword`}/>
      <Pressable
        className="google-login"
        action={redirectLogin}
      >
       { <img src={googleIcon} alt="Google icon" className="google-icon" /> }
      </Pressable>
    </div>
  )
} 

export default LoginPage;
