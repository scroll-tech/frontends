import MuiLink, { LinkProps } from "@mui/material/Link";

interface Props {
  external?: boolean;
}

const Link = (props: any) => {
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
