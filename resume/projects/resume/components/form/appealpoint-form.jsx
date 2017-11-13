import React from "react";
import cssResolver from "css-module-resolver";
import styles from "./style.css";

import Modal from "./modal.jsx";

const cr = cssResolver(styles);

export default class Component extends React.Component {
  componentDidMount() {
    this.refs.appeal.value = this.props.app.getDataFromStorage("appeal") || "";
  }

  render() {
    const saveDataToStorage = this.saveDataToStorage.bind(this);

    return (
      <div className={cr("container")}>
        <h2 className={cr("heading")}>
          アピールポイントなどを追加
        </h2>

        <p className={cr("description")}>
          志望の動機、特技、好きな学科、アピールポイントなどを入力してください。
        </p>

        <div className={cr("form_row")}>
          <label className={cr("form_col")}>
            アピールポイントなど
            <textarea className={cr("form_item")}
                ref="appeal"
                onInput={saveDataToStorage("appeal")}></textarea>
          </label>
        </div>

        <p className={cr("note")}>
          入力されたアピールポイントなどの情報はご利用の端末に保存され、個人情報が自動的にアップロードされることはありません。
        </p>
      </div>
    );
  }

  saveDataToStorage(key) {
    return event => {
      this.props.app.setDataToStorage(key, event.currentTarget.value);
    }
  }
}

