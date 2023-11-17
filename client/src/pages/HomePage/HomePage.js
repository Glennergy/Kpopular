import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "../../components/Login/Login";
import "./HomePage.scss";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const HomePage = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  return (
    <section className="homepage">
      <div className="homepage__upper">
        <h1>Welcome to Kpopular!</h1>
        <p>Your go to source for all things related to Kpop Albums.</p>
      </div>
      {isLoggedIn ? (
        <>
          <div className="homepage__navigation">
            <h1 className="homepage__title">Start Your Collection</h1>
            <div className="homepage__cardholder">
              <Link to="/albums">
                <div className="homepage__card--album">
                  <p className="homepage__card--text">Albums</p>
                </div>
              </Link>

              <Link to="/artists">
                <div className="homepage__card--artists">
                  <p className="homepage__card--text">Artists</p>
                </div>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="homepage__notlogged">
          <h1> Login To Start Your Collection! </h1>
          <Login />
        </div>
      )}
    </section>
  );
};

export default HomePage;
