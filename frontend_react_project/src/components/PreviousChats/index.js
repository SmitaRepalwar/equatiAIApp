import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {Drawer} from '@mui/material'
import { setCurrentChat } from '../../store';

const PreviousChats = ({open, onClose}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chats = useSelector((state) => state.chat.chats);

  const currentChatIndex = useSelector((state) => state.chat.currentChatIndex);

  const handleChatSelection = (index) => {
    dispatch(setCurrentChat(index));
    navigate('/chats')
  };

  return (
    <Drawer open={open} 
            onClose={onClose}
            anchor={"right"}
            sx={{
                 padding: "50px",
                 width: "600px"
            }}
         /*sx={{
                height: "100px", 
                width: "100px", 
                overflow: "scroll", 
                color: "white"
                }}*/
                >
      <h4 style={{margin: "30px 30px 0px 40px", 
                  fontFamily: "Roboto", 
                  color: "orange"}}
                  >
                    My Chats
      </h4>
      <ul>
        {chats.map((chat, index) =>(
          chat.messages.length > 1 &&   
          <li key={index} 
              style={{ cursor: 'pointer', 
                       fontWeight: currentChatIndex === index ? 'bold' : 'normal',
                       listStyleType: "none",
                       margin: "10px 20px 10px 0px", 
                       color: "blue"
                      }} 
                       onClick={() => handleChatSelection(index)}
                       >
            {chat.messages[0]?.content[0].text}
          </li>
           ))}
      </ul>
    </Drawer>
  );
};

export default PreviousChats;
