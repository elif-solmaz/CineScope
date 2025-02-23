import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import movieDetailReducer from "./movieDetailSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    movieDetail: movieDetailReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
