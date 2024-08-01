import { NoteProps } from '@/types/types';
import axios from 'axios';

const BECall = axios.create({
  baseURL: 'http://localhost:5173',
  withCredentials: true,
  headers: {
    // 'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
});

enum API {
  USER = 'http://localhost:5230/api/Users',
  NOTES = 'http://localhost:5230/api/Notes'
};

export type User = {
  email: string;
  password: string;
  username?: string;
}

export type UserResponse = {
  id: string,
  username: string | null,
  email: string,
  createdAt: string
}

export const checkAuthentication = async (): Promise<boolean> => {
  console.log('run check');
  try {
    const response = await BECall.get<{ authenticated: boolean }>(`${API.USER}/authcheck`);

    return response.data.authenticated;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

export const userActions = {
  register: async (payload: User) => BECall.post<UserResponse>(`${API.USER}/${'register'}`, payload)
    .then((response) => response)
    .catch((error) => { throw Error(error) }),

  login: async (payload: User) => BECall.post<UserResponse>(`${API.USER}/${'login'}`, payload)
    .then((response) => response)
    .catch((error) => { throw Error(error) }),

  logout: async () => BECall.post<void>(`${API.USER}/${'logout'}`)
    .then((response) => response)
    .catch((error) => { throw Error(error) }),

  getAllUsers: async (): Promise<UserResponse[] | null> => {
    try {
      const users = await BECall.get<UserResponse[]>(API.USER)
      return users.data;
    } catch (error) {
      console.log('no users');
      return null
    }
  },
}

export const noteActions = {
  byId: async (id: string) => await BECall.get<NoteProps>(`${API.NOTES}/${id}`)
    .then((response) => response.data)
    .catch(function (error) { throw Error(error) }),

  all: async (): Promise<NoteProps[] | null> => {
    try {
      const response = await BECall.get<NoteProps[]>(API.NOTES);
      return response.data;
    } catch (error) {
      console.error('no notes');
      return null;
    }
  },

  add: async (note: NoteProps) => await BECall.post<NoteProps>(API.NOTES, note)
    .then((response) => response)
    .catch(function (error) { throw Error(error) }),

  update: async (note: Partial<NoteProps> & { id: string }) => {
    const prev = await noteActions.byId(note.id);

    return await BECall.put<NoteProps>(`${API.NOTES}/${note.id}`, { ...prev, note })
      .then((response) => response)
      .catch(function (error) { throw Error(error) })
  },

  delete: async (id: string) => await BECall.delete(`${API.NOTES}/${id}`)
    .then((response) => response)
    .catch(function (error) { throw Error(error) }),
}