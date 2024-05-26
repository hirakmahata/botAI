import React from "react";
import PropTypes from "prop-types";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const ChatMessage = ({ message }) => {
  const [hover, setHover] = React.useState(false);
  const [liked, setLiked] = React.useState(null);

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  return (
    <Box
      sx={{
        mb: 2,
        display: "flex",
        justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Paper sx={{ p: 2, maxWidth: "75%", position: "relative" }}>
        <Typography variant="body1">{message.text}</Typography>
        {message.sender === "ai" && hover && (
          <Box
            sx={{ position: "absolute", top: -10, right: -10, display: "flex" }}
          >
            <IconButton
              onClick={() => setLiked(true)}
              color={liked === true ? "primary" : "default"}
            >
              <ThumbUpIcon />
            </IconButton>
            <IconButton
              onClick={() => setLiked(false)}
              color={liked === false ? "primary" : "default"}
            >
              <ThumbDownIcon />
            </IconButton>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

ChatMessage.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    sender: PropTypes.string.isRequired,
  }).isRequired,
};

export default ChatMessage;
