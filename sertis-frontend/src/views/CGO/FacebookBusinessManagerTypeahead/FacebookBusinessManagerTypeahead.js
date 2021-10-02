import React, { Component } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { connect } from "react-redux";

export class FacebookBusinessManagerTypeahead extends Component {
  clear() {
    this.typeahead.getInstance().clear();
  }

  render() {
    return (
      <Typeahead
        id="cgo-bm"
        clearButton
        ref={typeahead => (this.typeahead = typeahead)}
        multiple={false}
        labelKey={option => `${option.label}(bu_id=${option.id})`}
        isLoading={this.props.bmIsLoading}
        onChange={this.props.onChange}
        options={this.props.BMs}
        placeholder="Please select Facebook - Business Manager."
      ></Typeahead>
    );
  }
}

function mapStateToProps(state) {
  const { BMs, bmIsLoading } = state.ca;
  return { BMs: BMs, bmIsLoading: bmIsLoading };
}

export default connect(mapStateToProps, null, null, { forwardRef: true })(
  FacebookBusinessManagerTypeahead
);
