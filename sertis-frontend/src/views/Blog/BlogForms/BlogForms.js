import React, { Component } from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import { AppSwitch } from '@coreui/react'

class BlogForms extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.backHandle = this.backHandle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  backHandle() {
    const { history } = this.props;
    history.push("/blog/cards");
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong>Card</strong>
                <small> Form</small>
              </CardHeader>
              <CardBody>
                <FormGroup>
                  <Label htmlFor="cards">Name</Label>
                  <Input type="text" id="cards" placeholder="Enter your cards name." />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="content">Content</Label>
                  <Input type="text" id="content" placeholder="Enter your content." />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="category">Category</Label>
                  <Input type="text" id="category" placeholder="Enter category name" />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="country">Status</Label> <AppSwitch className={'mx-1'} color={'primary'} checked />
                </FormGroup>
              </CardBody>
              <CardFooter>
              <Button
                  type="submit"
                  size="sm"
                  color="primary"
                  disabled={this.props.submitIsDisabled}
                  onClick={this.handleSubmitBuildAudience}>
                  <i className="fa fa-dot-circle-o"></i> Submit
                </Button>
                <Button
                  type="reset"
                  size="sm"
                  color="danger"
                  onClick={this.backHandle}>
                  <i className="fa fa-ban"></i> Back
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default BlogForms;
