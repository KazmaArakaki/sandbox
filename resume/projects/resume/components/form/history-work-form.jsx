import React from "react";
import cssResolver from "css-module-resolver";
import styles from "./style.css";

import Modal from "./modal.jsx";

const cr = cssResolver(styles);

export default class Component extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      "doShowModal": false,
      "selectedHistoryKey": "",
      "histories": JSON.parse(this.props.app.getDataFromStorage("history_work")) || []
    };
  }

  componentDidMount() {
    this.setState({
      "histories": this.sortHistories(this.state.histories).filter(yearHistories => {
        return yearHistories.histories.length;
      })
    });
  }

  componentDidUpdate() {
    this.props.app.setDataToStorage("history_work", JSON.stringify(this.state.histories));
    this.props.app.formSwipeContainer.style.height = this.refs.container.clientHeight + "px";
  }

  render() {
    const setAnimationClass = this.setAnimationClass.bind(this);
    const removeAnimationClass = this.removeAnimationClass.bind(this);
    const confirmDeleteHistory = this.confirmDeleteHistory.bind(this);
    const acceptDeleteHistory = this.acceptDeleteHistory.bind(this);
    const rejectDeleteHistory = this.rejectDeleteHistory.bind(this);
    const sortHistories = this.sortHistories.bind(this);
    const addHistory = this.addHistory.bind(this);

    const historyContainers = this.state.histories.map((yearHistories, i) => {
      const year = yearHistories.year;
      const histories = yearHistories.histories;

      const monthHistoryContainers = histories.map((monthHistories, j) => {
        const month = monthHistories.month;
        const history = monthHistories.body;
        const key = i + "_" + j;

        this.state.histories[i].histories[j].key = key;
        
        return (
          <dl className={cr("history_month")}
              key={key}
              onClick={confirmDeleteHistory(key)}>
            <dt className={cr("history_month_title")}>
              <span className={cr("history_month_title_month")}>
                {month}
              </span>

              <span className={cr("history_month_title_body")}>
                {history.history}
              </span>
            </dt>

            <dd className={cr("history_month_note")}>
              {history.note}
            </dd>
          </dl>
        );
      });

      return (
        <dl className={cr("history_year")}
            key={year}>
          <dt className={cr("history_year_title")}>
            {year}
          </dt>

          <dd className={cr("history_year_body")}>
            {monthHistoryContainers}
          </dd>
        </dl>
      );
    });

    return (
      <div className={cr("container")}
          ref="container">
        <h2 className={cr("heading")}>
          職歴を追加
        </h2>

        <p className={cr("description")}>
          追加する年月を数字で入力してください。
        </p>

        <div className={cr("form_row")}>
          <label className={cr("form_col", "-80x")}>
            年
            <input className={cr("form_item")} type="number"
                ref="year" />
          </label>

          <label className={cr("form_col", "-80x")}>
            月
            <input className={cr("form_item")} type="number"
                ref="month" />
          </label>
        </div>

        <p className={cr("description")}>
          追加する職歴の内容を入力してください。
        </p>

        <div className={cr("form_row")}>
          <label className={cr("form_col")}>
            内容
            <input className={cr("form_item")}
                ref="history" />
          </label>
        </div>

        <p className={cr("description")}>
          追加したい情報があれば入力してください。
        </p>

        <div className={cr("form_row")}>
          <label className={cr("form_col")}>
            備考
            <textarea className={cr("form_item")}
                ref="note"></textarea>
          </label>
        </div>

        <div className={cr("form_row")}>
          <button className={cr("form_submit")}
              onClick={(event => {
                setAnimationClass(event);
                addHistory();
              })}
              onAnimationEnd={removeAnimationClass}>
            職歴を追加する
          </button>
        </div>

        <div className={cr("container_history")}>
          {historyContainers}
        </div>

        <p className={cr("note")}>
          入力された職歴はご利用の端末に保存され、個人情報が自動的にアップロードされることはありません。
        </p>

        {(() => {
          if(this.state.doShowModal) {
            return (
              <Modal
                  acceptText="削除する"
                  rejectText="削除しない"
                  onAccept={acceptDeleteHistory}
                  onReject={rejectDeleteHistory}>
                <p>
                  次の職歴を削除しますか？
                </p>

                <p>
                {(() => {
                  const yearIndex = this.state.selectedHistoryKey.split("_")[0];
                  const monthIndex = this.state.selectedHistoryKey.split("_")[1];

                  return this.state.histories[yearIndex].histories[monthIndex].body.history;
                })()}
                </p>
              </Modal>
            );
          }
        })()}
      </div>
    );
  }

  addHistory() {
    const year = Number(this.refs.year.value);
    const month = Number(this.refs.month.value);
    const history = this.refs.history.value;
    const note = this.refs.note.value;

    if(this.state.histories.every(yearHistories => yearHistories.year != year)) {
      this.setState({
        "histories": this.sortHistories((histories => {
            histories.push({
              "year": year,
              "histories": [
                {
                  "month": month,
                  "body": {
                    "history": history,
                    "note": note
                  }
                }
              ]
            });

            return histories;
          })(this.state.histories)
        )
      });
    }
    else {
      this.setState({
        "histories": this.sortHistories((histories => {
            return histories.map(yearHistories => {
              return yearHistories.year != year? yearHistories: (() => {
                yearHistories.histories.push({
                  "month": month,
                  "body": {
                    "history": history,
                    "note": note
                  }
                });

                return yearHistories;
              })();
            });
          })(this.state.histories)
        )
      });
    }
  }

  confirmDeleteHistory(key) {
    return () => {
      this.setState({"selectedHistoryKey": key});
      this.setState({"doShowModal": true});
    }
  }

  acceptDeleteHistory() {
    const yearIndex = this.state.selectedHistoryKey.split("_")[0];
    const monthIndex = this.state.selectedHistoryKey.split("_")[1];

    this.setState({"histories": (histories => {
      histories[yearIndex].histories.splice(monthIndex, 1);

      return histories.filter(yearHistories => yearHistories.histories.length > 0);
    })(this.state.histories)});

    this.setState({"doShowModal": false});
  }

  rejectDeleteHistory() {
    this.setState({"doShowModal": false});
  }

  sortHistories(histories) {
    return histories.sort((a, b) => a.year > b.year).map(yearHistories => {
      yearHistories.histories = yearHistories.histories.sort((a, b) => a.month > b.month);

      return yearHistories;
    });
  }
  
  setAnimationClass(event) {
    event.currentTarget.classList.add(styles.animate);
  }

  removeAnimationClass(event) {
    event.currentTarget.classList.remove(styles.animate);
  }
}

