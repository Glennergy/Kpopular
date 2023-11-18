import "./Login.scss";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const Login = ({ details }) => {
  if (details) {
    return (
      <a className="button-login--details" href={`${serverUrl}/auth/spotify`}>
        <span className="button-login__text--details">Login With Spotify</span>
      </a>
    );
  } else {
    return (
      <a className="button-login" href={`${serverUrl}/auth/spotify`}>
        <span className="button-login__text">Login With Spotify</span>
      </a>
    );
  }
};
export default Login;
