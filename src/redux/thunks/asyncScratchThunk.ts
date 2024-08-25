import { scratchAPI } from "@/api/firebaseAPI";
import { ScratchpadProps } from "@/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";


// Define async thunk for fetching notes
export const fetchScratch = createAsyncThunk<ScratchpadProps | null, void>(
  'scratch/fetch',
  async (_, thunkAPI) => {
    try {
      const respons = await scratchAPI().fetch();
      return respons;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch notes');
    }
  }
);

export const updateScratch = createAsyncThunk<ScratchpadProps | null, string>(
  'scratch/update',
  async (content, thunkURL) => {
    try {
      const response = await scratchAPI().update(content);
      return response;
    } catch (error) {
      return thunkURL.rejectWithValue('Failed to update scratch note');
    }
  }
);