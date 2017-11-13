import React from "react";
import cssResolver from "css-module-resolver";
import styles from "./style.css";

const cr = cssResolver(styles);

export default class Component extends React.Component {
  render() {
    const sendDataToServer = this.sendDataToServer.bind(this);

    return (
      <div className={cr("container")}>
        <h2 className={cr("heading")}>
          履歴書を作成
        </h2>

        <div className={cr("form_row")}>
          <button className={cr("form_submit", "-center")}
              onClick={sendDataToServer}>
            履歴書を作成する
          </button>
        </div>

        <div className={cr("form_row", "-center")}>
          <a className={cr("link")} href="#"
              hidden={true}
              download={true}
              ref="download">
            履歴書をダウンロードする
          </a>
        </div>
      </div>
    );
  }

  createResume() {
  }

  sendDataToServer() {
    fetch("/api/resume/create", {
      "method": "POST",
      "headers": (headers => {
        headers.append("Content-Type", "application/json");

        return headers;
      })(new Headers()),
      "body": JSON.stringify(window.localStorage)
    }).then(response => {
      console.log(response);
      return response.arrayBuffer();
    }).then(data => {
      const file = new Blob([data], {
        "type": "application/pdf"
      });

      this.refs.download.href = window.URL.createObjectURL(file);
      this.refs.download.hidden = false;
    });
  }
}

