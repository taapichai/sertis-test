import React, { Component } from "react";
import { connect } from "react-redux";
import {
  initCustomAudienceState,
  listAdAccount,
  listBrand,
  listDepartments,
  sendT1Query,
  selectedAdAccount,
  selectedAudienceDate,
  selectedBrands,
  selectedBM,
  selectedBU,
  selectedDepartments,
  resetAudienceForm,
  updateAudienceName,
  deleteAudience,
} from "../../../redux/action";
import {
  Badge,
  Button,
  Label,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  FormGroup,
  Row
} from "reactstrap";
import {
  AudienceDateTypeahead,
  AudienceNameInput,
  BrandTypeahead,
  BusinessUnitTypeahead,
  DepartmentTypeahead,
  FacebookAdAccountTypeahead,
  FacebookBusinessManagerTypeahead
} from "..";
import "react-bootstrap-typeahead/css/Typeahead.css";
import ListPagination from "../../Base/Paginations/ListPagination"

const MODULE_NAME = process.env.REACT_APP_MODULE_NAME;
const CustomAudienceResultTable = React.lazy(() =>
  import("../CustomAudienceResultTable/CustomAudienceResultTable")
);
const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

class CustomAudience extends Component {
  constructor(props) {
    super(props);

    this.adAccountRef = React.createRef();
    this.buRef = React.createRef();
    this.bmRef = React.createRef();
    this.brandRef = React.createRef();
    this.dateRef = React.createRef();
    this.departmentRef = React.createRef();

    this.state = {
      moduleName: MODULE_NAME,
      userGroup: props.userGroup,
      totalRecords: "",
      totalPages: "",
      pageLimit: "",
      currentPage: "",
      startIndex: "",
      endIndex: ""
    };

    this.props.initCustomAudienceState(MODULE_NAME, props.userGroup);

    this.handleBMChange = this.handleBMChange.bind(this);
    this.handleAdAccountChange = this.handleAdAccountChange.bind(this);
    this.handleAudienceDateChange = this.handleAudienceDateChange.bind(this);
    this.handleAudienceNameChange = this.handleAudienceNameChange.bind(this);
    this.handleBUChange = this.handleBUChange.bind(this);
    this.handleBrandChange = this.handleBrandChange.bind(this);
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
    this.handleResetButton = this.handleResetButton.bind(this);
    this.handleSubmitBuildAudience = this.handleSubmitBuildAudience.bind(this);
    this.handleDeleteButton = this.handleDeleteButton.bind(this);
  }

  handleSubmitBuildAudience(event) {
    this.props.sendT1Query(this.state);
    this.handleResetButton(event);
  }

  handleResetButton(event) {
    this.adAccountRef.current.clear();
    this.bmRef.current.clear();
    this.brandRef.current.clear();
    this.buRef.current.clear();
    this.departmentRef.current.clear();
    this.dateRef.current.clear();
    this.props.resetAudienceForm();
  }

  handleAudienceNameChange(audienceName) {
    this.props.updateAudienceName(audienceName.target.value)
  }

  handleBMChange(selectedBM) {
    this.props.selectedBM(selectedBM);
    if (selectedBM.length > 0) {
      let bmId = selectedBM[0].id;
      this.props.listAdAccount(bmId);
    }
  }

  handleAdAccountChange(selectedAdAccount) {
    this.props.selectedAdAccount(selectedAdAccount);
  }

  handleAudienceDateChange(selectedAudienceDate) {
    this.props.selectedAudienceDate(selectedAudienceDate);
  }

  handleBUChange(selectedBU) {
    let bu_id = "";

    this.props.selectedBU(selectedBU);
    if (selectedBU && selectedBU.length > 0) {
      for (let index = 0; index < selectedBU.length; index++) {
        if (index === 0) {
          bu_id = selectedBU[index].id;
        } else {
          bu_id = bu_id + "," + selectedBU[index].id;
        }
      }

      this.props.listBrand(bu_id);
      this.props.listDepartments(bu_id, "");
    }
  }

  handleBrandChange(selectedBrands) {
    let bu_ids = "";
    let brand_ids = "";

    this.props.selectedBrands(selectedBrands);
    if (selectedBrands && selectedBrands.length > 0) {
      for (let index = 0; index < this.props.buState.length; index++) {
        if (index === 0) {
          bu_ids = this.props.buState[index].id;
        } else {
          bu_ids = bu_ids + "," + this.props.buState[index].id;
        }
      }

      for (let index = 0; index < selectedBrands.length; index++) {
        if (index === 0) {
          brand_ids = selectedBrands[index].id;
        } else {
          brand_ids = brand_ids + "," + selectedBrands[index].id;
        }
      }
      this.props.listDepartments(bu_ids, brand_ids);
    }
  }

  handleDepartmentChange(selectedDepartments) {
    this.props.selectedDepartments(selectedDepartments);
  }

  handleDeleteButton(event) {
    this.props.deleteAudience(event.target.value, this.state.moduleName, this.state.userGroup);
  }
  componentDidMount() {
    this.setState({
      totalRecords: this.props.t1_data.length
    });
  }

