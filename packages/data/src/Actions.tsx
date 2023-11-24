/**
 * @type: popover
 * @name: TableActions
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MuiIcon } from "@ikx/mui";
import { Link } from "@ikx/router";
import { List, Popover, PopoverProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const Item = styled(Link)(({ theme }) => ({
  display: "flex",
  flexGrow: 1,
  flexDirection: "row",
  lineHeight: 1.5,
  alignItems: "center",
  padding: "8px 16px",
  color: "inherit",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Text = styled("span")({
  flexGrow: 1,
});

const Icon = (props: any) => (
  <MuiIcon {...props} style={{ fontSize: "1.2em", minWidth: 32 }} />
);

export default function TableActions({
  ...props
}: Omit<PopoverProps, "children">) {
  return (
    <Popover
      {...props}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      slotProps={{ paper: { sx: { minWidth: 240 } } }}
    >
      <List component="div">
        <Item to="/customer">
          <Icon name="edit" />
          <Text>Edit</Text>
        </Item>
        <Item to="/analytics">
          <Icon name="page_info" />
          <Text>View</Text>
        </Item>
        <Item to="/logout" color="error">
          <Icon name="delete" />
          <Text>Delete</Text>
        </Item>
      </List>
    </Popover>
  );
}
