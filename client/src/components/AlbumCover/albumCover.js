import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const AlbumCover = ({ name, image, artist, id }) => {
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
        onClick={addToCollection}
      />
      <p className="album-cover__name">
        {name} by {artist}{" "}
      </p>
    </div>
  );
};

export default AlbumCover;