  onChangePage = data => {
    this.setState({
      pageLimit: data.pageLimit,
      totalPages: data.totalPages,
      currentPage: data.page,
      startIndex: data.startIndex,
      endIndex: data.endIndex
    });
  };

  render() {
    var {
      pageLimit,
      startIndex,
      endIndex
    } = this.state;
    var rowsPerPage = [];

    rowsPerPage = this.props.t1_data.slice(startIndex, endIndex + 1);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong>Build Custom Audiences</strong>
              </CardHeader>
              <CardBody>
                <FormGroup>
                  <Label htmlFor="date-period">Date Period</Label>
                  <AudienceDateTypeahead
                    ref={this.dateRef}
                    onChange={this.handleAudienceDateChange}
                  />
                </FormGroup>
                {/* <FormGroup>
                  <Label htmlFor="bu">T1 Member/T1 Credit Card</Label>
                  <Typeahead id="bu"
                    clearButton
                    multiple={true}
                    labelKey={option => `${option.label}(id=${option.id})`}
                    // onChange={this.handleBUChange}
                    options={t1_status}
                    selected={this.state.selectedT1Member}
                    // onInputChange={this.handleBUChange}
                    placeholder="Please select T1 Member/T1 Credit Card."
                  />
                </FormGroup> */}
                <FormGroup>
                  <Label htmlFor="bm">
                    Facebook - Business Manager <Badge>Required</Badge>
                  </Label>
                  <FacebookBusinessManagerTypeahead
                    ref={this.bmRef}
                    onChange={this.handleBMChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="ad-account">
                    Facebook - Ad Accounts <Badge>Required</Badge>
                  </Label>
                  <FacebookAdAccountTypeahead
                    ref={this.adAccountRef}
                    onChange={this.handleAdAccountChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="audience-name">
                    Facebook - Audiences Name <Badge>Required</Badge>
                  </Label>
                  <AudienceNameInput audienceName={this.props.audienceName} onChange={this.handleAudienceNameChange} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="bu">
                    CG - Business Unit. <Badge>Required</Badge>
                  </Label>
                  <BusinessUnitTypeahead
                    ref={this.buRef}
                    onChange={this.handleBUChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="brand">Brand</Label>
                  <BrandTypeahead
                    ref={this.brandRef}
                    onChange={this.handleBrandChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="department">Category</Label>
                  <DepartmentTypeahead
                    ref={this.departmentRef}
                    onChange={this.handleDepartmentChange}
                  />
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button
                  type="submit"
                  size="sm"
                  color="primary"
                  disabled={this.props.submitIsDisabled}
                  onClick={this.handleSubmitBuildAudience}
                >
                  <i className="fa fa-dot-circle-o"></i> Submit
                </Button>
                <Button
                  type="reset"
                  size="sm"
                  color="danger"
                  onClick={this.handleResetButton}
                >
                  <i className="fa fa-ban"></i> Reset
                </Button>
              </CardFooter>
            </Card>
          </Col>
          <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong>Result of Build Custom Audiences.</strong>
              </CardHeader>
              <CardBody>
                <React.Suspense fallback={loading()}>
                  <CustomAudienceResultTable
                    ref={this.resultCustomAudience}
                    data={rowsPerPage}
                    module_name="CGO_MARKETING"
                    onClick={this.handleDeleteButton}
                  />
                </React.Suspense>
              </CardBody>
              <ListPagination
                  totalRecords={this.props.t1_data.length}
                  pageLimit={pageLimit || 8}
                  initialPage={1}
                  pagesToShow={5}
                  onChangePage={this.onChangePage}
                />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    audienceName,
    t1_data,
    moduleName,
    selectedBU,
    selectedBrands,
    submitIsDisabled
  } = state.ca;
  return {
    audienceName: audienceName,
    t1_data: t1_data,
    moduleName: moduleName,
    buState: selectedBU,
    selectedBrands: selectedBrands,
    submitIsDisabled: submitIsDisabled
  };
}

export const mapDispatchToProps = dispatch => ({
  initCustomAudienceState: (moduleName, userGroup) =>
    dispatch(initCustomAudienceState(moduleName, userGroup)),
  listAdAccount: bm_id => dispatch(listAdAccount(bm_id)),
  listBrand: bu_id => dispatch(listBrand(bu_id)),
  listDepartments: (bu_id, brand_ids) =>
    dispatch(listDepartments(bu_id, brand_ids)),
  selectedAdAccount: acc => dispatch(selectedAdAccount(acc)),
  selectedAudienceDate: date => dispatch(selectedAudienceDate(date)),
  selectedBrands: brands => dispatch(selectedBrands(brands)),
  selectedBM: bm => dispatch(selectedBM(bm)),
  selectedBU: bu => dispatch(selectedBU(bu)),
  selectedDepartments: depts => dispatch(selectedDepartments(depts)),
  sendT1Query: data => dispatch(sendT1Query(data)),
  resetAudienceForm: () => dispatch(resetAudienceForm()),
  updateAudienceName: audienceName => dispatch(updateAudienceName(audienceName)),
  deleteAudience: (t1_id, moduleName, userGroup) => dispatch(deleteAudience(t1_id, moduleName, userGroup)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomAudience);
