import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Typography, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatMessage from "./ChatMessage";
import FeedbackForm from "./FeedbackForm";
import mockData from "../data/myData.json";

const Chat = ({
  selectedConversation,
  onSaveConversation,
  onFeedbackSubmit,
}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [feedbackVisible, setFeedbackVisible] = useState(false);

  useEffect(() => {
    if (selectedConversation) {
      setMessages(selectedConversation.messages || []);
      setFeedbackVisible(false);
    }
  }, [selectedConversation]);

  const handleSendMessage = () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: "user" };
      const aiResponse = mockData.find(
        (resp) => resp.question.toLowerCase() === input.toLowerCase()
      );
      const aiMessage = {
        text: aiResponse
          ? aiResponse.response
          : "I'm sorry, I don't understand.",
        sender: "ai",
      };

      const newMessages = [...messages, userMessage, aiMessage];
      setMessages(newMessages);
      setInput("");
      setFeedbackVisible(true);
    }
  };

  const handleSaveConversation = () => {
    onSaveConversation(messages);
    setMessages([]);
    setFeedbackVisible(false);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Chat
      </Typography>
      <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </Box>
      {feedbackVisible && (
        <Box sx={{ mb: 2 }}>
          <FeedbackForm onSubmit={onFeedbackSubmit} />
        </Box>
      )}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          fullWidth
          placeholder="Type your message..."
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <IconButton color="primary" onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
      {feedbackVisible && (
        <Box sx={{ mt: 2 }}>
          <button onClick={handleSaveConversation}>Save Conversation</button>
        </Box>
      )}
    </Box>
  );
};

Chat.propTypes = {
  selectedConversation: PropTypes.shape({
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        sender: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
    feedback: PropTypes.shape({
      rating: PropTypes.number,
      comment: PropTypes.string,
    }),
  }),
  onSaveConversation: PropTypes.func.isRequired,
  onFeedbackSubmit: PropTypes.func.isRequired,
};

export default Chat;
