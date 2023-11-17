import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Typography,
  styled,
} from "@mui/material";
import Icon from "@mui/icons-material/Home";
import { Link as RouterLink } from "react-router-dom";
import items from "./aside.json";

const ItemIcon = styled("span")(() => ({
  width: 32,
  fontSize: "small",
}));

export default function Aside() {
  return (
    <Drawer
      anchor="left"
      variant="permanent"
      PaperProps={{
        sx: {
          width: "var(--aside-width)",
          flexShrink: 0,
          top: "var(--header-height)",
          background: "var(--aside-bg)",
          color: "var(--aside-item-color)",
        },
      }}
    >
      <List>
        {items.map((x, index) => {
          return (
            <ListItem key={index.toString()}>
              <ListItemButton
                component={RouterLink}
                disableRipple
                disableGutters
                dense
                to={x.url}
                sx={{ color: "var(--aside-item-color)" }}
              >
                <ItemIcon>
                  <Icon fontSize="small" />
                </ItemIcon>
                <Typography component="span">{x.label}</Typography>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
