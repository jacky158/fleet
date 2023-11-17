import useApp from "@ikx/app";

export default function FeedbackHandler() {
  const app = useApp();

  const handleFeedback = (res: unknown) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (res as any)?.data.message;

    if (data) {
      app.toast(data);
    }
  };
  app.extend({
    handleFeedback,
  });

  return null;
}
