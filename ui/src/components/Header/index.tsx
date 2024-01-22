import React from "react";
import styled from "./index.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HeaderIcon from "../../../public/test.png";
import Image from "next/image";

const Header = () => {
  return (
    <div className={styled.test}>
      <Image src={HeaderIcon} alt="" width={60} height={60} />
      <AccountCircleIcon />
    </div>
  );
};

export default Header;
