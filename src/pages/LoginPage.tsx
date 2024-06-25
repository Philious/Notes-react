import '@/pages/loginPage.scss';
import { useState } from "react";
import IconButton from "@/components/IconButton";
import { Icon, ButtonType } from "@/types/enums";
import googleIcon from '@/assets/images/GoogleIcon.svg';
import { useDatabase } from "@/utils/helpers";

const LoginPage = () => {
  const [ password, setPassword ] = useState('test1234');
  const [ userName, setUsername ] = useState('test@test.test');
  const { loginWithGoogle } = useDatabase();
  const login = () => {}

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
      <IconButton
        type={ButtonType.Filled}
        icon={Icon.Right}
        action={login}
      />
      <button className="vertical txt-btn new">
        New user
      </button>
      <button className="vertical txt-btn forgot">
        Forgot<br/>password
      </button>
      <button
        className="google-login"
        onClick={loginWithGoogle}
      >
        <img src={googleIcon} alt="Google icon" className="google-icon" />
      </button>
    </div>
  )
} 

export default LoginPage;
