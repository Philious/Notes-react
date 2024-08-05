import { backend } from "@/services/dotNetService";
import { NoteProps } from "@/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

type Response = Pick<NoteProps, 'content' | 'updatedAt'>

// Define async thunk for fetching notes
export const fetchScratch = createAsyncThunk<Response, void>(
  'scratch/fetch',
  async (_, thunkURL) => {
    try {
      const response = await backend.get<Response>('Scratchpad');
      return response.data;
    } catch (error) {
      return thunkURL.rejectWithValue('Failed to fetch notes');
    }
  }
);

export const addScratch = createAsyncThunk<Response, void>(
  'scratch/add',
  async (_, thunkURL) => {
    try {
      const response = await backend.put<Response>('Scratchpad', { content: 'This is your scratchpad, there are many like it but this one is yours.' });
      return response.data;
    } catch (error) {
      return thunkURL.rejectWithValue('Failed to add scratch note');
    }
  }
);

export const updateScratch = createAsyncThunk<Response, string>(
  'scratch/update',
  async (content, thunkURL) => {
    try {
      const response = await backend.put<Response>('Scratchpad', ({ content }));
      return response.data;
    } catch (error) {
      return thunkURL.rejectWithValue('Failed to update scratch note');
    }
  }
);