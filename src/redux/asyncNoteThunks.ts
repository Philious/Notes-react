import { createAsyncThunk } from '@reduxjs/toolkit';
import { NoteProps } from '@/types/types';  // Adjust import based on your project
import { backend } from '@/services/dotNetService';

// Define async thunk for fetching notes
export const fetchNotes = createAsyncThunk<NoteProps[] | null, void>(
  'notes/fetchNotes',
  async (_, thunkURL) => {
    try {
      const response = await backend.get<NoteProps[]>('Notes');
      return response.data;
    } catch (error) {
      return thunkURL.rejectWithValue('Failed to fetch notes');
    }
  }
);

// Define async thunk for adding a note
export const addNote = createAsyncThunk<NoteProps, NoteProps>(
  'notes/addNote',
  async (note, thunkURL) => {
    try {
      const response = await backend.post<NoteProps>('Notes', note);
      return response.data;
    } catch (error) {
      return thunkURL.rejectWithValue('Failed to add note');
    }
  }
);

// Define async thunk for updating a note
export const updateNote = createAsyncThunk<NoteProps, Partial<NoteProps> & { id: string }>(
  'notes/updateNote',
  async (note, thunkURL) => {
    try {
      const response = await backend.put<NoteProps>(`Notes/${note.id}`, note);
      return response.data;
    } catch (error) {
      return thunkURL.rejectWithValue('Failed to update note');
    }
  }
);

// Define async thunk for deleting a note
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
