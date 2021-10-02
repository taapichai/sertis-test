import React, { Component } from 'react';
import {
  // Badge,
  Button,
  Label,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Input,
  ListGroup,
  ListGroupItem,
  FormGroup,
  Row,
} from 'reactstrap';
import { Typeahead} from 'react-bootstrap-typeahead';
import { AppSwitch } from '@coreui/react';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const t1_status = [
  {
    id: 1, label: "T1 Member"
  },{
    id: 2, label: "T1 Credit Card"
  }
]

class BuildOfflineRevenue extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      value: '',
      suggestions: [],
      BUs: [],
      branches: [],
      brands: [],
      departments: [],
      selectedStartDate: '',
      selectedEndDate: '',
      t1Result: []
    };

    this.t1_data = null;

    var headers = {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
    }

    fetch('http://cgo-airflow-alb-889584478.ap-southeast-1.elb.amazonaws.com:7070/t1_data/bu', {
          method: 'GET',
          mode: 'cors',
          headers: headers,
        })
        .then(res => res.json())
        .then((data) => {
          this.setState({ BUs: data })
        })
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        })

    fetch('http://cgo-airflow-alb-889584478.ap-southeast-1.elb.amazonaws.com:7070/t1_data/list-offline-revenue', {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
          },
        })
        .then(res => res.json())
        .then((data) => {
          console.log('data ==> ' + data)
          this.setState({t1Result: data})
          console.log('this.state.t1Result ==> ' + this.state.t1Result)
        })
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        })

    // this.t1 = this.t1_data.map((t1) =>
    //   <ListGroupItem active tag={t1.id} href={t1.label} action>{t1.id}</ListGroupItem>
    // );


    this.handleBUChange = this.handleBUChange.bind(this);
    this.handleBrandChange = this.handleBrandChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleSubmitButton = this.handleSubmitButton.bind(this);

  }

  handleSubmitButton() {

    fetch('http://0.0.0.0:7000/t1_data/build-offline-revenue', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        "start_date" : this.state.selectedStartDate,
        // "end_date" : this.state.selectedEndDate,
        "selectedBUs": this.state.selectedBUs.slice(),
        // "selectedBrands": this.state.selectedBrands.slice()
      }),
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

  }

  handleStartDateChange(selectedStartDate) {
    this.setState({ selectedStartDate: selectedStartDate.target.value})
  }

  handleEndDateChange(selectedEndDate) {
    this.setState({ selectedEndDate: selectedEndDate.target.value})
  }

  handleBUChange(selectedBUs) {
    
    let ids = ''

    for (let index = 0; index < selectedBUs.length; index++) {
      if (index === 0) { 
        ids = selectedBUs[index].id;
      } else {
        ids = ids + ',' + selectedBUs[index].id;
      }
    }

    fetch('http://cgo-airflow-alb-889584478.ap-southeast-1.elb.amazonaws.com:7070/t1_data/brand?bu_ids=' + ids, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      },
    })
    .then(res => res.json())
    .then((data) => {
      this.setState({ brands: data })
    })
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    })

    fetch('http://cgo-airflow-alb-889584478.ap-southeast-1.elb.amazonaws.com:7070/t1_data/branch?bu_ids=' + ids, {
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

    this.setState({selectedBUs});
  } 

  handleBrandChange(selectedBrands) {
    
    let bu_ids = ''
    let brand_ids = ''

    for (let index = 0; index < this.state.selectedBUs.length; index++) {
      if (index === 0) { 
        bu_ids = this.state.selectedBUs[index].id;
      } else {
        bu_ids = bu_ids + ',' + this.state.selectedBUs[index].id;
      }
    }

    for (let index = 0; index < selectedBrands.length; index++) {
      if (index === 0) { 
        brand_ids = selectedBrands[index].id;
      } else {
        brand_ids = brand_ids + ',' + selectedBrands[index].id;
      }
    }

    fetch('http://cgo-airflow-alb-889584478.ap-southeast-1.elb.amazonaws.com:7070/t1_data/dept?bu_ids=' +  bu_ids + '&brand_ids=' + brand_ids, {
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
    console.log('this.this.state.t1Result ==> ' + this.state.t1Result)

  }

  render() {
    return (
      <div className="animated fadeIn">
        
        <Row>
          <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong>Build Offine Revenue</strong>
              </CardHeader>
              <CardBody>
                <FormGroup row>
                  <Col md="6">
                    <Label>Active/Non-Active Users</Label>
                  </Col>
                  <Col md="12">
                    <AppSwitch id="user_status" className={'mx-1'} variant={'pill'} color={'success'} checked />                   
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label>Transaction Date (mm/dd/yyyy)</Label>
                    <Col md="6">
                      {/* <Label htmlFor="start-date-input">Start Date <Badge>Required</Badge></Label> */}
                      <Input type="date" id="transaction-date" name="transaction-date" 
                              min="2019-01-01" max={new Date()}
                              autoComplete="on"
                              onChange={this.handleStartDateChange}
                              placeholder="Transaction Date" required="required"/>
                    </Col>
                    {/* <Col md="6">
                      <Label htmlFor="start-date-input">End Date <Badge>Required</Badge></Label>
                      <Input type="date" id="start-date" name="end-date-input" 
                              min="2019-01-01" max={new Date()}
                              autoComplete="on"
                              onChange={this.handleEndDateChange}
                              placeholder="End Date" required="required"/>
                    </Col> */}
                </FormGroup>
                <FormGroup>
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
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="bu">BUs</Label>
                  <Typeahead id="bu"
                    clearButton
                    multiple={false}
                    labelKey={option => `${option.label}(bu_id=${option.id})`}
                    onChange={this.handleBUChange}
                    options={this.state.BUs}
                    selected={this.state.selectedBUs}
                    // onInputChange={this.handleBUChange}
                    placeholder="Please select BUs."
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="bu">Branches</Label>
                  <Typeahead id="branch"
                    clearButton
                    multiple={true}
                    labelKey={option => `${option.label}(branch_id=${option.id})`}
                    // onChange={this.handleBrandChange}
                    options={this.state.branches}
                    selected={this.state.selectedBranches}
                    placeholder="Please select branches."
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="brand">Brand</Label>
                  <Typeahead id="brand"
                    clearButton
                    labelKey={option => `${option.label}(dept_id=${option.id})`}
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
                    labelKey={option => `${option.label}(dept_id=${option.id})`}
                    multiple={true}
                    onChange={(selectedDepartments) => {
                      this.setState({selectedDepartments});
                    }}
                    options={this.state.departments}
                    selected={this.state.selectedDepartments}
                    placeholder="Please select Departments."
                  />
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.handleSubmitButton}>
                  <i className="fa fa-dot-circle-o"></i> Submit
                </Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
          </Col>
          <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong>Result of Build Offline Revenue</strong>
              </CardHeader>
              <CardBody>
                <ListGroup>
                  {this.state.t1Result.map(t1 => {
                    return <ListGroupItem tag="a" href={t1.label} action>{t1.id}</ListGroupItem>
                  })}
                  {/* <ListGroupItem active tag="a" href="#" action>Offine Revenue</ListGroupItem> */}
                  {this.t1}
                  {/* <ListGroupItem tag="a" href="#" action>Morbi leo risus</ListGroupItem> */}
                  {/* <ListGroupItem tag="a" href="#" action>Porta ac consectetur ac</ListGroupItem>
                  <ListGroupItem disabled tag="a" href="#" action>Vestibulum at eros</ListGroupItem> */}
                </ListGroup>
              </CardBody>

            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default BuildOfflineRevenue;
