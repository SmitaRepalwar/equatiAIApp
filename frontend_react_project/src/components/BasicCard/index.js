import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import PreviousChats from '../PreviousChats';
import CardsPage from '../CardsPage';
import { FiUpload } from "react-icons/fi";
import { TiArrowBackOutline } from "react-icons/ti";
import { MdOutlinePostAdd } from "react-icons/md";
import { useDispatch } from 'react-redux';
import {addNewChat } from '../../store'
import "./index.css"



export default function BasicCard({fileInputRef, isExpanded, previousChatOpen, setPreviousChatOpen}) {


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddNewChat = () => {
    dispatch(addNewChat());
    navigate('/chats')
  };


  const onPreviousChatClose = () =>{
    setPreviousChatOpen(false)
  }

  const onClickPreviousChats = () =>{
    setPreviousChatOpen(true)
  }

  const onUploadFileClick = () =>{
    dispatch(addNewChat());
    fileInputRef.current.click();
  }


  return (
    <>
    <div style={{ width: "100%", 
                height: "65%", 
                margin: "10px 30px 10px 10px", 
                paddingRight: "20px", 
                backgroundColor: "#6c757d",
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center",
                backgroundColor: "transparent"
                // backgroundImage: `url(${backgroundImage})`,
                // backgroundSize: "cover",
              }}>
      <CardContent sx={{
                        display: "flex", 
                        flexDirection: "column", 
                        justifyContent: "center", 
                        alignItems: "center", 
                        alignSelf: "center"
                        }}>
                          
         <Paper elevation={3} sx={{height: "30vh", 
                                   width: "70%", 
                                   marginTop: "50px", 
                                   backgroundColor: "#b9d6ff", 
                                   padding: "5px", 
                                   marginBottom: "20px",
                                   display: "flex", 
                                   flexDirection: "column", 
                                   justifyContent: "center", 
                                   alignItems: "center", 
                                   alignSelf: "center"
                                   }}>            
         <Paper elevation={2} sx={{width: "95%", height: "80%"}}> 
          <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px"}}>
                <h1 className="title gradient-title">Equati</h1>
                <span className="subtitle gradient-subtitle" style={{marginTop: "-2px", fontWeight: 800, fontSize: "22px"}}>AI</span>
                <span style={{margin: "10px"}}>|</span>
                <span className="description" style={{color: "#4557f3", fontWeight: 500}}>Simplifying math, one equation at a time</span>
            </Box>                                 
          <CardActions sx={{display: "flex", justifyContent: "center", margin: "20px"}}>
            <Button size={isExpanded ? "small" : "big"} variant='contained' color='warning' onClick={onUploadFileClick}>
              <FiUpload style={{fontSize: "20px", fontWeight: 500, marginRight: "5px"}}/>
              Upload File
            </Button>
            <Button size={isExpanded ? "small" : "big"} variant='contained' color='warning' onClick={onClickPreviousChats}>
              <TiArrowBackOutline style={{fontSize: "20px", fontWeight: 500, marginRight: "5px"}}/>
              Previous Chats
            </Button>
            <Button size={isExpanded ? "small" : "big"} variant='contained' color='warning' onClick={onAddNewChat}>
              <MdOutlinePostAdd style={{fontSize: "20px", fontWeight: 500, marginRight: "5px"}}/>
              Start New Chat
            </Button>
          </CardActions>
          </Paper>  
         </Paper>
         <CardsPage/>
      </CardContent>
    </div>
    <PreviousChats open={previousChatOpen} onClose={onPreviousChatClose}/>
    </>
  );
}
