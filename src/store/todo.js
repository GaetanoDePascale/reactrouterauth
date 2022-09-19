import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading',
});

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },
  reducers: {
    add: (state, action) => {
      const maxId = Math.max(...state.data.map((o) => o.id));
      state.data.push({ id: maxId + 1, ...action.payload });
    },
    remove: (state, action) => {
      const indexToRemove = state.data.findIndex((x) => x.id === action.payload);
      if (indexToRemove >= 0) {
        state.data.splice(indexToRemove, 1);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { add, remove } = todoSlice.actions;
export default todoSlice.reducer;

export const fetchTodos = createAsyncThunk('todos/fetch', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos', { params: { _limit: 10 } });
  return response.data;
});
