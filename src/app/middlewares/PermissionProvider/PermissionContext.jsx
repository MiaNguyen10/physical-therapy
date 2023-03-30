import { createContext } from "react";

const defaultBehaviour = {
  isAllowedTo: () => false,
};

const PermissionContext = createContext(defaultBehaviour);

export default PermissionContext;
