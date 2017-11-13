import React from "react";
import cssResolver from "css-module-resolver";

import styles from "./style.css";

const cr = cssResolver(styles);

export default class Component extends React.Component {
  render() {
    const onPrevButtonClicked = this.onPrevButtonClicked.bind(this);
    const onNextButtonClicked = this.onNextButtonClicked.bind(this);

    return (
      <footer className={cr("container")}>
        <button className={cr("button")}
            onClick={onPrevButtonClicked}>
          前へ
        </button>

        <button className={cr("button")}
            onClick={onNextButtonClicked}>
          次へ
        </button>
      </footer>
    );
  }

  onPrevButtonClicked() {
    this.props.app.prevButtonClickListener();
  }

  onNextButtonClicked() {
    this.props.app.nextButtonClickListener();
  }
}
