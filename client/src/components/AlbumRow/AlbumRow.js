import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./AlbumRow.scss";
import AlbumCover from "../AlbumCover/AlbumCover";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const AlbumRow = ({ artist_id, name, setAlbumModalInfo }) => {
  const [albums, setAlbums] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios.get(`${serverUrl}/album/${artist_id}`).then((response) => {
      const newAlbum = response.data.filter((album) => album.total_tracks > 4);
      console.log(response.data);
      setAlbums(newAlbum);
    });
  }, []);

  function albumDetailsClick(album) {
    const info = {
      name: album.name,
      id: album.id,
      image: album.images[0].url,
    };
    console.log(info);
    setAlbumModalInfo(info);
  }

  return (
    <div className="album-row">
      <h3 className="album-row__name">{name}</h3>
      <div className="album-row__list">
        {albums.map((album, key) => (
          <AlbumCover
            key={key}
            name={album.name}
            id={album.id}
            image={album.images[0].url}
            artist={album.artists[0].name}
          />
        ))}
      </div>
    </div>
  );
};

export default AlbumRow;
