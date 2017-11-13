import React from "react";
import styles from "./style.css";
import cssResolver from "css-module-resolver";

const cr = cssResolver(styles);

export default class Component extends React.Component {
  render() {
    const onAccept = this.onAccept.bind(this);
    const onReject = this.onReject.bind(this);

    return (
      <div className={cr("container", "-modal")}>
        <div className={cr("dialog", "-modal")}>
          {this.props.children}

          <div className={cr("controller", "-modal")}>
            <button className={cr("button", "-modal", "-accept")}
                onClick={onAccept}>
              {this.props.acceptText || "Accept"}
            </button>

            <button className={cr("button", "-modal", "-reject")}
                onClick={onReject}>
              {this.props.rejectText || "reject"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  onAccept() {
    if(this.props.hasOwnProperty("onAccept")) {
      this.props.onAccept();
    }
  }

  onReject() {
    if(this.props.hasOwnProperty("onReject")) {
      this.props.onReject();
    }
  }
}
