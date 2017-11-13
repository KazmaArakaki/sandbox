import React from "react";

import styles from "./style.css";

export default class Component extends React.Component {
  render() {
    return (
      <header className={styles.container}>
        <h1 className={styles.title}>
          <img className={styles.title_image}
              src="./assets/images/icon.png"
              alt="Logo Image For ResuBu" />
        </h1>
      </header>
    );
  }
}
