import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Popup({ isPopupOpen, closePopup, handleFileChange, handleCameraClick, popupButton }) {
  

  const handleClose = () => {
    closePopup();
  };

  const open = Boolean(popupButton);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>

      <Popover
        id={id}
        open={isPopupOpen}
        anchorEl={popupButton}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Button 
          onClick={() => document.getElementById('file-upload').click()} 
          >
          Upload File
        </Button>
            <Button onClick={handleCameraClick} >
              Use Camera
            </Button>
          <Button onClick={closePopup}>
            Close
          </Button>
      </Popover>
    </div>
  );
}
