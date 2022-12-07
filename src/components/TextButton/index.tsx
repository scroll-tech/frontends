import { Link } from "@mui/material";

const TextButton = (props) => {
  const { onClick, children } = props;
  return (
    <Link
      component="button"
      sx={{
        color: "warning.main",
        verticalAlign: "baseline",
        fontWeight: 600,
      }}
      underline="none"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default TextButton;
