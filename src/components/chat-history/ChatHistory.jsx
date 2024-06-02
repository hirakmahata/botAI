import { FaStar } from "react-icons/fa";
import "./ChatHistory.css";
import systemLogo from "../../assets/system.svg";
import userLogo from "../../assets/user.svg";
import { useState } from "react";
import {
  filterMessagesAccordingToRating,
  getChatsFromLocalStorage,
} from "../../utils/Utils";

const ChatHistory = () => {
  const [selectedOption, setSelectedOption] = useState(0);
  const chatHistory = getChatsFromLocalStorage("chat-history");

  const filteredChats = filterMessagesAccordingToRating(
    chatHistory,
    selectedOption
  );

  const handleChange = (event) => {
    setSelectedOption(Number(event.target.value));
  };

  const STAR_ARRAY = [
    { title: "Select Star", value: 0 },
    { title: "All Star", value: 0 },
    { title: "One Star", value: 1 },
    { title: "Two Star", value: 2 },
    { title: "Three Star", value: 3 },
    { title: "Four Star", value: 4 },
    { title: "Five Star", value: 5 },
  ];

  return (
    <div className="chat-history-container">
      <div className="history-heading">
        <h1>Conversation History</h1>
        <div className="select-contaier">
          <select value={selectedOption} onChange={handleChange}>
            {STAR_ARRAY.map((object, index) => (
              <option key={index + 1} value={object.value}>
                {object.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="chat-history-main">
        {Object.keys(filteredChats).length > 0 ? (
          Object.keys(filteredChats).map((date) => (
            <div key={date} className="date-chats">
              <h3>{date}</h3>
              {filteredChats[date].map((singleConversation, index) => (
                <div
                  key={date + index}
                  className="single-conversation-container"
                >
                  {singleConversation.map((singleHistory) => (
                    <div
                      key={singleHistory.id}
                      className="single-hitory-container"
                    >
                      <img
                        src={
                          singleHistory.sender === "user"
                            ? userLogo
                            : systemLogo
                        }
                        alt="hitory-avatar"
                      />
                      <div className="history-messages">
                        <h3>
                          {singleHistory.sender === "user"
                            ? "You :"
                            : "Bot AI :"}
                        </h3>
                        <h4>{singleHistory.text}</h4>
                        <p className="history-chat-time">
                          {singleHistory.chatTime}
                        </p>
                        {singleHistory.rating && (
                          <div className="history-chat-rating">
                            <h3>Response Ratings :</h3>
                            <div className="history-star-container">
                              {[...Array(5)].map((_, index) => (
                                <FaStar
                                  key={index + 1}
                                  size={30}
                                  color={
                                    index + 1 <= singleHistory.rating
                                      ? "#7753ad"
                                      : "#b5b5b8"
                                  }
                                />
                              ))}
                            </div>
                          </div>
                        )}
                        {singleHistory.feedback && (
                          <div className="history-chat-feedback">
                            <h3>Feedback : </h3>
                            <p>{singleHistory.feedback}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="fallback-container">
            <h1>No History Saved Yet.</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHistory;
