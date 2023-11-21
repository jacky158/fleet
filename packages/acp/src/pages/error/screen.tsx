import { MuiIcon } from "@ikx/mui";
import { Link } from "@ikx/router";
import { Box, Button, Typography, styled } from "@mui/material";

interface Props {
  title: string;
  helpText: string;
  banner: string;
}

const name = "ScreenError";

const Root = styled(Box, {
  name,
  slot: "Root",
  overridesResolver(props, styles) {
    return [styles.root, styles[`root${props.code}`]];
  },
})(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  flexDirection: "column",
  padding: theme.spacing(2),
  minHeight: "calc(100vh - 100px)",
}));
const Content = styled(Box, {
  name,
  slot: "Content",
  overridesResolver(_, styles) {
    return [styles.content];
  },
})(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  padding: theme.spacing(2),
}));

const Title = styled(Typography, {
  name,
  slot: "Title",
  overridesResolver(_, styles) {
    return [styles.title];
  },
})({
  fontWeight: 600,
  paddingTop: "2em",
});

const Banner = styled("img", {
  name,
  slot: "Banner",
  overridesResolver(_, styles) {
    return [styles.banner];
  },
})({
  maxWidth: "calc(30vw)",
});

const HelpText = styled(Typography, {
  name,
  slot: "HelpText",
  overridesResolver(_, styles) {
    return [styles.helpText];
  },
})(({ theme }) => ({
  color: theme.palette.text.disabled,
  paddingBottom: 24,
}));
export default function Screen(props: Props) {
  return (
    <Root>
      <Content>
        <Banner src={props.banner} />
        <Title variant="h4">{props.title}</Title>
        <HelpText>{props.helpText}</HelpText>
        <Button
          component={Link}
          startIcon={<MuiIcon name="arrow_back" />}
          variant="text"
          color="primary"
          to="/"
        >
          Back to Home
        </Button>
      </Content>
    </Root>
  );
}
