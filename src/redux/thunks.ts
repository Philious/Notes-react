import { NoteProps } from "@/types/types";
import { hasFirebase } from "@/utils/sharedUtils";
import { onAuthStateChanged, Auth, signInWithRedirect, getRedirectResult, signOut, getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { setDatabase, clearAllNotes } from "@/redux/notesSlice";
import { AppDispatch } from "@/redux/store";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import toast from "@/services/toastService";
import { clearActiveNote } from "@/redux/activeNoteSlice";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/firebaseConfig";

export const fetchData = () => async (dispatch: AppDispatch) => {
  // dispatch(setLoading(true));
  if (hasFirebase()) {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    // useSetAuth(auth);

    try {
      onAuthStateChanged(auth as Auth, (authUser) => {
        if (authUser) {
          const uid = authUser.uid;
          // useSetUser(authUser);
          const db = getDatabase();
          const userDataRef = ref(db, `users/${uid}`);
          onValue(userDataRef, (snapshot) => {
            const data = snapshot.val().notes as Record<string, NoteProps>;
            dispatch(setDatabase(Object.values(data).filter(n => typeof n === 'object')))
          });
        } else {
          dispatch(clearAllNotes());
        }
        // dispatch(setLoading(false));
      });
    } catch (error) {
      console.error(error);
      // dispatch(setLoading(false));
    }
  } else {
    const localData = localStorage.getItem('notesTestData');
    const data = (localData ? JSON.parse(localData) : []) as NoteProps[];
    dispatch(setDatabase(Object.values(data).filter(n => typeof n === 'object')));
    //  dispatch(setLoading(false));
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

          // useSetUser(result.user);
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
        // useSetAuth(null);
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
