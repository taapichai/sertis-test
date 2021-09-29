import React, { Component } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { connect } from "react-redux";

class FacebookAdAccountTypeahead extends Component {
  clear() {
    this.typeahead.getInstance().clear();
  }

  render() {
    return (
      <Typeahead
        id="cgo-ad-account"
        clearButton
        ref={typeahead => (this.typeahead = typeahead)}
        multiple={false}
        labelKey={option => `${option.label}(ad_account_id=${option.id})`}
        isLoading={this.props.adAccountIsLoading}
        disabled={this.props.adAccountIsDisabled}
        onChange={this.props.onChange}
        options={this.props.adAccounts}
        placeholder="Please select Facebook - Ad Accounts."
      ></Typeahead>
    );
  }
}

function mapStateToProps(state) {
  const {
    adAccounts,
    adAccountIsLoading,
    adAccountIsDisabled,
    selectedAdAccount
  } = state.ca;
  return {
    adAccounts: adAccounts,
    adAccountIsLoading: adAccountIsLoading,
    adAccountIsDisabled: adAccountIsDisabled,
    selectedAdAccount: selectedAdAccount
  };
}

export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true }
)(FacebookAdAccountTypeahead);
