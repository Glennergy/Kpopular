import "./Logout.scss";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const Logout = () => {
  return (
    <a className="button-logout" href={`${serverUrl}/auth/logout`}>
      <span className="button-logout__text">Logout</span>
    </a>
  );
};
export default Logout;
