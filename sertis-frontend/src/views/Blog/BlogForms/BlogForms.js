import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  updateCardName,
  updateContent,
  updateCategory
} from "../../../redux/action";

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
    this.handleBack = this.handleBack.bind(this);
    this.handleCardNameChange = this.handleCardNameChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  handleCardNameChange(cardName) {
    this.props.updateCardName(cardName.target.value)
  }

  handleContentChange(content) {
    this.props.updateContent(content.target.value)
  }

  handleCategoryChange(category) {
    this.props.updateCategory(category.target.value)
  }

  handleBack() {
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
                  <Input type="text" id="cards" placeholder="Enter your cards name." 
                    onChange={this.handleCardNameChange}
                    required="required"
                    value={this.props.cardName}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="content">Content</Label>
                  <Input type="text" id="content" placeholder="Enter your content." 
                    onChange={this.handleContentChange}
                    required="required"
                    value={this.props.content}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="category">Category</Label>
                  <Input type="text" id="category" placeholder="Enter category name" 
                    onChange={this.handleCategoryChange}
                    required="required"
                    value={this.props.category}/>
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
                  onClick={this.handleBack}>
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

function mapStateToProps(state) {
  const {
    cardName,
    content,
    category,
  } = state.blog;
  return {
    cardName: cardName,
    content: content,
  };
}

export const mapDispatchToProps = dispatch => ({
  // sendT1Query: data => dispatch(sendT1Query(data)),
  updateCardName: cardName => dispatch(updateCardName(cardName)),
  updateContent: content => dispatch(updateContent(content)),
  updateCategory: category => dispatch(updateCategory(category)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogForms);
