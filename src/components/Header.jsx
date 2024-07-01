import React from "react";
import "./Header.scss";
import { useNavigate } from "react-router-dom";

const Header = ({children}) => {
  const navigate = useNavigate();

  return (
    <div className="headerdiv d-flex justify-content-between align-items-center position-sticky fixed-top">
      {children}
    </div>
  );
};

export default Header;
