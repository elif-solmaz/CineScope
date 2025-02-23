import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import MovieTable from "./components/MovieTable";
import MovieDetail from "./pages/MovieDetail";

const App: React.FC = () => {
  return (
    <Provider store={store}>
    <Routes>
      <Route path="/" element={<MovieTable />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
    </Routes>
    </Provider>
  );
};

export default App;