import React from "react";
import { Redirect, RouteComponentProps } from "react-router-dom-v5";

// Redirects to swap but only replace the pathname
export function RedirectPathToSwapOnly({ location }: RouteComponentProps) {
  return <Redirect to={{ ...location, pathname: "/swap" }} />;
}

// Redirects from the /swap/:outputCurrency path to the /swap?outputCurrency=:outputCurrency format
export function RedirectToSwap(
  props: RouteComponentProps<{ outputCurrency: string }>
) {
  return (
    <Redirect
      to={{
        ...props.location,
        pathname: "/",
      }}
    />
  );
}
