import React from "react";

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;
  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };
  return (
    <div
      id="wrapper"
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-20"
      onClick={handleClose}
    >
      <div className="max-w-[600px] flex flex-col">
        <button
          onClick={() => onClose()}
          className="text-white text-xl place-self-end "
        >
          X
        </button>
        <div className="bg-white p-2 rounded">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
