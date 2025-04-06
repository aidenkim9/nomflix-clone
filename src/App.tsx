import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Components/Common/Header";
import { Helmet } from "react-helmet";
import Footer from "./Components/Common/Footer";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Helmet>
        <title>Nomfilx</title>
      </Helmet>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/banner/:mediaId" element={<Home />} />
        <Route path="/movie/now_playing/:mediaId" element={<Home />} />
        <Route path="/movie/up_comming/:mediaId" element={<Home />} />
        <Route path="/movie/top_rated/:mediaId" element={<Home />} />
        <Route path="/movie/trending/:mediaId" element={<Home />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/tv/on_the_air/:mediaId" element={<Tv />} />
        <Route path="/tv/airing_today/:mediaId" element={<Tv />} />
        <Route path="/tv/top_rated/:mediaId" element={<Tv />} />
        <Route path="/tv/trending/:mediaId" element={<Tv />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:mediaId" element={<Search />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
