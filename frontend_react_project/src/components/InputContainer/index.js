import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate, useLocation} from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { handleSendMessage, handleFileChange, handleCapture } from '../../service/chatHandlers';
import { addNewChat, setUserInput } from '../../store';
import CameraCapture from '../CameraCapture';
import ModalComponent from '../ModalComponent'
import { FaFilePdf } from 'react-icons/fa6';
import "./index.css";

function InputContainer({ pdfpage, fileInputRef }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { chats, currentChatIndex } = useSelector((state) => state.chat);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCameraCaptureOpen, setIsCameraCaptureOpen] = useState(false);


  const userInput = chats[currentChatIndex]?.userInput || '';

  const onFileChange = (event) => {
    setIsModalOpen(false)
    handleFileChange(event, dispatch, chats, currentChatIndex);
    if (location.pathname === "/"){
      navigate("/chats")
    }
  }

  const onCapturePic = (imageSrc) =>{
    setIsModalOpen(false)
    handleCapture(imageSrc, dispatch, chats, currentChatIndex)
    if (location.pathname === "/"){
      navigate("/chats")
    }
  }

  const onSendMessage = () => {
    if (location.pathname === "/"){
      dispatch(addNewChat)
      handleSendMessage(chats, currentChatIndex, dispatch)
      navigate("/chats")
    }else{
      handleSendMessage(chats, currentChatIndex, dispatch)
    }
  };

  const handleCameraClick = () => {
    closeModal();
    setIsCameraCaptureOpen(true);
  };

  const handleCloseCameraCapture = () => {
    setIsCameraCaptureOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
    <div id="input-container">
      <input
        type="text"
        id="user-input"
        placeholder="Hi! Ask me anything..."
        value={userInput}
        onChange={(e) => dispatch(setUserInput({ chatIndex: currentChatIndex, userInput: e.target.value }))}
        onKeyPress={handleKeyPress}
      />
      <ModalComponent 
        handleCameraClick={handleCameraClick}
        closeModal={closeModal}
        isModalOpen={isModalOpen}
      />
      {!pdfpage && (
        <>
          <label id="file-upload-label" onClick={openModal}>
            <i className="fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="file-upload"
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={onFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
        </>
      )}
      <button id="send-button" onClick={onSendMessage}>
        <i className="fas fa-paper-plane"></i>
      </button>
      {isCameraCaptureOpen && (
        <div id="camera-capture" style={{ position: 'absolute', top: '50px', left: '50%', transform: 'translateX(-50%)' }}>
          <CameraCapture onCapture={onCapturePic} onClose={handleCloseCameraCapture} />
        </div>
      )}
    </div>
  );
}

export default InputContainer;
