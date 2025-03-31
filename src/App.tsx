import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Components/Header";
import { Helmet } from "react-helmet";
import Footer from "./Components/Footer";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Helmet>
        <title>Nomfilx</title>
      </Helmet>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/banner/:movieId" element={<Home />} />
        <Route path="/movies/now_playing/:movieId" element={<Home />} />
        <Route path="/movies/up_comming/:movieId" element={<Home />} />
        <Route path="/movies/top_rated/:movieId" element={<Home />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:movieId" element={<Search />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
