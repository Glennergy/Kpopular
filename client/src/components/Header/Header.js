// NavLink component allows us to define an active CSS class for the page we are currently on
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./Header.scss";

const serverUrl = process.env.REACT_APP_SERVER_URL;
const authUrl = serverUrl + "/auth/spotify";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  if (isLoggedIn) {
    return (
      <section className="header">
        <div className="header__bottom">
          <Link className="header__logo" to="/">
            KPopular
          </Link>
          <nav className="header__nav">
            <NavLink
              className={(navData) =>
                navData.isActive
                  ? "header__nav-link header__nav-link--active"
                  : "header__nav-link"
              }
              to="/"
              exact="true"
            >
              Home
            </NavLink>
            <NavLink
              className={(navData) =>
                navData.isActive
                  ? "header__nav-link header__nav-link--active"
                  : "header__nav-link"
              }
              to="/albums"
              exact="true"
            >
              Albums
            </NavLink>
            <NavLink
              className={(navData) =>
                navData.isActive
                  ? "header__nav-link header__nav-link--active"
                  : "header__nav-link"
              }
              to="/artists"
              exact="true"
            >
              Artists
            </NavLink>
            <NavLink
              className={(navData) =>
                navData.isActive
                  ? "header__nav-link header__nav-link--active"
                  : "header__nav-link"
              }
              to="/profile"
              exact="true"
            >
              Profile
            </NavLink>
          </nav>
        </div>
      </section>
    );
  } else {
    return (
      <section className="header">
        <div className="header__bottom">
          <Link className="header__logo" to="/">
            KPopular
          </Link>
          <nav className="header__nav">
            <NavLink
              className={(navData) =>
                navData.isActive
                  ? "header__nav-link header__nav-link--active"
                  : "header__nav-link"
              }
              to="/"
              exact="true"
            >
              Home
            </NavLink>
            <NavLink
              className={(navData) =>
                navData.isActive
                  ? "header__nav-link header__nav-link--active"
                  : "header__nav-link"
              }
              to="/albums"
              exact="true"
            >
              Albums
            </NavLink>
            <NavLink
              className={(navData) =>
                navData.isActive
                  ? "header__nav-link header__nav-link--active"
                  : "header__nav-link"
              }
              to="/artists"
              exact="true"
            >
              Artists
            </NavLink>
            <NavLink
              className={(navData) =>
                navData.isActive
                  ? "header__nav-link header__nav-link--active"
                  : "header__nav-link--login"
              }
              to={authUrl}
              exact="true"
            >
              Login
            </NavLink>
          </nav>
        </div>
      </section>
    );
  }
};

export default Header;
