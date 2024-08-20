import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import { FaTimes } from 'react-icons/fa';
import { TbHandClick } from "react-icons/tb";

const CameraCapture = ({ onCapture, onClose }) => {
  const webcamRef = useRef(null);

  const handleClose = () => {
    onClose();
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
    onClose()
  };

  return (
    <div className="camera-capture">
      <FaTimes onClick={handleClose} className="close-icon" />
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="webcam"
      />
      <TbHandClick onClick={capture} className="capture-icon" />
      <p className="capture-text">Capture</p>
    </div>
  );
};

export default CameraCapture;

