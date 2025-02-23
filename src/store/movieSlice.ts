import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

interface MovieState {
  list: Movie[];
  totalResults: number;
  status: "idle" | "loading" | "failed";
  searchTerm: string;
  searchYear?: string;
  searchType?: string;
  currentPage: number;
}

const initialState: MovieState = {
  list: [],
  totalResults: 0,
  status: "idle",
  searchTerm: "Pokemon",
  searchYear: undefined,
  searchType: "movie",
  currentPage: 1,
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ searchTerm, searchYear, searchType, page }: 
    { searchTerm: string; searchYear?: string; searchType?: string; page: number }) => {
    
    const url = new URL("https://www.omdbapi.com/");
    url.searchParams.append("apikey", "17851ef5");
    url.searchParams.append("s", searchTerm);
    url.searchParams.append("page", page.toString());

    if (searchType) url.searchParams.append("type", searchType);
    if (searchYear) url.searchParams.append("y", searchYear);

    const response = await fetch(url.toString());
    const data = await response.json();

    console.log("API Response:", data); // API'den dönen veriyi kontrol et

    return {
      movies: data.Search ?? [],
      totalResults: Number(data.totalResults) || 0, // 👈 totalResults kontrolü
    };
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setSearchYear: (state, action: PayloadAction<string | undefined>) => {
      state.searchYear = action.payload;
      state.currentPage = 1;
    },
    setSearchType: (state, action: PayloadAction<string | undefined>) => {
      state.searchType = action.payload;
      state.currentPage = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      if (!isNaN(action.payload) && action.payload > 0) {
        state.currentPage = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<{ movies: Movie[], totalResults: number }>) => {
        state.status = "idle";
        state.list = action.payload.movies;
        state.totalResults = action.payload.totalResults; // 👈 totalResults Redux store'a eklendi
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setSearchTerm, setSearchYear, setSearchType, setPage } = movieSlice.actions;
export default movieSlice.reducer;
