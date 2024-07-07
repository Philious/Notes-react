import '@/pages/loginPage.scss';
import { useState } from "react";
import IconButton from "@/components/IconButton";
import { IconEnum, ButtonEnum, PageEnum } from "@/types/enums";
import googleIcon from '@/assets/images/GoogleIcon.svg';
import { useLoginState } from '@/hooks/providerHooks';
import { useNavigate } from 'react-router-dom';
import { hasFirebase } from '@/utils/sharedUtils';

const LoginPage = () => {
  const { redirectSignIn, passwordSignIn, newUser, forgotPassword } = useLoginState();
  
  const [ password, setPassword ] = useState('test1234');
  const [ userName, setUsername ] = useState('test@test.test');
  const navigate = useNavigate();
  const passwordLogin = () => {
    if (!hasFirebase()) {
      navigate(PageEnum.MAIN);
      console.log('login main');
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
      <input
        name="userName"
        className="input-field name"
        value={userName}
        placeholder="Username"
        onChange={ (ev) => setUsername(ev.target.value) }
      />
      <input
        name="userPassword"
        className="input-field password"
        placeholder="Password"
        value={password}
        onChange={ (ev) => setPassword(ev.target.value) }
      />
      <div className="password-login-btn">
        <IconButton
          type={ButtonEnum.Filled}
          icon={IconEnum.Right}
          action={passwordLogin}
        />
      </div>
      <button className="vertical txt-btn new" onClick={newUser}>
        New user
      </button>
      <button className="vertical txt-btn forgot" onClick={forgotPassword}>
        Forgot<br/>password
      </button>
      <button
        className="google-login"
        onClick={redirectLogin}
      >
        <img src={googleIcon} alt="Google icon" className="google-icon" />
      </button>
    </div>
  )
} 

export default LoginPage;
