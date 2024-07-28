import { NoteProps } from '@/types/types';
import axios, { AxiosResponse } from 'axios';

enum API {
  USER = 'http://localhost:5230/api/Users',
  NOTES = 'http://localhost:5230/api/Notes'
};

export type User = {
  email: string;
  password: string;
  username?: string;
}

export const getAllUsers = async (): Promise<User> => await axios.get<User>(API.USER)
  .then((response) => response.data)
  .catch((error) => { throw Error(error) })


export const userActions = {
  register: async (payload: User): Promise<AxiosResponse> => axios.post<User>(`${API.USER}/${'register'}`, payload)
    .then((response) => response)
    .catch((error) => { throw Error(error) }),

  login: async (payload: User): Promise<AxiosResponse> => axios.post<User>(`${API.USER}/${'login'}`, payload)
    .then((response) => response)
    .catch((error) => { throw Error(error) }),

  logout: async (): Promise<AxiosResponse<void, any>> => axios.post<void>(`${API.USER}/${'logout'}`)
    .then((response) => response)
    .catch((error) => { throw Error(error) }),
}

export const noteActions = {
  byId: async (id: string): Promise<NoteProps> => await axios.get<NoteProps>(`${API.NOTES}/${id}`)
    .then((response) => response.data)
    .catch(function (error) { throw Error(error) }),

  all: async (): Promise<NoteProps[]> => await axios.get<NoteProps[]>(API.NOTES + '/', {

  })
    .then((response) => response?.data)
    .catch(function (error) { throw Error(error) }),

  add: async (note: NoteProps): Promise<AxiosResponse> => await axios.post<NoteProps>(API.NOTES + '/', note)
    .then((response) => response)
    .catch(function (error) { throw Error(error) }),

  update: async (note: Partial<NoteProps> & { id: string }): Promise<AxiosResponse> => {
    const prev = await noteActions.byId(note.id);

    return await axios.put<NoteProps>(`${API.NOTES}/${note.id}`, { ...prev, note })
      .then((response) => response)
      .catch(function (error) { throw Error(error) })
  },

  delete: async (id: string): Promise<AxiosResponse> => await axios.delete(`${API.NOTES}/${id}`)
    .then((response) => response)
    .catch(function (error) { throw Error(error) }),
}