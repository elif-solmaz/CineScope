import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetail } from "../store/movieDetailSlice";
import { RootState } from "../store";
import "../styles/movieDetail.scss";
import Loading from "pages/Loading";

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { movie, status } = useSelector((state: RootState) => state.movieDetail);
  
  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetail(id) as any);
    }
  }, [dispatch, id]);

  if (status === "loading") return <Loading/>;
  if (status === "failed") return <p>Failed to fetch movie details.</p>;

  return (
    <div className="movie-detail">
      {movie && (
        <>
          <img src={movie.Poster} alt={movie.Title} className="poster" />
          <div className="details">
            <h2>{movie.Title} ({movie.Year})</h2>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
            <p><strong>IMDb Rating:</strong> ⭐ {movie.imdbRating}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
