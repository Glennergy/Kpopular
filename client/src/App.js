import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthFailPage from "./pages/AuthFail";
import HomePage from "./pages/HomePage";
import Header from "./components/Header/Header";
import ProfilePage from "./pages/ProfilePage";
import AlbumsPage from "./pages/AlbumsPage";
import ArtistsPage from "./pages/ArtistPage";
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
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
