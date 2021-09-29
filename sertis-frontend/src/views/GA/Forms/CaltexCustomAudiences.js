import React, { Component } from 'react';
import {
  Badge,
  Button,
  Label,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Input,
  FormGroup,
  Row,
} from 'reactstrap';
import { Typeahead} from 'react-bootstrap-typeahead';
import { BusinessUnitTypeahead, FacebookBusinessManagerTypeahead } from '../../CGO';
// import { AppSwitch } from '@coreui/react';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const CGO_API = process.env.REACT_APP_CGO_API

const CustomAudienceResultTable = React.lazy(() => import('../../CGO/CustomAudienceResultTable'));

// const t1_status = [
//   {
//     id: 1, label: "T1 Member"
//   },{
//     id: 2, label: "T1 Credit Card"
//   }
// ]

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

class CaltexCustomAudiences extends Component {
  constructor(props) {
    super(props);

    this.buRef = React.createRef();
    this.bmRef = React.createRef();

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      value: '',
      suggestions: [],
      BMs: [],
      adAccounts: [],
      branches: [],
      brands: [],
      departments: [],
      selectedStartDate: '',
      selectedEndDate: '',
      enableSubmit: true,
      bmIsLoading: true,
      adAccountIsLoading: false,
      adAccountIsDisabled: true,
      brandIsLoading: false,
      brandIsDisabled: true,
      deptIsLoading: false,
      deptIsDisabled: true,
      submitIsDisabled: true
    };

    this.t1_data = null;

    var headers = {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
    }

