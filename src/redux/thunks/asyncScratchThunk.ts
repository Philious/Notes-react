import { backend } from "@/api/api";
import { ScratchResponse } from "@/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";


// Define async thunk for fetching notes
export const fetchScratch = createAsyncThunk<ScratchResponse, void>(
  'scratch/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await backend.get<ScratchResponse>('Scratchpad');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch notes');
    }
  }
);

export const addScratch = createAsyncThunk<ScratchResponse, void>(
  'scratch/add',
  async (_, thunkURL) => {
    try {
      const response = await backend.put<ScratchResponse>('Scratchpad', { content: 'This is your scratchpad, there are many like it but this one is yours.' });
      return response.data;
    } catch (error) {
      return thunkURL.rejectWithValue('Failed to add scratch note');
    }
  }
);

export const updateScratch = createAsyncThunk<ScratchResponse, string>(
  'scratch/update',
  async (content, thunkURL) => {
    try {
      const response = await backend.put<ScratchResponse>('Scratchpad', ({ content }));
      return response.data;
    } catch (error) {
      return thunkURL.rejectWithValue('Failed to update scratch note');
    }
  }
);