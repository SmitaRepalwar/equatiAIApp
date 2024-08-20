import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegFilePdf } from "react-icons/fa6";
import { BsPersonWorkspace } from "react-icons/bs";
import { RiChatHistoryLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { CiSquarePlus } from "react-icons/ci";
import { MdOutlineCoPresent } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdHomeFilled } from "react-icons/md";
import { addNewChat } from "../../store";
import { useDispatch } from 'react-redux';
import techSharthiLogo from "../../public/techSharthiLogo.webp";

import "./index.css";
import PreviousChats from "../PreviousChats";

const SideBar = ({ isExpanded, onChangesidebar, sideClassName, setPreviousChatOpen, previousChatOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tabs = ["plus", "home", "chatHistory"];

  const [selectedTab, setTab] = useState(tabs[1]);

  const sidebarToggle = () => {
    onChangesidebar();
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
    onChangesidebar();
    setPreviousChatOpen(!previousChatOpen)
  };

  const onClickLogin = () => {
    navigate("/login");
  };

  return (
   <>
    <div className={`sidebar-container ${sideClassName}`}>
      <div className={`sidebar-background ${isExpanded ? "expanded" : ""}`}>
        <div className="card-icons">
          <div className="profile-success-container" style={{ marginLeft: isExpanded && "30px" }}>
            <img className="logo" src={techSharthiLogo} alt="logo" />
            {isExpanded && (
              <div className="logo-text">
                <h1 className="title gradient-title">
                  Equati<span className="subtitle gradient-subtitle">AI</span>
                </h1>
              </div>
            )}
          </div>
          <div className="icons">
          <div
              className={`sidebar-item ${selectedTab === tabs[1] ? "blue-icon" : ""}`}
              onClick={onClickHome}
            >
              <MdHomeFilled className="nav-item-mobile-link" />
              {isExpanded && <p className="sidebar-description">Home</p>}
            </div>
            <div
              className={`sidebar-item chat-icon ${selectedTab === tabs[0] ? "blue-icon" : ""}`}
              onClick={onPlusClick}
            >
              <CiSquarePlus className="nav-item-mobile-link" />
              {isExpanded && <p className="sidebar-description">Chat</p>}
            </div>
            <div
              className={`sidebar-item ${selectedTab === tabs[2] ? "blue-icon" : ""}`}
              onClick={onClickChatHistory}
            >
              <RiChatHistoryLine className="nav-item-mobile-link" />
              {isExpanded && <p className="sidebar-description">Chat History</p>}
            </div>
            {/* <div className="sidebar-item">
              <MdOutlineCoPresent className="nav-item-mobile-link" />
              {isExpanded && <p className="sidebar-description">AI Presentation</p>}
            </div>
            <div className="sidebar-item">
              <FaPencilAlt className="nav-item-mobile-link" />
              {isExpanded && <p className="sidebar-description">AI Writer</p>}
            </div>
            <div className="sidebar-item">
              <BsPersonWorkspace className="nav-item-mobile-link" />
              {isExpanded && <p className="sidebar-description">Workspace</p>}
            </div> */}
          </div>
        </div>
        <div className="sidebar-item last-item" onClick={onClickLogin}>
          {!isExpanded && <CgProfile className="nav-item-mobile-link" />}
        </div>
        {isExpanded && (
          <div className="sidebar-footer">
            <button className="sidebar-button" onClick={onClickLogin}>Sign up / Log in</button>
          </div>
        )}
      </div>
      <button className="sidebar-toggle-button" onClick={sidebarToggle}>
        {isExpanded ? <MdKeyboardDoubleArrowLeft /> : <MdKeyboardDoubleArrowRight />}
      </button>
    </div>
    <PreviousChats open={previousChatOpen} onClose={onClickChatHistory}/>
    </>  
  );
};

export default SideBar;
