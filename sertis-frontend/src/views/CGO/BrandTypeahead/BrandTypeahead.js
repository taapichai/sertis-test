import React, { Component } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { connect } from "react-redux";

class BrandTypeahead extends Component {
  
  clear() {
    this.typeAHead.getInstance().clear();
  }

  render() {
    return (
      <Typeahead
        id="cgo-brand"
        clearButton
        ref={typeAHead => (this.typeAHead = typeAHead)}
        multiple={true}
        disabled={this.props.brandIsDisabled}
        labelKey={option => `${option.label}(brand_id=${option.id})`}
        isLoading={this.props.brandIsLoading}
        onChange={this.props.onChange}
        options={this.props.brands}
        placeholder="Please select Brand."
        selected={this.props.selectedBrands}
      ></Typeahead>
    );
  }
}

function mapStateToProps(state) {
  const { brands, brandIsLoading, brandIsDisabled, selectedBrands } = state.ca;
  return {
    brands: brands,
    brandIsLoading: brandIsLoading,
    brandIsDisabled: brandIsDisabled,
    selectedBrands: selectedBrands,
  };
}

export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true }
)(BrandTypeahead);
