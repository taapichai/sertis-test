import React, { Component } from "react";
import { Input } from "reactstrap";
import { connect } from "react-redux";

class AudienceNameInput extends Component {
  render() {
    return (
      <Input
        type="text"
        id="audience-name"
        name="audience-name"
        onChange={this.props.onChange}
        placeholder="Please input Audience Name."
        required="required"
        value={this.props.audienceName}
      />
    );
  }
}

function mapStateToProps(state) {
  const { audienceName } = state.ca;
  return { audienceName: audienceName };
}

export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true }
)(AudienceNameInput);
