import React from "react";
import cssResolver from "css-module-resolver";

import styles from "./style.css";

const cr = cssResolver(styles);

export default class Component extends React.Component {
  componentDidMount() {
    this.refs.commute_hours.value = this.props.app.getDataFromStorage("commute_hours") || "";
    this.refs.commute_minutes.value = this.props.app.getDataFromStorage("commute_minutes") || "";
    this.refs.families.value = this.props.app.getDataFromStorage("families") || "";
    this.spouceLabelClicked.bind(this)(this.props.app.getDataFromStorage("spouce"))();
    this.obligationLabelClicked.bind(this)(this.props.app.getDataFromStorage("obligation"))();
  }

  render() {
    const spouceLabelClicked = this.spouceLabelClicked.bind(this);
    const obligationLabelClicked = this.obligationLabelClicked.bind(this);
    const saveDataToStorage = this.saveDataToStorage.bind(this);

    return (
      <div className={cr("container")}>
        <h2 className={cr("heading")}>
          通勤時間・扶養家族・配偶者について記入
        </h2>

        <p className={cr("description")}>
          通勤時間を数字で入力してください。
        </p>

        <div className={cr("form_row")}>
          <label className={cr("form_col", "-80x")}>
            時間
            <input className={cr("form_item")} type="number"
                ref="commute_hours"
                onInput={saveDataToStorage("commute_hours")} />
          </label>

          <label className={cr("form_col", "-80x")}>
            分
            <input className={cr("form_item")} type="number"
                ref="commute_minutes"
                onInput={saveDataToStorage("commute_minutes")} />
          </label>
        </div>

        <p className={cr("description")}>
          扶養家族の人数を数字で入力してください。
        </p>

        <div className={cr("form_row")}>
          <label className={cr("form_col", "-80x")}>
            扶養家族の人数（配偶者を除く）
            <input className={cr("form_item")} type="number"
                ref="families"
                onInput={saveDataToStorage("families")} />
          </label>
        </div>

        <p className={cr("description")}>
          配偶者の有無を選択してください。
        </p>

        <div className={cr("form_row")}>
          <label className={cr("form_col", "-radio")}
              ref="spouceLabelY"
              onClick={spouceLabelClicked("y")}>
            <input className={cr("form_item")} type="radio" name="spouce"
                ref="spouceRadioY" />
            有
          </label>

          <label className={cr("form_col", "-radio")}
              ref="spouceLabelN"
              onClick={spouceLabelClicked("n")}>
            <input className={cr("form_item")} type="radio" name="spouce"
                ref="spouceRadioN" />
            無
          </label>
        </div>

        <p className={cr("description")}>
          配偶者の扶養義務の有無を選択してください。
        </p>

        <div className={cr("form_row")}>
          <label className={cr("form_col", "-radio")}
              ref="obligationLabelY"
              onClick={obligationLabelClicked("y")}>
            <input className={cr("form_item")} type="radio" name="obligation"
                ref="obligationRadioY" />
            有
          </label>

          <label className={cr("form_col", "-radio")}
              ref="obligationLabelN"
              onClick={obligationLabelClicked("n")}>
            <input className={cr("form_item")} type="radio" name="obligation"
                ref="obligationRadioN" />
            無
          </label>
        </div>

        <p className={cr("note")}>
          入力された通勤時間・扶養家族・配偶者についての情報はご利用の端末に保存され、個人情報が自動的にアップロードされることはありません。
        </p>
      </div>
    );
  }

  spouceLabelClicked(spouce) {
    const checked = cr("form_col", "-radio", "-checked");
    const unchecked = cr("form_col", "-radio");

    return event => {
      this.refs.spouceLabelY.className = spouce == "y"? checked: unchecked;
      this.refs.spouceLabelN.className = spouce == "n"? checked: unchecked;
      this.refs.spouceRadioY.checked = spouce == "y";
      this.refs.spouceRadioN.checked = spouce == "n";

      this.props.app.setDataToStorage("spouce", spouce);
    };
  }

  obligationLabelClicked(obligation) {
    const checked = cr("form_col", "-radio", "-checked");
    const unchecked = cr("form_col", "-radio");

    return event => {
      this.refs.obligationLabelY.className = obligation == "y"? checked: unchecked;
      this.refs.obligationLabelN.className = obligation == "n"? checked: unchecked;
      this.refs.obligationRadioY.checked = obligation == "y";
      this.refs.obligationRadioN.checked = obligation == "n";

      this.props.app.setDataToStorage("obligation", obligation);
    };
  }

  saveDataToStorage(key) {
    return event => {
      this.props.app.setDataToStorage(key, event.currentTarget.value);
    }
  }
}

