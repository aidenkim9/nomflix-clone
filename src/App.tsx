import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Components/Header";
import { Helmet } from "react-helmet";

function App() {
  return (
    <BrowserRouter>
      <Helmet>
        <title>Nomfilx</title>
      </Helmet>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movies/:movieId" element={<Home />} />
        <Route path="tv" element={<Tv />} />
        <Route path="search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
