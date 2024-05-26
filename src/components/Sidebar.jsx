import PropTypes from "prop-types";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const Sidebar = ({ conversations, onSelectConversation }) => {
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Typography variant="h6" noWrap sx={{ p: 2 }}>
        Conversations
      </Typography>
      <List>
        {conversations.map((conversation, index) => (
          <ListItem key={index} onClick={() => onSelectConversation(index)}>
            <ListItemText primary={`Conversation ${index + 1}`} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

Sidebar.propTypes = {
  conversations: PropTypes.arrayOf(
    PropTypes.shape({
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
    }).isRequired
  ).isRequired,
  onSelectConversation: PropTypes.func.isRequired,
};

export default Sidebar;
