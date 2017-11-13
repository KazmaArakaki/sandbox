import React from "react";
import cssResolver from "css-module-resolver";

import styles from "./style.css";

const cr = cssResolver(styles);

export default class Component extends React.Component {
  componentDidMount() {
    this.refs.zipcode_optional.value = this.props.app.getDataFromStorage("zipcode_optional") || "";
    this.refs.address_1_optional.value = this.props.app.getDataFromStorage("address_1_optional") || "";
    this.refs.address_1_kana_optional.value = this.props.app.getDataFromStorage("address_1_kana_optional") || "";
    this.refs.address_2_optional.value = this.props.app.getDataFromStorage("address_2_optional") || "";
    this.refs.address_2_kana_optional.value = this.props.app.getDataFromStorage("address_2_kana_optional") || "";
  }

  render() {
    const saveDataToStorage = this.saveDataToStorage.bind(this);

    return (
      <div className={cr("container")}>
        <h2 className={cr("heading")}>
          住所を入力（現住所以外）
        </h2>

        <p className={cr("description")}>
          現在住んでいる住所の他に連絡を希望する住所がある場合は入力してください。
        </p>

        <div className={cr("form_row")}>
          <label className={cr("form_col")}>
            郵便番号（現住所以外）
            <input className={cr("form_item")}
                ref="zipcode_optional"
                onInput={saveDataToStorage("zipcode_optional")} />
          </label>
        </div>

        <div className={cr("form_row")}>
          <label className={cr("form_col")}>
            住所（現住所以外）（建物名・部屋番号を除く）
            <input className={cr("form_item")}
                ref="address_1_optional"
                onInput={saveDataToStorage("address_1_optional")} />
          </label>
        </div>

        <div className={cr("form_row")}>
          <label className={cr("form_col")}>
            住所（現住所以外）（ひらがな）（建物名・部屋番号を除く）
            <input className={cr("form_item")}
                ref="address_1_kana_optional"
                onInput={saveDataToStorage("address_1_kana_optional")} />
          </label>
        </div>

        <div className={cr("form_row")}>
          <label className={cr("form_col")}>
            住所（現住所以外）（建物名・部屋番号）
            <input className={cr("form_item")}
                ref="address_2_optional"
                onInput={saveDataToStorage("address_2_optional")} />
          </label>
        </div>

        <div className={cr("form_row")}>
          <label className={cr("form_col")}>
            住所（現住所以外）（ひらがな）（建物名・部屋番号）
            <input className={cr("form_item")}
                ref="address_2_kana_optional"
                onInput={saveDataToStorage("address_2_kana_optional")} />
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
      this.props.app.setDataToStorage(key, event.currentTarget.value);
    }
  }
}

