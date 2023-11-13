import "./AlbumCover.scss";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const AlbumCover = ({ name, image, artist, id, albumDetailsClick }) => {
  return (
    <div className="album-cover">
      <img
        src={image}
        className="album-cover__image"
        onClick={() => albumDetailsClick(id)}
      />
      <p className="album-cover__name">{name}</p>
    </div>
  );
};

export default AlbumCover;
