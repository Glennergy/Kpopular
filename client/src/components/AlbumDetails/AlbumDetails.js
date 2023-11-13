import { useEffect, useState } from "react";
import React from "react";
import Modal from "react-modal";
import "./AlbumDetails.scss";
import closeIcon from "../../assets/icons/close-24px.svg";

const AlbumDetails = ({ albumModalInfo, onCancel, setAlbumModalInfo }) => {
  const modalIsOpen = Object.keys(albumModalInfo).length > 0;
  // const modalIsOpen = false;
  const [inCollection, setInCollection] = useState(false);

  useEffect(() => {
    console.log(modalIsOpen);
  }, []);

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
        <div>
          <h3>Album Name</h3>
          <p>{albumModalInfo.album_title}</p>
        </div>
      </div>
    </Modal>
  );
};

export default AlbumDetails;
