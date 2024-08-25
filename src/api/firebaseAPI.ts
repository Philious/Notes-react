import { getDatabase, onValue, child, push, set, remove as removeFromFirebase, ref, DataSnapshot } from "firebase/database";
import { FirebaseError, initializeApp } from "firebase/app";
import { Auth, createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User } from "firebase/auth";
import { NoteAPI, NoteProps, ScratchpadAPI, ScratchpadProps, UserAPI, UserResponse } from '@/types/types';
import { uid } from '@/utils/sharedUtils';

export type UserData = { email: string, password: string }

type OldNoteType = {
  body: string;
  created: number;
  id: string;
  lastupdated: number;
  title: string;
}

export type FirebaseStateObject = {
  authStateChange: (...args: any) => void;
  onLoggedIn: (user: User) => void;
  onLoggedOut: () => void;
}

export type Ref<T> = React.MutableRefObject<T>;

const returnError = (err: unknown) => {
  const error = err as FirebaseError;
  const errorCode = error.code;
  const errorMessage = error.message;
  const email = error.customData?.email;
  const credential = GoogleAuthProvider.credentialFromError(error);

  console.error(`Error: ${errorCode}, ${errorMessage}\nemail: ${email}\nCredentials: ${credential}`,);

  return null;
}

class UseFireState {
  private _auth: Auth;
  private _provider: GoogleAuthProvider;
  private _user: User | null = null;
  private _onAuthStateChange: (...args: any) => void = (args: any) => { args };
  private _onLoggedIn: (user: User) => void = (user: User) => { user };
  private _onLoggedOut: () => void = () => { };

  constructor() {
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_APP_APIKEY,
      authDomain: import.meta.env.VITE_APP_AUTHDOMAIN,
      databaseURL: import.meta.env.VITE_APP_DATABASEURL,
      projectId: import.meta.env.VITE_APP_PROJECTID,
      storageBucket: import.meta.env.VITE_APP_STORAGEBUCKET,
      messagingSenderId: import.meta.env.VITE_APP_MESSAGINGSENDERID,
      appId: import.meta.env.VITE_APP_APPID,
      measurementId: import.meta.env.VITE_APP_MEASUREMENTID
    };

    const configEntires = Object.entries(firebaseConfig).reduce((p, c) => p += c[1] ? '' : `${c[0]}, `, '');
    if (configEntires.length) {
      throw console.error(`${configEntires} are missing.`);
    }

    const app = initializeApp(firebaseConfig);
    this._auth = getAuth(app);
    this._provider = new GoogleAuthProvider();

    onAuthStateChanged(this._auth, (user) => {
      this._onAuthStateChange(user)
      if (user) {
        this._user = user;
        this._onLoggedIn(user);
      } else {
        this._onLoggedOut();
      }
    });
  }

  getAuth(): Auth { return this._auth!; }
  setAuth(auth: Auth): void { this._auth = auth; }

  getProvider(): GoogleAuthProvider { return this._provider!; }
  setProvider(provider: GoogleAuthProvider): void { this._provider = provider; }

  getUser(): User | null { return this._user; }
  setUser(user: User): void { this._user = user; }

  setOnAuthStateChange(fn: (...args: any) => void): void { this._onAuthStateChange = fn; }
  setOnLoggedIn(fn: (...args: any) => void): void { this._onLoggedIn = fn; }
  setOnLoggedOut(fn: (...{ args }: any) => void): void { this._onLoggedOut = fn; }
}

export const fireState = new UseFireState();

/*
  const RedirectResults = async () => {
    try {
      const userCredentials = await getRedirectResult(auth)
      const authCredentials = userCredentials ? GoogleAuthProvider.credentialFromResult(userCredentials) : null;
      const token = authCredentials?.accessToken;

      const user = userCredentials?.user;
    } catch (err) {
      returnError(err)
    }
  }
*/

