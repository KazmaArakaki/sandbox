import React from "react";

import styles from "./style.css";
import FormComponent from "../form/view.jsx";

export default class Component extends React.Component {
  render() {
    return (
      <FormComponent app={this.props.app} />
    );
  }
}
