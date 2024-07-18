// src/components/withAuth.tsx
import React from "react";
import { getLocalStorage } from "../store";

const withAuth = (Component: React.ComponentType) => {
  const AuthComponent = (props: any) => {
    const authToken = getLocalStorage("authToken");
    if (authToken) {
      window.location.href = "/";
    } else {
      window.location.href = "/login";
      return null;
    }

    return <Component {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
