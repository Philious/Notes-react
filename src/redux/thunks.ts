import { Note } from "@/types/types";
import { hasFirebase } from "@/utils/sharedUtils";
import { onAuthStateChanged, Auth, signInWithRedirect, getRedirectResult, signOut, getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { setLoading, setDatabase, clearAllNotes } from "@/redux/notesSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import toast from "@/services/toastService";
import { clearActiveNote } from "@/redux/activeNoteSlice";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/firebaseConfig";
import { useSetAuth, useSetUser } from "@/hooks/transformObjects";
import { useSelector } from "react-redux";

export const fetchData = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  console.log('fetch data');
  if (hasFirebase()) {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    useSetAuth(auth);
    console.log('run as firebase');

    try {
      onAuthStateChanged(auth as Auth, (authUser) => {
        if (authUser) {
          const uid = authUser.uid;
          useSetUser(authUser);
          const db = getDatabase();
          const userDataRef = ref(db, `users/${uid}`);
          onValue(userDataRef, (snapshot) => {
            const data = snapshot.val().notes as Record<string, Note>;
            dispatch(setDatabase(Object.values(data).filter(n => typeof n === 'object')))
            console.log('database set ', Object.values(data).filter(n => typeof n === 'object'));
          });
        } else {
          dispatch(clearAllNotes());
        }
        dispatch(setLoading(false));
      });
    } catch (error) {
      console.error(error);
      dispatch(setLoading(false));
    }
  } else {
    console.log('run as local');
    const localData = localStorage.getItem('notesTestData');
    const data = (localData ? JSON.parse(localData) : []) as Note[];
    dispatch(setDatabase(Object.values(data).filter(n => typeof n === 'object')));
    console.log('fetchData', useSelector((state: RootState) => state.database.data));
    dispatch(setLoading(false));
    console.log('database set ', Object.values(data).filter(n => typeof n === 'object'));
  }
};

export const handleLoginWithGoogle = (auth: Auth) => async () => {
  if (hasFirebase()) {
    try {
      const provider = new GoogleAuthProvider()
      signInWithRedirect(auth, provider);
      getRedirectResult(auth).then((result) => {

        if (result) {
          // const credential = GoogleAuthProvider.credentialFromResult(result);
          // setToken(credential?.accessToken);

          useSetUser(result.user);
        } else throw Error

      }).catch((error) => {
        const errorCode: string | undefined = error.code;
        const message: string | undefined = error.message;
        const errorMessage = errorCode ? `Last known error\nError code: ${errorCode}\nError: ${message}` : `Error: ${message}`;

        if (message) toast(errorMessage, { duration: 5000, align: 'left' });
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log('No Google login in localStorage mode');
    toast('No Google login in localStorage mode')
  }
}

export const handleLogout = (auth: Auth) => async (dispatch: AppDispatch) => {
  if (hasFirebase()) {
    try {
      signOut(auth).then(() => {
        useSetAuth(null);
        dispatch(clearAllNotes());
        dispatch(clearActiveNote());
      }).catch(() => {
        console.error('Error logging out')
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    dispatch(clearAllNotes());
    dispatch(clearActiveNote());
  }
};

// TODO
export const handleLoginWithPassword = () => (name: string, password: string) => {
  name;
  password;
  console.log('Might show up later');
}
export const newUser = () => toast('Not at this time')
export const forgotPassword = () => toast('Good');
