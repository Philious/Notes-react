import { Note, NoteProps } from "@/types/types";
import { HttpClient, HttpResponse } from "./httpClient"

type ServerReturnType<T> = {
  message: string;
  data: T
}

type User = {
  createdAt: string,
  email: string,
  notes: [],
  password: string,
  uuid: string,
}

const eventHandler = async <T>(call: HttpResponse<T>) => {
  try {
    const response = await call;
    // console.log('eventhandler response', response);
    if (response.ok) {
      return response.body;
    }
  } catch (err) {
    console.log(err);
  }
}

const createAPI = () => {
  const httpClient = new HttpClient(import.meta.env.VITE_APP_BASE_URL);

  const createUser = async (email: string, password: string) => {
    console.log('create user');
    return await eventHandler(await httpClient.post<ServerReturnType<User>>('users', { email, password }))
  }

  const login = async (email: string, password: string) => {
    console.log('login');
    return await eventHandler(await httpClient.get<ServerReturnType<string>>(`users/login/${email}/${password}`))
  }

  const logout = async (token: string) => {
    console.log('logout');
    return await eventHandler(await httpClient.delete(`users/logout/${token}`));
  }

  const checkLoginStatus = async (token: string | null) => {
    console.log('check');
    return token ? await eventHandler(await httpClient.get<ServerReturnType<boolean>>(`users/check/${token}`)) : false;
  }

  const getAllNotes = async (token: string) => {
    console.log('Get all notes');
    return eventHandler(await httpClient.get<ServerReturnType<Note[]>>(`notes/${token}`))
  }

  const addNote = async (token: string, note: NoteProps) => {
    console.log('Add note');
    eventHandler(await httpClient.post<ServerReturnType<Note>>(`notes/${token}`, note))
  }

  const updateNote = async (token: string, note: Partial<NoteProps> & { id: string }) => {
    console.log('Update note');
    eventHandler(await httpClient.put<ServerReturnType<Note>>(`notes/${token}/`, note))
  }

  const deleteNote = async (token: string, noteId: string) => {
    console.log('Delete note');
    eventHandler(await httpClient.delete(`notes/${token}/${noteId}`))
  }

  return { createUser, login, logout, getAllNotes, addNote, updateNote, deleteNote, checkLoginStatus }
}

export const api = createAPI();