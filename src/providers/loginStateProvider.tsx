import { firebaseConfig } from "@/firebaseConfig";
import toast from "@/services/toastService";
import { clearActiveNote } from "@/slices/activeNoteSlice";
import { clearDatabase } from '@/slices/databaseSlice'
import { isFirebase } from "@/utils/sharedUtils";
import { initializeApp } from "firebase/app";
import { Auth, getAuth, getRedirectResult, GoogleAuthProvider, onAuthStateChanged, signInWithRedirect, signOut, User } from "firebase/auth";
import { createContext, ReactNode, useState } from "react";
import { useDispatch } from "react-redux";
import { DatabaseDispatch } from "@/redux/store";

export type LoginStateContextType = {
  loading: boolean;
  user?: User;
  setLoader: (update: boolean) => void;
  redirectSignIn: () => void;
  logout: () => void;
  passwordSignIn: (name: string, password: string) => void;
  newUser: () => void;
  forgotPassword: () => void;
}

export const LoginStateContext = createContext<LoginStateContextType | undefined>(undefined);

export const LoginStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [loading, setLoading] = useState<boolean>(false);
  const setLoader = (update: boolean) => setLoading(update);
  const [user, setUser] = useState<User | undefined>();
  
  const passwordSignIn = (name: string, password: string) => {
    name;
    password;
    console.log('Might show up later, ');
  }
  const newUser = () => toast('Not at this time')
  const forgotPassword = () => toast('Good');

  const dispatch = useDispatch<DatabaseDispatch>();
  
  if (isFirebase()) {
    
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    
    onAuthStateChanged(auth as Auth, (authUser) => {
      setLoading(true);
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(undefined);
        setLoading(false);
      }
    });

    const redirectSignIn = () => {

      if (auth) {
        signInWithRedirect(auth, provider);
        getRedirectResult(auth).then((result) => {

          if (result) {
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // setToken(credential?.accessToken);

            setUser(result.user);
          } else throw Error
          
        }).catch((error) => {
          const errorCode: string | undefined = error.code;
          const message : string | undefined = error.message;
          const errorMessage = errorCode ? `Last known error\nError code: ${errorCode}\nError: ${message}` : `Error: ${message}`;
          setLoading(false);
        
          if (message) toast(errorMessage, { duration: 5000, align: 'left'});
        });
      }
    }
  
    const logout = () => {
      if (auth)
      signOut(auth).then(() => {
        setUser(undefined);
        dispatch(clearDatabase());
        clearActiveNote();
      }).catch(() => {
        console.error('Error logging out')
      });
    }

    return (
      <>
      <LoginStateContext.Provider value={{
        loading,
        user,
        setLoader,
        redirectSignIn,
        passwordSignIn,
        logout,
        newUser,
        forgotPassword,
      }}>
        {children}
      </LoginStateContext.Provider>
      </>
    );
  } else {
    
    const redirectSignIn = () => {
      console.log('No Google login in localStorage mode');
      toast('No Google login in localStorage mode')
    };

    const logout = () => {
      clearDatabase();
      clearActiveNote()
    }

    return (
      <>
      <LoginStateContext.Provider value={{
        loading,
        setLoader,
        redirectSignIn,
        passwordSignIn,
        logout,
        newUser,
        forgotPassword,
      }}>
        {children}
      </LoginStateContext.Provider>
      </>
    );
  }
};