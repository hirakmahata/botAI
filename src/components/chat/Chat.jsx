import "./Chat.css";
import PropTypes from "prop-types";
import systemLogo from "../../assets/system.svg";
import userLogo from "../../assets/user.svg";
import { BiDislike, BiLike } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { formatAMPM } from "../../utils/Utils";

const Chat = ({ chats, onFeedbackModalOpen, setFindMessageID }) => {
  const handleFeedback = (ID) => {
    onFeedbackModalOpen();
    setFindMessageID(ID);
  };

  return (
    <div className="chat-container">
      {chats.map((singleChat) => (
        <div key={singleChat.id} className="single-chat-container">
          <img
            src={singleChat.sender === "user" ? userLogo : systemLogo}
            alt="chat-avatar"
          />
          <div className="chat-messages">
            <h3>{singleChat.sender === "user" ? "You :" : "Bot AI :"}</h3>
            <h4>{singleChat.text}</h4>
            <div className="time-like-dislike">
              <p className="chat-time">
                {formatAMPM(new Date(Date.now()), singleChat)}
              </p>
              {singleChat.sender === "system" && (
                <div className="like-dislike">
                  <BiLike
                    size={20}
                    onClick={() => handleFeedback(singleChat.id)}
                  />
                  <BiDislike
                    size={20}
                    onClick={() => handleFeedback(singleChat.id)}
                  />
                </div>
              )}
            </div>
            {singleChat.rating && (
              <div className="chat-rating">
                <h3>Response Ratings :</h3>
                <div className="chat-star-container">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index + 1}
                      size={30}
                      color={
                        index + 1 <= singleChat.rating ? "#7753ad" : "#b5b5b8"
                      }
                    />
                  ))}
                </div>
              </div>
            )}
            {singleChat.feedback && (
              <div className="chat-feedback">
                <h3>Feedback : </h3>
                <p>{singleChat.feedback}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

Chat.propTypes = {
  chats: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  onFeedbackModalOpen: PropTypes.func.isRequired,
  setFindMessageID: PropTypes.func.isRequired,
};

export default Chat;
