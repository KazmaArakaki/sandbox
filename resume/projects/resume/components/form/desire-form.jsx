import React from "react";
import cssResolver from "css-module-resolver";
import styles from "./style.css";

import Modal from "./modal.jsx";

const cr = cssResolver(styles);

export default class Component extends React.Component {
  componentDidMount() {
    this.refs.desire.value = this.props.app.getDataFromStorage("desire") || "";
  }

  render() {
    const saveDataToStorage = this.saveDataToStorage.bind(this);

    return (
      <div className={cr("container")}>
        <h2 className={cr("heading")}>
          希望を追加
        </h2>

        <p className={cr("description")}>
          給料・職種・勤務時間・勤務地・その他についての希望があれば入力してください。
        </p>

        <div className={cr("form_row")}>
          <label className={cr("form_col")}>
            希望
            <textarea className={cr("form_item")}
                ref="desire"
                onInput={saveDataToStorage("desire")}></textarea>
          </label>
        </div>

        <p className={cr("note")}>
          入力された希望などの情報はご利用の端末に保存され、個人情報が自動的にアップロードされることはありません。
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

