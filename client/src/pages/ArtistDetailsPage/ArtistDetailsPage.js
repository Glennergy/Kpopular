import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ArtistDetailsPage.scss";
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

  useEffect(() => {
    axios.get(`${serverUrl}/album/${id}`).then((response) => {
      const newAlbum = response.data.filter((album) => album.total_tracks > 4);
      setArtistAlbums(newAlbum);
    });
  }, [artistInfo]);

  return (
    <section className="artist-details">
      <div className="artist-details__left">
        <h1 className="artist-details__header">{artistInfo.name}</h1>
        <img
          src={artistInfo.image}
          alt="artist image"
          className="artist-details__image"
        ></img>
        <div className="artist-details__albumsnum">
          <h3> Number of Albums Released:</h3>
          <p>{artistAlbums.length} Albums</p>
        </div>
        <div className="artist-details__links">
          <Link to={artistInfo.url} target="_blank">
            <span className="artist-details__button">
              {" "}
              Check out Artist Spotify Page
            </span>
          </Link>
          <Link to={albumLink}>
            <span className="artist-details__button">
              {" "}
              Look at Artist's Albums
            </span>
          </Link>
        </div>
        <Link to="/artists">
          <span className="artist-details__button"> Go Back</span>
        </Link>
      </div>
    </section>
  );
};

export default ArtistDetailsPage;
