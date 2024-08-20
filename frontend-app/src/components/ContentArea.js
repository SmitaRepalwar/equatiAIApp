import React, { useState } from 'react';
import { Box, Paper, Button, Typography, Grid } from '@mui/material';
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIos } from "react-icons/md";
import Sidebar from './Sidebar';

function ContentArea({children}) {

  const [isSidebarOpen, setSidebarOpen] = useState(false)

  const onClickSidebar = () =>{
    setSidebarOpen(!isSidebarOpen)
  }

  return (
    <Grid container sx={{ backgroundColor: "#000000", 
                          height: "100vh", 
                          width: "100vw", 
                          position: "fixed",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          overflowX: "hidden", 
                          overflowY: "hidden"
                          }}>
        <Grid item xs={isSidebarOpen ? 0.5 : 2} sx={{display: "flex"}}>
          <Sidebar isSidebarOpen={isSidebarOpen} onClickSidebar={onClickSidebar}/>
          {/* <button onClick={onClickSidebar} style={{
            backgroundColor: "#bfbfbf",
            height: "40px",
            zIndex: 2,
            width: "18px",
            padding: "2px",
            // margin: "0px 0px 0px 25px",
            borderTopRightRadius: "5px",
            borderBottomRightRadius: "5px",
            textAlign: "left",
            outline: "none",
            borderWidth: "0px",
            color: "#ffffff",
            marginLeft: "auto",
            // position: "relative",
            // left: isSidebarOpen ? 0 : 25,
            // right: isSidebarOpen && "20%",
            '&:hover': {
              backgroundColor: "grey",
            }
          }}>
           
          {isSidebarOpen ? <MdOutlineArrowForwardIos style={{fontSize: "15px", margin: "1px 15px 0px 0px"}}/>
          : <MdOutlineArrowBackIos style={{fontSize: "15px", margin: "1px 15px 0px 0px"}}/>}
              
          </button> */}
        </Grid> 
        <Grid item xs={isSidebarOpen ? 11 : 10} sx={{backgroundColor: "#ffffff", 
                                height: "98vh", 
                                width: "100%",
                                borderRadius: "10px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                margin: "7px 10px 8px auto",
                                flexGrow: 1,
                                flexShrink: 1,
                                overflow: "hidden"
                              }}>
             {children}
        </Grid> 
    </Grid>
  );
}

export default ContentArea;
