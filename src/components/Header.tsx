import MovieIcon from "@mui/icons-material/Movie"; // Seçtiğin ikonu buradan değiştirebilirsin

const Header = () => {
  return (
    <div className="header">
      <div className="icon-container">
        <MovieIcon className="header-icon" />
      </div>
      <div className="title-container">
      <h1>CineScope</h1>
        <p>Find something perfect for you!</p>
      </div>
    </div>
  );
};

export default Header;