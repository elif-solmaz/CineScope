import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface MovieDetail {
  Title: string;
  Year: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
}

interface MovieDetailState {
  movie: MovieDetail | null;
  status: "idle" | "loading" | "failed";
}

const initialState: MovieDetailState = {
  movie: null,
  status: "idle",
};

export const fetchMovieDetail = createAsyncThunk(
  "movieDetail/fetchMovieDetail",
  async (id: string) => {
    const response = await fetch(`https://www.omdbapi.com/?apikey=17851ef5&i=${id}&plot=full`);
    const data = await response.json();
    return data;
  }
);

const movieDetailSlice = createSlice({
  name: "movieDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.status = "idle";
        state.movie = action.payload;
      })
      .addCase(fetchMovieDetail.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default movieDetailSlice.reducer;
