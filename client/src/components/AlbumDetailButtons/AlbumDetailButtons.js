import Login from "../Login/Login";
import axios from "axios";

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
  const addToCollection = () => {
    console.log(`${spotify_id} ${album_name} ${artist} ${image_url}`);
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

  console.log(inCollection);
  if (isLoggedIn) {
    if (inCollection === true) {
      return <button>Remove From My Collection</button>;
    } else {
      return <button onClick={addToCollection}>Add To Collection</button>;
    }
  } else {
    return <Login />;
  }
};

export default AlbumDetailButtons;
