import { Note, NoteProps } from "@/types/types";
import { HttpClient } from "./httpClient"

type LoginDetails = { email: string, password: string }

type User = {
  createdAt: string,
  email: string,
  notes: [],
  password: string,
  uuid: string,
}

const createAPI = () => {
  const httpClient = new HttpClient(import.meta.env.VITE_APP_BASE_URL);
  const createUser = async (email: string, password: string) => {
    console.log('create user');
    const response = await httpClient.post<LoginDetails, User>('users', { email, password });

    return response.body ?? null;
  }

  const login = async (email: string, password: string): Promise<string> => {
    const response = await httpClient.get<string>(`users/login/${email}/${password}`);
    // console.log('login response ', response);
    return response.body ?? '';
  }

  const logout = async (token: string | null) => {
    // console.log('logout', token);
    if (!token) return console.log('User already logged out');

    const response = await httpClient.delete(`users/logout/${token}`);
    // console.log('logout response', response);
    return response.body ?? null;
  }

  const checkLoginStatus = async (token: string | null) => {
    // console.log('check');
    const response = token ? await httpClient.get<boolean>(`users/check/${token}`) : { body: false };

    return response.body;
  }

  const getAllNotes = async (token: string) => {
    // console.log('Get all notes');

    return await httpClient.get<Note[]>(`notes/${token}`)
  }

  const addNote = async (token: string, note: NoteProps) => {
    console.log('Add note');

    return await httpClient.post<NoteProps, Note[]>(`notes/${token}`, note)
  }

  const updateNote = async (token: string, note: Partial<NoteProps> & { id: string }) => {
    console.log('Update note');

    return await httpClient.put<Partial<NoteProps>, Note[]>(`notes/${token}`, note)
  }

  const deleteNote = async (token: string, noteId: string) => {
    console.log('Delete note', token, noteId);

    return await httpClient.delete(`notes/${token}/${noteId}`)
  }

  return { createUser, login, logout, getAllNotes, addNote, updateNote, deleteNote, checkLoginStatus }
}

export const api = createAPI();