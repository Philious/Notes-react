import { api } from "@/api/api";
import { Loader } from "@/components/Loader";
import { PageEnum } from "@/types/enums";
import { Note } from "@/types/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export type UserStateContextType = {
  token: string | null;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  notes: Note[];
  login: (user: string, pass: string) => void;
  logout: () => void;
  nav: (page: PageEnum, exclude?: string[]) => void;
};

export const UserStateContext = createContext<UserStateContextType | null>(null);

export const UserStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);

  const nav = (page: PageEnum, exclude?: string[]) => {
    if (location.pathname !== page && !exclude?.includes(location.pathname)) navigate(page);
  };

  const login = (email: string, password: string) => {
    setLoading(true);
    api.login(email, password)
      .then(response => {
        if (response?.data) {
          setToken(response?.data);
          localStorage.setItem('localtoken', response?.data ?? '')          
          nav(PageEnum.MAIN);
        } else {
          setToken(null);
        }
      }).catch((err) => {
        console.log(err);
        setToken(null);
      }).finally(() => setLoading(false))
  }
  
  const logout = () => {
    if (token) api.logout(token);
    localStorage.clear();
    setToken(null);
  }

  useEffect(() => {
    const ls = localStorage.getItem('localtoken');
    api.checkLoginStatus(ls).then(response => {
      if (response && response?.data) { setToken(ls); }
      else {
        localStorage.clear();
        nav(PageEnum.LOGIN)
      };
    })
  }, [])

  return (
    <UserStateContext.Provider value={{loading, setLoading, token, notes, login, logout, nav }}>
      { loading && <Loader /> }
      { children }
    </UserStateContext.Provider>
  )
}

export const userStateProvider = (): UserStateContextType => {
  const context = useContext(UserStateContext);
  if (!context) {
    throw new Error('useOvelay must be used within a UserStateContext');
  }
  return context;
};