import "./App.css";
import systemLogo from "./assets/system.svg";
import edit from "./assets/edit.svg";
import Welcome from "./components/welcome/Welcome";
import { IoSendSharp } from "react-icons/io5";
import { IoIosSave } from "react-icons/io";

const App = () => {
  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="new-chat">
          <img src={systemLogo} alt="sidebar-logo" className="sidebar-logo" />
          <h2>New Chat</h2>
          <img src={edit} alt="new-chat-edit" />
        </div>
        <div className="past-conversations">
          <h3>Past Conversations</h3>
        </div>
      </div>
      <div className="main-container">
        <div className="app-heading">
          <h1>Bot AI</h1>
        </div>
        <Welcome />
        <div className="app-inputs">
          <input placeholder="Message Bot AI" />
          <div className="ask">
            <button>Ask</button>
            <IoSendSharp size={20} />
          </div>
          <div className="save">
            <button>Save</button>
            <IoIosSave size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
