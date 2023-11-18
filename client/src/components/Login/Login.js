import "./Login.scss";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const Login = ({ details }) => {
  if (details) {
    return (
      <>
        <a className="button-login--details" href={`${serverUrl}/auth/spotify`}>
          <span className="button-login__text--details">
            Login With Spotify
          </span>
        </a>
        <a className="button-login--details" href={`${serverUrl}/auth/google`}>
          <span className="button-login__text--details">Login With Google</span>
        </a>
      </>
    );
  } else {
    return (
      <>
        <a className="button-login" href={`${serverUrl}/auth/spotify`}>
          <span className="button-login__text">Login With Spotify</span>
        </a>
        <a className="button-login" href={`${serverUrl}/auth/google`}>
          <span className="button-login__text">Login With Google</span>
        </a>
      </>
    );
  }
};
export default Login;
