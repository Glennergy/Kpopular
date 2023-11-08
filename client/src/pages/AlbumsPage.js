import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import AlbumCover from "../components/AlbumCover/albumCover";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const AlbumsPage = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios.get(`${serverUrl}/album`).then((response) => {
      setAlbums(response.data);
    });
  }, []);

  return (
    <section>
      <h1>Albums</h1>
      {albums.map((album) => (
        <AlbumCover name={album.name} />
      ))}
    </section>
  );
};

export default AlbumsPage;
