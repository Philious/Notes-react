import toast from "@/services/toastService";
import { Auth, getRedirectResult, GoogleAuthProvider, User } from "firebase/auth"
import { redirect } from "react-router-dom";
import { FirebaseCalls, testCalls } from "@/utils/databaseCalls";
import { DataBaseNotes } from "@/types/types";


type SetUser = (user: User | null) => void;
type SetToken = (token: string | undefined) => void;
type IsLoading = (loading: boolean) => void;

export const getFBgetRedirectResult = (auth: Auth, setUser: SetUser, setToken: SetToken, isLoading: IsLoading): Promise<void> =>
  getRedirectResult(auth).then((result) => {

  if (result) {
    const credential = GoogleAuthProvider.credentialFromResult(result);

    setToken(credential?.accessToken);
    setUser(result.user);
    isLoading(false);
  } else throw Error }).catch((error) => {
  // Handle Errors here.

  const errorCode: string | undefined = error.code;
  const message : string | undefined = error.message;
  const errorMessage = errorCode ? `Last known error\nError code: ${errorCode}\nError: ${message}` : `Error: ${message}`;
  isLoading(false);

  if (message) toast(errorMessage, { duration: 5000, align: 'left'});

});



export const UpdateState = (user: User | null, isLoading: IsLoading, setDatabase: React.Dispatch<React.SetStateAction<DataBaseNotes>>) => {
  if (user) {
    const uid = user.uid;
    redirect('/');
    const calls = FirebaseCalls(uid, setDatabase);
    calls.getAllNotes();
    isLoading(true);

    return calls;
  } else {
    redirect('/login');
    isLoading(false);
  }
};

export const UpdateLocalState = (isLoading: IsLoading, setDatabase: React.Dispatch<React.SetStateAction<DataBaseNotes>>) => {
  isLoading(false);
  const calls = testCalls(setDatabase);
  calls.getAllNotes();
  redirect('/');

  return calls;
}
