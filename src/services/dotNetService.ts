import axios from 'axios';

export const backend = axios.create({
  baseURL: import.meta.env.VITE_APP_DATABASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

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
    const response = await backend.get<{ authenticated: boolean }>('User/authcheck');

    return response.data.authenticated;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

export const userActions = {
  register: async (payload: User) => backend.post<UserResponse>('User/register', payload)
    .then((response) => response)
    .catch((error) => { throw Error(error) }),

  login: async (payload: User) => {
    console.log('login');
    return backend.post<UserResponse>('User/login', payload)
      .then((response) => response)
      .catch((error) => { throw Error(error + ' add erroe state') })
  },

  logout: async () => backend.post<void>('User/logout')
    .then((response) => response)
    .catch((error) => { throw Error(error) }),

  getAllUsers: async (): Promise<UserResponse[] | null> => {
    try {
      const users = await backend.get<UserResponse[]>('User')
      return users.data;
    } catch (error) {
      console.error(error);
      return null
    }
  },
}
