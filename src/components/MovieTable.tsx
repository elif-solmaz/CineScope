import React, { useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { fetchMovies, setPage, setSearchTerm, setSearchYear, setSearchType } from "../store/movieSlice";
import "../styles/movieTable.scss";
import Header from "./Header";

const MovieTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { list, totalResults, searchTerm, searchYear, searchType, currentPage } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMovies({ searchTerm, searchYear, searchType, page: currentPage }));
  }, [dispatch, searchTerm, searchYear, searchType, currentPage]);

  const columns: GridColDef[] = [
    { field: "Title", headerName: "Title", flex: 1, headerClassName: "data-grid-header", disableColumnMenu: true },
    { field: "Year", headerName: "Year", width: 100, headerClassName: "data-grid-header", disableColumnMenu: true },
    { field: "Type", headerName: "Type", width: 120, headerClassName: "data-grid-header", disableColumnMenu: true },
    { field: "imdbID", headerName: "IMDb ID", width: 150, headerClassName: "data-grid-header", disableColumnMenu: true },
  ];

  const getNoRowsMessage = () => {
    if (!searchTerm && !searchYear && searchType === "movie") {
      return "No results found. Try adjusting your search filters!";
    }
  
    let message = "No";
  
    if (searchType) {
      message += ` ${searchType}`;
    } else {
      message += " results";
    }
  
    if (searchTerm) {
      message += ` found for "${searchTerm}"`;
    }
  
    if (searchYear) {
      message += searchTerm ? ` in ${searchYear}` : ` found for the year ${searchYear}`;
    }
  
    return message + ".";
  };
  
  return (
   
      <div className="movie-table">
      <Header/>
      <div className="filter-container">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search movie..."
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
        <input
          type="text"
          value={searchYear}
          placeholder="Year (Optional)"
          onChange={(e) => dispatch(setSearchYear(e.target.value))}
        />
        <select value={searchType} onChange={(e) => dispatch(setSearchType(e.target.value))}>
          <option value="movie">Movies</option>
          <option value="series">TV Series</option>
          <option value="episode">Episodes</option>
        </select>
      </div>

      <DataGrid
        className="data-grid"
        rows={list.map((movie, index) => ({ id: index, ...movie }))}
        columns={columns}
        pagination
        pageSizeOptions={[10]}
        paginationMode="server"
        rowCount={totalResults || 0}
        paginationModel={{ page: currentPage - 1, pageSize: 10 }}
        onPaginationModelChange={(params) => dispatch(setPage(params.page + 1))}
        onRowClick={(params) => navigate(`/movie/${params.row.imdbID}`)}
        localeText={{
          noRowsLabel:getNoRowsMessage(), 
        }}
      />
    </div>
  );
};

export default MovieTable;
