import axios from "axios";
import "./AlbumCover.scss";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const AlbumCover = ({ name, image, artist, id, albumDetailsClick }) => {
  const addToCollection = () => {
    axios
      .post(
        `${serverUrl}/user/collection`,
        {
          spotify_id: { id },
          album_name: { name },
          artist: { artist },
          image_url: { image },
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(`${artist} + ${id}`);
  };

  return (
    <div className="album-cover">
      <img
        src={image}
        className="album-cover__image"
        onClick={() => albumDetailsClick(id)}
      />
      <p className="album-cover__name">{name}</p>
    </div>
  );
};

export default AlbumCover;
