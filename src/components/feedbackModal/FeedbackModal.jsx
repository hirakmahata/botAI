import { RxCross2 } from "react-icons/rx";
import PropTypes from "prop-types";
import "./FeedbackModal.css";
import { VscFeedback } from "react-icons/vsc";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

const FeedbackModal = ({ onFeedbackModalClose, findMessageID, messages }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [feedback, setFeedback] = useState("");

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    const selectedMessage = messages.find((m) => m.id === findMessageID);
    if (!rating && !feedback) return;
    if (rating) selectedMessage.rating = rating;
    if (feedback) selectedMessage.feedback = feedback;

    onFeedbackModalClose();
  };
  return (
    <div className="feedback-modal-container">
      <div className="feedback-container">
        <div className="feedback-heading">
          <VscFeedback size={50} />
          <h1>Provide Feedback On This Response</h1>
          <RxCross2
            size={50}
            className="feedback-cross"
            onClick={onFeedbackModalClose}
          />
        </div>
        <div className="feedback-inputs">
          <div className="rating">
            <h3> Provide Rating :</h3>
            <div className="star-container">
              {[...Array(5)].map((_, index) => {
                const providedRating = index + 1;
                return (
                  <label key={index + 1}>
                    <input
                      type="radio"
                      value={providedRating}
                      onClick={() => setRating(providedRating)}
                    />

                    <FaStar
                      size={40}
                      className="rating-icon"
                      color={
                        providedRating <= (hover || rating)
                          ? "#7753ad"
                          : "#b5b5b8"
                      }
                      onMouseEnter={() => setHover(providedRating)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
            </div>
          </div>
          <div className="text-feedback">
            <h3>Provide Feedback :</h3>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write Feedback..."
              className="additional-feedback-box"
            />
          </div>
        </div>
        <div className="submission">
          <button onClick={handleSubmitFeedback}>Submit</button>
        </div>
      </div>
    </div>
  );
};

FeedbackModal.propTypes = {
  onFeedbackModalClose: PropTypes.func.isRequired,
  findMessageID: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FeedbackModal;
