import { useState } from "react";
import {
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Feedback from "./components/Feedback";

function App() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversationIndex, setSelectedConversationIndex] =
    useState(null);
  const [viewFeedback, setViewFeedback] = useState(false);

  const handleSelectConversation = (index) => {
    setSelectedConversationIndex(index);
    setViewFeedback(false);
  };

  const handleSaveConversation = (messages) => {
    setConversations([...conversations, { messages, feedback: null }]);
    setSelectedConversationIndex(conversations.length);
  };

  const handleFeedbackSubmit = (feedback) => {
    const updatedConversations = [...conversations];
    updatedConversations[selectedConversationIndex].feedback = feedback;
    setConversations(updatedConversations);
  };

  const toggleViewFeedback = () => {
    setViewFeedback(!viewFeedback);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton color="inherit" edge="start" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Chat with AI
          </Typography>
          <Button
            color="inherit"
            onClick={toggleViewFeedback}
            sx={{ marginLeft: "auto" }}
          >
            {viewFeedback ? "Back to Chat" : "View Feedback"}
          </Button>
        </Toolbar>
      </AppBar>
      <Sidebar
        conversations={conversations}
        onSelectConversation={handleSelectConversation}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {viewFeedback ? (
          <Feedback
            feedbacks={conversations
              .map((convo) => convo.feedback)
              .filter((feedback) => feedback)}
          />
        ) : (
          <Chat
            selectedConversation={conversations[selectedConversationIndex]}
            onSaveConversation={handleSaveConversation}
            onFeedbackSubmit={handleFeedbackSubmit}
          />
        )}
      </Box>
    </Box>
  );
}

export default App;