    fetch(CGO_API + '/business-manager/', {
          method: 'GET',
          mode: 'cors',
          headers: headers,
        })
        .then(res => res.json())
        .then((data) => {
          this.setState({ bmIsLoading: false });
          this.setState({ BMs: data })
        })
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        })

    this.handleBMChange = this.handleBMChange.bind(this);
    this.handleAdAccountChange = this.handleAdAccountChange.bind(this);
    this.handleBUChange = this.handleBUChange.bind(this);
    this.handleBrandChange = this.handleBrandChange.bind(this);
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleAudienceNameChange = this.handleAudienceNameChange.bind(this);
    this.handleSubmitButton = this.handleSubmitButton.bind(this);
    this.handleResetButton = this.handleResetButton.bind(this);

  }

  handleResetButton(resetEvent) {
    this.setState({ adAccountIsDisabled: true, brandIsDisabled: true, deptIsDisabled: true, submitIsDisabled: true})
    this.setState({ selectedBU: []})
    this.adAccountTypeAHead.getInstance().clear();
    this.buRef.current.clear();
    this.bmRef.current.clear();
    this.brandTypeAHead.getInstance().clear();
    this.deptTypeAHead.getInstance().clear();
  }

  handleAudienceNameChange(audienceName) {
    this.setState({ audienceName: audienceName.target.value})
  }

  handleSubmitButton() {

    this.setState({enableSubmit: false})

    fetch(CGO_API + '/t1_data/build-custom-audience', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        "start_date" : this.state.selectedStartDate,
        "end_date" : this.state.selectedEndDate,
        "moduleName": 'CALTEX',
        "selectedBM": this.state.selectedBM ? this.state.selectedBM : '',
        "selectedAdAccount": this.state.selectedAdAccount ? this.state.selectedAdAccount : '',
        "selectedBU": this.state.selectedBU.slice(),
        "selectedBrands": this.state.selectedBrands ? this.state.selectedBrands.slice() : '',
        "selectedDepartments": this.state.selectedDepartments ? this.state.selectedDepartments.slice(): '',
        "audienceName": this.state.audienceName
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then((data) => {
      this.setState({ departments: data })
      this.setState({submitIsDisabled: true})
    })
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    })

    this.handleResetButton();
  }

  handleStartDateChange(selectedStartDate) {
    this.setState({ selectedStartDate: selectedStartDate.target.value})
  }

  handleEndDateChange(selectedEndDate) {
    this.setState({ selectedEndDate: selectedEndDate.target.value})
  }

  handleBMChange(selectedBM) {
    
    if (selectedBM && selectedBM.length > 0) {
      this.setState({adAccountIsLoading: true});
      let ids = selectedBM[0].id;

      fetch(CGO_API + '/business-manager/' + ids + '/ad-accounts/', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => res.json())
      .then((data) => {
        this.setState({ adAccountIsLoading: false, adAccountIsDisabled: false });
        this.setState({ adAccounts: data })
      })
      .catch(function(err) {
        this.setState({ adAccountIsLoading: false });
        console.log('Fetch Error :-S', err);
      })
    
      this.setState({selectedBM});    
    }

  }

  handleAdAccountChange(selectedAdAccount) {
    this.setState({selectedAdAccount});
  }

  handleBUChange(selectedBU) {
    
    this.setState({brandIsLoading: true, deptIsLoading: true});

    let ids = ''

    for (let index = 0; index < selectedBU.length; index++) {
      if (index === 0) { 
        ids = selectedBU[index].id;
      } else {
        ids = ids + ',' + selectedBU[index].id;
      }
    }

    fetch(CGO_API + '/t1_data/brand?bu_ids=' + ids, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then((data) => {
      this.setState({brandIsLoading: false});
      this.setState({brandIsDisabled: false});
      this.setState({ brands: data })
    })
    .catch(function(err) {
      this.setState({brandIsLoading: false});
      console.log('Fetch Error :-S', err);
    })

    fetch(CGO_API + '/t1_data/dept?bu_ids=' +  ids, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then((data) => {
      this.setState({deptIsLoading: false});
      this.setState({deptIsDisabled: false});
      this.setState({ departments: data })
    })
    .catch(function(err) {
      this.setState({deptIsLoading: false});
      console.log('Fetch Error :-S', err);
    })


    fetch(CGO_API + '/t1_data/branch?bu_ids=' + ids, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      },
    })
    .then(res => res.json())
    .then((data) => {
      this.setState({ branches: data })
    })
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    })

    this.setState({selectedBU});
  } 

  handleBrandChange(selectedBrands) {
    
    let bu_ids = ''
    let brand_ids = ''

    for (let index = 0; index < this.state.selectedBU.length; index++) {
      if (index === 0) { 
        bu_ids = this.state.selectedBU[index].id;
      } else {
        bu_ids = bu_ids + ',' + this.state.selectedBU[index].id;
      }
    }

    for (let index = 0; index < selectedBrands.length; index++) {
      if (index === 0) { 
        brand_ids = selectedBrands[index].id;
      } else {
        brand_ids = brand_ids + ',' + selectedBrands[index].id;
      }
    }

    fetch(CGO_API + '/t1_data/dept?bu_ids=' +  bu_ids + '&brand_ids=' + brand_ids, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      },
    })
    .then(res => res.json())
    .then((data) => {
      this.setState({ departments: data })
    })
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    })

    this.setState({selectedBrands});

    this.setState({ submitIsDisabled : this.state.adAccountIsDisabled && this.state.brandIsDisabled && this.state.deptIsDisabled })

  } 

  handleDepartmentChange(selectedDepartments) {
    this.setState({ submitIsDisabled : !this.state.adAccountIsDisabled && (!this.state.brandIsDisabled || !this.state.deptIsDisabled) })
    this.setState({selectedDepartments});
  }
  
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  componentDidMount() {

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
                  <Label>Transaction Date (mm/dd/yyyy)</Label>
                    <Col md="6">
                      <Label htmlFor="start-date-input">Start Date <Badge>Required</Badge></Label>
                      <Input type="date" id="transaction-date" name="transaction-date" 
                              min="2018-01-01" max={new Date()}
                              autoComplete="on"
                              onChange={this.handleStartDateChange}
                              placeholder="Transaction Date" required="required"/>
                    </Col>
                    <Col md="6">
                      <Label htmlFor="start-date-input">End Date <Badge>Required</Badge></Label>
                      <Input type="date" id="start-date" name="end-date-input" 
                              min="2018-01-01" max={new Date()}
                              autoComplete="on"
                              onChange={this.handleEndDateChange}
                              placeholder="End Date" required="required"/>
                    </Col>
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
                  <Label htmlFor="bm">Facebook - Business Manager <Badge>Required</Badge></Label>
                  <FacebookBusinessManagerTypeahead ref={this.bmRef} onChange={this.handleBMChange} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="bm">Facebook - Ad Accounts <Badge>Required</Badge></Label>
                  <Typeahead id="adAccount"
                    clearButton
                    multiple={false}
                    ref={(adAccountTypeAHead) => this.adAccountTypeAHead = adAccountTypeAHead}
                    labelKey={option => `${option.label}(${option.id})`}
                    isLoading={this.state.adAccountIsLoading}
                    disabled={this.state.adAccountIsDisabled}
                    onChange={this.handleAdAccountChange}
                    options={this.state.adAccounts}
                    selected={this.state.selectedAdAccount}
                    placeholder="Please select Facebook - Ad Accounts."
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="audience-name">Facebook - Audiences Name <Badge>Required</Badge></Label>
                  <Input type="text" id="audience-name" name="audience-name" 
                          onChange={this.handleAudienceNameChange}
                          placeholder="Please input Audience Name." required="required"/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="bu">CG - Business Unit. <Badge>Required</Badge></Label>
                  <BusinessUnitTypeahead ref={this.buRef} onChange={this.handleBUChange}/>
                </FormGroup>  
                <FormGroup>
                  <Label htmlFor="brand">Brand</Label>
                  <Typeahead id="brand"
                    clearButton
                    ref={(brandTypeAHead) => this.brandTypeAHead = brandTypeAHead}
                    labelKey={option => `${option.label}(dept_id=${option.id})`}
                    isLoading={this.state.brandIsLoading}
                    disabled={this.state.brandIsDisabled}
                    multiple={true}
                    onChange={this.handleBrandChange}
                    options={this.state.brands}
                    selected={this.state.selectedBrands}
                    placeholder="Please select Brands."
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="department">Departments</Label>
                  <Typeahead id="department"
                    clearButton
                    ref={(deptTypeAHead) => this.deptTypeAHead = deptTypeAHead}
                    labelKey={option => `${option.label}(dept_id=${option.id})`}
                    isLoading={this.state.deptIsLoading}
                    disabled={this.state.brandIsDisabled}
                    multiple={true}
                    onChange={this.handleDepartmentChange}
                    options={this.state.departments}
                    selected={this.state.selectedDepartments}
                    placeholder="Please select Departments."
                  />
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" 
                    onClick={this.handleSubmitButton} >
                  <i className="fa fa-dot-circle-o"></i> Submit
                </Button>
                <Button type="reset" size="sm" color="danger" onClick={this.handleResetButton}>
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
                  <CustomAudienceResultTable module_name="CALTEX"/>
                </React.Suspense>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CaltexCustomAudiences;
