import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import AlbumRow from "../components/AlbumRow/AlbumRow";
import AlbumDetails from "../components/AlbumDetails/AlbumDetails";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const AlbumsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [albumModalInfo, setAlbumModalInfo] = useState({});
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    axios.get(`${serverUrl}/album/artists`).then((response) => {
      setArtists(response.data);
    });
  }, []);

  useEffect(() => {
    console.log(albumModalInfo);
  }, [albumModalInfo]);

  return (
    <section>
      <AlbumDetails />
      <h1>Albums</h1>
      {artists.map((artist, key) => (
        <AlbumRow
          key={key}
          name={artist.artist_name}
          artist_id={artist.artist_spotifyid}
          setAlbumModalInfo={setAlbumModalInfo}
        />
      ))}
    </section>
  );
};

export default AlbumsPage;
