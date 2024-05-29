// App.js
import { useState } from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Box,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {
  Toolbar,
  IconButton,
  Drawer,
  List,
  CssBaseline,
  // Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import system from "./assets/system.svg";
import ChatComponent from "./components/Chat";

const drawerWidth = 240;

function ResponsiveDrawer() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <List>
        <ListItem button key="New Chat">
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <ListItemIcon>
              <Avatar src={system} />
            </ListItemIcon>
            <ListItemText primary="New Chat" sx={{ flexGrow: 1 }} />
            <BorderColorIcon />
          </Box>
        </ListItem>
        <ListItem button key="Past Conversations">
          <ListItemText primary="Past Conversations" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
      <CssBaseline />
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: "100vh",
        }}
      >
        <ChatComponent />
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
