import React, { Component } from "react";
import { connect } from "react-redux";
import {
  initCustomAudienceState,
  listAdAccount,
  sendT1Query,
  selectedAdAccount,
  selectedAudienceDate,
  selectedBM,
  selectedT1SVOCCriterias,
  resetAudienceForm
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
  AudienceNameSVOCInput,
  FacebookAdAccountTypeahead,
  FacebookBusinessManagerTypeahead,
  T1SVOCTypeahead
} from "..";
import "react-bootstrap-typeahead/css/Typeahead.css";

const MODULE_NAME = process.env.REACT_APP_CGO_MARKETING_T1_SVOC_MODULE_NAME;
const CustomAudienceResultTable = React.lazy(() =>
  import("../CustomAudienceResultTable/CustomAudienceResultTable")
);
const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// const province = [
//   { id: "address_province:", label: "Address Province:Unknown" },
//   { id: "address_province:Amnat Charoen", label: "Address Province:Amnat Charoen" },
//   { id: "address_province:Ang Thong", label: "Address Province:Ang Thong" },
//   { id: "address_province:Bangkok", label: "Address Province:Bangkok" },
//   { id: "address_province:Bueng Kan", label: "Address Province:Bueng Kan" },
//   { id: "address_province:Buri Ram", label: "Address Province:Buri Ram" },
//   { id: "address_province:Chachoengsao", label: "Address Province:Chachoengsao" },
//   { id: "address_province:Chai Nat", label: "Address Province:Chai Nat" },
//   { id: "address_province:Chaiyaphum", label: "Address Province:Chaiyaphum" },
//   { id: "address_province:Chanthaburi", label: "Address Province:Chanthaburi" },
//   { id: "address_province:Chiang Mai", label: "Address Province:Chiang Mai" },
//   { id: "address_province:Chiang Rai", label: "Address Province:Chiang Rai" },
//   { id: "address_province:Chonburi", label: "Address Province:Chonburi" },
//   { id: "address_province:Chumphon", label: "Address Province:Chumphon" },
//   { id: "address_province:Kalasin", label: "Address Province:Kalasin" },
//   { id: "address_province:Kamphaeng Phet", label: "Address Province:Kamphaeng Phet" },
//   { id: "address_province:Kanchanaburi", label: "Address Province:Kanchanaburi" },
//   { id: "address_province:Khon Kaen", label: "Address Province:Khon Kaen" },
//   { id: "address_province:Krabi", label: "Address Province:Krabi" },
//   { id: "address_province:Lampang", label: "Address Province:Lampang" },
//   { id: "address_province:Lamphun", label: "Address Province:Lamphun" },
//   { id: "address_province:Loei", label: "Address Province:Loei" },
//   { id: "address_province:Lopburi", label: "Address Province:Lopburi" },
//   { id: "address_province:Mae Hong Son", label: "Address Province:Mae Hong Son" },
//   { id: "address_province:Maha Sarakham", label: "Address Province:Maha Sarakham" },
//   { id: "address_province:Mukdahan", label: "Address Province:Mukdahan" },
//   { id: "address_province:Nakhon Nayok", label: "Address Province:Nakhon Nayok" },
//   { id: "address_province:Nakhon Pathom", label: "Address Province:Nakhon Pathom" },
//   { id: "address_province:Nakhon Phanom", label: "Address Province:Nakhon Phanom" },
//   { id: "address_province:Nakhon Ratchasima", label: "Address Province:Nakhon Ratchasima" },
//   { id: "address_province:Nakhon Sawan", label: "Address Province:Nakhon Sawan" },
//   { id: "address_province:Nakhon Si Thammarat", label: "Address Province:Nakhon Si Thammarat" },
//   { id: "address_province:Nan", label: "Address Province:Nan" },
//   { id: "address_province:Narathiwat", label: "Address Province:Narathiwat" },
//   { id: "address_province:Nong Bua Lamphu", label: "Address Province:Nong Bua Lamphu" },
//   { id: "address_province:Nong Khai", label: "Address Province:Nong Khai" },
//   { id: "address_province:Nonthaburi", label: "Address Province:Nonthaburi" },
//   { id: "address_province:Pathum Thani", label: "Address Province:Pathum Thani" },
//   { id: "address_province:Pattani", label: "Address Province:Pattani" },
//   { id: "address_province:Phang Nga", label: "Address Province:Phang Nga" },
//   { id: "address_province:Phatthalung", label: "Address Province:Phatthalung" },
//   { id: "address_province:Phayao", label: "Address Province:Phayao" },
//   { id: "address_province:Phetchabun", label: "Address Province:Phetchabun" },
//   { id: "address_province:Phetchaburi", label: "Address Province:Phetchaburi" },
//   { id: "address_province:Phichit", label: "Address Province:Phichit" },
//   { id: "address_province:Phitsanulok", label: "Address Province:Phitsanulok" },
//   { id: "address_province:Phra Nakhon Si Ayutthaya", label: "Address Province:Phra Nakhon Si Ayutthaya" },
//   { id: "address_province:Phrae", label: "Address Province:Phrae" },
//   { id: "address_province:Phuket", label: "Address Province:Phuket" },
//   { id: "address_province:Prachin Buri", label: "Address Province:Prachin Buri" },
//   { id: "address_province:Prachuap Khiri Khan", label: "Address Province:Prachuap Khiri Khan" },
//   { id: "address_province:Ranong", label: "Address Province:Ranong" },
//   { id: "address_province:Ratchaburi", label: "Address Province:Ratchaburi" },
//   { id: "address_province:Rayong", label: "Address Province:Rayong" },
//   { id: "address_province:Roi Et", label: "Address Province:Roi Et" },
//   { id: "address_province:Sa Kaeo", label: "Address Province:Sa Kaeo" },
//   { id: "address_province:Sakon Nakhon", label: "Address Province:Sakon Nakhon" },
//   { id: "address_province:Samut Prakan", label: "Address Province:Samut Prakan" },
//   { id: "address_province:Samut Sakhon", label: "Address Province:Samut Sakhon" },
//   { id: "address_province:Samut Songkhram", label: "Address Province:Samut Songkhram" },
//   { id: "address_province:Saraburi", label: "Address Province:Saraburi" },
//   { id: "address_province:Satun", label: "Address Province:Satun" },
//   { id: "address_province:Sing Buri", label: "Address Province:Sing Buri" },
//   { id: "address_province:Sisaket", label: "Address Province:Sisaket" },
//   { id: "address_province:Songkhla", label: "Address Province:Songkhla" },
//   { id: "address_province:Sukhothai", label: "Address Province:Sukhothai" },
//   { id: "address_province:Suphan Buri", label: "Address Province:Suphan Buri" },
//   { id: "address_province:Surat Thani", label: "Address Province:Surat Thani" },
//   { id: "address_province:Surin", label: "Address Province:Surin" },
//   { id: "address_province:Tak", label: "Address Province:Tak" },
//   { id: "address_province:Trang", label: "Address Province:Trang" },
//   { id: "address_province:Trat", label: "Address Province:Trat" },
//   { id: "address_province:Ubon Ratchathani", label: "Address Province:Ubon Ratchathani" },
//   { id: "address_province:Udon Thani", label: "Address Province:Udon Thani" },
//   { id: "address_province:Uthai Thani", label: "Address Province:Uthai Thani" },
//   { id: "address_province:Uttaradit", label: "Address Province:Uttaradit" },
//   { id: "address_province:Yala", label: "Address Province:Yala" },
//   { id: "address_province:Yasothon", label: "Address Province:Yasothon" },
// ]

