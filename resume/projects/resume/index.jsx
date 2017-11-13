import React from "react";
import ReactDOM from "react-dom";

import App from "./app";

import styles from "./style.css";
import StyleResolver from "./util/style-resolver";
import HeaderComponent from "./components/header/view";
import FooterComponent from "./components/footer/view";
import MainComponent from "./components/main/view";

const sr = StyleResolver(styles);

class RootComponent extends React.Component {
  render() {
    const app = new App();

    return (
      <div className={sr("container")}>
        <div className={sr("header")}>
          <HeaderComponent />
        </div>

        <div className={sr("main")}>
          <MainComponent app={app} />
        </div>

        <div className={sr("footer")}>
          <FooterComponent app={app} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
    <RootComponent />,
    document.getElementById("app")
);
