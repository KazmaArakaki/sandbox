import React from "react";
import cssResolver from "css-module-resolver";

import styles from "./style.css";

const cr = cssResolver(styles);

export default class Component extends React.Component {
  componentDidMount() {
    this.refs.zipcode.value = this.props.app.getDataFromStorage("zipcode") || "";
    this.refs.address_1.value = this.props.app.getDataFromStorage("address_1") || "";
    this.refs.address_1_kana.value = this.props.app.getDataFromStorage("address_1_kana") || "";
    this.refs.address_2.value = this.props.app.getDataFromStorage("address_2") || "";
    this.refs.address_2_kana.value = this.props.app.getDataFromStorage("address_2_kana") || "";
  }

  render() {
    const saveDataToStorage = this.saveDataToStorage.bind(this);

    return (
      <div className={cr("container")}>
        <h2 className={cr("heading")}>
          住所を入力
        </h2>

        <p className={cr("description")}>
          現在住んでいる住所を漢字とひらがなで入力してください。
        </p>

        <div className={cr("form_row")}>
          <label className={cr("form_col")}>
            郵便番号
            <input className={cr("form_item")}
                ref="zipcode"
                onInput={saveDataToStorage("zipcode")} />
          </label>
        </div>

        <div className={cr("form_row")}>
          <label className={cr("form_col")}>
            住所（建物名・部屋番号を除く）
            <input className={cr("form_item")}
                ref="address_1"
                onInput={saveDataToStorage("address_1")} />
          </label>
        </div>

        <div className={cr("form_row")}>
          <label className={cr("form_col")}>
            住所（ひらがな）（建物名・部屋番号を除く）
            <input className={cr("form_item")}
                ref="address_1_kana"
                onInput={saveDataToStorage("address_1_kana")} />
          </label>
        </div>

        <div className={cr("form_row")}>
          <label className={cr("form_col")}>
            住所（建物名・部屋番号）
            <input className={cr("form_item")}
                ref="address_2"
                onInput={saveDataToStorage("address_2")} />
          </label>
        </div>

        <div className={cr("form_row")}>
          <label className={cr("form_col")}>
            住所（ひらがな）（建物名・部屋番号）
            <input className={cr("form_item")}
                ref="address_2_kana"
                onInput={saveDataToStorage("address_2_kana")} />
          </label>
        </div>

        <p className={cr("note")}>
          入力された住所はご利用の端末に保存され、個人情報が自動的にアップロードされることはありません。
        </p>
      </div>
    );
  }

  saveDataToStorage(key) {
    return event => {
      console.log(key, event.currentTarget.value);
      this.props.app.setDataToStorage(key, event.currentTarget.value);
    }
  }
}

