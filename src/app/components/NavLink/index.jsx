import React from "react";
import { Link } from "@mui/material";
import styled from "styled-components";

export default function NavLinkComponent({ children, href, ...rest }) {
  const NavLink = styled(Link)({
    fontSize: "18px",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  });

  return (
    <NavLink href={href} {...rest}>
      {children}
    </NavLink>
  );
}
