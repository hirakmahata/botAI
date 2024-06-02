import "./Welcome.css";
import systemLogo from "../../assets/system.svg";

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-heading">
        <h1>How Can I Help You Today?</h1>
        <img src={systemLogo} alt="welcome-logo" />
      </div>
      <div className="welcome-grid">
        <div>
          <h3>Hi, what is the weather</h3>
          <p>Get immediate AI generated response</p>
        </div>
        <div>
          <h3>Hi, what is my location</h3>
          <p>Get immediate AI generated response</p>
        </div>
        <div id="optional-message">
          <h3>Hi, what is the temperature</h3>
          <p>Get immediate AI generated response</p>
        </div>
        <div>
          <h3>Hi, how are you</h3>
          <p>Get immediate AI generated response</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
