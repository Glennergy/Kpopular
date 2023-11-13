import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthFailPage from "./pages/AuthFail/AuthFail";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AlbumsPage from "./pages/AlbumsPage/AlbumsPage";
import ArtistsPage from "./pages/ArtistPage/ArtistPage";
import ArtistDetailsPage from "./pages/ArtistDetailsPage/ArtistDetailsPage";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth-fail" element={<AuthFailPage />} />
          <Route path="/albums" element={<AlbumsPage />} />
          <Route
            path="/albums/:artistid/:artistname"
            element={<AlbumsPage />}
          />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/artists/:id" element={<ArtistDetailsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
