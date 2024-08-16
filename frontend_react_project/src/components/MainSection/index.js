import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleSendMessage } from '../../service/chatHandlers';
import { setUserInput } from '../../store';
import Header from "../Header";
import Footer from "../Footer";
import ChatContainer from '../ChatContainer';
import InputContainer from '../InputContainer';
import BasicCard from '../BasicCard';
import CardsPage from '../CardsPage';  
import PreviousChats from '../PreviousChats';
import backgroundImage from '../../public/backgroundImage.png'

function MainSection({ containerClassName, pdfpage, chatPage, isExpanded, setPreviousChatOpen, previousChatOpen }) {
  const dispatch = useDispatch();
  const fileInputRef = React.useRef(null);

  const { chats, currentChatIndex } = useSelector((state) => state.chat);

  const renderMessageContent = (content) => {
    if (content[0].type === 'text') {
      const formattedText = content[0].text
        .split('\n')
        .map((str, index, arr) => {
          const trimmedStr = index < arr.length - 1 ? str.trimEnd() : str;
          const boldItalic = trimmedStr
            .replace(/\*\*(.*?)\*\*/g, '<b><i>$1</i></b>')
            .replace(/\*(.*?)\*/g, '<i>$1</i>')
            .replace(/__(.*?)__/g, '<b>$1</b>');
          return <span key={index} dangerouslySetInnerHTML={{ __html: boldItalic }} />;
        });

      return <p>{formattedText.reduce((acc, curr) => [acc, ' ', curr])}</p>; // Join with space
    } else if (content[0].type === 'image_url') {
      return <img src={content[0].image_url.url} alt="Uploaded" style={{ maxWidth: '50%' }} />;
    }
  };

  return (
    <div className={containerClassName} 
         style={{
                  height: chatPage && "100vh", 
                  padding: "20px 20px 0px 30px",
                  // alignSelf: "center",
                  // display: "flex",
                  // justifyContent: "center",
                  // alignItems: "center",
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: "cover",
                  // overflow: "hidden"
               }}>
      <ChatContainer renderMessageContent={renderMessageContent} chatPage={chatPage} />
      {!chatPage && <BasicCard fileInputRef={fileInputRef} isExpanded={isExpanded} setPreviousChatOpen={setPreviousChatOpen} previousChatOpen={previousChatOpen}/>}
      <InputContainer pdfpage={pdfpage} fileInputRef={fileInputRef} isExpanded={isExpanded}/>
      {/* {!chatPage && <CardsPage />} */}
      {!chatPage && <Footer />}
      {!chatPage && <PreviousChats isExpanded={isExpanded} />}
    </div>
  );
}

export default MainSection;











































