import React, { ReactNode } from "react";
import styles from "../homepage.module.css";

type CardProps = {
  icon: ReactNode;
  title: string;
  value: string;
};
const Card = ({ icon, title, value }: CardProps) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardIcon}>{icon}</div>
      <div className={styles.cardText}>
        <h4 className={styles.cardTitle}>{title}</h4>
        <h2 className={styles.cardNumber}>{value}</h2>
      </div>
    </div>
  );
};

export default Card;
