import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import AlbumCover from "../components/AlbumCover/AlbumCover";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const ArtistPage = () => {
  const [albums, setAlbums] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios.get(`${serverUrl}/album/2dIgFjalVxs4ThymZ67YCE`).then((response) => {
      setAlbums(response.data);
    });
  }, []);

  return (
    <section>
      <h1>Albums</h1>
      {albums.map((album, key) => (
        <AlbumCover
          key={key}
          name={album.name}
          id={album.id}
          image={album.images[0].url}
          artist={album.artists[0].name}
        />
      ))}
    </section>
  );
};

export default ArtistPage;
