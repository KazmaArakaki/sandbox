import React from "react";
import cssResolver from "css-module-resolver";

import styles from "./style.css";

const cr = cssResolver(styles);

export default class Component extends React.Component {
  componentDidMount() {
    const genderLabelClicked = this.genderLabelClicked.bind(this);

    this.refs.name.value = this.props.app.getDataFromStorage("name") || "";
    this.refs.name_kana.value = this.props.app.getDataFromStorage("name_kana") || "";

    genderLabelClicked(this.props.app.getDataFromStorage("gender"))();
  }

  render() {
    const saveDataToStorage = this.saveDataToStorage.bind(this);
    const genderLabelClicked = this.genderLabelClicked.bind(this);

    return (
      <div className={cr("container")}>
        <h2 className={cr("heading")}>
          名前と性別を入力
        </h2>

        <p className={cr("description")}>
          名前を漢字とひらがなで入力してください。
        </p>

        <div className={cr("form_row")}>
          <label className={cr("form_col")}>
            名前
            <input className={cr("form_item")}
                ref="name"
                onInput={saveDataToStorage("name")} />
          </label>
        </div>

        <div className={cr("form_row")}>
          <label className={cr("form_col")}>
            名前（ひらがな）
            <input className={cr("form_item")}
                ref="name_kana"
                onInput={saveDataToStorage("name_kana")} />
          </label>
        </div>

        <p className={cr("description")}>
          性別を選択してください。
        </p>

        <div className={cr("form_row")}>
          <label className={cr("form_col", "-radio")}
              ref="label_gender_male"
              onClick={genderLabelClicked("male")}>
            <input className={cr("form_item")} type="radio" name="gender"
                ref="gender_male" />
            男性
          </label>

          <label className={cr("form_col", "-radio")}
              ref="label_gender_female"
              onClick={genderLabelClicked("female")}>
            <input className={cr("form_item")} type="radio" name="gender"
                ref="gender_female" />
            女性
          </label>
        </div>

        <p className={cr("note")}>
          入力された名前と性別はご利用の端末に保存され、個人情報が自動的にアップロードされることはありません。
        </p>
      </div>
    );
  }

  saveDataToStorage(key) {
    return event => {
      this.props.app.setDataToStorage(key, event.currentTarget.value);
    }
  }

  genderLabelClicked(gender) {
    const checked = cr("form_col", "-radio", "-checked");
    const unchecked = cr("form_col", "-radio");

    return event => {
      this.refs.label_gender_male.className = gender == "male"? checked: unchecked;
      this.refs.label_gender_female.className = gender == "female"? checked: unchecked;
      this.refs.gender_male.checked = gender == "male";
      this.refs.gender_female.checked = gender == "female";

      this.props.app.setDataToStorage("gender", gender);
    };
  }
}

