import Login from "../Login/Login";
import axios from "axios";
import "./AlbumDetailButtons.scss";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const AlbumDetailButtons = ({
  isLoggedIn,
  inCollection,
  setInCollection,
  spotify_id,
  album_name,
  artist,
  image_url,
}) => {
  // Function adds album data into user collection table
  const addToCollection = () => {
    axios
      .post(
        `${serverUrl}/user/collection`,
        {
          spotify_id: spotify_id,
          album_name: album_name,
          artist: artist,
          image_url: image_url,
        },
        { withCredentials: true }
      )
      .then((response) => {
        setInCollection(true);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to Remove select album from the Collection
  const RemoveFromCollection = () => {
    console.log(spotify_id);
    axios
      .delete(`${serverUrl}/user/collection/${spotify_id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setInCollection(false);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // If user is Logged in, button will either ask to remove or add from Collection,
  // If  not logged in, button will ask to Login
  if (isLoggedIn) {
    if (inCollection === true) {
      return (
        <button className="button-login" onClick={RemoveFromCollection}>
          Remove From My Collection
        </button>
      );
    } else {
      return (
        <button className="button-login" onClick={addToCollection}>
          Add To Collection
        </button>
      );
    }
  } else {
    return <Login details={true} />;
  }
};

export default AlbumDetailButtons;
