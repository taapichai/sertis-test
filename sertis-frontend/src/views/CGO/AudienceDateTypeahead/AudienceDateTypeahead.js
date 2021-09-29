import React, { Component } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { connect } from "react-redux";

const datePeriod = [
  { id: "1", label: "Last 1 Month" },
  { id: "3", label: "Last 3 Months" },
  { id: "6", label: "Last 6 Months" },
  { id: "12", label: "Last 12 Months" },
  { id: "18", label: "Last 18 Months" },
  { id: "24", label: "Last 24 Months" },
];

class DateTypeahead extends Component {
  
  clear() {
    this.typeahead.getInstance().clear();
  }

  render() {
    return (
      <Typeahead
        id="cgo-date-period"
        clearButton
        ref={typeahead => (this.typeahead = typeahead)}
        labelKey={option => `${option.label}`}
        onChange={this.props.onChange}
        options={datePeriod}
        placeholder="Please select date period."
      ></Typeahead>
    );
  }
}

export default connect(
  null,
  null,
  null,
  { forwardRef: true }
)(DateTypeahead);
