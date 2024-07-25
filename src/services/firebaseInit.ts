import { firebaseConfig } from "@/firebaseConfig";
import { hasFirebase } from "@/utils/sharedUtils";
import { initializeApp } from "firebase/app";
import { Auth, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as LogOut } from "firebase/auth";

/*
export const initFirebase = async (): Promise<Auth | null> => {
  if (hasFirebase()) {
    const app = initializeApp(firebaseConfig);
    const auth = await getAuth(app);
    return auth
  } else return null;
}

export const passwordSignIn = () => {
  const auth = getAuth();
  const createAccount = async (email: string, password: string) =>
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error(errorCode, errorMessage)
      });

  const signIn = async (email: string, password: string) =>
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

  const signOut = async () => await LogOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    console.error(error);
  });

  return { createAccount, signIn, signOut }
}
  */