import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./components/Home";
import TopRated from "./components/TopRated";
import UpComing from "./components/UpComing";
// import SinglePage from "./components/MovieDetails";
import Navbar from "./components/Navbar";
import MovieDetails from "./components/MovieDetails";
import NotFound from "./components/NotFound";
import SearchPage from "./components/SearchPage";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/up-coming" element={<UpComing />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search/:searchTerm" element={<SearchPage />} />
        <Route path="/movie/*" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
