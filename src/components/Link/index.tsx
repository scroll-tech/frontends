import MuiLink from "@mui/material/Link";

const Link = (props) => {
  const { external, ...restProps } = props;
  return (
    <MuiLink
      rel="noopener noreferrer"
      target={external ? "_blank" : ""}
      {...restProps}
    />
  );
};

export default Link;
