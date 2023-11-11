import "./Login.scss";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const Login = () => {
  return (
    <a className="button-login" href={`${serverUrl}/auth/spotify`}>
      <span className="button-login__text">Login With Spotify</span>
    </a>
  );
};
export default Login;