export const userAPI = (): UserAPI => {
  const register = async (email: string, password: string): Promise<UserResponse | null> => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(fireState.getAuth(), email, password)
      fireState.setUser(userCredentials.user);
      return {
        id: userCredentials.user.uid,
        username: null,
        email,
        createdAt: userCredentials.user.metadata.creationTime ?? new Date().toJSON(),
      }
    } catch (err) { return returnError(err) };

  }

  const login = async (email: string, password: string): Promise<UserResponse | null> => {
    try {
      const userCredentials = await signInWithEmailAndPassword(fireState.getAuth(), email, password)
      fireState.setUser(userCredentials.user);
      return {
        id: userCredentials.user.uid,
        username: null,
        email: userCredentials.user.email ?? userCredentials.user.uid,
        createdAt: userCredentials.user.metadata.creationTime ?? new Date().toJSON(),
      }
    } catch (err) { return returnError(err); }
  };

  const popupLogin = async (): Promise<UserResponse | null> => {
    try {

      const result = await signInWithPopup(fireState.getAuth(), fireState.getProvider())
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential?.accessToken;

      return {
        id: result.user.uid,
        username: null,
        email: result.user.email,
        createdAt: result.user.metadata.creationTime ?? new Date().toJSON(),
      };
    } catch (error) { return returnError(error) }
  };

  const logout = async () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      console.error(error);
    });


  }

  return { register, login, popupLogin, logout }
}


export const noteAPI = (): NoteAPI => {

  const fetchAll = async (user: User): Promise<NoteProps[]> => {
    const db = getDatabase();
    const userDataRef = ref(db, `users/${user.uid}`);
    return new Promise((resolve) => {
      onValue(userDataRef, async (snapshot: DataSnapshot) => {
        const data = await snapshot.val().notes as Record<string, unknown & { body: string; }>;
        const snap = Object.values(data ?? []).map((n) => {
          if (n?.body) {
            const nn = n as unknown as OldNoteType;
            return {
              id: nn.id,
              title: nn.title,
              content: nn.body,
              catalog: '',
              tags: [],
              createdAt: new Date(nn.created).toJSON(),
              updatedAt: new Date(nn.lastupdated).toJSON(),
            };
          } else return n as unknown as NoteProps;
        });
        resolve(snap);
      });
    });
  };

  const add = async (note: NoteProps) => {
    const user = fireState.getUser();
    if (!user) return null;
    const db = getDatabase();
    const id = push(child(ref(db), 'note')).key ?? uid();
    const newNote = { ...note, id };

    try {
      await set(ref(db, `users/${user.uid}/notes/${id}`), newNote)
      return newNote;
    } catch (error) {
      console.error(error)
      return null;
    }
  };

  const update = async (note: NoteProps) => {
    const user = fireState.getUser();
    if (!user) return null;
    const db = getDatabase();

    try {
      await set(ref(db, `users/${user.uid}/notes/${note.id}`), note)
      return note
    } catch (error) {
      console.error(error)
      return null;
    }
  };

  const remove = async (id: string) => {
    const user = fireState.getUser();
    if (!user) return null;
    const db = getDatabase();
    try {
      await removeFromFirebase(ref(db, `users/${user.uid}/notes/${id}`));
      return id;
    } catch (error) {
      console.error(error)
      return null;
    }
  };

  return { fetchAll, add, update, remove }
}

export const scratchAPI = (): ScratchpadAPI => {

  const fetch = async (): Promise<ScratchpadProps | null> => {
    const user = fireState.getUser();
    if (!user) return null;
    const db = getDatabase();
    const userDataRef = ref(db, `users/${user.uid}`);
    return new Promise((resolve) => {
      onValue(userDataRef, async (snapshot: DataSnapshot) => {
        const data = await (snapshot.val()?.scratchpad ?? null) as ScratchpadProps | null;
        resolve(data);
      })
    })
  };

  const update = async (content: string) => {
    const user = fireState.getUser();
    if (!user) return null;
    const db = getDatabase();
    const update = { content, updatedAt: new Date().toJSON() };
    try {
      await set(ref(db, `users/${user.uid}/scratchpad`), update)
      return update
    } catch (error) {
      console.error(error)
      return null;
    }
  };

  return { fetch, update }
}
