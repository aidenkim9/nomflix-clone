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
        <Route path="/movie/:layoutPrefix/:mediaId" element={<Home />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/tv/:layoutPrefix/:mediaId" element={<Tv />} />
        <Route path="/search/:type" element={<Search />} />
        <Route path="/search/:type/:mediaId" element={<Search />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
