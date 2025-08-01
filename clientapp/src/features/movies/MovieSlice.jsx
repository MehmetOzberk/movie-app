import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (searchTerm) => {
  const response = await axios.get(`http://localhost:5000/api/movies?search=${searchTerm}`);
  return response.data;
});

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    items: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'succeeded';
    });
  },
});

export default movieSlice.reducer;
