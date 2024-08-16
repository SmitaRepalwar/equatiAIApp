import './index.css';
import React, { useState, createContext } from 'react';
import SideBar from "../../components/SideBar/index.js"
import MainSection from '../../components/MainSection';
//import RightSidebar from '../RightSidebar/index.js';

function Home() {
    const [isExpanded, setExpand] = useState(false);
    const [previousChatOpen, setPreviousChatOpen] = useState(false)
    const onChangesidebar = () => {
        setExpand(!isExpanded);
      };

    let sideClassName = isExpanded ? "sidebar-opened" : "sidebar-closed";
    let containerClassName = isExpanded ? "body-container-with-full-sidebar" : "body-container-without-full-sidebar";
   

    return(
        <div className='home-con'>
            <SideBar sideClassName={sideClassName} 
                     onChangesidebar={onChangesidebar} 
                     isExpanded={isExpanded}
                     previousChatOpen={previousChatOpen} 
                     setPreviousChatOpen={setPreviousChatOpen} 
                     />
            <MainSection previousChatOpen={previousChatOpen} 
                        setPreviousChatOpen={setPreviousChatOpen} 
                        containerClassName={containerClassName} 
                        isExpanded={isExpanded}/>
            {/*<RightSidebar/>*/}
        </div>
    )
}
export default Home;