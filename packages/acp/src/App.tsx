import { AppProvider, Manager } from "fleet-core";
import {
  ToastHandler,
  FeedbackHandler,
  AlertHandler,
  ConfirmHandler,
} from "fleet-mui";
function App() {
  const app = Manager.create();

  return (
    <AppProvider app={app}>
      <ToastHandler />
      <FeedbackHandler />
      <AlertHandler />
      <ConfirmHandler />
      <button onClick={() => app.alert({ message: "sample alert" })}>
        alert
      </button>
      <button onClick={() => app.toast({ message: "ok" })}>toast</button>
      <button onClick={() => app.confirm({ message: "are you sure" })}>
        confirm
      </button>
    </AppProvider>
  );
}

export default App;
