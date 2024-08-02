import { ENDPOINT, backend, User, UserResponse } from "@/services/dotNetService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk<User, UserResponse>(
  'user/register',
  async (payload, thunkAPI) => {
    try {
      const response = await backend.post<User>(`${ENDPOINT.USER}/register`, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to register user');
    }
  }
);

export const loginUser = createAsyncThunk<User, UserResponse>(
  'user/login',
  async (payload, thunkAPI) => {
    try {
      const response = await backend.post<User>(`${ENDPOINT.USER}/login`, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch user');
    }
  }
);

export const logoutUser = createAsyncThunk<User, UserResponse>(
  'user/logout',
  async (payload, thunkAPI) => {
    try {
      const response = await backend.post<User>(`${ENDPOINT.USER}/logout`, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch user');
    }
  }
);
