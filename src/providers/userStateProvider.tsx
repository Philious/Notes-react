import { setDatabase } from "@/redux/notesSlice";
import { AppDispatch } from "@/redux/store";
import { checkAuthentication, noteActions, userActions } from "@/services/dotNetService";
import { PageEnum } from "@/types/enums";
import { intervalHandler } from "@/utils/sharedUtils";
import { createContext, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export type UserStateContextType = {
  loginState: boolean;
  email?: string;
  username?: string;
  setLoginState: (update: boolean) => void,
  setEmail: (update: string) => void,
  setUsername: (update: string) => void,
  init: () => void;
  login: (user: string, pass: string) => void;
  logout: () => void;
  checkedNavigation: (page: PageEnum, exclude?: string[]) => void;
};

export const UserStateContext = createContext<UserStateContextType | null>(null);

export const UserStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loginState, setLoginState] = useState(false);
  const [email, setEmail] = useState<string>();
  const [username, setUsername] = useState<string>();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const checkedNavigation = (page: PageEnum, exclude?: string[]) => {
    if (location.pathname !== page && !exclude?.includes(location.pathname)) navigate(page);
  };

  const intervalAuthCheck = useRef(intervalHandler(async () => {
    const auth = await checkAuthentication();
    if (auth !== loginState) setLoginState(auth);
  }, 36000000));

  const getAllNotes = async () => {
    
    try {
      const fetchedNotes = await noteActions.all();
      if (fetchedNotes) {
        dispatch(setDatabase(fetchedNotes));
        checkedNavigation(PageEnum.MAIN)
      }
    } catch(e) { 
      console.error('Error while fetching notes', e);
    }
  };

  const init = async () => {
    if (!loginState) {
      const auth = await checkAuthentication();
      setLoginState(auth)
      if (auth) {
        await getAllNotes();
      } else {
        intervalAuthCheck.current.stop();
        checkedNavigation(PageEnum.LOGIN, [PageEnum.FORGOT, PageEnum.NEW]);
      }
      console.log(loginState);
    }
  }

  useCallback(async () => {
    await init();
  }, []);

  useEffect(() => {
    if (loginState) {
      intervalAuthCheck.current.start();
    }
    else {
      intervalAuthCheck.current.stop();
      checkedNavigation(PageEnum.LOGIN, [PageEnum.FORGOT, PageEnum.NEW]);
    }
  }, [loginState]);

  const login = async (email: string, password: string) => {
    const user = await userActions.login({ email, password });
    if (user.data) {
      await getAllNotes();
      setLoginState(!!user?.data?.id);
    } else {
      console.error('¿login fail?')
    }
  }
  
  const logout = async () => {
    await userActions.logout();
    checkedNavigation(PageEnum.LOGIN);
  }

  return (
    <UserStateContext.Provider value={{loginState, email, username, setLoginState, setEmail, setUsername, init, login, logout, checkedNavigation}}>
      { children }
    </UserStateContext.Provider>
  )
}