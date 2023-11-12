import { useState } from "react";
import React from "react";
import Modal from "react-modal";
import closeIcon from "../../assets/icons/close-24px.svg";

const AlbumDetails = ({ albumModalInfo, onCancel }) => {
  // const modalIsOpen = Object.keys(albumModalInfo).length > 0;
  const modalIsOpen = false;
  return (
    <Modal
      className="album-modal"
      overlayClassName="album-modal__overlay"
      ariaHideApp={false}
      isOpen={modalIsOpen}
      onRequestClose={onCancel}
    >
      <div>Album Details</div>;
    </Modal>
  );
};

export default AlbumDetails;
