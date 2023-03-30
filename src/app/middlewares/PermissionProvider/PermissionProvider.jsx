import React from "react";
import PermissionContext from "./PermissionContext";

const PermissionProvider = ({ children }) => {
  const isAllowedTo = (userTier, permission) => permission.includes(userTier);

  return (
    <PermissionContext.Provider value={{ isAllowedTo }}>
      {children}
    </PermissionContext.Provider>
  );
};

export default PermissionProvider;
