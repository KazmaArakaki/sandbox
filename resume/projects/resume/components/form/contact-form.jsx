import React from "react";
import cssResolver from "css-module-resolver";

import styles from "./style.css";

const cr = cssResolver(styles);

export default class Component extends React.Component {
  componentDidMount() {
    this.refs.phone_mobile.value = this.props.app.getDataFromStorage("phone_mobile") || "";
    this.refs.phone.value = this.props.app.getDataFromStorage("phone") || "";
    this.refs.email.value = this.props.app.getDataFromStorage("email") || "";
  }

  render() {
    const saveDataToStorage = this.saveDataToStorage.bind(this);

    return (
      <div className={cr("container")}>
        <h2 className={cr("heading")}>
          連絡先を入力
        </h2>

        <p className={cr("description")}>
          携帯電話の電話番号を数字で入力してください。
        </p>

        <div className={cr("form_row")}>
          <label className={cr("form_col")}>
            携帯電話
            <input className={cr("form_item")} type="tel"
                ref="phone_mobile"
                onInput={saveDataToStorage("phone_mobile")} />
          </label>
        </div>

        <p className={cr("description")}>
          固定電話の電話番号を数字で入力してください。
        </p>

        <div className={cr("form_row")}>
          <label className={cr("form_col")}>
            固定電話
            <input className={cr("form_item")} type="tel"
                ref="phone"
                onInput={saveDataToStorage("phone")} />
          </label>
        </div>

        <p className={cr("description")}>
          メールアドレスを入力してください。
        </p>

        <div className={cr("form_row")}>
          <label className={cr("form_col")}>
            メールアドレス
            <input className={cr("form_item")} type="email"
                ref="email"
                onInput={saveDataToStorage("email")} />
          </label>
        </div>

        <p className={cr("note")}>
          入力された電話番号やメールアドレスはご利用の端末に保存され、個人情報が自動的にアップロードされることはありません。
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
