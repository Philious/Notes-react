import { firebaseConfig } from "@/firebaseConfig";
import { DataBaseNotes, DataBaseContextType, Note, DatabaseCalls } from "@/types/types";
import { getFBgetRedirectResult, UpdateLocalState, UpdateState } from "@/services/firebaseService";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithRedirect, signOut, User } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { redirect } from "react-router-dom";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const FireBaseContext = createContext<DataBaseContextType | undefined>(undefined);

export const DataBaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [ token, setToken ] = useState<string>();
  const [ user, setUser ] = useState<User | null>(null);
  const [ loading, isLoading] = useState<boolean>(true);
  const [ database, setDatabase ] = useState<DataBaseNotes>(new Map());
  const [ activeNote, setActiveNote ] = useState<Note>();
  const [ dataBaseCalls, setDataBaseCalls ] = useState<DatabaseCalls>();

  const loginWithGoogle = () => {
    signInWithRedirect(auth, provider);
    getFBgetRedirectResult(auth, (user) => setUser(user), (token) => setToken(token), (state: boolean) => isLoading(state))
  }
 
  useEffect(() => {
    if(location.hostname === 'localhost' && database.size > 0){
      localStorage.setItem('notesTestData', JSON.stringify([...database.values()]))
    }
  },[database])

  
  onAuthStateChanged(auth, (authUser) => {
    if (user) return;
    setUser(authUser);
    isLoading(true);
    const calls = location.hostname === 'localhost'
      ? UpdateLocalState(isLoading, setDatabase)
      : UpdateState(user, isLoading, setDatabase)
      setDataBaseCalls(calls);
  });

  const logout = () => {
    signOut(auth).then(() => {
      setUser(null);
      database.clear();
      setActiveNote(undefined);
      redirect('/login');
    }).catch((error) => {
      console.error('Error logging out', error)
    });
  }

  return (
    <>
    <FireBaseContext.Provider value={{
      database,
      token,
      user,
      activeNote,
      loading,
      dataBaseCalls,
      loginWithGoogle,
      logout,
      getActiveNote: () => activeNote,
      setActiveNote: (note: Note) => setActiveNote(note),
      clearActiveNote: () => setActiveNote(undefined),
      newActiveNote: () => {
        const date = new Date().valueOf();
        setActiveNote({ id: 'new',
        title: '',
        body: '',
        lastupdated: date,
        created: date
        })
      },
      updateActiveNote: (note: Partial<Note>) => { if (activeNote) setActiveNote({ ...activeNote, ...note }) }

     }}>
      {children}
    </FireBaseContext.Provider>
    </>
  );
};