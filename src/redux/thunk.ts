/*
import { firebaseConfig } from "@/firebaseConfig";
import { setLoader, setUser, setAuth, setProvider, clearProvider, clearUser } from "@/slices/loginStateSlice";
import { Page } from "@/types/enums";
import { goto } from "@/utils/sharedUtils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import { Auth, getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { RootState } from "./store";

export const fetchAndSetNotes = createAsyncThunk<void, void, { state: RootState }>(
  'database/fetchAndSetNotes',
  async (_, { dispatch }) => {
    const setLoading = (loader: boolean) => dispatch(setLoader(loader));
    setProvider
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const navigate = useNavigation();
    dispatch(setAuth([auth]))
    dispatch(setProvider(provider));
    
    onAuthStateChanged(auth as Auth, (authUser) => {
      setLoading(true);
      if (authUser) {
        dispatch(setUser([authUser]));
        navigate(Page.MAIN);
        setLoading(false);
      } else {
        dispatch(clearProvider());
        dispatch(clearUser());
        navigate(Page.LOGIN);
        setLoading(false);
      }
    });
  }
);
*/