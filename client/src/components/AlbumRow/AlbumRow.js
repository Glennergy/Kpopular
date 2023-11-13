import axios from "axios";
import { useState, useEffect } from "react";
import "./AlbumRow.scss";
import AlbumCover from "../AlbumCover/AlbumCover";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const AlbumRow = ({ artist_id, name, setAlbumModalInfo, artistname }) => {
  const [albums, setAlbums] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios.get(`${serverUrl}/album/${artist_id}`).then((response) => {
      const newAlbum = response.data.filter((album) => album.total_tracks > 4);
      setAlbums(newAlbum);
    });
  }, []);

  function albumDetailsClick(id) {
    axios.get(`${serverUrl}/album/details/${id}`).then((response) => {
      const tracksArray = response.data.tracks.items;
      let newTracksArray = [{}];
      tracksArray.forEach((track) => {
        newTracksArray.push({
          title: track.name,
          tracknumber: track.track_number,
        });
      });
      newTracksArray.shift();
      const info = {
        spotify_id: id,
        album_title: response.data.name,
        total_tracks: response.data.total_tracks,
        track_list: newTracksArray,
        artist: response.data.artists[0].name,
        url: response.data.external_urls.spotify,
        image: response.data.images[0].url,
        release: response.data.release_date,
      };

      setAlbumModalInfo(info);
    });
  }

  if (name) {
    return (
      <div className="album-row">
        <h3 className="album-row__name" id={name}>
          {name}
        </h3>
        <div className="album-row__list">
          {albums.map((album, key) => (
            <AlbumCover
              key={key}
              name={album.name}
              id={album.id}
              image={album.images[0].url}
              artist={album.artists[0].name}
              albumDetailsClick={albumDetailsClick}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="album-row">
        <h3 className="album-row__name" id={artist_id}>
          {artistname}
        </h3>
        <div className="album-row__list">
          {albums.map((album, key) => (
            <AlbumCover
              key={key}
              name={album.name}
              id={album.id}
              image={album.images[0].url}
              artist={album.artists[0].name}
              albumDetailsClick={albumDetailsClick}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default AlbumRow;
