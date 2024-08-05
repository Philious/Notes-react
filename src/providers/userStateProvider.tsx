import { Loader } from "@/components/Loader";
import useComputedRef from "@/hooks/computedRef";
import { fetchNotes } from "@/redux/thunks/asyncNoteThunks";
import { addScratch, fetchScratch } from "@/redux/thunks/asyncScratchThunk";
import { clearAllNotes } from "@/redux/slices/notesSlice";
import { AppDispatch } from "@/redux/store";
import { checkAuthentication, userActions } from "@/api/api";
import { PageEnum } from "@/types/enums";
import { intervalHandler } from "@/utils/sharedUtils";
import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export type UserStateContextType = {
  auth: boolean;
  email?: string;
  username?: string;
  loading: boolean;
  setEmail: (update: string) => void,
  setUsername: (update: string) => void,
  login: (user: string, pass: string) => void;
  logout: () => void;
  checkedNavigation: (page: PageEnum, exclude?: string[]) => void;
};

export const UserStateContext = createContext<UserStateContextType | null>(null);

export const UserStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cycle = useRef(0);
  const [auth, setAuth] = useComputedRef(false);
  const [email, setEmail] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const checkedNavigation = (page: PageEnum, exclude?: string[]) => {
    if (location.pathname !== page && !exclude?.includes(location.pathname)) navigate(page);
  };

  const intervalAuthCheck = useRef(intervalHandler(async () => {
    console.log('update intervall');
    const authorized = await checkAuthentication();
    setAuth(authorized);
  }, 36000000));

  const getAllNotes = async () => {
    try {
      await dispatch(fetchNotes());
      
      const scratch = await dispatch(fetchScratch());
      if (!fetchScratch.fulfilled.match(scratch)) await dispatch(addScratch());

    } catch(e) { 
      console.error('Error while fetching notes', e);
    }
  };

  useEffect(() => console.log('auth updated', auth), [auth]);
  
  useEffect(() => {
    const check = async () => {
      try {
        setLoading(true);
        const authorized = await checkAuthentication();
        setAuth(authorized);
      } finally { setLoading(false) }
    }
    if (cycle.current === 0) check();
    cycle.current += 1;
  }, []);

  useEffect(() => {
    const init = async () => {
      if (auth) {
        setLoading(true);
        await getAllNotes(); 
        intervalAuthCheck.current.start();
        setLoading(false);
        checkedNavigation(PageEnum.MAIN);
        
      } else {
        cycle.current = 0;
        intervalAuthCheck.current.stop();
        clearAllNotes();
        checkedNavigation(PageEnum.LOGIN, [PageEnum.FORGOT, PageEnum.NEW]);
      }
    }
    init();
  }, [auth]);

  const login = async (email: string, password: string) => {
    if (auth) {
      checkedNavigation(PageEnum.MAIN);
      return;
    }
    
    const user = await userActions.login({ email, password });
    if (user.data) {
      setAuth(!!user?.data?.id);
    } else {
      console.error('Login fail, forgot to press play on tape?')
    }
  }
  
  const logout = async () => {
    await userActions.logout();
    setAuth(false);
  }

  return (
    <UserStateContext.Provider value={{email, username, loading, auth, setEmail, setUsername, login, logout, checkedNavigation}}>
      { loading ? <Loader /> : children }
    </UserStateContext.Provider>
  )
}