import React, { Component } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { connect } from "react-redux";

class BusinessUnitTypeahead extends Component {
  clear() {
    this.typeAHead.getInstance().clear();
  }

  render() {
    return (
      <Typeahead
        id="cgo-bu"
        clearButton
        ref={typeAHead => (this.typeAHead = typeAHead)}
        multiple={false}
        labelKey={option => `${option.label}(bu_id=${option.id})`}
        isLoading={this.props.buIsLoading}
        onChange={this.props.onChange}
        options={this.props.BUs}
        placeholder="Please select Business Unit."
      ></Typeahead>
    );
  }
}

function mapStateToProps(state) {
  const { BUs, buIsLoading } = state.ca;
  return {
    BUs: BUs,
    buIsLoading: buIsLoading
  };
}

export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true }
)(BusinessUnitTypeahead);
