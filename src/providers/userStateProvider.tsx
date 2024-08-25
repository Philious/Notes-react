
import { AppDispatch } from "@/redux/store";
import { PageEnum } from "@/types/enums";
import { createContext, ReactNode, useState } from "react";
import { useDispatch } from "react-redux";
import { fireState, userAPI } from "@/api/firebaseAPI";
import { User } from "firebase/auth";
import { UserResponse } from "@/types/types";
import { fetchNotes } from "@/redux/thunks/asyncNoteThunks";
import { fetchScratch } from "@/redux/thunks/asyncScratchThunk";
import { useNavigate } from "react-router-dom";
import { checkedNavigation } from "@/utils/sharedUtils";

export type UserStateContextType = {
  loading: boolean;
  user: User | null;
  register: (email: string, password: string) => Promise<UserResponse | null>;
  login: (user: string, pass: string) => void;
  signInPopup: () => Promise<UserResponse | null>;
  logout: () => void;
};

export const UserStateContext = createContext<UserStateContextType | null>(null);

export const UserStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const nav = checkedNavigation(useNavigate());
  const api = userAPI();

  fireState.setOnLoggedIn(
    async (user: User) => {
      setLoading(true);
      setUser(user);
      fireState.setUser(user);
      await dispatch(fetchNotes(user));
      await dispatch(fetchScratch());
      nav(PageEnum.MAIN);
      setLoading(false);
    }
  )

  fireState.setOnLoggedOut(() => {
    // console.log('onLoggedOut');
    nav(PageEnum.LOGIN);
  });


  return (<>
      <UserStateContext.Provider value={{
        loading,
        user,
        register: api.register,
        login: api.login,
        signInPopup: () => api.popupLogin(fireState.getAuth(), fireState.getProvider()),
        logout: api.logout,
      }}>
        { children }
      </UserStateContext.Provider>
  </>)
}