import styled from "@mui/material/styles/styled";

const Img = styled("img")({
  borderRadius: "50%",
  overflow: "hidden",
  width: 100,
  height: 100,
});

export default function InitialLoadingHolder() {
  return (
    <div style={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
      <Img src={"/images/table-initial-loading.svg"} alt="Loading..." />
    </div>
  );
}
