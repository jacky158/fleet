export default function LoadingHolder() {
  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.05)",
      }}
    >
      <img
        src={"/images/table-initial-loading.svg"}
        alt="Loading..."
        width={100}
        height={100}
        style={{ borderRadius: "50%" }}
      />
    </div>
  );
}
