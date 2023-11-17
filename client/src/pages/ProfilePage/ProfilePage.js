import { useEffect, useState } from "react";
import axios from "axios";
import Login from "../../components/Login/Login";
import Logout from "../../components/Logout/Logout";
import AlbumCover from "../../components/AlbumCover/AlbumCover";
import "./ProfilePage.scss";
import AlbumDetails from "../../components/AlbumDetails/AlbumDetails";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const ProfilePage = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [userCollection, setUserCollection] = useState([]);
  const [albumModalInfo, setAlbumModalInfo] = useState({});

  useEffect(() => {
    // Send a GET request for profile information
    // If user is currently logged in, we will get profile data, if they are not logged in, we will get 401 (Unauthorized) that we can handle in `.catch`
    // Note that we need to use `withCredentials` in order to pass the cookie to a server
    axios
      .get(`${serverUrl}/auth/profile`, { withCredentials: true })
      .then((res) => {
        // Update the state: done authenticating, user is logged in, set the profile data
        setIsAuthenticating(false);
        setIsLoggedIn(true);
        setProfileData(res.data);
      })
      .catch((err) => {
        // If we are getting back 401 (Unauthorized) back from the server, means we need to log in
        if (err.response.status === 401) {
          // Update the state: done authenticating, user is not logged in
          setIsAuthenticating(false);
          setIsLoggedIn(false);
        } else {
          console.log("Error authenticating", err);
        }
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

  function onModalCancel() {
    setAlbumModalInfo({});
  }

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
  }, [profileData]);

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
  }, [albumModalInfo]);

  return (
    <section className="profile-page">
      <h1 className="profile-page__header">My Profile</h1>
      {/* If user is logged in, render their profile information */}
      {isLoggedIn ? (
        profileData && (
          <>
            <div className="profile-page__upper">
              <div className="profile-page__upper--left">
                <img
                  className="profile-page__avatar"
                  src={profileData.avatar_url}
                  alt={`${profileData.username} avatar`}
                />
                <div className="profile-page__logout-wrapper">
                  {/* Render a logout button */}
                  <Logout />
                </div>
              </div>
              <div className="profile-page__upper--right">
                <h2>User Name: {profileData.username}</h2>
                <h3>Albums Collected: {userCollection.length}</h3>
              </div>
            </div>
            <div className="profile-page__lower">
              <h2>Your Collection</h2>
              <AlbumDetails
                albumModalInfo={albumModalInfo}
                onCancel={onModalCancel}
                userCollection={userCollection}
                isLoggedIn={isLoggedIn}
              />
              <div className="profile-page__lower-cont">
                {userCollection.map((album, key) => (
                  <AlbumCover
                    key={key}
                    name={album.album_name}
                    id={album.spotify_id}
                    image={album.image_url}
                    artist={album.artist_name}
                    albumDetailsClick={albumDetailsClick}
                  />
                ))}
              </div>
            </div>
          </>
        )
      ) : (
        // If user is not logged in, render a login button
        <>
          <p>
            <strong>This page requires authentication.</strong>
          </p>
          <Login />
        </>
      )}
    </section>
  );
};
export default ProfilePage;
