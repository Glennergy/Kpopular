import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const serverUrl = process.env.REACT_APP_SERVER_URL;

const ArtistDetailsPage = () => {
  const { id } = useParams();
  const [artistInfo, setArtistInfo] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState([]);
  const albumLink = `/albums/${id}/${artistInfo.name}`;

  useEffect(() => {
    axios.get(`${serverUrl}/album/artists/${id}`).then((response) => {
      console.log(response.data);
      setArtistInfo(response.data);
    });
  }, []);

  useEffect(() => {});

  return (
    <section className="artist">
      <div className="artist__left">
        <h1>{artistInfo.name}</h1>
        <img src={artistInfo.image} alt="artist image"></img>
      </div>
      <div className="artist__left">
        <Link to={artistInfo.url} target="_blank">
          <span> Check out Artist Spotify Page</span>
        </Link>
        <Link to={albumLink}>
          <span> Look at Artist's Album</span>
        </Link>
      </div>
    </section>
  );
};

export default ArtistDetailsPage;
