import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "../homepage.module.css";
import { Switch } from "@mui/material";
type Navbar_Props = {
  isUser: boolean;
  setIsUser: Dispatch<SetStateAction<boolean>>;
};
const Navbar = ({ isUser, setIsUser }: Navbar_Props) => {
  const handleToggle = () => {
    setIsUser(!isUser);
  };

  return (
    <div className={`${styles.navbar}`}>
      <div className={styles.right}>
        <span className={styles.text}>{"admin"}</span>
        <Switch checked={isUser} onChange={handleToggle} />
        <span className={styles.text}>{"user"}</span>
        <button className={styles.iconbutton}>
          <i className="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
