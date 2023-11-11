// NavLink component allows us to define an active CSS class for the page we are currently on
import { Link, NavLink } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <section className="header">
      <div className="header__banner"></div>
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
};

export default Header;
