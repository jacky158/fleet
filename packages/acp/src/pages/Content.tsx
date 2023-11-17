import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  MenuProps,
  ModalProps,
} from "@mui/material";
import dayjs from "dayjs";

import { useRef } from "react";
import Master from "../layouts/master";
//import "@ikx/mui/dist/module";

const MyMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>Open</MenuItem>
    </Menu>
  );
};

function MyModal2(props: ModalProps) {
  const app = useApp();

  return (
    <Dialog {...props} maxWidth="xs" fullWidth>
      <DialogTitle>Modal2</DialogTitle>
      <DialogContent>My Modal Content 2</DialogContent>
      <DialogActions>
        <Button onClick={() => app.modal.pop()}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

function MyModal(props: ModalProps) {
  const app = useApp();

  return (
    <Dialog {...props} maxWidth="sm" fullWidth>
      <DialogTitle>Modal</DialogTitle>
      <DialogContent>
        My Modal Content
        <br />
        My Modal Content
      </DialogContent>
      <DialogActions>
        <Button onClick={() => app.modal.pop()}>Cancel</Button>
        <Button onClick={() => app.modal.push({ modal: MyModal2 })}>
          Next
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default function Content() {
  const app = useApp();
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <div>
      <Master>
        <button onClick={() => app.alert({ message: "sample alert" })}>
          alert
        </button>

        <button onClick={() => app.toast({ message: "ok" })}>toast</button>
        <button ref={ref} onClick={() => app.openMenu({ menu: MyMenu, ref })}>
          Open Menu
        </button>
        <button
          onClick={() =>
            app.confirm({
              message: "are you sure" + dayjs(Date.now()).format("LLL"),
            })
          }
        >
          {app.intl.formatMessage({ id: "core.confirm" })}
        </button>
        <button onClick={() => app.modal.open({ modal: MyModal })}>
          Open Modal
        </button>
      </Master>
    </div>
  );
}
