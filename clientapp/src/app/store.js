import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../features/movies/MovieSlice';

export const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});
