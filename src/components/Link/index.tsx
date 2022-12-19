import MuiLink from "@mui/material/Link";

const Link = (props) => {
  const { external, underline = "none", ...restProps } = props;
  return (
    <MuiLink
      rel="noopener noreferrer"
      target={external ? "_blank" : ""}
      underline={underline}
      {...restProps}
    />
  );
};

export default Link;
