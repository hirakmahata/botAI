import "./MobileSidebar.css";
import PropTypes from "prop-types";
import systemLogo from "../../assets/system.svg";
import { BsChatText } from "react-icons/bs";
import { useEffect, useRef } from "react";

const MobileSidebar = ({
  setMessages,
  activeSection,
  setActiveSection,
  openMobileBar,
  setOpenMobileBar,
}) => {
  const sidebarRef = useRef(null);

  const handleNewChatClick = () => {
    setMessages([]);
    setActiveSection("new-chat");
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setOpenMobileBar(false);
    }
  };

  useEffect(() => {
    if (openMobileBar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMobileBar]);

  return (
    <div
      ref={sidebarRef}
      //   className="mobile-sidebar"
      className={`mobile-sidebar ${openMobileBar ? "open" : ""}`}
    >
      <div
        className={`mobile-new-chat ${
          activeSection === "new-chat" ? "mobile-active-slot" : ""
        }`}
        onClick={handleNewChatClick}
      >
        <img
          src={systemLogo}
          alt="sidebar-logo"
          className="mobile-sidebar-logo"
        />
        <h2>New Chat</h2>
        <BsChatText size={30} />
      </div>
      <div
        className={`mobile-past-conversations ${
          activeSection === "past-conversations" ? "mobile-active-slot" : ""
        }`}
        onClick={() => setActiveSection("past-conversations")}
      >
        <h3>Past Conversations</h3>
      </div>
    </div>
  );
};

MobileSidebar.propTypes = {
  setMessages: PropTypes.func.isRequired,
  activeSection: PropTypes.string.isRequired,
  setActiveSection: PropTypes.func.isRequired,
  openMobileBar: PropTypes.bool.isRequired,
  setOpenMobileBar: PropTypes.func.isRequired,
};

export default MobileSidebar;
