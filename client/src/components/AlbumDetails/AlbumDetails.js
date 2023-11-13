import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import Modal from "react-modal";
import "./AlbumDetails.scss";
import closeIcon from "../../assets/icons/close-24px.svg";
import AlbumDetailButtons from "../AlbumDetailButtons/AlbumDetailButtons";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const AlbumDetails = ({
  albumModalInfo,
  onCancel,
  userCollection,
  isLoggedIn,
}) => {
  const modalIsOpen = Object.keys(albumModalInfo).length > 0;
  // const modalIsOpen = false;
  const [inCollection, setInCollection] = useState(false);

  // Determines if selected album is in the current users collection
  useEffect(() => {
    console.log(albumModalInfo + " has been changed");
    if (modalIsOpen) {
      userCollection.forEach((album) => {
        if (album.spotify_id === albumModalInfo.spotify_id) {
          console.log(album.spotify_id);
          setInCollection(true);
          return;
        } else setInCollection(false);
      });
    }
  }, [albumModalInfo]);

  const getTracks = () => {
    if (albumModalInfo.track_list) {
      if (albumModalInfo.track_list.length > 0) {
        return albumModalInfo.track_list.map((track) => (
          <p>
            <span>{track.tracknumber}.</span> {track.title}
          </p>
        ));
      }
    }
  };

  return (
    <Modal
      className="album-modal"
      overlayClassName="album-modal__overlay"
      ariaHideApp={false}
      isOpen={modalIsOpen}
      onRequestClose={onCancel}
    >
      <div>
        <div>
          <img src={closeIcon} alt="close button" onClick={onCancel}></img>
        </div>
        <div className="album-modal__container">
          <div>
            <img
              className="album-modal__image"
              src={albumModalInfo.image}
              alt="Album cover"
            ></img>
          </div>
          <div>
            <div>
              <h3>Album Name</h3>
              <p>{albumModalInfo.album_title}</p>
            </div>
            <div>
              <h3>Artist</h3>
              <p>{albumModalInfo.artist}</p>
            </div>
            <div>
              <h3>Album Name</h3>
              <p>{albumModalInfo.album_title}</p>
            </div>
            <div>
              <h3>Release Date</h3>
              <p>{albumModalInfo.release}</p>
            </div>
          </div>
        </div>
        <div className="album-modal__container">
          <div>
            <h3>Track List</h3>
            {getTracks()}
          </div>

          <div className="album-modal__button-container">
            <Link to={albumModalInfo.url} target="_blank">
              <span>Listen On Spotify</span>
            </Link>
            <AlbumDetailButtons
              isLoggedIn={isLoggedIn}
              inCollection={inCollection}
              setInCollection={setInCollection}
              spotify_id={albumModalInfo.spotify_id}
              album_name={albumModalInfo.album_title}
              artist={albumModalInfo.artist}
              image_url={albumModalInfo.image}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AlbumDetails;
