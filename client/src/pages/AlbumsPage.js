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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userCollection, setUserCollection] = useState([]);

  useEffect(() => {
    // Send a GET request for profile information
    // If user is currently logged in, we will get profile data, if they are not logged in, we will get 401 (Unauthorized) that we can handle in `.catch`
    // Note that we need to use `withCredentials` in order to pass the cookie to a server
    axios
      .get(`${serverUrl}/auth/profile`, { withCredentials: true })
      .then((res) => {
        // Update the state: done authenticating, user is logged in, set the profile data
        setIsLoggedIn(true);
      })
      .catch((err) => {
        // If we are getting back 401 (Unauthorized) back from the server, means we need to log in
        if (err.response.status === 401) {
          // Update the state: done authenticating, user is not logged in
          setIsLoggedIn(false);
        } else {
          console.log("Error authenticating", err);
        }
      });
  }, []);

  // Gets user Collection if logged in
  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get(`${serverUrl}/user/collection`, { withCredentials: true })
        .then((res) => {
          setUserCollection(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    axios.get(`${serverUrl}/album/artists`).then((response) => {
      setArtists(response.data);
    });
  }, []);

  useEffect(() => {
    console.log(albumModalInfo);
  }, [albumModalInfo]);

  function onModalCancel() {
    setAlbumModalInfo({});
  }

  return (
    <section>
      <AlbumDetails
        albumModalInfo={albumModalInfo}
        onCancel={onModalCancel}
        userCollection={userCollection}
        isLoggedIn={isLoggedIn}
      />
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
