import { createAsyncThunk } from '@reduxjs/toolkit';
import { NoteProps } from '@/types/types';
import { noteAPI } from '@/api/firebaseAPI';
import { User } from 'firebase/auth'

export const fetchNotes = createAsyncThunk<NoteProps[] | null, User>(
  'notes/fetchNotes',
  async (user, thunkURL) => {
    try {
      const notes = await noteAPI().fetchAll(user);

      return notes;
    } catch (error) {
      return thunkURL.rejectWithValue(error);
    }
  }
);

export const addNote = createAsyncThunk<NoteProps | null, NoteProps>(
  'notes/addNote',
  async (note, thunkURL) => {
    try {
      const response = await noteAPI().add(note);

      return response;
    } catch (error) {
      return thunkURL.rejectWithValue('Failed to add note');
    }
  }
);

export const updateNote = createAsyncThunk<NoteProps | null, NoteProps>(
  'notes/updateNote',
  async (note, thunkURL) => {
    try {
      const response = noteAPI().update(note);

      return response;
    } catch (error) {
      return thunkURL.rejectWithValue('Failed to update note');
    }
  }
);

export const deleteNote = createAsyncThunk<string | null, string>(
  'notes/deleteNote',
  async (id, thunkURL) => {
    try {
      const respons = await noteAPI().remove(id);

      return respons;
    } catch (error) {
      return thunkURL.rejectWithValue('Failed to delete note');
    }
  }
);
