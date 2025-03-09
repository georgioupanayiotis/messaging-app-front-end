import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const users = ["Alice", "Bob", "Charlie", "David", "Emma"]; // Mock user list

const Inbox = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Alice", message: "Hello!", timestamp: "2025-03-07 10:00 AM" },
    { id: 2, sender: "Bob", message: "How are you?", timestamp: "2025-03-07 10:05 AM" },
    { id: 3, sender: "Charlie", message: "Good morning!", timestamp: "2025-03-07 10:10 AM" },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !recipient) return;

    const newMsg = {
      id: Date.now(), // Unique ID for deletion
      sender: "You",
      message: newMessage,
      timestamp: new Date().toLocaleString(),
    };

    setMessages([newMsg, ...messages]); // Add message at the top
    setNewMessage("");
  };

  const handleOpenDeleteDialog = (id) => {
    setMessageToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setMessageToDelete(null);
  };

  const handleDeleteMessage = () => {
    setMessages(messages.filter((msg) => msg.id !== messageToDelete)); // Remove message by ID
    handleCloseDeleteDialog();
  };

  return (
    <Box sx={{ display: "flex", marginTop: 8, flexDirection: "column", gap: 3 }}>
      {/* Title */}
      <Typography variant="h4">Inbox</Typography>

      {/* Received Messages */}
      <Paper sx={{ p: 2, maxWidth: 600 }}>
        <Typography variant="h6">Received Messages</Typography>
        <List>
          {messages.length > 0 ? (
            messages.map((msg) => (
              <ListItem key={msg.id} divider secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleOpenDeleteDialog(msg.id)}>
                  <DeleteIcon />
                </IconButton>
              }>
                <ListItemText
                  primary={`${msg.sender}: ${msg.message}`}
                  secondary={msg.timestamp}
                />
              </ListItem>
            ))
          ) : (
            <Typography>No messages yet.</Typography>
          )}
        </List>
      </Paper>

      {/* Send Message Section */}
      <Paper sx={{ p: 2, maxWidth: 600 }}>
        <Typography variant="h6">Send a Message</Typography>
        <Select
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          displayEmpty
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="" disabled>Select Recipient</MenuItem>
          {users.map((user) => (
            <MenuItem key={user} value={user}>
              {user}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="Type your message..."
          variant="outlined"
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleSendMessage}>
          Send
        </Button>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this message?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="secondary">Cancel</Button>
          <Button onClick={handleDeleteMessage} color="primary">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Inbox;
