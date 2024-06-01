import "./App.css";
import systemLogo from "./assets/system.svg";
import edit from "./assets/edit.svg";
import Welcome from "./components/welcome/Welcome";
import { IoSendSharp } from "react-icons/io5";
import { IoIosSave } from "react-icons/io";
import { useState } from "react";

import customData from "./data/myData.json";
// import axios from "axios";
import Chat from "./components/chat/Chat";
import FeedbackModal from "./components/feedbackModal/FeedbackModal";
import ChatHistory from "./components/chat-history/ChatHistory";
import { groupMessagesByDate, updateChatsInLocalStorage } from "./utils/Utils";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const [activeSection, setActiveSection] = useState("new-chat");

  const [findMessageID, setFindMessageID] = useState(null);

  const handleSend = async (e) => {
    if (input.trim() === "") return;

    if (e.key && e.key !== "Enter") return;

    if (activeSection === "past-conversations") setActiveSection("new-chat");

    const userMessage = {
      id: String(Date.now()),
      timestamp: new Date(),
      sender: "user",
      text: input,
    };
    setMessages((prev) => [...prev, userMessage]);

    const foundResponse = customData.find(
      (item) => item.question.toLowerCase() === input.toLowerCase()
    );

    if (foundResponse) {
      const botMessage = {
        id: String(Date.now() + foundResponse.id),
        timestamp: new Date(),
        sender: "system",
        text: foundResponse.response,
      };
      setMessages((prev) => [...prev, botMessage]);
    } else {
      // try {
      //   const response = await axios.post(
      //     "https://api.openai.com/v1/engines/davinci-codex/completions",
      //     {
      //       prompt: input,
      //       max_tokens: 150,
      //     },
      //     {
      //       headers: {
      //         "Content-Type": "application/json",
      //         Authorization: `Bearer YOUR_OPENAI_API_KEY`,
      //       },
      //     }
      //   );

      //   const botMessage = {
      //     sender: "system",
      //     text: response.data.choices[0].text.trim(),
      //   };
      //   setMessages((prev) => [...prev, botMessage]);
      // } catch (error) {
      //   console.error("Error calling OpenAI API:", error);
      //   const botMessage = {
      //     sender: "system",
      //     text: "Sorry, I am having trouble processing your request right now.",
      //   };
      //   setMessages((prev) => [...prev, botMessage]);
      // }

      const botMessage = {
        id: String(Date.now() + 100),
        timestamp: new Date(),
        sender: "system",
        text: "Sorry, As an AI language model I don't have access to this details. Therefore, How can I assist you further?",
      };
      setMessages((prev) => [...prev, botMessage]);
    }

    setInput("");
  };

  const handleSaveMessages = () => {
    const groupedMessages = groupMessagesByDate(messages);
    updateChatsInLocalStorage("chat-history", groupedMessages);
  };

  const handleNewChatClick = () => {
    setMessages([]);
    setActiveSection("new-chat");
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="new-chat" onClick={handleNewChatClick}>
          <img src={systemLogo} alt="sidebar-logo" className="sidebar-logo" />
          <h2>New Chat</h2>
          <img src={edit} alt="new-chat-edit" className="new-chat-icon" />
        </div>
        <div
          className="past-conversations"
          onClick={() => setActiveSection("past-conversations")}
        >
          <h3>Past Conversations</h3>
        </div>
      </div>
      <div className="main-container">
        <div className="app-heading">
          <h1>Bot AI</h1>
        </div>
        {activeSection === "new-chat" &&
          (messages.length > 0 ? (
            <Chat
              chats={messages}
              onFeedbackModalOpen={() => setShowFeedbackModal(true)}
              setFindMessageID={setFindMessageID}
            />
          ) : (
            <Welcome />
          ))}
        {activeSection === "past-conversations" && <ChatHistory />}
        <div className="app-inputs">
          <input
            placeholder="Message Bot AI"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleSend}
          />
          <div className="ask" onClick={handleSend}>
            <button>Ask</button>
            <IoSendSharp size={20} />
          </div>
          <div className="save" onClick={handleSaveMessages}>
            <button>Save</button>
            <IoIosSave size={20} />
          </div>
        </div>
      </div>
      {showFeedbackModal && (
        <FeedbackModal
          onFeedbackModalClose={() => setShowFeedbackModal(false)}
          findMessageID={findMessageID}
          messages={messages}
        />
      )}
    </div>
  );
};

export default App;
