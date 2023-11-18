import {
  Box,
  Divider,
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

function AsideAppBranch() {
  return (
    <>
      <Box sx={{ px: 2.5, pt: 2, cursor: "pointer" }}>
        <a href="/">
          <img src="/logo.png" height="32" />
        </a>
      </Box>
      <Box sx={{ display: "none" }}>
        <Typography
          variant="h6"
          component="a"
          href="/"
          color="primary"
          sx={{ cursor: "pointer" }}
        >
          phpFox
        </Typography>
      </Box>
      <Divider sx={{ bg: "var(--aside-item-color)" }} />
    </>
  );
}

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
      <AsideAppBranch />
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
