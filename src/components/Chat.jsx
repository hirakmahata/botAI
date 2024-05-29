// src/ChatComponent.jsx
import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
} from "@mui/material";
import axios from "axios";

import customData from "../data/myData.json";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const foundResponse = customData.find(
      (item) => item.question.toLowerCase() === input.toLowerCase()
    );

    if (foundResponse) {
      const botMessage = { sender: "bot", text: foundResponse.response };
      setMessages((prev) => [...prev, botMessage]);
    } else {
      // If no response is found in customData, call OpenAI API
      try {
        const response = await axios.post(
          "https://api.openai.com/v1/engines/davinci-codex/completions",
          {
            prompt: input,
            max_tokens: 150,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer YOUR_OPENAI_API_KEY`,
            },
          }
        );

        const botMessage = {
          sender: "bot",
          text: response.data.choices[0].text.trim(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error("Error calling OpenAI API:", error);
        const botMessage = {
          sender: "bot",
          text: "Sorry, I am having trouble processing your request right now.",
        };
        setMessages((prev) => [...prev, botMessage]);
      }
    }

    setInput("");
  };

  return (
    <Box
      sx={{
        p: 2,
        width: "100%",
        height: "90vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Bot AI
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 2, flexGrow: 1, overflowY: "auto" }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemText
                primary={msg.sender === "user" ? "You" : "Bot"}
                secondary={msg.text}
                secondaryTypographyProps={{
                  color: msg.sender === "user" ? "primary" : "textSecondary",
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        sx={{ display: "flex" }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button type="submit" variant="contained">
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatComponent;
