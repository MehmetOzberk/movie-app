import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (searchTerm) => {
  try {
        const url = searchTerm 
      ? `/api/movies/search?search=${encodeURIComponent(searchTerm)}`
      : `/api/movies/popular`;
      
    console.log('API URL:', url); // Debug için eklendi
    const response = await axios.get(url);
    console.log('API Response:', response.data); // Debug için eklendi
    return response.data;
  } catch (error) {
    console.error('API Error:', error); // Debug için eklendi
    console.error('Error response:', error.response?.data); 
    throw error.response?.data || error.message;
  }
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearMovies(state) {
      state.movies = [];
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        console.log('Fulfilled Action:', action.payload); // Debug için eklendi
        
        const movieData = action.payload;
        
        const searchResults = movieData?.Search || movieData?.search;
        
        if (movieData && searchResults) {
          if (searchResults.length === 0) {
            state.movies = [];
            state.error = 'No movies found';
          } else {
            state.movies = searchResults;
            state.error = null;
          }
        } else {
          state.movies = [];
          state.error = 'Invalid response format';
          console.error('Invalid response format:', movieData);
        }
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movies';
      });
  }
});

export const { clearMovies } = moviesSlice.actions;

export default moviesSlice.reducer;