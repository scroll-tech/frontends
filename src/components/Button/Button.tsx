import React, { FC } from "react";
import classNames from "classnames";
import { useApp } from "@/contexts";
import "./Button.less";

interface ButtonProps {
  large?: boolean;
  children?: any;
  onClick?: any;
  loading?: boolean;
  isDarkMode?: boolean;
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  type?: string;
  ghost?: boolean;
}

const Button: FC<ButtonProps> = (props) => {
  const {
    theme: { prefixCls },
  } = useApp();

  const {
    className,
    children,
    large = false,
    disabled = false,
    loading = false,
    fullWidth = false,
    type = "default",
    ghost = false,
    ...buttonProps
  } = props;

  const classes = classNames(
    `${prefixCls}-btn`,
    {
      [`${prefixCls}-btn-${type}`]: type,
      [`${prefixCls}-btn-background-ghost`]: ghost,
      [`${prefixCls}-btn-loading`]: loading,
      [`${prefixCls}-btn-disabled`]: disabled,
    },
    className
  );

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
  ) => {
    const { onClick } = props;
    if (loading || disabled) {
      e.preventDefault();
      return;
    }
    (
      onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
    )?.(e);
  };

  return <button className={classes}>{children}</button>;
};

export default Button;
