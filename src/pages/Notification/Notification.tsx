import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";

function Notification() {
  return (
    <List dense>
      {Array.from({ length: 30 }).map((_, i) => (
        <ListItem
          key={i}
          secondaryAction={
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Single-line item" secondary="Secondary text" />
        </ListItem>
      ))}
    </List>
  );
}

export default Notification;