// const svocData = [
//   { id: "inferred_gender:", label: "Inferred Gender:Unknown" },
//   { id: "inferred_gender:Male", label: "Inferred Gender:Male" },
//   { id: "inferred_gender:Female", label: "Inferred Gender:Female" },
//   { id: "inferred_marital_status:", label: "Inferred Marital Status:Unknown" },
//   { id: "inferred_marital_status:Single", label: "Inferred Marital Status:Single" },
//   { id: "inferred_marital_status:Married", label: "Inferred Marital Status:Married" },
//   { id: "the1_inter:Yes", label: "The 1 Inter:Yes" },
//   { id: "the1_inter:No", label: "The 1 Inter:No" },
//   { id: "have_kids:Yes", label: "Have Kids:Yes" },
//   { id: "have_kids:No", label: "Have Kids:No" },
//   { id: "kids_stage:Infant", label: "Kids Stage:Infant" },
//   { id: "kids_stage:Junior", label: "Kids Stage:Junior" },
//   { id: "kids_stage:Presch", label: "Kids Stage:Presch" },
//   { id: "kids_stage:Teen", label: "Kids Stage:Teen" },
//   { id: "kids_stage:Toddler", label: "Kids Stage:Toddler" },
//   { id: "kids_stage:Unknown", label: "Kids Stage:Unknown" },
// ];

