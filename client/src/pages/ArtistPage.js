import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import AlbumCover from "../components/AlbumCover/AlbumCover";

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
    <section>
      <h1>Artists</h1>
      {artists.map((artists, key) => (
        <h2>{artists.artist_name}</h2>
      ))}
    </section>
  );
};

export default ArtistPage;
