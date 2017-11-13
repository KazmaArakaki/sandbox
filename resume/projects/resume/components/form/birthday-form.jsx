import React from "react";
import cssResolver from "css-module-resolver";

import styles from "./style.css";

const cr = cssResolver(styles);

export default class Component extends React.Component {
  componentDidMount() {
    this.refs.birthday.value = this.props.app.getDataFromStorage("birthday") || "";
    this.refs.age.value = this.props.app.getDataFromStorage("age") || "";
  }

  render() {
    const saveDataToStorage = this.saveDataToStorage.bind(this);

    return (
      <div className={cr("container")}>
        <h2 className={cr("heading")}>
          誕生日と年齢を入力
        </h2>

        <p className={cr("description")}>
          誕生日を数字で入力してください。
        </p>

        <div className={cr("form_row")}>
          <label className={cr("form_col")}>
            誕生日
            <input className={cr("form_item")} type="date"
                ref="birthday"
                onInput={saveDataToStorage("birthday")} />
          </label>
        </div>


        <p className={cr("description")}>
          年齢を数字で入力してください。
        </p>

        <div className={cr("form_row")}>
          <label className={cr("form_col")}>
            年齢
            <input className={cr("form_item")}
                ref="age"
                onInput={saveDataToStorage("age")} />
          </label>
        </div>

        <p className={cr("note")}>
          入力された誕生日や年齢はご利用の端末に保存され、個人情報が自動的にアップロードされることはありません。
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
