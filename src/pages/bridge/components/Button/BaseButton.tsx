/* eslint-disable */
import { FC } from "react";
import { makeStyles, withStyles } from "tss-react/mui";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

interface StyleProps {
  highlighted: boolean;
  large: boolean;
  flat: boolean;
  size?: number | string;
  borderRadius?: any;
  children?: any;
  onClick?: any;
  loading?: boolean;
  isDarkMode?: boolean;
  fullWidth?: boolean;
}

export type ButtonProps = Partial<StyleProps> &
  MuiButtonProps & { boxShadow?: any; minWidth?: string };

// TODO: ???
// const useStyles = makeStyles((theme) => ({
//   root: ({ highlighted, large, flat, isDarkMode, fullWidth }: StyleProps) => ({
//     textTransform: 'none',
//     padding: large ? '1.6rem 2.8rem' : '0.8rem 2.8rem',
//     minHeight: large ? '5rem' : '4.0rem',
//     fontSize: large ? '1.6rem' : '1.4rem',
//     width: fullWidth ? '100%' : 'auto',
//     transition: 'background-color 0.15s ease-out, box-shadow 0.15s ease-out',
//   }),
//   disabled: {
//     backgroundColor: '#E8E8E8',
//     color: 'rgba(51, 51, 51, 0.3)',
//   },
//   spinner: {
//     display: 'inline-flex',
//     marginLeft: '1rem',
//   },
// }));

const LargeButton: FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    highlighted = false,
    large = false,
    flat = false,
    disabled = false,
    loading = false,
    size = 40,
    boxShadow,
    minWidth,
    borderRadius,
    fullWidth = false,
    ...buttonProps
  } = props;
  // const styles = useStyles({ highlighted, large, flat, fullWidth });
  const styles = {} as any;

  return (
    // <Flex
    //   justifyCenter
    //   alignCenter
    //   borderRadius={borderRadius || '3.0rem'}
    //   fullWidth
    // >
    <div className="">
      <MuiButton
        {...buttonProps}
        disabled={disabled || loading}
        className={`${styles.root} ${className}`}
        classes={{ disabled: styles.disabled }}
      >
        {children}
        {loading ? (
          <div className={styles.spinner}>
            <CircularProgress size={large ? "2rem" : size} />
          </div>
        ) : null}
      </MuiButton>
    </div>
  );
};

export default LargeButton;
