import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./ArtistPage.scss";
import AlbumCover from "../../components/AlbumCover/AlbumCover";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const ArtistPage = () => {
  const [artists, setArtists] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios.get(`${serverUrl}/album/artists`).then((response) => {
      setArtists(response.data);
    });
  }, []);

  return (
    <section className="artist">
      <h1 className="artist__header">Artists</h1>
      <div className="artist__container">
        {artists.map((artists, key) => (
          <Link to={artists.artist_spotifyid}>
            <div className="artist__card">
              <h2 className="artist__card--text">{artists.artist_name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ArtistPage;
