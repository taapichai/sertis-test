import React, { Component } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { connect } from "react-redux";

class DepartmentTypeahead extends Component {
  clear() {
    this.typeahead.getInstance().clear();
  }

  render() {
    return (
      <Typeahead
        id="cgo-category"
        clearButton
        ref={typeahead => (this.typeahead = typeahead)}
        multiple={true}
        disabled={this.props.departmentIsDisabled}
        labelKey={option => `${option.label}(dept_id=${option.id})`}
        isLoading={this.props.departmentIsLoading}
        onChange={this.props.onChange}
        options={this.props.departments}
        placeholder="Please select Category."
        selected={this.props.selectedDepartments}
      ></Typeahead>
    );
  }
}

function mapStateToProps(state) {
  const {
    departments,
    departmentIsLoading,
    departmentIsDisabled,
    selectedDepartments
  } = state.ca;
  return {
    departments: departments,
    departmentIsLoading: departmentIsLoading,
    departmentIsDisabled: departmentIsDisabled,
    selectedDepartments: selectedDepartments
  };
}

export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true }
)(DepartmentTypeahead);
