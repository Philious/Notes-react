import toast from "@/services/toastService";
import { clearActiveNote } from "@/redux/activeNoteSlice";
import { clearAllNotes, setDatabase } from '@/redux/notesSlice'
import { hasFirebase } from "@/utils/sharedUtils";
import { Auth, getAuth, getRedirectResult, onAuthStateChanged, signInWithRedirect, signOut, User } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { NoteProps } from "@/types/types";
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/firebaseConfig";
import { Loader } from "@/components/Loader";

export type LoginStateContextType = {
  redirectSignIn: () => void;
  logout: () => void;
  passwordSignIn: (name: string, password: string) => void;
  newUser: () => void;
  forgotPassword: () => void;
  user?: User;
}

const passwordSignIn = (name: string, password: string) => {
  name;
  password;
  console.log('Might show up later, ');
}
const newUser = () => toast('Not at this time')
const forgotPassword = () => toast('Good');

export const LoginStateContext = createContext<LoginStateContextType | undefined>(undefined);

export const LoginStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [ auth, setAuth ] = useState<Auth>();
  const [ user, setUser ] = useState<User>();
  const [ provider, setProvider ] = useState<GoogleAuthProvider>();
  const [ loading, setLoading ] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    if (hasFirebase()) {
      const app = initializeApp(firebaseConfig);
      setAuth(getAuth(app));
      setProvider(new GoogleAuthProvider());

      if (auth)
      onAuthStateChanged(auth as Auth, (authUser) => {

        if (authUser) {
          setUser(authUser);
          const uid = authUser.uid;
          const db = getDatabase();
          const userDataRef = ref(db, `users/${uid}`);
          onValue(userDataRef, (snapshot) => {
            const data = snapshot.val().notes as Record<string, NoteProps>;
            dispatch(setDatabase(Object.values(data)))
            setLoading(false);
          });
        } else {
          dispatch(clearAllNotes());
          setLoading(false);

          if (location.pathname !== '/') location.pathname = '/';
        }
      });
    } else {
      const localData = localStorage.getItem('notesTestData');
      const data = (localData ? JSON.parse(localData) : []) as NoteProps[];
      dispatch(setDatabase(Object.values(data)));
      setLoading(false);
    }
  }, [auth, setAuth, dispatch]);
  

  if (hasFirebase() && auth && provider) {

    const redirectSignIn = () => {
      console.log(auth, provider);
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
      
        if (message) toast(errorMessage, { duration: 5000, align: 'left'});
      });
    }
        
    const logout = () => {
      if (auth)
      signOut(auth).then(() => {
        setUser(undefined);
        dispatch(clearAllNotes());
        dispatch(clearActiveNote());
      }).catch(() => {
        console.error('Error logging out')
      });
    }

    return (
      loading 
        ? <Loader />
        : <LoginStateContext.Provider value={{
          user, redirectSignIn, logout, passwordSignIn, newUser, forgotPassword
        }}>
          {children}
        </LoginStateContext.Provider>
      );
  } else {
    /* localstore */

    const redirectSignIn = () => {
      console.log('No Google login in localStorage mode');
      toast('No Google login in localStorage mode')
    };

    const logout = () => {
      dispatch(clearAllNotes());
      dispatch(clearActiveNote());
    }
    return (

      <LoginStateContext.Provider value={{
        user, redirectSignIn, logout, passwordSignIn, newUser, forgotPassword
      }}>
        {children}
      </LoginStateContext.Provider>

    );
  }
}
