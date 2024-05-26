import { useState } from "react";
import PropTypes from "prop-types";

const FeedbackForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, comment });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Rating:
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            min="1"
            max="5"
          />
        </label>
      </div>
      <div>
        <label>
          Comment:
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Submit Feedback</button>
    </form>
  );
};

FeedbackForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default FeedbackForm;
