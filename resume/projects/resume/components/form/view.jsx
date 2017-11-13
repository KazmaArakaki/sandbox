import React from "react";
import ReactSwipe from "react-swipe";
import cssResolver from "css-module-resolver";

import styles from "./style.css";
import NameFormComponent from "./name-form";
import BirthdayFormComponent from "./birthday-form";
import ContactFormComponent from "./contact-form";
import AddressFormComponent from "./address-form";
import AddressOptionalFormComponent from "./address-optional-form";
import EducationHistoryFormComponent from "./history-education-form";
import WorkHistoryFormComponent from "./history-work-form";
import CertificationsFormComponent from "./certifications-form";
import OptionalFormComponent from "./optional-form";
import AppealpointFormComponent from "./appealpoint-form";
import DesireFormComponent from "./desire-form";
import SubmitFormComponent from "./submit-form";

const cr = cssResolver(styles);

export default class Component extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.app.setPrevButtonClickListener(() => {
      this.refs.reactSwipe.swipe.prev();
    });

    this.props.app.setNextButtonClickListener(() => {
      this.refs.reactSwipe.swipe.next();
    });

    this.props.app.setFormSwipeContainer(this.refs.swipeContainer);
  }

  render() {
    const slideCallback = this.slideCallback(this);
    const swipeOptions = {
      "continuous": false,
      "callback": slideCallback
    };
    const forms = [
      NameFormComponent,
      BirthdayFormComponent,
      ContactFormComponent,
      AddressFormComponent,
      AddressOptionalFormComponent,
      EducationHistoryFormComponent,
      WorkHistoryFormComponent,
      CertificationsFormComponent,
      OptionalFormComponent,
      AppealpointFormComponent,
      DesireFormComponent,
      SubmitFormComponent
    ];

    return (
      <div className={cr("container", "-base")}
          ref="swipeContainer"
          style={{"height": "406px"}}>
        <ReactSwipe className="carousel"
            swipeOptions={swipeOptions}
            ref="reactSwipe">
          {(() => {
            return forms.map((Form, i) => {
              return (
                <div key={"c_" + i}>
                  <Form app={this.props.app} />
                </div>
              );
            });
          })()}
        </ReactSwipe>
      </div>
    );
  }

  slideCallback(component) {
    return (i, target) => {
      component.refs.swipeContainer.style.height = target.clientHeight + "px";
    };
  }
}