class CustomAudienceSVOC extends Component {
  constructor(props) {
    super(props);

    this.adAccountRef = React.createRef();
    this.t1SVOCRef = React.createRef();
    this.bmRef = React.createRef();
    this.dateRef = React.createRef();

    this.state = {
      moduleName: MODULE_NAME,
      userGroup: props.userGroup
    };

    this.props.initCustomAudienceState(MODULE_NAME, props.userGroup);

    this.handleBMChange = this.handleBMChange.bind(this);
    this.handleAdAccountChange = this.handleAdAccountChange.bind(this);
    this.handleAudienceDateChange = this.handleAudienceDateChange.bind(this);
    this.handleAudienceNameChange = this.handleAudienceNameChange.bind(this);
    this.handleT1SVOCChange = this.handleT1SVOCChange.bind(this);
    this.handleResetButton = this.handleResetButton.bind(this);
    this.handleSubmitBuildAudience = this.handleSubmitBuildAudience.bind(this);
  }

  handleSubmitBuildAudience(event) {
    this.props.sendT1Query(this.state);
    this.handleResetButton(event);
  }

  handleResetButton(event) {
    this.adAccountRef.current.clear();
    this.bmRef.current.clear();
    this.dateRef.current.clear();
    this.props.resetAudienceForm();
  }

  handleAudienceNameChange(audienceName) {
    this.setState({ audienceName: audienceName.target.value });
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

  handleT1SVOCChange(selectedSVOC) {
    this.props.selectedT1SVOCCriterias(selectedSVOC);
  }

  render() {
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
                  <AudienceNameSVOCInput audienceName={this.props.audienceName} onChange={this.handleAudienceNameChange} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="bu">
                    T1 - SVOC criteria. <Badge>Required</Badge>
                  </Label>
                  <T1SVOCTypeahead
                    ref={this.t1SVOCRef}
                    onChange={this.handleT1SVOCChange}
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
                    data={this.props.t1_data}
                    module_name="CGO_MARKETING"
                  />
                </React.Suspense>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    BMs, 
    bmIsLoading,
    t1_data,
    moduleName,
    selectedBU,
    selectedBrands,
    submitIsDisabled
  } = state.ca;
  const { audienceName} = state.caSVOC;
  return {
    audienceName: audienceName,
    BMs: BMs,
    bmIsLoading: bmIsLoading,
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
  selectedAdAccount: acc => dispatch(selectedAdAccount(acc)),
  selectedAudienceDate: date => dispatch(selectedAudienceDate(date)),
  selectedBM: bm => dispatch(selectedBM(bm)),
  selectedT1SVOCCriterias: t1_svoc => dispatch(selectedT1SVOCCriterias(t1_svoc)),
  sendT1Query: data => dispatch(sendT1Query(data)),
  resetAudienceForm: () => dispatch(resetAudienceForm())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomAudienceSVOC);
