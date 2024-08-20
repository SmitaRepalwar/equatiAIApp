import React, { useState } from 'react';
import { Box, Button, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Divider, Typography } from '@mui/material';
import tectsharthilogo from '../public/techsharthilogo.png';
import { FaSquarePlus } from "react-icons/fa6";
import { BsFillFolderFill } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { GoStack } from "react-icons/go";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addNewChat, setCurrentChat } from '../store/store';



const Sidebar = ({isSidebarOpen, onClickSidebar}) => {

  const [historySelected, setHostorySelected] = useState(false)
  const [previousChatOpen, setPreviousChatOpen] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chats = useSelector((state) => state.chat.chats);

  const currentChatIndex = useSelector((state) => state.chat.currentChatIndex);

  const handleChatSelection = (index) => {
    dispatch(setCurrentChat(index));
    navigate('/chats')
  };

  const tabs = ["plus", "home", "chatHistory"];

  const [selectedTab, setTab] = useState(tabs[1]);

  const sidebarToggle = () => {

  };

  const onPlusClick = () => {
    setTab(tabs[0]);
    dispatch(addNewChat());
    navigate('/chats')
  };

  const onClickHome = () => {
    setTab(tabs[1]);
    navigate("/");
  };

  const onClickChatHistory = () => {
    setTab(tabs[2]);
    setPreviousChatOpen(!previousChatOpen)
  };

  const onClickLogin = () => {
    navigate("/login");
  };



  const drawerWidth = isSidebarOpen ? 70 : 180;

  const RenderListItems = () => {
    const listOptions = [
      { text: 'Chat PDF', icon: <BsFillFolderFill />, click: ()=>{} },
      { text: 'AI Writer', icon: <BsPencilSquare />, click: ()=>{} },
      {text: 'Work Flow', icon: <GoStack/>, click: ()=>{}}
    ];

    return (
      <List component='ul' style={{ marginLeft: "10px", 
                                    padding: isSidebarOpen ? "10px" : "10px",
                                    // display: isSidebarOpen &&  "flex",
                                    // flexDirection: isSidebarOpen &&  "column",
                                    // justifyContent: isSidebarOpen &&  "center"
                                    }}>
        <button onClick={onPlusClick} style={{width: isSidebarOpen ? "30px" : "120px",
                        height: "30px",
                        color: "#ffffff", 
                        margin: "10px 20px 20px 0px", 
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        backgroundColor: isSidebarOpen ? "transparent" : "#3c38ff",
                        outline: "none",
                        // padding: "",
                        borderWidth: "0px",
                        borderRadius: "10px"
                        }}>
            <FaSquarePlus 
              style={{
                      fontSize: isSidebarOpen ?  "15px" : "10px",
                      backgroundColor: isSidebarOpen && "#3c38ff",
                      padding: isSidebarOpen && "1px",  
                      marginRight: !isSidebarOpen && "5px" 
                     }}/>
              {!isSidebarOpen && " New Chat"}
        </button>
      {listOptions.map((option, index) => (
        <ListItem 
          button 
          key={index} 
          component="li"
          onClick={option.click}
          style={{padding: "5px", margin: "10px 10px 0px 0px"}}
          >
          {React.cloneElement(option.icon, {
            style: {
              fontSize: isSidebarOpen? "15px" : "15px", 
              color: "#ffffff",
              margin: "0px 10px 5px 0px",
              backgroundColor: option.isSelected ? '#B0B0B0' : 'transparent', // Grey background for selected option
              '&:hover': {
                color: 'transparent', // Make text transparent to show gradient
                background: 'linear-gradient(90deg, #FF5722, #2196F3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }
            }
          })}
          {!isSidebarOpen && <Typography  
            sx={{
              fontSize: "11px", 
              color: "#bfbfbf",
              fontWeight: 800,
              backgroundColor: option.isSelected ? '#B0B0B0' : 'transparent', // Grey background for selected option
              '&:hover': {
                color: 'transparent', // Make text transparent to show gradient
                background: 'linear-gradient(90deg, #FF5722, #2196F3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }
            }}
          >
          {option.text}
          </Typography>}
        </ListItem>
      ))}
      <Divider color="#3E3E3E"/>
      <ListItem component="li" onClick={onClickChatHistory} style={{padding: "3px", 
                                        margin: "10px 10px 0px 0px", 
                                        display: 'flex'
                                        }}>
        <MdHistory  style={
              {fontSize: "20px", 
              color: "#ffffff",
              margin: "0px 5px 5px 0px",
              '&:hover': {
                color: 'transparent', // Make text transparent to show gradient
                background: 'linear-gradient(90deg, #FF5722, #2196F3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            }/>
           {  !isSidebarOpen &&
           <>
           <Typography  
            sx={{
              fontSize: "11px", 
              color: "#bfbfbf",
              fontWeight: 800,
             '&:hover': {
                color: 'transparent', // Make text transparent to show gradient
                background: 'linear-gradient(90deg, #FF5722, #2196F3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }
            }}
          >
          Chat History
          </Typography>
          {historySelected ? 
          <IoIosArrowDown style={{marginLeft: "auto", color: "#bfbfbf"}}/>
          : <IoIosArrowForward style={{marginLeft: "auto", color: "#bfbfbf"}}/>
        }
        </>
        }
        <ChatHistoryComponent/>
      </ListItem>
    </List>    
    )
  };


  const ChatHistoryComponent = () =>{
    return (
      <Drawer open={previousChatOpen} 
              onClose={()=>{setPreviousChatOpen(false)}}
              anchor={"bottom"}
              sx={{
                   padding: "10px",
                   width: "100%"
              }}>
     
        <ul>
          {chats.map((chat, index) =>(
            chat.messages.length > 1 &&   
            <li key={index} 
                style={{ cursor: 'pointer', 
                         fontWeight: currentChatIndex === index ? 'bold' : 'normal',
                         backgroundColor:  currentChatIndex === index && 'lightblue',
                         listStyleType: "none",
                         margin: "10px 20px 10px 0px", 
                         color: "blue",
                         fontSize: "16px",
                         fontFamily: "Roboto",
                         padding: "10px",
                         borderRadius: "2px"
                        }} 
                         onClick={() => handleChatSelection(index)}
                         >
              {chat.messages[0]?.content[0].text}
            </li>
             ))}
        </ul>
      </Drawer>
    )
  }


  return (
    <Drawer
      variant="permanent"
      onClick={()=>{onClickSidebar()}}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: "#000000", overflow: "hidden" },
      }}
    >
      <Box onClick={onClickHome} sx={{ margin: "20px 0px 0px 10px", display: "flex" }}>
        <img src={tectsharthilogo}
          alt="logo"
          style={{ height: "25px", width: "30px", marginTop: "10px" }}
        />
       { !isSidebarOpen && <Typography sx={{ marginTop: "10px" }}>
          <span style={{
            fontSize: "20px",
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #ff7e5f, #feb47b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Equati
          </span>
          <span style={{
            fontSize: "20px",
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #2a91ff, #4557f3)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            AI
          </span>
        </Typography>}
      </Box>
      <RenderListItems />

      <Box sx={{ margin: !isSidebarOpen && "auto 10px 20px 20px", marginTop : "auto" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: '20px', textTransform: 'none', boxShadow: 'none' }}
        >
          Sign up / Log in
        </Button>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
