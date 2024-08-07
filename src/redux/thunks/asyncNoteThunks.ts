import { createAsyncThunk } from '@reduxjs/toolkit';
import { NoteProps, NoteResponse } from '@/types/types';
import { backend } from '@/api/api';

export const fetchNotes = createAsyncThunk<NoteResponse[] | null, void>(
  'notes/fetchNotes',
  async (_, thunkURL) => {
    try {
      const response = await backend.get<NoteResponse[]>('Notes');
      return response.data;
    } catch (error) {
      return thunkURL.rejectWithValue('Failed to fetch notes');
    }
  }
);

export const addNote = createAsyncThunk<NoteResponse, NoteProps>(
  'notes/addNote',
  async (note, thunkURL) => {
    try {
      const response = await backend.post<NoteResponse>('Notes', note);
      return response.data;
    } catch (error) {
      return thunkURL.rejectWithValue('Failed to add note');
    }
  }
);

export const updateNote = createAsyncThunk<void, NoteProps & { id: string }>(
  'notes/updateNote',
  async (note, thunkURL) => {
    try {
      const response = await backend.put<void>(`Notes/${note.id}`, note);

      return response.data;
    } catch (error) {
      return thunkURL.rejectWithValue('Failed to update note');
    }
  }
);

export const deleteNote = createAsyncThunk<void, string>(
  'notes/deleteNote',
  async (id, thunkURL) => {
    try {
      await backend.delete(`Notes/${id}`);
    } catch (error) {
      return thunkURL.rejectWithValue('Failed to delete note');
    }
  }
);
