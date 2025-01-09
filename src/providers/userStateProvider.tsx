import { api } from "@/api/api";
import { HttpClient } from "@/api/httpClient";
import { Loader } from "@/components/Loader";
import { PageEnum } from "@/types/enums";
import { getCookie } from "@/utils/sharedUtils";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export type UserStateContextType = {
  token: string | null;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  login: (user: string, pass: string) => void;
  logout: () => void;
  nav: (page: PageEnum, exclude?: string[]) => void;
};

export const UserStateContext = createContext<UserStateContextType | null>(null);

export const UserStateProvider = ({ children }: { children: ReactNode }) => {
  const httpClient = new HttpClient(import.meta.env.VITE_APP_BASE_URL);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const nav = (page: PageEnum, exclude?: string[]) => {
    if (location.pathname !== page && !exclude?.includes(location.pathname)) navigate(page);
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    httpClient.get<string>(`users/login/${email}/${password}`)
      .then(response => {
        if (response?.body) {
          setToken(response.body);
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
    api.logout(token);
    setToken(null);
  }

  useEffect(() => {
    if (token) return;
    const savedToken = getCookie("note-cookie");

    if (savedToken) {
      setLoading(true)
      api.checkLoginStatus(savedToken)
        .then((response) => {
          if (response) { nav(PageEnum.MAIN); setToken(savedToken) }
          else nav(PageEnum.LOGIN); 
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    } else nav(PageEnum.LOGIN);
    
  }, [])

  return (
    <UserStateContext.Provider value={{loading, setLoading, token, login, logout, nav }}>
      <Loader loading={loading} />
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