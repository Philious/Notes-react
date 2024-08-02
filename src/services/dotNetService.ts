import axios from 'axios';

export const backend = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const ENDPOINT = {
  USER: `${import.meta.env.VITE_APP_DATABASE_URL}/api/Users`,
  NOTES: `${import.meta.env.VITE_APP_DATABASE_URL}/api/Notes`,
  SCRATCH: `${import.meta.env.VITE_APP_DATABASE_URL}/api/Scratchpad`
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
  console.log('check authentication');
  try {
    const response = await backend.get<{ authenticated: boolean }>(`${ENDPOINT.USER}/authcheck`);

    return response.data.authenticated;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

export const userActions = {
  register: async (payload: User) => backend.post<UserResponse>(`${ENDPOINT.USER}/${'register'}`, payload)
    .then((response) => response)
    .catch((error) => { throw Error(error) }),

  login: async (payload: User) => {
    console.log('login');
    return backend.post<UserResponse>(`${ENDPOINT.USER}/${'login'}`, payload)
      .then((response) => response)
      .catch((error) => { throw Error(error + ' add erroe state') })
  },

  logout: async () => backend.post<void>(`${ENDPOINT.USER}/${'logout'}`)
    .then((response) => response)
    .catch((error) => { throw Error(error) }),

  getAllUsers: async (): Promise<UserResponse[] | null> => {
    try {
      const users = await backend.get<UserResponse[]>(ENDPOINT.USER)
      return users.data;
    } catch (error) {
      console.error(error);
      return null
    }
  },
}
/*
export const noteActions = {
  byId: async (id: string) => await backend.get<NoteProps>(`${ENDPOINT.NOTES}/${id}`)
    .then((response) => response.data)
    .catch(function (error) { throw Error(error) }),

  all: async (): Promise<NoteProps[] | null> => {
    console.log('get all notes');
    try {
      const response = await backend.get<NoteProps[]>(ENDPOINT.NOTES);
      return response.data;
    } catch (error) {
      console.error('no notes');
      return null;
    }
  },

  add: async (note: NoteProps) => await backend.post<NoteProps>(ENDPOINT.NOTES, note)
    .then((response) => response)
    .catch(function (error) { throw Error(error) }),

  update: async (note: Partial<NoteProps> & { id: string }) => {
    const prev = await noteActions.byId(note.id);

    return await backend.put<NoteProps>(`${ENDPOINT.NOTES}/${note.id}`, { ...prev, note })
      .then((response) => response)
      .catch(function (error) { throw Error(error) })
  },

  delete: async (id: string) => await backend.delete(`${ENDPOINT.NOTES}/${id}`)
    .then((response) => response)
    .catch(function (error) { throw Error(error) }),
}

export const scratchActions = {
  add: async (note: NoteProps) => await backend.post<NoteProps>(ENDPOINT.SCRATCH, note)
    .then((response) => response)
    .catch(function (error) { throw Error(error) }),

  update: async (note: NoteProps) => {
    return await backend.put<NoteProps>(ENDPOINT.SCRATCH, { note })
      .then((response) => response)
      .catch(function (error) { throw Error(error) })
  }
}
  */