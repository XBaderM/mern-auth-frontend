import React from "react";
import styles from "./Card.module.scss";

// any card wrapping need children props
// card class unique class destructred used in
// classname
const Card = ({ children, cardClass }) => {
  return <div className={`${styles.card} ${cardClass}`}>{children}</div>;
};

export default Card;
