import { useApp } from "fleet-core";

export default function FeedbackHandler() {
  const app = useApp();

  const handleFeedback = (res: unknown) => {
    const data = (res as any)?.data.message;

    if (data) {
      app.toast(data);
    }
  };
  app.addService({
    handleFeedback,
  });

  return null;
}
