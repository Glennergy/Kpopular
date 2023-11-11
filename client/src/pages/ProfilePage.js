import { useEffect, useState } from "react";
import axios from "axios";
import Login from "../components/Login/Login";
import Logout from "../components/Logout/Logout";
import AlbumCover from "../components/AlbumCover/AlbumCover";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const ProfilePage = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [userCollection, setUserCollection] = useState([]);

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

  return (
    <section className="profile-page">
      <h1>Profile Page</h1>
      {/* If user is logged in, render their profile information */}
      {isLoggedIn ? (
        profileData && (
          <>
            <h2>Hello, {profileData.username}</h2>
            <img
              className="profile-page__avatar"
              src={profileData.avatar_url}
              alt={`${profileData.username} avatar`}
            />
            <div className="profile-page__logout-wrapper">
              {/* Render a logout button */}
              <Logout />
            </div>
            <div>
              <h2>Your Collection</h2>

              {userCollection.map((album, key) => (
                <AlbumCover
                  key={key}
                  name={album.album_name}
                  id={album.spotify_id}
                  image={album.image_url}
                  artist={album.artist_name}
                />
              ))}
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
